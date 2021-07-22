class Requests {

    getPing(){
        return cy.request({
            method: 'GET',
            url: 'ping',
        })
    }

    getBooking(){
        return cy.request({
            method: 'GET',
            url: 'booking/11',
        })
    }

    postBooking(){
        return cy.request({
            method: 'POST',
            url: 'booking',
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            }
        })
    }

    updateBookingWithoutToken(response){
        const id = response.body.bookingid 

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            body: {
                "firstname": "asdsa",
                "lastname": "dddd",
                "totalprice": 200,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "sldksak"
            },
            failOnStatusCode: false
        })
    }

    updateBookingWithInvalidToken(response){
        const id = response.body.bookingid 

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: '123123123'
            },
            body: {
                "firstname": "asdsa",
                "lastname": "dddd",
                "totalprice": 200,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "sldksak"
            },
            failOnStatusCode: false
        })
    }

    updateNonexistentBooking(){
//            const id_ = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: 'booking/11111111111111111111',
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "asdsa",
                "lastname": "dddd",
                "totalprice": 200,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "sldksak"
            },
            failOnStatusCode: false
        })
    }

    updateBooking(response){
        const id = response.body.bookingid 

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "asdsa",
                "lastname": "dddd",
                "totalprice": 200,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "sldksak"
            },
            failOnStatusCode: false
        })
    }

    postAuth(){
        return cy.request({
            method: 'POST',
            url: 'auth',
            body:{
                "username": "admin",
                "password": "password123"
            }
        })
    }

    doAuth(){
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token;

            Cypress.env('token', token);
        })
    }

    deleteNonexistingBooking(){
        //const id = response.body.bookingid 

        return cy.request({
            method: 'DELETE',
            url: `booking/11111111`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }

    deleteBookingWithoutToken(response){
        const id = response.body.bookingid 

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            failOnStatusCode: false
        })
    }

    deleteBookingWithInvalidToken(response){
        const id = response.body.bookingid 

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('123123123')}`
            },
            failOnStatusCode: false
        })
    }

    deleteBooking(response){
        const id = response.body.bookingid 

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }
}

export default new Requests();