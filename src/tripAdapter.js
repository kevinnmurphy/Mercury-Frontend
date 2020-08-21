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
            // debugger
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
            body: JSON.stringify(trip.id),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        fetch(this.baseUrl + id, config)
            .then(res => res.json())
            .then(json => {
                json.data.forEach((trip) => this.sanitizeAndAdd(trip))
            })
    }

    updateDom() {

    }

    attachToDom() {
        const tripCollection = document.querySelector('#trip-collection')
        const tripList = document.querySelector('#trip-list')

        const tripDiv = document.createElement('div')

        tripDiv.classList.add('trip')
        tripDiv.setAttribute()
        tripCollection.appendChild(tripDiv)

        let tripName = document.createElement('h2')
        tripDiv.appendChild(tripName)
        tripName.innerText = `${trip.name}`


        // let locationBtn = document.createElement("button");
        // locationBtn.classList.add('location-btn');
        // locationBtn.innerHTML = "Add Location";
        // tripDiv.appendChild(locationBtn);

        // locationBtn.addEventListener("click", () => {
        //     locationFormConatainer.classList.toggle('d-none')
        // })

    }

    sanitizeAndAdd(res) {
        let sanitized = {...res.attributes}
        let trip = new Trip(sanitized)
        // trip.attachToDom()
    }
}