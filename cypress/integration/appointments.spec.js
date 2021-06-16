describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });
  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    cy.get(":nth-child(1) > .appointment__card");
    cy.get("[alt='Edit']").invoke("show").click();
    cy.get("[data-testid=student-name-input]").clear().type("Irving Henriquez");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Irving Henriquez");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("cancel an interview", () => {
    cy.get(":nth-child(1) > .appointment__card");
    cy.get("[alt='Delete']").invoke("show").click();
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
