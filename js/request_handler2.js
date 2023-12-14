let serverURL = '';
// let serverURL = 'https://nairrs.com/ferry/';
// let serverURL = 'http://localhost/ferry_booking/';

function getTripData() {
  let tripBox = document.querySelector('.tripBox');
  let userRouteInput = {
    "date": tripBox.querySelector('input[name="date"]').value,
    "from": tripBox.querySelector('select[name="from"]').value,
    "to": tripBox.querySelector('select[name="to"]').value,
    "userName": "Andamanbooking",
    "token": "U2e5gctrduG34vXa8UExu0KkOwutgfKr62uIyv3ZgU="
  };

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(userRouteInput),
    redirect: 'follow'
  };

  fetch(`${serverURL}php/main2.php?getTrip`, requestOptions)
    .then(response => response.json())
    .then(result => createResultCards(result))
    .catch(error => console.log('error', error));
}

// function getTripData() {
//   let tripBox = document.querySelector('.tripBox');
//   let userRouteInput = {
//     "date": tripBox.querySelector('input[name="date"]').value,
//     "from": tripBox.querySelector('select[name="from"]').value,
//     "to": tripBox.querySelector('select[name="to"]').value,
//     "userName": "Andamanbooking",
//     "token": "U2e5gctrduG34vXa8UExu0KkOwutgfKr62uIyv3ZgU="
//   };

// 	postTripData(20-12-2023, 'Swaraj Dweep', 'Port Blair')
// 	.then(result => {
// 		console.log('Result:', result);
// 		// Handle the result as needed
// 	})
// 	.catch(error => {
// 		console.error('Error:', error);
// 		// Handle errors
// 	});
// }

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

let ferrDetails = [
  { ID: '2', name: 'Nutika', img: 'nautika.png', clickFun: "seatSelectionPage(event,'v1')" },
  { ID: '1', name: 'NutikaLite', img: 'nautika-lite.png', clickFun: "seatSelectionPage(event,'v2')" },
  { ID: '3', name: 'Makruzz', img: 'makruzz.jpg', clickFun: "passengerDetails()" }
];

