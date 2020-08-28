let map;
let service;
let directionsService;
let directionsRenderer;

// let markers = [{lat: 33.70, lng: -84.40}, {lat: 34.70, lng: -84.40}, {lat: 34.00, lng: -84.40}]
let markers = []

function last(array) { 
    return last_element = array[array.length - 1]
}

function initMap(center = markers[0]) {
  const markerArray = []

  const directionsService = new google.maps.DirectionsService()

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: center
  })

  const directionsRenderer = new google.maps.DirectionsRenderer({
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

  // document.getElementById("sort").addEventListener("change", onChangeHandler);

//   document.getElementById("start").addEventListener("change", onChangeHandler);
//   document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsRenderer, directionsService, markerArray, stepDisplay, map) {
  // Remove existing markers
  for (let i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }
  
  let newWaypoints = []

  if (markers.length > 2) {
    for (let i = 1; i < markers.length; i++) {
      let waypoint = {location: markers[i], stopover: true}
      newWaypoints.push(waypoint) 
    }
    newWaypoints
  }

  // waypoints: [
  //   {
  //     location: markers[0],
  //     stopover: true
  //   }]

  directionsService.route(
    {
    //   origin: document.getElementById("start").value,
    //   destination: document.getElementById("end").value,
      origin: markers[0],
      destination: last(markers),
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