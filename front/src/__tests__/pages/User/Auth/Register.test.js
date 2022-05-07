import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import Register from "../../../../pages/User/Auth/Register";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => ({
    navigate: mockNavigate.mockImplementation(() => ({})),
  }),
}));

describe("Check the form required for register", () => {
  it("Check service Logo", () => {
    render(<Register />);
    const registerLogo = screen.getByRole("heading", { name: "회원가입" });
    expect(registerLogo).toBeInTheDocument();
  });

  it("Check email form", () => {
    render(<Register />);
    const emailForm = screen.getByPlaceholderText("Email*");
    expect(emailForm).toBeInTheDocument();
  });

  it("Check password form", () => {
    render(<Register />);
    const passwordForm = screen.getByPlaceholderText("Password*");
    expect(passwordForm).toBeInTheDocument();
  });

  it("Check confirm password form", () => {
    render(<Register />);
    const confirmPasswordForm =
      screen.getByPlaceholderText("Confirm Password*");
    expect(confirmPasswordForm).toBeInTheDocument();
  });

  it("Check nickname form", () => {
    render(<Register />);
    const nickNameForm = screen.getByPlaceholderText("Nickname*");
    expect(nickNameForm).toBeInTheDocument();
  });

  it("Check submit button", () => {
    render(<Register />);
    const submitButton = screen.getByRole("button", { name: "회원가입" });
    expect(submitButton).toBeInTheDocument();
  });
});

describe("Auth button's action", () => {
  it("Active button when input register info", async () => {
    // const onSubmit = jest.fn();
    render(<Register />);

    const submitButton = screen.getByRole("button", { name: "회원가입" });

    const emailForm = screen.getByPlaceholderText("Email*");
    userEvent.type(emailForm, "abcd@naver.com");
    expect(submitButton).toHaveStyleRule("disabled", undefined);

    const passwordForm = screen.getByPlaceholderText("Password*");
    userEvent.type(passwordForm, "test1234");
    expect(submitButton).toHaveStyleRule("disabled", undefined);

    const confirmPasswordForm =
      screen.getByPlaceholderText("Confirm Password*");
    userEvent.type(confirmPasswordForm, "test1234");
    expect(submitButton).toHaveStyleRule("disabled", undefined);

    const nickNameForm = screen.getByPlaceholderText("Nickname*");
    userEvent.type(nickNameForm, "테스트닉네임");
    expect(submitButton).not.toHaveStyleRule("disabled");

    // userEvent.click(submitButton);
    // expect(onSubmit).toBeCalled();
  });
});
