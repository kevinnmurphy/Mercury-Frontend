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
            // .catch((err) )
    }

    createTrip(trip) {
        const config = {
            method: 'POST',
            body: JSON.stringify(trip),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(this.baseUrl)
            .then(res => res.json())
            .then(json => {
                json.data.forEach((trip) => this.sanitizeAndAdd(trip))
            })
            // .catch((err) )
    }

    patchTrip(id) {
        const config = {
            method: 'PATCH',
            body: JSON.stringify(trip),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        fetch(this.baseUrl + id)
            .then(res => res.json())
            .then(json => {
                json.data.forEach((trip) => this.sanitizeAndAdd(trip))
            })
            .catch((err) )
    }

    deleteTrip() {
        const config = {
            method: 'DELETE',
            body: JSON.stringify(trip),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        fetch(`http://`)
    }

    updateDom() {

    }

    attachToDom() {
        const tripCollection = document.querySelector('#trip-collection')
        const tripList = document.querySelector('#trip-list')

        const tripDiv = document.createElement('div')

        tripDiv.classList.add('trip')
        // tripDiv.setAttribute()
        tripCollection.appendChild(tripDiv);

        let tripName = document.createElement('h2');
        tripDiv.appendChild(toyName);
        toyName.innerText = `${toy.name}`;


    }

    sanitizeAndAdd(tripObj) {
        let sanitized = {...tripObj.attributes}
        let trip = new Trip(sanitized)
        trip.attachToDom()
    }
}