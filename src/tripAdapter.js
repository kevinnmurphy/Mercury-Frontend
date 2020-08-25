class TripAdapter{
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    fetchTrips() {
        fetch(`${baseUrl}/trips`)
            .then(res => res.json())
            .then(json => {
                json.data.forEach((trip) => this.sanitizeAndAdd(trip))
            })
            .catch((err) => console.log(err.message))
    }

    createTrip(tripObj) {
        let config = {
            method: 'POST',
            body: JSON.stringify(tripObj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(`${baseUrl}/trips`, config)
            .then(res => res.json())
            .then(json => {
                return this.sanitizeAndAdd(json.data)
            })
            .catch((err) => console.log(err.message))
    }
      
    patchTrip(tripId) {
        const form = document.querySelector(`#update-form-${tripId}`)
        const name = form.querySelector('#trip-name').value
        const description = form.querySelector('#trip-description').value
        // const name = document.querySelector(`trip-name-${id}`).value
        // const description = document.querySelector(`trip-description-${id}`).value
        
        let tripObj = {
            name,
            description
        }

        let config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(tripObj)
        }

        fetch(`${baseUrl}/trips/${tripId}`, config)
            .then(res => res.json())
            .then(json => {
                
                let tripNew  = Trip.all.find((i) => i.id == json.data.id)
                tripNew.updateTripOnDom({...json.data.attributes}) 
            })
            .catch((err) => console.log(err.message))

        form.remove()
    }

    deleteTrip(id) {
        let config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        fetch(`${baseUrl}/trips/${id}`, config)
            .then(res => res.json())
            .then(json => alert(json.message))
            .catch((err) => console.log(err.message))
    }

    sanitizeAndAdd(res) {
        let trip = new Trip({id: res.id, ...res.attributes, ...res.relationships.locations.data})
        trip.attachToDom()
    }

}