class Trip {
    static all = []

    constructor({id, name}){
        this.id = id
        this.name = name

        this.element = document.createElement('div')
        this.element.id = `trip-${id}`
        this.tripCollection = document.querySelector('#trip-collection')

        Trip.all.push(this)
    }

    handleClick = (e) => {


        // if (e.target.className === 'delete') {
        //     itemAdapter.deleteTrip(id)
        // } else if (e.target.className === 'update') {

        // } else if (e.target.className === 'save') {
        //     itemAdapter.patchTrip(id)
        // }
    }

    fullRender() {
        this.element.innerHTML = `<h3>${this.name}</h3>`
        
        // add location button
        // this.element.appendChild
        // <button id="new-trip-btn">Add Trip</button>
        return this.element
    }

    attachToDom() {
        this.tripCollection.append(this.fullRender())
        this.addEventListeners()
    }

    addEventListeners() {
        // this.element.addEventListeners('click', this.displayLocations
    }
    
}