describe("react_app_auth_test", () => {
  const input = {
    email: "test@example.com",
    name: "u",
    password: "u",
  };
  it("ログイン成功パターン", () => {
    cy.visit("http://localhost:3000/");
    cy.get('a[href="/login"]').click();
    cy.get('input[name="email"]').type(input.email);
    cy.get('input[name="password"]').type(input.password);
    cy.get(".signin-button").click();
    cy.url().should("include", "/");
  });
  it("ログイン失敗パターン", () => {
    cy.visit("http://localhost:3000/");
    cy.get('a[href="/login"]').click();
    cy.get('input[name="email"]').type("myemail@user.com");
    cy.get(".signin-button").click();
    cy.contains("パスワードを入力してください。");
  });
});
