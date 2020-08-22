const baseUrl = "http://localhost:3000"
const tripAdapter = new TripAdapter(`${baseUrl}/trips`)

document.addEventListener('DOMContentLoaded', () => {
    tripAdapter.fetchTrips()
    // trip.addEventListener('submit', handleFormSubnmit)
    // tripList.addEventListener('click', handleListClick)
    formToggle()
})

// function handleListClick(e) {
//     if (e.target)
// }

function handleFormSubmit(e) {
    e.preventDefault()

    const location = document.querySelector('#location-name')
    const lat = document.querySelector('#location-lat')
    const lon = document.querySelector('#location-lon')
}

function formToggle() {
    const tripFormContainer = document.querySelector('#trip-form')
    const tripBtn = document.querySelector('#new-trip-btn')

    tripBtn.addEventListener("click", () => {
        tripFormContainer.classList.toggle('d-none')
    })
}
