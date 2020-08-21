const tripAdapter = new TripAdapter("http://localhost:3000/trips")

document.addEventListener('DOMContentLoaded', () => {
    tripAdapter.fetchTrips()
    // trip.addEventListener('submit', handleFormSubnmit)
    // tripList.addEventListener('click', handleListClick)
})

// function handleListClick(e) {
//     if (e.target)
// }

function handleFormSubnmit(e) {
    e.preventDefault()

    const location = document.querySelector('#location-name')
    const lat = document.querySelector('#trip-name')
    const lon = document.querySelector('#trip-name')
}

function formToggle() {
    addBtn.addEventListener("click", () => )
}