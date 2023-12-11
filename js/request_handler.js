let serverURL = '';
// let serverURL = 'https://nairrs.com/ferry/';
// let serverURL = 'http://localhost/ferry_booking/';


function getTripData() {
 
  let tripBox = document.querySelector('.tripBox');
  var userRouteInput = {
    "date": tripBox.querySelector('input[name="date"]').value,
    "from": tripBox.querySelector('select[name="from"]').value,
    "to": tripBox.querySelector('select[name="to"]').value,
    "userName": "Andamanbooking",
    "token": "U2e5gctrduG34vXa8UExu0KkOwutgfKr62uIyv3ZgU="
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json"); // Correcting content type

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(userRouteInput), // Correcting body
    redirect: 'follow'
  };

  fetch(`${serverURL}php/main2.php?getTrip`, requestOptions)
    .then(response => response.json())
    .then(result => createResultCards(result))
    .catch(error => console.log('error', error));
}

function demoGetTripData() {

  fetch(`${serverURL}js/data-ferry2.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      createResultCards(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

var ferrDetails = [
  {ID:'2',name:'Nutika',img:'nautika.png',clickFun:"seatSelectionPage(event,'v1')"},
  {ID:'1',name:'NutikaLite',img:'nautika-lite.png',clickFun:"seatSelectionPage(event,'v2')"},
  {ID:'3',name:'Makruzz',img:'makruzz.jpg',clickFun:"passengerDetails()"}
]

function createResultCards(data) {


// Sorting the "data" array based on the "dTime" field
data.data.sort((a, b) => {
    // Convert "dTime" to total minutes for comparison
    let timeA = a.dTime.hour * 60 + a.dTime.minute;
    let timeB = b.dTime.hour * 60 + b.dTime.minute;

    return timeA - timeB;
});

// Displaying the sorted data
// console.log(JSON.stringify(data, null, 2));
//   console.log(data)

  // ferry data
  let vessel = [], bClass = '', pClass = '', ferrys = data.data;
  sessionStorage.setItem('nautTripData', JSON.stringify(ferrys));
  let ferryResultCards = document.querySelector('.ferryResultCards');
  ferryResultCards.innerHTML = '';

  ferrys.forEach(ferry => {
    ferrDetails.forEach(ferryDetail => {
      if (parseInt(ferryDetail.ID) == ferry.vesselID)
        vessel = ferryDetail;
    });

    // components
    function createClassCard(availableSeats, classTtl, bFare) {
      let seatClassBody = `
        <div class="${classTtl} seatClass " onclick>
        <div class="className">
            ${classTtl}
        </div>
        <div class="seatBox">
            <span class="seat">${availableSeats}</span>
            <br>
            (available seats)
        </div>
        <div class="priceBox">
            <p>Rs. <span class="price">${bFare}</span>/-</p>
        </div>
    </div>
        `; return seatClassBody;
    }

    // trip data
    let ferryId = ferry.id;
    let tripId = ferry.tripId;
    let vesselId = ferry.vesselID;

    // depature arival time
    let dTime = (ferry.dTime.hour > 9 ? ferry.dTime.hour : '0' + ferry.dTime.hour) + ":" + (ferry.dTime.minute > 9 ? ferry.dTime.minute : '0' + ferry.dTime.minute);
    let aTime = (ferry.aTime.hour > 9 ? ferry.aTime.hour : '0' + ferry.aTime.hour) + ":" + (ferry.aTime.minute > 9 ? ferry.aTime.minute : '0' + ferry.aTime.minute);

    // duration
    let departureDate = new Date(`1970-01-01T${dTime}:00`);
    let arrivalDate = new Date(`1970-01-01T${aTime}:00`);
    let timeDifference = arrivalDate - departureDate;
    let dHours = Math.floor(timeDifference / (60 * 60 * 1000));
    let dMinutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    let duration = (dHours > 9 ? dHours : '0' + dHours) + ":" + (dMinutes > 9 ? dMinutes : '0' + dMinutes);

    // seat class avilable
    if (ferry.pClass) {
      let classTtl = 'royal';
      let availableSeats = 0;
      for (var seat in ferry.pClass) {
        if (ferry.pClass[seat].isBooked === 0) {
          availableSeats++;
        }
      }
      let bFare = ferry.fares.pBaseFare;
      pClass = createClassCard(availableSeats, classTtl, bFare);
    }
    if (ferry.bClass) {
      let classTtl = 'luxury';
      let availableSeats = 0;
      for (var seat in ferry.bClass) {
        if (ferry.bClass[seat].isBooked === 0) {
          availableSeats++;
        }
      }
      let bFare = ferry.fares.bBaseFare;
      bClass = createClassCard(availableSeats, classTtl, bFare);
    }

    let div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <div class="cardBody">
      <div class="ferryDetails">
          <div class="imgBox">
              <img src="img/${vessel.img}" alt="ferry">
          </div>
          <p class="ferryName">${vessel.name}</p>
          <div class="includesIcons">
            <i class="fa-solid fa-snowflake"></i>
            <i class="fa-solid fa-mug-hot"></i>
            <i class="fa-solid fa-utensils"></i>
            <i class="fa-solid fa-tv"></i>
            <i class="fa-solid fa-martini-glass"></i>
            <i class="fa-solid fa-kit-medical"></i>
          </div>
      </div>
      <div class="shedule-class">
          <div class="timingBox">
              <div class="fromTime">
                  <p class="time">${dTime}</p>
                  <p class="sector">${ferry.from}</p>
              </div>
              <div class="durationBox">
                  <p class="duration">${duration} hrs</p>
              </div>
              <div class="toTime">
                  <p class="time">${aTime}</p>
                  <p class="sector">${ferry.to}</p>
              </div>
          </div>
          <div class="seatClasses">
            ${pClass}
            ${bClass}
          </div>
          <div class="classDesc dnone">
              <p class="class">
                  <span class="name">luxury :</span>
                  <span class="desc">Located on the lower deck offers front and side sea views.</span>
              </p>
          </div>
      </div>
      <div class="bookBtns">
          <div class="btns">
            <input type="hidden" value="${tripId}" >
              <button class="btn" onclick="${vessel.clickFun}" data-ferryId="${ferryId}" data-tripId="${tripId}" data-vesselId="${vesselId}">Book Now</button>
          </div>
      </div>
  </div>
      `;
    ferryResultCards.appendChild(div);
  });

  document.querySelector(".onlyTtlMainBox").classList.add("dnone");
  document.querySelector(".searchMainBox").classList.add("dnone");
  document.querySelector(".resultMainBox").classList.remove("dnone");
  resultCardSeatClassActive();

};

