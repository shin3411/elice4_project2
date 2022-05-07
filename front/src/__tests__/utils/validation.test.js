import { validation } from "../../utils/validation";

describe("Auth validation", () => {
  it("email validation", () => {
    const registerInfo = {
      email: "abcde",
      password: "test1234",
      confirmPassword: "test1234",
      nickname: "테스트",
    };
    const { isCheckEmail, isCheckNickName, isPassRule, isSamePassword } =
      validation("register", registerInfo);
    const isActive =
      isCheckEmail && isCheckNickName && isPassRule && isSamePassword;
    expect(isActive).toBeFalsy();
  });

  it("password validation", () => {
    const registerInfo = {
      email: "test@test.com",
      password: "test1222",
      confirmPassword: "test1234",
      nickname: "테스트",
    };
    const { isCheckEmail, isCheckNickName, isPassRule, isSamePassword } =
      validation("register", registerInfo);
    const isActive =
      isCheckEmail && isCheckNickName && isPassRule && isSamePassword;
    expect(isActive).toBeFalsy();
  });

  it("nickName validation", () => {
    const registerInfo = {
      email: "test@test.com",
      password: "test1234",
      confirmPassword: "test1234",
      nickname: "a",
    };
    const { isCheckEmail, isCheckNickName, isPassRule, isSamePassword } =
      validation("register", registerInfo);
    const isActive =
      isCheckEmail && isCheckNickName && isPassRule && isSamePassword;
    expect(isActive).toBeFalsy();
  });

  it("Pass register validation", () => {
    const registerInfo = {
      email: "test@test.com",
      password: "test1234",
      confirmPassword: "test1234",
      nickname: "test",
    };
    const { isCheckEmail, isCheckNickName, isPassRule, isSamePassword } =
      validation("register", registerInfo);
    const isActive =
      isCheckEmail && isCheckNickName && isPassRule && isSamePassword;
    expect(isActive).toBeTruthy();
  });
});

describe("Login validation", () => {
  it("email validation", () => {
    const loginInfo = {
      email: "abcde",
      password: "test1234",
    };
    expect(validation("login", loginInfo)).toBeFalsy();
  });

  it("password validation", () => {
    const loginInfo = {
      email: "test@test.com",
      password: "test12",
    };
    expect(validation("login", loginInfo)).toBeFalsy();
  });

  it("Pass login validation", () => {
    const loginInfo = {
      email: "test@test.com",
      password: "test1234",
    };
    expect(validation("login", loginInfo)).toBeTruthy();
  });
});

describe("Edit validation", () => {
  it("edit password validation", () => {
    const editUserInfo = {
      password: "test1222",
      confirmPassword: "test1234",
      nickname: "테스트",
    };
    const { isCheckNickName, isPassRule, isSamePassword } = validation(
      "editUser",
      editUserInfo
    );
    const isActive = isCheckNickName && isPassRule && isSamePassword;
    expect(isActive).toBeFalsy();
  });

  it("edit nickName validation", () => {
    const editUserInfo = {
      password: "test1234",
      confirmPassword: "test1234",
      nickname: "a",
    };
    const { isCheckNickName, isPassRule, isSamePassword } = validation(
      "editUser",
      editUserInfo
    );
    const isActive = isCheckNickName && isPassRule && isSamePassword;
    expect(isActive).toBeFalsy();
  });

  it("Pass editUser validation", () => {
    const editUserInfo = {
      password: "test1234",
      confirmPassword: "test1234",
      nickname: "test",
    };
    const { isCheckNickName, isPassRule, isSamePassword } = validation(
      "editUser",
      editUserInfo
    );
    const isActive = isCheckNickName && isPassRule && isSamePassword;
    expect(isActive).toBeTruthy();
  });
});
