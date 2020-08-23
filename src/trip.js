class Trip {
    static all = []

    constructor({id, name, description, updated_at}){
        this.id = id
        this.name = name
        this.description = description
        this.updated_at = updated_at

        this.element = document.createElement('div')
        this.element.id = `trip-${id}`
        this.element.classList.add('trips')

        this.tripCollection = document.querySelector('#trip-collection')

        Trip.all.push(this)
    }
    
    addEventListeners() {
        this.element.addEventListener('click', this.handleClick)
    }

    static findById(id) {
        return Trip.all.find((item) => item.id == id)
    }

    // get updatedAt() {
    //     new Date(Date.UTC(this.updated_at.innerText)),
    //     options = {weekday: 'short', month: 'short', day: 'numeric' }
    // }

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
        this.fullRender()
    }

    addUpdateTripFields() {
        const updateForm = 
        `
        <input type="text" name="name" id="trip-name" value="${this.name}"<br>
        <input type="text" name="description" id="trip-description" value="${this.description}"><br>
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

        this.element.appendChild(title)
        this.element.appendChild(desc)
        

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.dataset.id = this.id
        deleteBtn.innerText = "Delete"
        const updateBtn = document.createElement('button')
        updateBtn.classList.add('update')
        updateBtn.dataset.id = this.id
        updateBtn.innerText = 'Update'

        this.element.appendChild(deleteBtn)
        this.element.appendChild(updateBtn)

        this.element.appendChild(upAt)

        
        // add location button
        // locationBtn = document.createElement('button')
        // locationBtn.classList.
        // this.element.appendChild()
        // <button id="new-trip-btn">Add Trip</button>
        return this.element
    }

    attachToDom() {
        this.tripCollection.append(this.fullRender())
        this.addEventListeners()
    }

}