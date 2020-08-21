class TripAdapter{
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    fetchTrips() {
        fetch(this.baseUrl)
            .then(res => res.json())
            .then(json => {
                json.data.forEach((trip) => this.sanitizeAndAdd(trip))
            })
            .catch((err) )
    }

    patchTrip() {

    }

    deleteTrip() {
        let configObj = {

        }

        fetch(`http://`)
    }

    updateDom() {

    }

    attachToDom() {
        const tripDiv = document.createElement('div')

        tripDiv.classList.add('trip')
        // tripDiv.setAttribute()


    }

    sanitizeAndAdd(tripObj) {
        let sanitized = {...tripObj.attributes}
        let trip = new Trip(sanitized)
        trip.attachToDom()
    }
}