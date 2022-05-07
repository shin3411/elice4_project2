import "jest-styled-components";
import { render, screen } from "../../../../test-utils";
import UserEditForm from "../../../../pages/User/Profile/UserEditForm";
import userEvent from "@testing-library/user-event";
import { useGetCurrentUser } from "../../../../queries/userQuery";
jest.mock("../../../../queries/userQuery");

const editStateStore = { setIsEdit: jest.fn() };

describe("UserEditForm 요소 테스트", () => {
  it("닉네임 수정 inputBox", () => {
    useGetCurrentUser.mockReturnValue({ userState: { nickname: "테스트" } });
    render(<UserEditForm editStateStore={editStateStore} />);
    const editProfileNickname = screen.queryByPlaceholderText(/nickname*/i);
    expect(editProfileNickname).toBeInTheDocument();
  });

  it("비밀번호 변경 inputBox", () => {
    useGetCurrentUser.mockReturnValue({ userState: { nickname: "테스트" } });
    render(<UserEditForm editStateStore={editStateStore} />);
    const editProfilePassword = screen.queryByPlaceholderText("Password*");
    expect(editProfilePassword).toBeInTheDocument();
  });

  it("비밀번호 확인 inputBox", () => {
    useGetCurrentUser.mockReturnValue({ userState: { nickname: "테스트" } });
    render(<UserEditForm editStateStore={editStateStore} />);
    const editProfileConfirmPassword =
      screen.queryByPlaceholderText("Confirm Password*");
    expect(editProfileConfirmPassword).toBeInTheDocument();
  });

  it("소개 textarea", () => {
    useGetCurrentUser.mockReturnValue({ userState: { nickname: "테스트" } });
    render(<UserEditForm editStateStore={editStateStore} />);
    const editProfileIntroduce = screen.queryByPlaceholderText(/introduce/i);
    expect(editProfileIntroduce).toBeInTheDocument();
  });

  it("확인 버튼", () => {
    useGetCurrentUser.mockReturnValue({ userState: { nickname: "테스트" } });
    render(<UserEditForm editStateStore={editStateStore} />);
    const confirmButton = screen.getByRole("button", {
      name: "확인",
    });
    expect(confirmButton).toBeInTheDocument();
  });

  it("취소 버튼", () => {
    useGetCurrentUser.mockReturnValue({ userState: { nickname: "테스트" } });
    render(<UserEditForm editStateStore={editStateStore} />);
    const cancleButton = screen.getByRole("button", {
      name: "취소",
    });
    expect(cancleButton).toBeInTheDocument();
  });
});

describe("버튼 기능 동작 확인", () => {
  it("확인버튼 disabled", () => {
    useGetCurrentUser.mockReturnValue({ userState: { nickname: "테스트" } });
    render(<UserEditForm editStateStore={editStateStore} />);
    const editProfileNickname = screen.queryByPlaceholderText(/nickname/i);
    const editProfilePassword = screen.queryByPlaceholderText("Password*");
    const editProfileConfirmPassword =
      screen.queryByPlaceholderText("Confirm Password*");
    const confirmButton = screen.getByRole("button", {
      name: "확인",
    });

    expect(confirmButton).toHaveStyleRule("disabled", undefined);

    userEvent.clear(editProfileNickname);
    userEvent.type(editProfileNickname, "테스트");

    userEvent.clear(editProfilePassword);
    userEvent.type(editProfilePassword, "test1234");

    userEvent.clear(editProfileConfirmPassword);
    userEvent.type(editProfileConfirmPassword, "test1234");

    expect(confirmButton).not.toHaveStyleRule("disabled");
  });

  it("취소버튼 동작", () => {
    useGetCurrentUser.mockReturnValue({ userState: { nickname: "테스트" } });
    render(<UserEditForm editStateStore={editStateStore} />);
    const cancleButton = screen.getByRole("button", {
      name: "취소",
    });

    userEvent.click(cancleButton);
    expect(editStateStore.setIsEdit).toHaveBeenCalledTimes(1);
  });
});
