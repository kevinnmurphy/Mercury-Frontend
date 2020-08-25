class Location {
    static all = []

    constructor({id, name, lat, lon, trip_id, updated_at}){
        this.id = id
        this.name = name
        this.lat = lat 
        this.lon = lon 
        this.trip_id = trip_id
        this.updated_at = updated_at

        this.element = document.createElement('div')
        this.element.id = `location-${id}`
        this.element.classList.add('locations')

        this.locationCollection = document.querySelector('#location-list')

        Location.all.push(this)
    }


    static findById(id) {
        return Location.all.find((location) => location.id == id)
    }


    handleClick = (e) => {
        if (e.target.className === 'delete') {
            locationAdapter.deleteLocation(this.id)
            this.element.remove()
        } else if (e.target.className === 'update') {
            e.target.className = "save"
            e.target.innerText = "Save"
            this.addUpdateLocationFields(this.id)
        } else if (e.target.className === 'save') {
            e.target.className = "update"
            e.target.innerText = "Update"
            locationAdapter.patchLocation(this.id)
        }
    }

    addUpdateLocationFields() {
        const updateForm = 
        `
        <input type="text" name="name" id="location-name" value="${this.name}"<br>
        <input type="text" name="description" id="location-description" value="${this.lat}"><br>
        <input type="text" name="description" id="location-description" value="${this.lon}"><br>
        `

        const formDiv = document.createElement('div')
        formDiv.id = `update-form-${this.id}`
        formDiv.innerHTML = updateForm
        this.element.append(formDiv)
    }

    updateLocationOnDom({name, lat, lon}) {
        this.name = name
        this.lat = lat
        this.lon = lon
        // this.trip_id = trip_id

        let locationElement = document.querySelector(`#location-${this.id}`)

        locationElement.querySelector('.title').innerText = name
        locationElement.querySelector('.lat').innerText = "Latitude: " + lat
        locationElement.querySelector('.lon').innerText = "Longitude: " + llon
    }

    fullRender() {
        this.element.innerHTML = `
        <h3 class="title">${this.name}</h3>
        <span class="lat">Latitude: ${this.lat}</span>
        <span class="lon">Longitude: ${this.lon}</span>
        <button class="delete" data-id="${this.id}">x</button>
        <button class="update" data-id="${this.id}">Update</button>
        <span class="updated_at">(${this.updated_at})</span>
    `

        const tripCollection = document.querySelector('#trip-column')
        tripCollection.classList.toggle('trip-collection-toggle')

        return this.element
    }

    attachToDom() {
        this.locationCollection.append(this.fullRender())
        this.addEventListeners()
    }

    addEventListeners() {
        this.element.addEventListener('click', this.handleClick)
    }
}