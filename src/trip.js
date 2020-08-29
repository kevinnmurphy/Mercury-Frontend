class Trip {
    static all = []
    static selected = {}

    constructor({id, name, description, updated_at}){
        this.id = id
        this.name = name
        this.description = description
        this.updated_at = updated_at

        this.element = document.createElement('div')
        this.element.id = `trip-${id}`
        this.element.classList.add('trips')

        this.tripCollection = document.querySelector('#trip-list')
        this.locationCollection = document.querySelector('#location-list')

        Trip.all.push(this)
    }


    static findById(id) {
        return Trip.all.find((trip) => trip.id == id)
    }

    get updatedAt() {
        new Date(Date.UTC(this.updated_at.innerText) * 1000),
        options = {weekday: 'short', month: 'short', day: 'numeric' }
    }

    static currentTrip(trip) {
        return Trip.selected = trip
    }

    locations() {
       return Location.all.filter((location) => location.trip_id == this.id)
    }


    handleClick = (e) => {
        // e.stopPropagation()
        if (e.target.className === 'delete') {
            tripAdapter.deleteTrip(this.id)
            this.element.remove()
        } else if (e.target.className === 'update') {
            e.target.className = "save"
            e.target.innerText = "Save"
            this.addUpdateTripFields(this.id)
        } else if (e.target.className === 'save') {
            e.target.className = "update"
            e.target.innerText = "Update"
            tripAdapter.patchTrip(this.id)
        } else {
            this.displayLocations(e)
            
            markers = []

            Trip.selected.locations().forEach((location) => {
                let point = {lat: parseFloat(location.lat), lng: parseFloat(location.lon)}
                markers.push(point)
            })
            
            initMap(markers[0])
        }
    }

    addUpdateTripFields() {
        const updateForm = 
        `
        <input type="text" name="name" id="trip-name" class="update-form" value="${this.name}"<br>
        <input type="text" name="description" id="trip-description" class="update-form" value="${this.description}"><br>
        `

        const formDiv = document.createElement('div')
        formDiv.id = `update-form-${this.id}`
        formDiv.innerHTML = updateForm
        this.element.append(formDiv)
    }

    updateTripOnDom({name, description, updated_at}) {
        this.name = name
        this.description = description
        this.updated_at = updated_at

        let tripElement = document.querySelector(`#trip-${this.id}`)

        tripElement.querySelector('.title').innerText = name
        tripElement.querySelector('.description').innerText = description
        tripElement.querySelector('.updated_at').innerText = updated_at
    }

    fullRender() {
        this.element.innerHTML = `
            <h3 class="title">${this.name}</h3>
            <p class="description">${this.description}</p>
            <button class="delete" data-id="${this.id}">x</button>
            <button class="update" data-id="${this.id}">Update</button>
            <span class="updated_at">(${this.updated_at})</span>
        `

        const tripCollection = document.querySelector('#trip-column')
        tripCollection.classList.toggle('trip-collection-toggle')

        return this.element
    }

    attachToDom() {
        this.tripCollection.append(this.fullRender())
        this.addEventListeners()
    }

    addEventListeners() {
        this.element.addEventListener('click', this.handleClick) 
        // this.element.addEventListener('click', this.displayLocations)
    }


    displayLocations = (e) => {
        const locationBtn = document.querySelector('#new-location-btn')
        locationBtn.toggleAttribute('disabled', false)

        const locationList = document.querySelector('#location-list')
        locationList.innerHTML = ''
        Trip.findById(this.id).locations().forEach((i) => {
            i.attachToDom()
        })
        
        Trip.currentTrip(Trip.findById(this.id))
    }


}