class LocationAdapter{
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    fetchLocations() {
        fetch(this.baseUrl)
            .then(res => res.json())
            .then(json => {
                json.data.forEach((location) => this.sanitizeAndAdd(location))
            })
            .catch((err) => console.log(err.message))
    }

    createLocation(location) {
        const config = {
            method: 'POST',
            body: JSON.stringify(location),
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

    patchLocation(id) {
        const config = {
            method: 'PATCH',
            body: JSON.stringify(location),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        fetch(this.baseUrl + id, config)
            .then(res => res.json())
            .then(json => this.updateDom(json.data))
            .catch((err) => console.log(err.message))

        const form = document.querySelector(`#update-form-${locationId}`)
        form.remove()
    }

    deleteLocation(id) {
        const config = {
            method: 'DELETE',
            body: JSON.stringify(location.id),
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
        let location = new Location({id: res.id, ...res.attributes})
        location.attachToDom()
    }

    updateDom(locationData) {
        const location = Location.findById(locationData.id)
        location.name = locationData.attributes.name
        location.description = locationData.attributes.description
        location.fullRender()
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