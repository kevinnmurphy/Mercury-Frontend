
class Location {
    static all = []

    constructor({id, name, lat, lon, trip_id}){
        this.id = id
        this.name = name
        this.lat = lat 
        this.lon = lon 
        this.trip_id = trip_id

        this.element = document.createElement('div')
        this.element.id = `location-${id}`

        this.locationCollection = document.querySelector('#location-collection')

        Location.all.push(this)
    }

    handleClick = (e) => {

    }
    
    createDeleteButton(el) {
        let deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        // deleteButton.addEventListener('click', deleteLocation)
        el.appendChild(deleteButton)
    }


    fullRender() {
        this.element.innerHTML = `<h3>${this.name}</h3>`
        // this.createDeleteButton(this)
        
        // add location button
        // locationBtn = document.createElement('button')
        // locationBtn.classList.
        // this.element.appendChild()
        // <button id="new-trip-btn">Add Trip</button>
        return this.element
    }

    locations() {
        return this.locations.all.filter((location) => location.trip_id == this.id)
    }


    attachToDom() {
        this.tripCollection.append(this.fullRender())
        this.addEventListeners()
    }

    addEventListeners() {
        // this.element.addEventListeners('click', this.displayLocations
    }
}