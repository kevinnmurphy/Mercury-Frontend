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

        this.deleteBtn = document.createElement('button')


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
        const upAt = document.createElement('p')
        upAt.innerText = this.updated_at
        upAt.classList.add('updated_at')

        this.element.appendChild(title)
        this.element.appendChild(desc)
        this.element.appendChild(upAt)

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.dataset.id = this.id
        deleteBtn.innerText = 'Delete'
        const updateBtn = document.createElement('button')
        updateBtn.classList.add('update')
        updateBtn.dataset.id = this.id
        updateBtn.innerText = 'Update'
        
        deleteBtn.addEventListener('click', deleteTrip(id))
        updateBtn.addEventListener('click', patchTrip(id))

        this.element.appendChild(deleteBtn)
        this.element.appendChild(updateBtn)

        // this.createDeleteButton(this)

        
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

    addEventListeners() {
        // this.element.addEventListeners('click', this.displayLocations
    }
}