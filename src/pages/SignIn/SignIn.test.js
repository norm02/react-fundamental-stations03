/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { SignIn } from "../src/pages/SignIn";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter as Router } from "react-router-dom";

describe("SignIn", () => {
  it("confirm email & password of label and button role", () => {
    render(
      <Provider store={store}>
        <Router>
          <SignIn />
        </Router>
      </Provider>
    );
    const labelEmailElement = screen.getByLabelText("メールアドレス");
    const labelPasswordElement = screen.getByLabelText("パスワード");
    expect(labelEmailElement).toBeInTheDocument();
    expect(labelPasswordElement).toBeInTheDocument();
    const inputElement = screen.getByRole("button");
    expect(inputElement).toBeInTheDocument();
  });
});
