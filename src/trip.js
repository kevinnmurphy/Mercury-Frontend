class Trip {
    static all = []

    constructor({id, name, description, updated_at, locations}){
        this.id = id
        this.name = name
        this.description = description
        this.updated_at = updated_at
        // this.locations = locations

        this.element = document.createElement('div')
        this.element.id = `trip-${id}`
        this.element.classList.add('trips')

        this.tripCollection = document.querySelector('#trip-collection')
        this.locationCollection = document.querySelector('#location-collection')

        Trip.all.push(this)
    }
    
    addEventListeners() {
        this.element.addEventListener('click', this.handleClick)
        this.element.addEventListener('click', this.displayLocations)
        // debugger
    }

    static findById(id) {
        return Trip.all.find((trip) => trip.id == id)
    }

    get updatedAt() {
        new Date(Date.UTC(this.updated_at.innerText) * 1000),
        options = {weekday: 'short', month: 'short', day: 'numeric' }
    }

    get locations() {
       return Location.all.filter((location) => location.trip_id == this.id)
    }

    handleClick = (e) => {
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
        }
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
    
    // createDeleteButton(el) {
    //     this.deleteButton = document.createElement('button')
    //     this.deleteButton.textContent = 'Delete'
    //     // this.deleteButton.addEventListener('click', deleteTrip)
    //     el.appendChild(deleteButton)
    // }

    fullRender() {
        const title = document.createElement('h3')
        title.innerText = this.name
        title.classList.add('title')
        const desc = document.createElement('p')
        desc.innerText = this.description
        desc.classList.add('description')
        const upAt = document.createElement('span')
        upAt.innerText = `(${this.updated_at})`
        upAt.classList.add('updated_at')

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.dataset.id = this.id
        deleteBtn.innerText = "x"
        const updateBtn = document.createElement('button')
        updateBtn.classList.add('update')
        updateBtn.dataset.id = this.id
        updateBtn.innerText = 'Update'

        this.element.appendChild(title)
        this.element.appendChild(desc)
        this.element.appendChild(deleteBtn)
        this.element.appendChild(updateBtn)
        this.element.appendChild(upAt)

        // element.addEventListener('click', this.locationToggle)

        const tripCollection = document.querySelector('#trip-collection')
        tripCollection.classList.toggle('trip-collection-toggle')

        return this.element
    }

    attachToDom() {
        this.tripCollection.append(this.fullRender())
        // debugger
        this.addEventListeners()
    }



    displayLocations () {() =>
        console.log('display locations clicked')
        this.locations.forEach((i) => {
            i.attachLToDom()
        })
    }

    locationToggle() {

        const locationList = document.createElement('ul')
        locationList.classList.add('locationList')
        locationList.classList.add('d-none')
        // locationItem.dataset.id = this.id

        

        const locationBtn = document.querySelector('.locationBtn')
        locationBtn.classList.toggle('d-none')

        // Toggles trip collection from row to column
        // const tripCollection = document.querySelector('#trip-collection')
        // tripCollection.classList.toggle('trip-collection-toggle')

        // this.tripCollection.append(this.locationRender())
        // this.addEventListeners()
        locationBtn.addEventListener("click", () => {
            locationForm.classList.toggle('d-none')
        })
    }

}