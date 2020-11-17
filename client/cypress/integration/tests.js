
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
            .and('contain', 'Django Unchained')
            .and('contain', 'The Dalton Gang')
            .and('contain', 'The Magnificent Seven')
            .and('contain', 'The Revenant')

    })
})


describe('Checks if movie info displays', () => {
    it('Displays info correctly', () => {
        cy.visit('localhost:3000')
        cy.get('input#textField').type('Dora and the Lost City of Gold')
        cy.get('div#results')
            .should('contain', "Dora and the Lost City of Gold").click()
        cy.get('#moviePage > div.movieInfo > div.contentContainerRight > div:nth-child(2)')
            .should('contain', '102')

    })
})


describe('Search for the movies over 210 minutes', () => {
    it('Returns the correct movie', () => {
        cy.visit('localhost:3000')
        cy.contains("Filters").click()
        cy.get('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > div:nth-child(4) > div:nth-child(1) > div > input').type('210')
        cy.contains("Close").click()
        cy.get('div#results')
            .should('contain', "The Ten Commandments")

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
        cy.get('div#results').should("contain", "The Ten Commandments")
        cy.get('#sortSelect > .MuiButtonBase-root').click()
        cy.get('div#results').should("contain", "Evangelion: 3.0+1.0 Thrice Upon a Time")

    })
})


describe('Check sorting on budget', () => {
    it('Returns the correct movies', () => {
        cy.visit('localhost:3000')
        cy.get('.MuiSelect-root').click()
        cy.get('[data-value="budget"]').click()
        cy.get('div#results').should("contain", "Pirates of the Caribbean: On Stranger Tides")
        cy.get('#sortSelect > .MuiButtonBase-root').click()
        cy.get('div#results').should("contain", "A Quiet Place Part II")
    })
})

describe('Check if login works', () => {
    it('Successfully logs in', () => {
        cy.visit('localhost:3000')
        cy.get('#root > div.MuiBox-root.MuiBox-root-2.App > header > div > button:nth-child(4)').click()
        cy.get('#username').click().type('admin')
        cy.get('#password').click().type('admin')
        cy.get('#paperContainer > div > form > button').click()
        cy.get('#switchContainer > p:nth-child(3)').should("contain", "Username: admin")
    })
})

describe('Checks if reviews displays correctly', () => {
    it('Displays info correctly', () => {
        cy.visit('localhost:3000')
        cy.get('input#textField').type('10x10')
        cy.wait(1000)
        cy.get('div#results')
            .should('contain', "10x10").click()
        cy.wait(1000)
        cy.get('#reviewContainer > div > div')
            .should('contain', 'Sykt nice film')

    })
})


