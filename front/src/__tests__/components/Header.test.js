import { render, screen } from "../../test-utils";
import Header from "../../components/Header";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/",
  }),
  useNavigate: () => ({
    navigate: mockNavigate.mockImplementation(() => ({})),
  }),
}));

// test("Header를 렌더했어요", () => {
//   render(<Header />);
//   const headerElement = screen.getByRole("img");
//   expect(headerElement).toBeInTheDocument();
// });

// describe("Nav 렌더 테스트", () => {
//   it("should render nav", () => {
//     render(<Header />);
//     screen.getByRole("dont know");
//   });
// });

// mui test 방법이 뭐지..
describe("Header render", () => {
  it("render Header", () => {
    render(<Header />);
    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
  });
  //   it("render Nav", () => {
  //     render(<Header />);
  //     const navElement = screen.getByLabelText("로그인");
  //     expect(navElement).toBeInTheDocument();
  //   });
});
