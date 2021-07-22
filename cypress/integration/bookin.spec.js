/// <reference types="cypress" />

import req from '../support/api/request'
import sch from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('Booking', () => {
    before(() => {
        req.doAuth();
    });

    it('Validar contrato do GET Booking @contract', () => {
    
        req.getBooking().then(getBookinResponse => {
            cy.wrap(getBookinResponse.body).should(
                sch.getBookingSchema()
            )
        })
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)
            assertions.shouldBookingIdNotNull(postBookingResponse)
            assertions.shouldHaveHeadersContent(postBookingResponse)
            assertions.shouldBeFast(postBookingResponse)
        })
    })

    it('Tentar alterar uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse =>{
        req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse =>{
            assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    })

    it('Tentar alterar uma reserva com token inválido  @functional', () => {
        req.postBooking().then(postBookingResponse =>{
        req.updateBookingWithInvalidToken(postBookingResponse).then(putBookingResponse =>{
            assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    })

    it('Tentar alterar uma reserva inexistente  @functional', () => {
        req.postBooking().then(postBookingResponse =>{
        req.updateNonexistentBooking(postBookingResponse).then(putBookingResponse =>{
            assertions.shouldHaveStatus(putBookingResponse, 405)
            })
        })
    })


    it('Alterar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse =>{
        req.updateBooking(postBookingResponse).then(putBookingResponse =>{
            assertions.shouldHaveStatus(putBookingResponse, 200)
            })
        })
    })

    it('Tentar excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse =>{
        req.deleteNonexistingBooking(postBookingResponse).then(putBookingResponse =>{
            assertions.shouldHaveStatus(putBookingResponse, 405)
            })
        })
    });

    it('Tentar excluir uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse =>{
        req.deleteBookingWithoutToken(postBookingResponse).then(putBookingResponse =>{
            assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    });

    it('Tentar excluir uma reserva com token invalido @functional', () => {
        req.postBooking().then(postBookingResponse =>{
        req.deleteBookingWithInvalidToken(postBookingResponse).then(putBookingResponse =>{
            assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    });

    it('Excluir uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse =>{
        req.deleteBooking(postBookingResponse).then(putBookingResponse =>{
            assertions.shouldHaveStatus(putBookingResponse, 201)
            })
        })
    });
});