function seatSelectionPage(event, v) {

  let vURL = `${serverURL}vessel/${v}.html`;
  fetch(vURL)
    .then(response => response.text()) // Parse response as text
    .then(result => {
      document.querySelector(".resultMainBox").classList.add("dnone");
      document.querySelector(".seatSelectionMainBox").classList.remove("dnone");
      document.querySelector(".ferryStructure").innerHTML = result;
      let selectedBtn = event.target;
      varFerryId = selectedBtn.getAttribute('data-ferryId');
      varTripId = selectedBtn.getAttribute('data-tripId');
      varVesselId = selectedBtn.getAttribute('data-vesselId');
      seatNoAllot(varTripId);
    })
    .catch(error => console.log('error', error));

}

function bookSeats() {
  var passengers = []; // Array to store passenger details
  let sNo = 1;
  // Loop through each table row in the passenger details section
  document.querySelectorAll('.userPersonalDetails tbody tr').forEach(function (row) {
    passengers.push({
      id: sNo,
      name: row.querySelector('input[name="name"]').value,
      age: row.querySelector('input[name="age"]').value,
      gender: row.querySelector('select[name="gender"]').value,
      nationality: row.querySelector('select[name="nationality"]').value,
      passport: row.querySelector('input[name="idNumber"]').value,
      "tier": "P",
      "seat": "2A",
      "isCancelled": 0,
    });
    sNo++;
  });

  var UD = document.querySelector('.userDetails');
  var userBookingInput = {
    "bookingData": [
        {
            "bookingTS": 1665920428,
            id: varFerryId,
            tripId: varTripId,
            vesselID: varVesselId,
            from: document.querySelector('.tripBox select[name="from"]').value,
            to: document.querySelector('.tripBox select[name="to"]').value,
            "paxDetail": {
                email: UD.querySelector('input[name="email"]').value,
                phone: UD.querySelector('input[name="phone"]').value,
                gstin: UD.querySelector('input[name="gst"]').value,
                pax: passengers,
                "infantPax": [
                    {
                        "id": 1,
                        "name": "inf a",
                        "dobTS": 1661970600,
                        "dob": "2022-09-01",
                        "gender": "M",
                        "nationality": "India",
                        "passport": "",
                        "isCancelled": 0
                    }
                ],
                "bClassSeats": varBClassSeats,
                "pClassSeats": varPClassSeats
            },
            "userData": {
                "apiUser": {
                    "userName": "agent",
                    "agency": "",
                    "token": "U2FsdGVkX18+ji7DedFzFnkTxo/aFlcWsvmp03XU5bgJ5XE9r1/DCIKHCabpP24hxlAB0F2kFnOYvu9FZaJiNA==",
                    "walletBalance": 0
                }
            },
            "paymentData": {
                "gstin": ""
            }
        }
    ],
    "userName": "agent",
    "token": "U2FsdGVkX18+ji7DedFzFnkTxo/aFlcWsvmp03XU5bgJ5XE9r1/DCIKHCabpP24hxlAB0F2kFnOYvu9FZaJiNA=="
}

  console.log(userBookingInput);
  sendToDummyPage(userBookingInput);
  return;

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json'); // Correcting content type

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify([userBookingInput]), // Pass the array of bookings
    redirect: 'follow',
  };

  fetch(`${serverURL}php/main2.php?bookSeats`, requestOptions)
    .then((response) => response.text())
    .then((result) => handleBookingResponse(result))
    .catch((error) => console.log('error', error));
}

function handleBookingResponse(response) {
  // Handle the booking response as needed
  console.log(response);
}

// function when the form is submitted
document.querySelector('.formBox1 form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  bookSeats(); //bookSeats function to send the booking request
});

function sendToDummyPage(userBookingInput){
  var jsonDataEncoded = encodeURIComponent(JSON.stringify(userBookingInput));

  // Redirect to index2.php with the encoded JSON data as a query parameter
  window.location.href = "index2.php?data=" + jsonDataEncoded;
}

// delete after work
// demoGetTripData();
