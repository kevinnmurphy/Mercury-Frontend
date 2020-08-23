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
            .catch((err) => console.log(err.message))
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
        fetch(this.baseUrl, config)
            .then(res => res.json())
            .then(json => this.sanitizeAndAdd(json))
            .catch((err) => console.log(err.message))
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

        fetch(this.baseUrl + id, config)
            .then(res => res.json())
            .then(json => this.updateDom(json.data))
            .catch((err) => console.log(err.message))

        const form = document.querySelector(`#update-form-${tripId}`)
        form.remove()
    }

    deleteTrip(id) {
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
            .then(json => e.target.parentNode.remove())
            .catch((err) => console.log(err.message))
    }

    sanitizeAndAdd(res) {
        let trip = new Trip({id: res.id, ...res.attributes})
        trip.attachToDom()
    }

    updateDom(tripData) {
        const trip = Trip.findById(tripData.id)
        trip.name = tripData.attributes.name
        trip.description = tripData.attributes.description
        trip.fullRender()
    }

    // attachToDom() {
    //     const tripCollection = document.querySelector('#trip-collection')
    //     const tripList = document.querySelector('#trip-list')

    //     const tripDiv = document.createElement('div')

    //     tripDiv.classList.add('trip')
    //     tripDiv.setAttribute()
    //     tripCollection.appendChild(tripDiv)

    //     let tripName = document.createElement('h2')
    //     tripDiv.appendChild(tripName)
    //     tripName.innerText = `${trip.name}`


    //     // let locationBtn = document.createElement("button");
    //     // locationBtn.classList.add('location-btn');
    //     // locationBtn.innerHTML = "Add Location";
    //     // tripDiv.appendChild(locationBtn);

    //     // locationBtn.addEventListener("click", () => {
    //     //     locationFormConatainer.classList.toggle('d-none')
    //     // })

    // }



}