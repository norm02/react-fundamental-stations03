/**
 * @jest-environment jsdom
 */
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { SignIn } from "./SignIn";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter as Router } from "react-router-dom";

describe("SignIn", () => {
  it("登録済みユーザー情報でサインインテスト", () => {
    render(
      <Provider store={store}>
        <Router>
          <SignIn />
        </Router>
      </Provider>
    );
    const input = {
      email: "test@example.com",
      name: "u",
      password: "u",
    };
    //メールアドレスフォームとパスワードフォームのラベルが正しいか確認
    const labelEmailElement = screen.getByLabelText("メールアドレス");
    const labelPasswordElement = screen.getByLabelText("パスワード");
    expect(labelEmailElement).toBeInTheDocument();
    expect(labelPasswordElement).toBeInTheDocument();
    //メールアドレスフォームとパスワードフォームに入力して、ボタンを押す
    userEvent.type(labelEmailElement, input.email);
    userEvent.type(labelPasswordElement, input.password);
    //サインインボタンが押せるか確認
    const buttonElement = screen.getByRole("button", {
      name: "サインイン",
    });
    userEvent.click(buttonElement);
    //サインイン後."/Home"に遷移しているか確認
    expect(window.location.pathname).toBe("/");
  });
});
