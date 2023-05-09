describe("react_app_auth_test", () => {
  it("login_test", () => {
    cy.visit("http://localhost:3000/");
    cy.get('a[href="/login"]').click();
    cy.get('input[name="email"]').type("myemail@user.com");
    cy.get(".signin-button").click();
    cy.contains("パスワードを入力してください。");
  });
});
