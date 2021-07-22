/// <reference types="cypress" />
import req from '../support/api/request' 
context('Ping', () => {
    it('GET Healthcheck @healthcheck', () => {
        req.getPing().its('status').should('eq', 201)
        
    });
});