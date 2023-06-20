describe('Planets', () => {
  it('Add a new planet', () => {
    // login
    cy.login("admin")

    // go to list of planets
    cy.visit("http://localhost:3000/planets")
    cy.get('#planet-list').should('be.visible')

    // add a new planet
    const planetName = "Test Planet " + Math.random()
    cy.get('#add-planet').click()
    cy.get('#name').type(planetName)
    cy.get('#oxygen-percentage').type("12.3")
    cy.get('#discovery-date').type("2020-01-01")
    cy.get('#submit').click()

    // refresh the list of planets
    cy.visit("http://localhost:3000/planets")
    cy.get('#planet-list').should('be.visible')

    // check that the new planet is in the list
    cy.get('#planet-list').should('contain', planetName)
  })

  it('Add twice the same planet', () => {
    // login
    cy.login("admin")

    // go to list of planets
    cy.visit("http://localhost:3000/planets")
    cy.get('#planet-list').should('be.visible')

    // add the first planet
    const planetName = "Test Planet " + Math.random()
    cy.get('#add-planet').click()
    cy.get('#name').type(planetName)
    cy.get('#oxygen-percentage').type("12.3")
    cy.get('#discovery-date').type("2020-01-01")
    cy.get('#submit').click()

    // go back to the list of planets
    cy.visit("http://localhost:3000/planets")
    cy.get('#planet-list').should('be.visible')

    // add another planet with the same name
    cy.get('#add-planet').click()
    cy.get('#name').type(planetName)
    cy.get('#oxygen-percentage').type("12.3")
    cy.get('#discovery-date').type("2020-01-01")
    cy.get('#submit').click()

    // check that an error message is displayed
    cy.get('#error-message').should('contain', 'already exists')
  })
})
