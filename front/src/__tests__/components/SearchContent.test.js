import { render, screen } from "../../test-utils";
import SearchContent from "../../components/Search/SearchContent";
import userEvent from "@testing-library/user-event";
import { useGetPostList } from "../../queries/postQuery";
jest.mock("../../queries/postQuery");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

test("검색창과 카테고리 선택 요소가 있다.", () => {
  useGetPostList.mockReturnValue({
    postList: [
      {
        title: "제목1",
        content: "본문1",
        tags: ["태그1", "테스트", "temp"],
        nickname: "작성자1",
      },
      {
        title: "제목2",
        content: "본문2",
        tags: ["오늘", "내일"],
        nickname: "작성자1",
      },
    ],
    isFetching: false,
    error: false,
  });

  render(<SearchContent />);
  const searchInput = screen.getByPlaceholderText("검색어", { exact: false });
  expect(searchInput).toBeInTheDocument();

  const searchCategory = screen.getAllByRole("option");
  expect(searchCategory.length).toBe(4);

  const searchButton = screen.getByRole("button", { name: "검색" });
  expect(searchButton).toBeInTheDocument();
});

test("검색창과 카테고리 선택 시 동작 테스트", () => {
  useGetPostList.mockReturnValue({
    postList: [
      {
        title: "제목1",
        content: "본문1",
        tags: ["태그1", "테스트", "temp"],
        nickname: "작성자1",
      },
      {
        title: "제목2",
        content: "본문2",
        tags: ["오늘", "내일"],
        nickname: "작성자1",
      },
    ],
    isFetching: false,
    error: false,
  });

  render(<SearchContent />);
  const searchInput = screen.getByPlaceholderText("검색어", { exact: false });
  userEvent.type(searchInput, "테스트검색");
  expect(searchInput).toHaveValue("테스트검색");

  userEvent.selectOptions(
    screen.getByRole("combobox"),
    screen.getByRole("option", { name: "에세이" })
  );
  expect(screen.getByRole("option", { name: "에세이" })).toBeInTheDocument();
});

test("useGetPostList 커스텀 훅 테스트", () => {
  useGetPostList.mockReturnValue({
    postList: [
      {
        title: "제목1",
        content: "본문1",
        tags: ["태그1", "테스트", "temp"],
        nickname: "작성자1",
      },
      {
        title: "제목2",
        content: "본문2",
        tags: ["오늘", "내일"],
        nickname: "작성자1",
      },
    ],
    isFetching: false,
    error: true,
  });

  render(<SearchContent />);
  const error = screen.getByText("초 후 홈페이지로 이동", { exact: false });
  expect(error).toBeInTheDocument();
});
