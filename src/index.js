const baseUrl = "http://localhost:3000"
const tripAdapter = new TripAdapter
const locationAdapter = new LocationAdapter
const tripForm = document.querySelector('#trip-form')
const locationForm = document.querySelector('#location-form')

document.addEventListener('DOMContentLoaded', () => {
    tripAdapter.fetchTrips()
    locationAdapter.fetchLocations()
    tripForm.addEventListener('submit', handleFormSubmit)
    // tripForm.addEventListener('submit', new Trip.handleFormSubmit)
    locationForm.addEventListener('submit', handleFormSubmitLocation)
    formToggle()
    formToggleLocation()
})

function handleFormSubmit(e) {
    e.preventDefault()

    const name  = tripForm.querySelector('input[name="name"]').value
    const description = tripForm.querySelector('input[name="description"]').value

    let formData = {
        name,
        description
    }

    tripAdapter.createTrip(formData)
    tripForm.reset()
}

function formToggle() {
    const tripBtn = document.querySelector('#new-trip-btn')

    tripBtn.addEventListener("click", () => {
        tripForm.classList.toggle('d-none')
    })
}

function handleFormSubmitLocation(e) {
    e.preventDefault()
    debugger
    const name  = locationForm.querySelector('input[name="name"]').value
    const lat = locationForm.querySelector('input[name="lat"]').value
    const lon = locationForm.querySelector('input[name="lon"]').value
    const trip_id = locationForm.querySelector('input[name="trip_id"]').value
    // const trip_id = e.target.parentNode.id

    debugger
    //need a good way to tie the trip_id to the selected trip

    let formData = {
        name,
        lat,
        lon,
        trip_id
      }

    // debugger

    locationAdapter.createLocation(formData)
    locationForm.reset()

    // const location = document.querySelector('#location-name')
    // const lat = document.querySelector('#location-lat')
    // const lon = document.querySelector('#location-lon')
}

function formToggleLocation() {
    const locationBtn = document.querySelector('#new-location-btn')
    locationBtn.toggleAttribute('disabled')

    locationBtn.addEventListener("click", () => {
        locationForm.classList.toggle('d-none')
    })
}
