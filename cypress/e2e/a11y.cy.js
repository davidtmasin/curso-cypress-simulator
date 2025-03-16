/// <reference types="cypress"/>
describe("template spec", () => {
  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(windowBrowser) {
        windowBrowser.localStorage.setItem("cookieConsent", "accepted");
      },
    });
    cy.contains("button", "Login").click();
    cy.injectAxe();
  });

  it("Cypress Simulator - A11y Checks", () => {});
});
