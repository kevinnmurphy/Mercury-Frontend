const baseUrl = "http://localhost:3000"
const tripAdapter = new TripAdapter(`${baseUrl}/trips`)
const tripForm = document.querySelector('#trip-form')

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
    //   debugger
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
