class Assertions {
    
    shouldHaveStatus(response, status){
        return expect(response.status, 'API Status').to.eq(status)
    }

    shouldBookingIdNotNull(response){
        return expect(response.body.bookingid, 'bookingId Exists').to.not.be.null
    }

    shouldHaveHeadersContent(response){
        return expect(response.headers, 'default headers').to.include({
            server: 'Cowboy',
            connection: 'keep-alive'
        })
    }

    shouldBeFast(response){
        return expect(response.duration, 'response duraction').lessThan(1000) 
        //duração de retorno da requisição
    }
}

export default new Assertions()