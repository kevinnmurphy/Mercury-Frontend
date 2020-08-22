class Trip {
    static all = []

    constructor({name}){
        this.name = name;

        this.element = document.createElement('div')
        // this.element.id = `trip-${id}`
        this.tripCollection = document.querySelector('#trip-collection')

        Trip.all.push(this)
    }

    fullRender() {
        this.element.innerHTML = `<h3>${this.name}</h3>`
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