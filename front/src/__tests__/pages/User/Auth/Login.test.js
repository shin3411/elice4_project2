import { render, screen } from "../../../../test-utils";
import "jest-styled-components";
import Login from "../../../../pages/User/Auth/Login";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => ({
    navigate: mockNavigate.mockImplementation(() => ({})),
  }),
}));

describe("Check the form required for login", () => {
  it("Check service Logo", () => {
    render(<Login />);
    const loginLogo = screen.getByRole("heading", { name: "로그인" });
    expect(loginLogo).toBeInTheDocument();
  });

  it("Check email form", () => {
    render(<Login />);
    const emailForm = screen.getByRole("textbox", "Email*");
    expect(emailForm).toBeInTheDocument();
  });

  it("Check password form", () => {
    render(<Login />);
    const passwordForm = screen.getByRole("textbox", "Password*");
    expect(passwordForm).toBeInTheDocument();
  });

  it("Check submit button", () => {
    render(<Login />);
    const submitButton = screen.getAllByRole("button", { name: /^로그인$/ })[0];
    expect(submitButton).toBeInTheDocument();
  });
});

describe("Auth login button's action", () => {
  it("Active button when input login info", async () => {
    // const onSubmit = jest.fn();
    render(<Login />);

    const submitButton = screen.getAllByRole("button", { name: /^로그인$/ })[0];

    const emailForm = screen.queryByPlaceholderText("Email*");
    userEvent.type(emailForm, "abcd@naver.com");
    expect(submitButton).toHaveStyleRule("disabled", undefined);

    const passwordForm = screen.queryByPlaceholderText("Password*");
    userEvent.type(passwordForm, "test1234");
    expect(submitButton).not.toHaveStyleRule("disabled");

    // userEvent.click(submitButton);
    // expect(onSubmit).toBeCalled();
  });
});

describe("KaKao Login test", () => {
  it("KaKao login button is on the screen", () => {
    render(<Login />);
    const kakaoLoginButton = screen.getByRole("button", {
      name: /카카오 로그인$/,
    });
    expect(kakaoLoginButton).toBeInTheDocument();
  });
});
