let map;
let service;
let directionsService;
let directionsRenderer;

// let markers = [{lat: 33.70, lng: -84.40}, {lat: 34.70, lng: -84.40}, {lat: 34.00, lng: -84.40}]
let markers = [{lat: 38.90, lng: -77.03}]

function last(array) { 
    return last_element = array[array.length - 1]
}


// calcDifference(Object.values(markers[0]), Object.values(markers[1]))

function initMap(center = markers[0]) {
  const markerArray = []

  const directionsService = new google.maps.DirectionsService()

  const mapSettings = {
    zoom: 9,
    center: center
  }

  const map = new google.maps.Map(document.getElementById("map"), mapSettings)
  let clickCoord

  //get click coordinates
  // google.maps.event.addListener(map, 'click', function(event) {alert(event.latLng)})
  map.addListener('click', (e) => {
    // alert(e.latLng)
    clickCoord = e.latLng.toJSON()
  })
  // google.maps.event.addListener(map, 'click', function(event) {clickCoord = event.latLng})
  map.addListener('click', newLocationCoords)

  //unhide location form
  //set new location values equal to click
  function newLocationCoords(e) {
    if (locationForm.classList.contains('d-none')) {
      locationForm.classList.toggle('d-none')
    }

    let name = `Test-${Math.trunc(Math.random()*1000000)}`
    let lat = clickCoord.lat
    let lon = clickCoord.lng
    //set values
    document.querySelector('#location-name').value = name
    document.querySelector('#location-lat').value = lat
    document.querySelector('#location-lon').value = lon
  }

  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map
  })

  const stepDisplay = new google.maps.InfoWindow(); // Display the route between the initial start and end selections.

  calculateAndDisplayRoute(
    directionsRenderer,
    directionsService,
    markerArray,
    stepDisplay,
    map
  ); // Listen to change events from the start and end lists.

  const onChangeHandler = function() {
    calculateAndDisplayRoute(
      directionsRenderer,
      directionsService,
      markerArray,
      stepDisplay,
      map
    )
  }

  // document.getElementById("sort").addEventListener("click", onChangeHandler);

//   document.getElementById("start").addEventListener("change", onChangeHandler);
//   document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsRenderer, directionsService, markerArray, stepDisplay, map) {
  // Remove existing markers
  for (let i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }
  
  // waypoints: [
  //   {
  //     location: markers[0],
  //     stopover: true
  //   }]
  

  //sort by distance
  let coordinates = [...markers]

  const distance = (coor1, coor2) => {
    const x = coor2.lat - coor1.lat;
    const y = coor2.lng - coor1.lng;
    return Math.sqrt((x*x) + (y*y));
  }

  const sortByDistance = (coordinates, point) => {
    const sorter = (a, b) => distance(a, point) - distance(b, point)
    coordinates.sort(sorter)
  }

  sortByDistance(coordinates, coordinates[0])

  //add waypoints after first and before last
  let newWaypoints = []

  if (coordinates.length > 2) {
    for (let i = 1; i < coordinates.length - 1; i++) {
      let waypoint = {location: coordinates[i], stopover: true}
      newWaypoints.push(waypoint) 
    }
    newWaypoints
  }


  directionsService.route(
    {
    //   origin: document.getElementById("start").value,
    //   destination: document.getElementById("end").value,
      origin: coordinates[0],
      destination: last(coordinates),
      waypoints: newWaypoints,
      travelMode: google.maps.TravelMode.DRIVING
    },
    (result, status) => {
      // Route the directions and pass the response to a function to create
      // markers for each step.
      if (status === "OK") {
        document.getElementById("warnings-panel").innerHTML =
          "<b>" + result.routes[0].warnings + "</b>";
        directionsRenderer.setDirections(result);
        // showSteps(result, markerArray, stepDisplay, map);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  )
}

// function showSteps(directionResult, markerArray, stepDisplay, map) {
//   // For each step, place a marker, and add the text to the marker's infowindow.
//   // Also attach the marker to an array so we can keep track of it and remove it
//   // when calculating new routes.
//   const myRoute = directionResult.routes[0].legs[0];

//   for (let i = 0; i < myRoute.steps.length; i++) {
//     const marker = (markerArray[i] =
//       markerArray[i] || new google.maps.Marker());
//     marker.setMap(map);
//     marker.setPosition(myRoute.steps[i].start_location);
//     attachInstructionText(
//       stepDisplay,
//       marker,
//       myRoute.steps[i].instructions,
//       map
//     );
//   }
// }

// function attachInstructionText(stepDisplay, marker, text, map) {
//   google.maps.event.addListener(marker, "click", () => {
//     // Open an info window when the marker is clicked on, containing the text
//     // of the step.
//     stepDisplay.setContent(text);
//     stepDisplay.open(map, marker);
//   })
// }

//   {
//     origin: 'Cumming, GA',
//     destination: 'Dunwoody, GA',
//     waypoints: [
//       {
//         location: 'Alpharetta, GA',
//         stopover: false
//       },{
//         location: 'Roswell, GA',
//         stopover: true
//       }],
//     provideRouteAlternatives: false,
//     travelMode: 'DRIVING',
//     drivingOptions: {
//       departureTime: new Date(/* now, or future date */),
//       trafficModel: 'pessimistic'
//     },
//     unitSystem: google.maps.UnitSystem.IMPERIAL
//   }