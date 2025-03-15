/// <reference types="cypress"/>

describe("Cypress Simulator", () => {
  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(windowBrowser) {
        windowBrowser.localStorage.setItem("cookieConsent", "accepted");
      },
    });
    cy.contains("button", "Login").click();
  });

  it("it successfully simulates a Cypress command (e.g., cy.log('Yay!'))", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']").type(
      "cy.log('Yay!')"
    );
    cy.contains("button", "Run").click();

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success:")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible");
  });

  it("it shows an error when entering and running an invalid Cypress command (e.g., cy.run())", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']").type(
      "cy.run()"
    );
    cy.contains("button", "Run").click();

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Error:")
      .and("contain", "Invalid Cypress command: cy.run()")
      .and("be.visible");
  });

  it("it shows a warning when entering and running a not-implemented Cypress command (e.g., cy.contains('Login'))", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']").type(
      "cy.contains('Login')"
    );
    cy.contains("button", "Run").click();

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Warning:")
      .and("contain", "The `cy.contains` command has not been implemented yet.")
      .and("be.visible");
  });

  it(" it shows a an error when entering and running a valid Cypress command without parentheses (e.g., cy.visit)", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']").type(
      "cy.visit"
    );
    cy.contains("button", "Run").click();

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.visit` command")
      .and("be.visible");
  });

  it("it asks for help and gets common Cypress commands and examples with a link to the docs", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']").type(
      "help"
    );
    cy.contains("button", "Run").click();

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Common Cypress commands and examples:")
      .and(
        "contain",
        "For more commands and details, visit the official Cypress API documentation."
      )
      .and("be.visible");

    cy.contains("#outputArea a", "official Cypress API documentation")
      .should(
        "have.attr",
        "href",
        "https://docs.cypress.io/api/table-of-contents"
      )
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer")
      .and("be.visible");
  });

  it("it maximizes and minimizes a simulation result", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']").type(
      "help"
    );
    cy.contains("button", "Run").click();

    cy.get(".expand-collapse")
      .as("btnExpandCollapse")
      .should("have.attr", "aria-expanded", "false");
    cy.get("#expandIcon").should("be.visible");

    cy.get("@btnExpandCollapse").click();

    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Common Cypress commands and examples:")
      .and(
        "contain",
        "For more commands and details, visit the official Cypress API documentation."
      )
      .and("be.visible");
    cy.get("@btnExpandCollapse").should("have.attr", "aria-expanded", "true");
    cy.get("#collapseIcon").should("be.visible");

    cy.get("@btnExpandCollapse").click();

    cy.get("@btnExpandCollapse").should("have.attr", "aria-expanded", "false");
    cy.get("#expandIcon").should("be.visible");
  });
  // Até este último caso de teste acima, temos uma ótima cobertura para um possível Smoke Test.

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
    
    cy.contains('button','Logout').should('be.visible')

    cy.get("#sandwich-menu").click();

    cy.contains('button','Logout').should('not.be.visible')
  });

  it("Running... state", () => {});

  it("Run button - enabled/disabled states", () => {});

  it("accepts cookies", () => {});

  it("decline cookies", () => {});

  it("captcha button states", () => {});

  it("captcha error", () => {});

  it("reset textarea on logout and login", () => {});

  it("disabled run button on logout and login", () => {});

  it("reset  output on logout and login", () => {});

  it("no cooking banner on the login page", () => {});
});
