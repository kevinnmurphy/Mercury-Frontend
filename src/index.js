// const baseUrl = "http://localhost:3000"
const baseUrl = 'https://glacial-inlet-02901.herokuapp.com';
const tripAdapter = new TripAdapter();
const locationAdapter = new LocationAdapter();
const tripForm = document.querySelector('#trip-form');
const locationForm = document.querySelector('#location-form');
const sortBtn = document.querySelector('#sort-trip-btn');

document.addEventListener('DOMContentLoaded', () => {
  tripAdapter.fetchTrips();
  locationAdapter.fetchLocations();
  tripForm.addEventListener('submit', handleFormSubmit);
  locationForm.addEventListener('submit', handleFormSubmitLocation);
  sortBtn.addEventListener('click', Trip.sortTrips);
  formToggle();
  formToggleLocation();
});

function handleFormSubmit(e) {
  e.preventDefault();

  const name = tripForm.querySelector('input[name="name"]').value;
  const description = tripForm.querySelector('input[name="description"]').value;

  let formData = {
    name,
    description,
  };

  tripAdapter.createTrip(formData);
  tripForm.reset();
}

function formToggle() {
  const tripBtn = document.querySelector('#new-trip-btn');

  tripBtn.addEventListener('click', () => {
    tripForm.classList.toggle('d-none');
  });
}

function handleFormSubmitLocation(e) {
  e.preventDefault();

  const name = document.querySelector('#location-name').value;
  const lat = document.querySelector('#location-lat').value;
  const lon = document.querySelector('#location-lon').value;

  const trip_id = `${Trip.selected.id}`;

  let formData = {
    name,
    lat,
    lon,
    trip_id,
  };

  locationAdapter.createLocation(formData);

  locationForm.reset();
}

function formToggleLocation() {
  const locationBtn = document.querySelector('#new-location-btn');
  locationBtn.toggleAttribute('disabled');

  locationBtn.addEventListener('click', () => {
    locationForm.classList.toggle('d-none');
  });
}
