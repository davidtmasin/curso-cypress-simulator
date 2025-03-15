/// <reference types="cypress"/>

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(windowBrowser) {
        windowBrowser.localStorage.setItem("cookieConsent", "accepted");
      },
    });
    cy.contains("button", "Login").click();
  });
  
  //A partir deste próximo caso de teste, daremos início àqueles não-essenciais porém, necessários.
  it("it logs out successfully", () => {
    cy.get("#sandwich-menu").click();

    cy.contains("button", "Logout").should("be.visible").click();

    cy.contains("h2", "Let's get started!").should("be.visible");
    cy.contains("button", "Login").should("be.visible");
    cy.get("#sandwich-menu").should("not.be.visible");
  });

  it("it shows and hides the logout button", () => {
    cy.get("#sandwich-menu").click();

    cy.contains("button", "Logout").should("be.visible");

    cy.get("#sandwich-menu").click();

    cy.contains("button", "Logout").should("not.be.visible");
  });

  it("it shows the running state before showing the final result", () => {
    cy.contains("button", "Run").should("have.attr", "disabled");

    cy.get("#codeInput").type("cy.visit()");

    cy.contains("button", "Run").should("not.have.attr", "disabled");

    cy.contains("button", "Run").click();

    cy.contains("button", "Running...")
      .should("be.visible")
      .and("have.attr", "disabled");
    cy.contains("#outputArea", "Running... Please wait.").should("be.visible");
    cy.contains("button", "Running...", { timeout: 6000 }).should("not.exist");
    cy.contains("button", "Run").should("be.visible");
    cy.contains("#outputArea", "Running... Please wait.", {
      timeout: 6000,
    }).should("not.exist");
    cy.get("#outputArea")
      .should("contain", "Success")
      .and("contain", "cy.visit() // Visited URL");
  });

  it("captcha button states", () => {});

  it("captcha error", () => {});

  it("Run button - enabled/disabled states", () => {});

  it("reset textarea on logout and login", () => {});

  it("disabled run button on logout and login", () => {});

  it("reset  output on logout and login", () => {});

  it("no cooking banner on the login page", () => {});
});
