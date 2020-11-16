
/*

We use cypress for E2E testing

 */




describe('Filter on the genre Western', () => {
    it('Returns the correct movies', () => {
        cy.visit('localhost:3000')
        cy.contains("Filters").click()
        cy.contains("Western").click()
        cy.contains("Close").click()
        cy.get('div#results')
            .should('contain', "Badland")
            .and('contain', 'Eminence Hill')
            .and('contain', 'Hell on the Border')
            .and('contain', 'Spirit: Stallion of the Cimarron')
            .and('contain', 'The Pale Door')
            .and('contain', 'The Ridiculous 6')

    })
})



describe('Search for the movies over 200 minutes', () => {
    it('Returns the correct movie', () => {
        cy.visit('localhost:3000')
        cy.contains("Filters").click()
        cy.get('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > div:nth-child(4) > div:nth-child(1) > div > input').type('200')
        cy.contains("Close").click()
        cy.get('div#results')
            .should('contain', "The Lord of the Rings: The Return of the King")

    })
})

describe('Search for the movies with budget over 360MILL USD', () => {
    it('Returns the correct movie', () => {
        cy.visit('localhost:3000')
        cy.contains("Filters").click()
        cy.get('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > div:nth-child(6) > div:nth-child(1) > div > input').type('356000000')
        cy.contains("Close").click()
        cy.get('div#results')
            .should('contain', "Pirates of the Caribbean: On Stranger Tides")


    })
})


describe('Check sorting on title', () => {
    it('Returns the correct movies', () => {
        cy.visit('localhost:3000')
        cy.get('div#results').should("contain", '#Alive')
        cy.get('#sortSelect > .MuiButtonBase-root').click()
        cy.get('div#results').should("contain", "Zootopia")


    })
})


describe('Check sorting on duration', () => {
    it('Returns the correct movies', () => {
        cy.visit('localhost:3000')
        cy.get('.MuiSelect-root').click()
        cy.get('[data-value="duration"]').click()
        cy.get('div#results').should("contain", "The Lord of the Rings: The Return of the King")
        cy.get('#sortSelect > .MuiButtonBase-root').click()
        cy.get('div#results').should("contain", "Evangelion: 3.0+1.0 Thrice Upon a Time")

    })
})
