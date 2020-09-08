/// <reference types="cypress" />

describe("Smoke test", () => {
  context("Simple test", () => {
    it("Find header", () => {
      cy.visit("/");
      cy.server();
      cy.get("h1").should("have.text", "Test page");
    });
  });
});
