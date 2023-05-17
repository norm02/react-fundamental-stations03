describe("react_app_auth_test", () => {
  const input = {
    email: "test@example.com",
    name: "u",
    password: "u",
  };
  it("ログイン成功パターン", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[name="email"]').type(input.email);
    cy.get('input[name="password"]').type(input.password);
    cy.get(".signin-button").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
  it("ログイン失敗パターン", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[name="email"]').type(input.email);
    //cy.get('input[name="password"]').type(input.password);
    cy.get(".signin-button").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
