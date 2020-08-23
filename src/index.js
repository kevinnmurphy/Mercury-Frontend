const baseUrl = "http://localhost:3000"
const tripAdapter = new TripAdapter(`${baseUrl}/trips`)
const tripForm = document.querySelector('#trip-form')
// const locationAdapter = new LocationAdapter(`${baseUrl}/locations`)
const locationForm = document.querySelector('#location-form')

document.addEventListener('DOMContentLoaded', () => {
    tripAdapter.fetchTrips()
    tripForm.addEventListener('submit', handleFormSubmit)
    // tripList.addEventListener('click', handleListClick)
    formToggle()
})

// function handleListClick(e) {
//     if (e.target)
// }

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

    // const location = document.querySelector('#location-name')
    // const lat = document.querySelector('#location-lat')
    // const lon = document.querySelector('#location-lon')
}

function formToggle() {
    const tripBtn = document.querySelector('#new-trip-btn')

    tripBtn.addEventListener("click", () => {
        tripForm.classList.toggle('d-none')
    })
}

function handleFormSubmitLocation(e) {
    e.preventDefault()

    const name  = locationForm.querySelector('input[name="name"]').value
    const lat = locationForm.querySelector('input[name="lat"]').value
    const lon = locationForm.querySelector('input[name="lon"]').value
    const trip_id = e.target.parentNode.id

    let formData = {
        name,
        lat,
        lon,
        trip_id
      }

    locationAdapter.createLocation(formData)
    locationForm.reset()

    // const location = document.querySelector('#location-name')
    // const lat = document.querySelector('#location-lat')
    // const lon = document.querySelector('#location-lon')
}

function formToggleLocation() {
    const locationBtn = document.querySelector('#new-location-btn')

    locationBtn.addEventListener("click", () => {
        locationForm.classList.toggle('d-none')
    })
}
