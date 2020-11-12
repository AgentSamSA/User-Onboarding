describe("Users app", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    const nameInput = () => cy.get("input[name='name']");
    const emailInput = () => cy.get("input[name='email']");
    const passwordInput = () => cy.get("input[name='password']");
    const termsOfServiceInput = () => cy.get("input[name='termsOfService']");
    const roleInput = () => cy.get("select[name='role']");
    const submitButton = () => cy.get("#submitBtn");

    it("check to make sure tests work", () => {
        expect(1 + 1).to.equal(2);
        expect(3 + 3).not.to.equal(7);
    });

    it("make sure DOM elements exist", () => {
        nameInput().should("exist");
        emailInput().should("exist");
        passwordInput().should("exist");
        termsOfServiceInput().should("exist");
        submitButton().should("exist");

        cy.contains("Submit");
        cy.contains(/submit/i);
    })

    it("can type a name into input", () => {
        nameInput().should("have.value", "");
        nameInput().type("Random name");
        nameInput().should("have.value", "Random name");
    });

    it("can type an email into input", () => {
        emailInput().should("have.value", "");
        emailInput().type("randomemail@email.com");
        emailInput().should("have.value", "randomemail@email.com");
    });

    it("can type a password into input", () => {
        passwordInput().should("have.value", "");
        passwordInput().type("Random password");
        passwordInput().should("have.value", "Random password");
    });

    it("can check the terms of service box", () => {
        termsOfServiceInput().should("have.value", "on");
        termsOfServiceInput().check();
        termsOfServiceInput().should("have.value", "on");
    });

    it("can submit the form data", () => {
        cy.contains("Random name").should("not.exist");
        cy.contains("randomemail@email.com").should("not.exist");
        cy.contains("Random password").should("not.exist");
        nameInput().type("Random name");
        emailInput().type("randomemail@email.com");
        passwordInput().type("Random password");
        roleInput().select("Junior Developer");
        termsOfServiceInput().check();
        submitButton().click();
        cy.contains("Random name").should("exist");
        cy.contains("randomemail@email.com").should("exist");
        cy.contains("Random password").should("exist");
    });

    it("can utilize form validation", () => {
        passwordInput().type("short");
        cy.contains("Must be at least 8 characters long");
    });
})