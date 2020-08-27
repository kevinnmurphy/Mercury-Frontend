class LocationAdapter{
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    fetchLocations() {
        fetch(`${baseUrl}/locations`)
            .then(res => res.json())
            .then(json => {
                json.data.forEach((location) => this.sanitize(location))
            })
            .catch((err) => console.log(err.message))
    }
    
    createLocation(locationObj) {
        let config = {
            method: 'POST',
            body: JSON.stringify(locationObj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        fetch(`${baseUrl}/locations`, config)
            .then(res => {
                return res.json()
            })
            .then(json => {
                return this.sanitizeAndAdd(json.data)
            })
            .catch((err) => console.log(err.message))
    }
 
    patchLocation(locationId) {
        const form = document.querySelector(`#update-form-${locationId}`)
        
        const name = form.querySelector('#location-name').value
        const lat = form.querySelector('#location-lat').value
        const lon = form.querySelector('#location-lon').value
        
        let locationObj = {
            name,
            lat,
            lon
        }
        
        let config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(locationObj)
        }

        fetch(`${baseUrl}/locations/${locationId}`, config)
            .then(res => res.json())
            .then(json => {
                let locationNew  = Location.all.find((i) => i.id == json.data.id)
                locationNew.updateLocationOnDom({...json.data.attributes}) 
            })
            .catch((err) => console.log(err.message))

        form.remove()
    }

    deleteLocation(id) {
        let config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        fetch(`${baseUrl}/locations/${id}`, config)
            .then(res => res.json())
            .then(json => alert(json.message))
            .catch((err) => console.log(err.message))
    }

    sanitize(res) {
        let location = new Location({id: res.id, ...res.attributes, trip_id: res.relationships.trip.data.id})
    }

    sanitizeAndAdd(res) {
        let location = new Location({id: res.id, ...res.attributes, trip_id: res.relationships.trip.data.id})
        location.attachToDom()
    }

}