function createResultCards(data) {
  data.data.sort((a, b) => {
    let timeA = a.dTime.hour * 60 + a.dTime.minute;
    let timeB = b.dTime.hour * 60 + b.dTime.minute;
    return timeA - timeB;
  });

  let vessel = [], ferrys = data.data;
  sessionStorage.setItem('nautTripData', JSON.stringify(ferrys));
  let ferryResultTableHead = document.querySelector('.ferryResultTable thead');
  let ferryResultTable = document.querySelector('.ferryResultTable tbody');
  

  function createTableRows() {
    let sNo = 0, windowWidth = window.innerWidth;
    ferryResultTable.innerHTML = '';
    if (windowWidth < 900) {
      ferryResultTableHead.innerHTML = `
        <tr>
          <th>Departure</th>
          <th>Availability</th>
          <th></th>
        </tr>`;
      ferrys.forEach(ferry => {
        ferrDetails.forEach(ferryDetail => {
          if (parseInt(ferryDetail.ID) == ferry.vesselID)
            vessel = ferryDetail;
        });

        let ferryId = ferry.id;
        let tripId = ferry.tripId;
        let vesselId = ferry.vesselID;

        let dTime = (ferry.dTime.hour > 9 ? ferry.dTime.hour : '0' + ferry.dTime.hour) + ":" + (ferry.dTime.minute > 9 ? ferry.dTime.minute : '0' + ferry.dTime.minute);
        let aTime = (ferry.aTime.hour > 9 ? ferry.aTime.hour : '0' + ferry.aTime.hour) + ":" + (ferry.aTime.minute > 9 ? ferry.aTime.minute : '0' + ferry.aTime.minute);

        let departureDate = new Date(`1970-01-01T${dTime}:00`);
        let arrivalDate = new Date(`1970-01-01T${aTime}:00`);
        let timeDifference = arrivalDate - departureDate;
        let dHours = Math.floor(timeDifference / (60 * 60 * 1000));
        let dMinutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
        let duration = (dHours > 9 ? dHours : '0' + dHours) + ":" + (dMinutes > 9 ? dMinutes : '0' + dMinutes);

        let pClassFare = ferry.fares.pBaseFare;
        let pClassSeatAvailable = 0;
        for (let seat in ferry.pClass) {
          if (ferry.pClass[seat].isBooked === 0) {
            pClassSeatAvailable++;
          }
        }

        let bClassFare = ferry.fares.bBaseFare;
        let bClassSeatAvailable = 0;
        for (let seat in ferry.bClass) {
          if (ferry.bClass[seat].isBooked === 0) {
            bClassSeatAvailable++;
          }
        }

        sNo++
        let tableRow = document.createElement('tr');
        tableRow.innerHTML = `
          <td>${vessel.name}<br> ${dTime}</td>
          <td> Royal (${bClassSeatAvailable})<br><span class="base-fare">(₹${bClassFare}.00)</span>
              <hr style="margin:.5rem;"> Luxury (${pClassSeatAvailable})<br><span class="base-fare">(₹${bClassFare}.00)</span>
          </td><!---->
          <td> <div class="btns">
          <input type="hidden" value="${tripId}" >
          <button class="btn" onclick="${vessel.clickFun}" data-ferryId="${ferryId}" data-tripId="${tripId}" data-vesselId="${vesselId}">Book Now</button>
        </div></td>
        `;
        ferryResultTable.appendChild(tableRow);
      });
    } else {
      ferryResultTableHead.innerHTML = `
      <tr>
        <th>Sno</th>
        <th>Vessel</th>
        <th>From</th>
        <th>To</th>
        <th>Depature</th>
        <th>Luxury class<br>(Seat avilable)</th>
        <th>Royal class<br>(Seat avilable)</th>
        <th></th>
      </tr>`;
      ferrys.forEach(ferry => {
        ferrDetails.forEach(ferryDetail => {
          if (parseInt(ferryDetail.ID) == ferry.vesselID)
            vessel = ferryDetail;
        });

        let ferryId = ferry.id;
        let tripId = ferry.tripId;
        let vesselId = ferry.vesselID;

        let dTime = (ferry.dTime.hour > 9 ? ferry.dTime.hour : '0' + ferry.dTime.hour) + ":" + (ferry.dTime.minute > 9 ? ferry.dTime.minute : '0' + ferry.dTime.minute);
        let aTime = (ferry.aTime.hour > 9 ? ferry.aTime.hour : '0' + ferry.aTime.hour) + ":" + (ferry.aTime.minute > 9 ? ferry.aTime.minute : '0' + ferry.aTime.minute);

        let departureDate = new Date(`1970-01-01T${dTime}:00`);
        let arrivalDate = new Date(`1970-01-01T${aTime}:00`);
        let timeDifference = arrivalDate - departureDate;
        let dHours = Math.floor(timeDifference / (60 * 60 * 1000));
        let dMinutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
        let duration = (dHours > 9 ? dHours : '0' + dHours) + ":" + (dMinutes > 9 ? dMinutes : '0' + dMinutes);

        let pClassFare = ferry.fares.pBaseFare;
        let pClassSeatAvailable = 0;
        for (let seat in ferry.pClass) {
          if (ferry.pClass[seat].isBooked === 0) {
            pClassSeatAvailable++;
          }
        }

        let bClassFare = ferry.fares.bBaseFare;
        let bClassSeatAvailable = 0;
        for (let seat in ferry.bClass) {
          if (ferry.bClass[seat].isBooked === 0) {
            bClassSeatAvailable++;
          }
        }

        sNo++
        let tableRow = document.createElement('tr');
        tableRow.innerHTML = `
          <td>${sNo}</td>
          <td>${vessel.name}</td>
          <td>${ferry.from}</td>
          <td>${ferry.to}</td>
          <td>${dTime}</td>
          <td>${bClassSeatAvailable}<br><span>(Fare - ₹${bClassFare}.00)</span></td>
          <td>${pClassSeatAvailable}<br><span>(Fare - ₹${bClassFare}.00)</span></td>
          <td>
            <div class="btns">
              <input type="hidden" value="${tripId}" >
              <button class="btn" onclick="${vessel.clickFun}" data-ferryId="${ferryId}" data-tripId="${tripId}" data-vesselId="${vesselId}">Book Now</button>
            </div>
          </td>
        `;
        ferryResultTable.appendChild(tableRow);
      });
    }

    // ferrys.forEach(ferry => {
    //   ferrDetails.forEach(ferryDetail => {
    //     if (parseInt(ferryDetail.ID) == ferry.vesselID)
    //       vessel = ferryDetail;
    //   });

    //   let ferryId = ferry.id;
    //   let tripId = ferry.tripId;
    //   let vesselId = ferry.vesselID;

    //   let dTime = (ferry.dTime.hour > 9 ? ferry.dTime.hour : '0' + ferry.dTime.hour) + ":" + (ferry.dTime.minute > 9 ? ferry.dTime.minute : '0' + ferry.dTime.minute);
    //   let aTime = (ferry.aTime.hour > 9 ? ferry.aTime.hour : '0' + ferry.aTime.hour) + ":" + (ferry.aTime.minute > 9 ? ferry.aTime.minute : '0' + ferry.aTime.minute);

    //   let departureDate = new Date(`1970-01-01T${dTime}:00`);
    //   let arrivalDate = new Date(`1970-01-01T${aTime}:00`);
    //   let timeDifference = arrivalDate - departureDate;
    //   let dHours = Math.floor(timeDifference / (60 * 60 * 1000));
    //   let dMinutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    //   let duration = (dHours > 9 ? dHours : '0' + dHours) + ":" + (dMinutes > 9 ? dMinutes : '0' + dMinutes);

    //   let pClassFare = ferry.fares.pBaseFare;
    //   let pClassSeatAvailable = 0;
    //   for (let seat in ferry.pClass) {
    //     if (ferry.pClass[seat].isBooked === 0) {
    //       pClassSeatAvailable++;
    //     }
    //   }

    //   let bClassFare = ferry.fares.bBaseFare;
    //   let bClassSeatAvailable = 0;
    //   for (let seat in ferry.bClass) {
    //     if (ferry.bClass[seat].isBooked === 0) {
    //       bClassSeatAvailable++;
    //     }
    //   }

    //   sNo++
    //   let tableRow = document.createElement('tr');
    //   tableRow.innerHTML = `
    //     <td>${sNo}</td>
    //     <td>${vessel.name}</td>
    //     <td>${ferry.from}</td>
    //     <td>${ferry.to}</td>
    //     <td>${dTime}</td>
    //     <td>${bClassSeatAvailable}<br>(Fare - ₹${bClassFare}.00)</td>
    //     <td>${pClassSeatAvailable}<br>(Fare - ₹${pClassFare}.00)</td>
    //     <td>
    //       <div class="btns">
    //         <input type="hidden" value="${tripId}" >
    //         <button class="btn" onclick="${vessel.clickFun}" data-ferryId="${ferryId}" data-tripId="${tripId}" data-vesselId="${vesselId}">Book Now</button>
    //       </div>
    //     </td>
    //   `;
    //   let windowWidth = window.innerWidth;
    //   if(windowWidth > 600){
    //     ferryResultTable.appendChild(tableRow);
    //   }else {}

    // });
  }; createTableRows()

  window.addEventListener('resize', createTableRows);

  document.querySelector(".onlyTtlMainBox").classList.add("dnone");
  document.querySelector(".searchMainBox").classList.add("dnone");
  document.querySelector(".resultMainBox").classList.remove("dnone");
  resultCardSeatClassActive();
}

function seatSelectionPage(event, v) {
  let vURL = `${serverURL}vessel/${v}.html`;
  fetch(vURL)
    .then(response => response.text())
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
  let passengers = [];
  let sNo = 1;

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

  let UD = document.querySelector('.userDetails');
  let userBookingInput = {
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
  };

  console.log(userBookingInput);
  sendToDummyPage(userBookingInput);
  return;

  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify([userBookingInput]),
    redirect: 'follow',
  };

  fetch(`${serverURL}php/main2.php?bookSeats`, requestOptions)
    .then((response) => response.text())
    .then((result) => handleBookingResponse(result))
    .catch((error) => console.log('error', error));
}

function handleBookingResponse(response) {
  console.log(response);
}

document.querySelector('.formBox1 form').addEventListener('submit', function (event) {
  event.preventDefault();
  bookSeats();
});

function sendToDummyPage(userBookingInput) {
  let jsonDataEncoded = encodeURIComponent(JSON.stringify(userBookingInput));
  window.location.href = "index2.php?data=" + jsonDataEncoded;
}

// delete after work
// demoGetTripData();
