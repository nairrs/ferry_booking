// important variables
let varFerryId = '';
let varTripId = '';
let varVesselId = '';
let varBClassSeats = [];
let varPClassSeats = [];
let varSeatClass = '';
let varTotalSeatSelected = false;
let varTotalSeat = 1;
let totalClickedSeats = 0;

// search format as per screen
function searchFormateAsScreen() {
  let opjopi = document.querySelector('.searchMainBox .mainBoxBody');
  let windowWidth = window.innerWidth;
  if (windowWidth > 950) {
    opjopi.innerHTML = `
    <div class="formBox1">
    <div class="onlyLabel">
        <div class="group ">
            <label for="">Date</label>
        </div>
        <div class="group">
            <label for="">From</label>
        </div>
        <div class="group">
            <label for="">To</label>
        </div>
        <div class="group small">
            <label for="">Adult</label>
        </div>
        <div class="group small">
            <label for="">Infant</label>
        </div>
        <div class="btns">
        </div>
    </div>
    <div class="tripBox" id="tripBox">
        <div class="trip">
            <div class="group">
                <!-- <label for="">From</label> -->
                <select name="from" id="" onchange="sectorSelection(this)">
                    <option value="Port Blair">Port Blair</option>
                    <option value="Swaraj Dweep" >Havelock Island</option>
                    <option value="Shaheed Dweep">Neil Island</option>
                </select>
            </div>
            <div class="group toSelect">
                <!-- <label for="">To</label> -->
                <select name="to" id="">
                    <option value="Port Blair" disabled>Port Blair</option>
                    <option value="Swaraj Dweep" >Havelock Island</option>
                    <option value="Shaheed Dweep">Neil Island</option>
                </select>
            </div>
            <div class="group ">
                <!-- <label for="">Date</label> -->
                <input type="date" name="date" required>
            </div>
            <div class="group small">
                <!-- <label for="">Adult</label> -->
                <input type="number" name="adult" value="1" min="1" required>
            </div>
            <div class="group small">
                <!-- <label for="">Infant</label> -->
                <input type="number" name="infant">
            </div>
            <div class="btns" style="opacity: 0;">
                <span class="btn icon tripsAddBtn" onclick="toggleTrip(this)" style="pointer-events:none;cursor:none;">+</span>
            </div>
        </div>
    </div>
    <div class="btns mt-2">
        <button class="btn" id="getTripDataBtn">Search</button>
    </div>
</div>
      `;
  } else {
    opjopi.innerHTML = `
    <div class="formBox1 mobScreen">
    <div class="tripBox" id="tripBox">
        <div class="trip">
            <div class="group small">
                <label for="">From</label>
                <select name="from" id="" onchange="sectorSelection(this)">
                    <option value="Port Blair">Port Blair</option>
                    <option value="Swaraj Dweep" >Havelock Island</option>
                    <option value="Shaheed Dweep">Neil Island</option>
                </select>
            </div>
            <div class="group toSelect small">
                <label for="">To</label>
                <select name="to" id="">
                    <option value="Port Blair" disabled>Port Blair</option>
                    <option value="Swaraj Dweep" >Havelock Island</option>
                    <option value="Shaheed Dweep">Neil Island</option>
                </select>
            </div>
            <div class="group block">
                <label for="">Date</label>
                <input type="date" name="date" required>
            </div>
            <div class="group small">
                <label for="">Adult</label>
                <input type="number" name="adult" value="1" min="1" required>
            </div>
            <div class="group small">
                <label for="">Infant</label>
                <input type="number" name="infant">
            </div>
        </div>
    </div>
    <div class="btns mt-2">
        <button class="btn" id="getTripDataBtn">Search</button>
    </div>
</div>
    `;
  }

}; searchFormateAsScreen();
window.addEventListener('resize', searchFormateAsScreen)


// single multi trip toggle
function toggleTrip(btn) {
  let tripBox = document.querySelector(".tripBox");
  let trips = tripBox.querySelectorAll(".trip");
  codesandbox - cli
  // If there is only one tripBox, add two more
  if (trips.length === 1) {
    let newTripBox1 = trips[0].cloneNode(true);
    let newTripBox2 = trips[0].cloneNode(true);
    tripBox.appendChild(newTripBox1);
    tripBox.appendChild(newTripBox2);

    btn.innerText = "^";

    // Replace the button function with deleteTrip for the remaining tripBoxes
    let trips2 = tripBox.querySelectorAll(".trip");
    for (let i = 1; i < trips2.length; i++) {
      let btn = trips2[i].querySelector(".tripsAddBtn");
      btn.innerHTML = "X";
      btn.setAttribute("onclick", "deleteTrip(this)");
    }
  } else {
    // If there are more than one tripBoxes, remove all except the first one
    for (let i = trips.length - 1; i > 0; i--) {
      tripBox.removeChild(trips[i]);
    }
    btn.innerText = "v";
  }
}

function deleteTrip(btn) {
  let tripBox = document.querySelector(".tripBox");
  let btnp = btn.parentElement;
  let btnpp = btnp.parentElement;
  tripBox.removeChild(btnpp);
}

function sectorSelection(selectElement) {
  var selectedValue = selectElement.value;
  var parent = selectElement.parentNode.parentNode;
  var toSelect = parent.querySelector(".group.toSelect select");
  let options = toSelect.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === selectedValue) {
      options[i].disabled = true;
      options[i].selected = false;
    } else {
      options[i].disabled = false;
    }
    console.log("okk");
  }
}

function replan() {
  varBClassSeats = [];
  varPClassSeats = [];
  varSeatClass = '';
  varTotalSeatSelected = false;
  totalClickedSeats = 0;
  // varTotalSeat = 1;
  document.querySelector(".onlyTtlMainBox").classList.remove("dnone");
  document.querySelector(".searchMainBox").classList.remove("dnone");
  document.querySelector(".resultMainBox").classList.add("dnone");
  document.querySelector(".seatSelectionMainBox").classList.add("dnone");
  document.querySelector(".userDetailsMainBox").classList.add("dnone");
}

function resultCardSeatClassActive() {
  let cardBox = document.querySelector(".ferryResultCards");
  let seatClasses = cardBox.querySelectorAll(".seatClass");

  seatClasses.forEach((seatClass, index) => {
    seatClass.addEventListener("click", () => {
      seatClasses.forEach((seatClass1) => {
        seatClass1.classList.remove("active");
      });
      seatClass.classList.add("active");
      let seatClassSelected = seatClass.classList;
      varSeatClass = seatClassSelected[0];

      // Determine the index of the selected seatClass1 element
      let selectedSeatIndex = Array.from(seatClasses).indexOf(seatClass);
      selectedSeatIndex = (selectedSeatIndex + 1) / 2;
    });
  });
}

// seat selction
function seatClicked() {
  varTotalSeat = document.querySelector('.tripBox input[name="adult"]').value
  varTotalSeat = parseInt(varTotalSeat == '' ? 0 : varTotalSeat);

  let seats = document.querySelectorAll(".ferryStructure .seat");
  seats.forEach((seat) => {
    seat.addEventListener("click", () => {
      if (seat.classList.contains('selected')) {
        seat.classList.remove("selected");
        totalClickedSeats--;
        varTotalSeatSelected = false;
        if (seat.classList.contains('royal')) {
          let seatPlace = varBClassSeats.indexOf(seat.getAttribute('data-sn'))
          varBClassSeats.splice(seatPlace, (seatPlace + 1));
        } else if (seat.classList.contains('luxury')) {
          let seatPlace = varPClassSeats.indexOf(seat.getAttribute('data-sn'))
          varPClassSeats.splice(seatPlace, (seatPlace + 1));
        }
      } else {
        if (varTotalSeat <= totalClickedSeats) {
          alert(`You already selected ${varTotalSeat} seats.`);
          return;
        } else {
          seat.classList.add("selected");
          totalClickedSeats++;
          if (varTotalSeat == totalClickedSeats) {
            varTotalSeatSelected = true;
          };
          if (seat.classList.contains('royal')) {
            varBClassSeats.push(seat.getAttribute('data-sn'))
          } else if (seat.classList.contains('luxury')) {
            varPClassSeats.push(seat.getAttribute('data-sn'))
          }
        }
      };
      console.log(varBClassSeats)
      console.log(varPClassSeats)
    });
  });
}

function seatNoAllot(tripID) {
  const jsonStringFromStorage = sessionStorage.getItem('nautTripData');
  let ferrys = JSON.parse(jsonStringFromStorage);
  let currentFerry;

  ferrys.forEach(ferry => {
    let ferryID = ferry.tripId;
    if (ferryID == tripID) {
      currentFerry = ferry;
    }
  });

  let bClass = currentFerry.bClass;
  let pClass = currentFerry.pClass;

  let seats = document.querySelectorAll('.ferryStructure .seat');
  seats.forEach(seat => {
    let sd = seat.getAttribute('data-sn');
    if (sd) {
      sd = sd.toLocaleUpperCase();
      seat.innerHTML = sd;

      // Check if the seat is booked in bClass
      if (bClass[sd] && bClass[sd].isBooked === 1) {
        seat.classList.add('booked');
      }

      // Check if the seat is booked in pClass
      if (pClass[sd] && pClass[sd].isBooked === 1) {
        seat.classList.add('booked');
      }
    }
  });
  seatClicked();
  onlySeatClass();
}

function onlySeatClass() {
  if (varSeatClass == '') { return; }
  else {
    varSeatClass = varSeatClass.toLowerCase()
    let structureBox = document.querySelectorAll('.ferryStructure .structureBox');
    structureBox.forEach(seatClass => {
      if (seatClass.classList.contains(varSeatClass)) {
        seatClass.classList.remove('dnone');
      } else { seatClass.classList.add('dnone'); }
    });
  }
}

function passengerDetailTableCreate(totalSeat) {
  let selectedFerry = 'nautika';
  let userPersonalDetails = document.querySelector('.userPersonalDetails');
  let tBody = userPersonalDetails.querySelector('tbody');
  let tHead = userPersonalDetails.querySelector('thead');
  tBody.innerHTML = '';
  tHead.innerHTML = '';

  let windowWidth = window.innerWidth;
  if (windowWidth > 950) {

    if (selectedFerry == 'nautika') {
      tHead.innerHTML = `<tr>
                          <th>Sno</th>
                          <th>Seat</th>
                          <th>Passenger Name</th>
                          <th>Gender</th>
                          <th>Age</th>
                          <th>Nationality</th>
                          <th>ID Number</th>
                        </tr>
    `;

      // merging both seat class
      function mergeAndAddPrefix(b, p) {
        function capitalizeSeat(seat) {
          var parts = seat.match(/^(\d+)([a-zA-Z])$/);
          if (parts) {
            var digitPart = parts[1];
            var letterPart = parts[2].toUpperCase();
            return digitPart + letterPart;
          } else {
            // Handle invalid seat format if needed
            return seat;
          }
        }
      
        var bSeats = b.map(seat => 'Royal - ' + capitalizeSeat(seat));
        var pSeats = p.map(seat => 'Luxury - ' + capitalizeSeat(seat));
        var mergedSeats = bSeats.concat(pSeats);
        return mergedSeats;
      };
      
      var resultArray = mergeAndAddPrefix(varBClassSeats, varPClassSeats);
      console.log(resultArray);

      for (let i = 0; i < totalSeat; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${resultArray[i]}</td>
      <!-- <td>
          <select name="title" id="">
              <option value="MR">MR</option>
              <option value="MRS">MRS</option>
              <option value="Miss">Miss</option>
              <option value="Master">Master</option>
              <option value="DR">DR</option>
          </select>
      </td> -->
      <td><input type="text" name="name" placeholder="Name"></td>
      <td>
          <select name="gender" id="">
              <option value="Male">Male</option>
              <option value="Female">Femail</option>
          </select>
      </td>
      <td style="width:90px;"><input type="number" name="age" placeholder="Age"></td>
      <td>
          <select name="nationality" id="" onchange="nationality(value)">
              <option value="India">India</option>
              <option value="China">China</option>
          </select>
      </td>
      <td><input type="text" name="idNumber" placeholder="ID Number" class="idNumber"></td>
      `
        tBody.appendChild(tr);
      }
    } else {
      for (let i = 0; i < totalSeat; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${i + 1}</td>
      <td>
          <select name="title" id="">
              <option value="MR">MR</option>
              <option value="MRS">MRS</option>
              <option value="Miss">Miss</option>
              <option value="Master">Master</option>
              <option value="DR">DR</option>
          </select>
      </td>
      <td><input type="text" name="name" placeholder="Name"></td>
      <td>
          <select name="gender" id="">
              <option value="Male">Male</option>
              <option value="Female">Femail</option>
          </select>
      </td>
      <td style="width:70px"><input type="number" name="age" placeholder="Age"></td>
      <td>
          <select name="nationality" id="" onchange="nationality(value)">
              <option value="India">India</option>
              <option value="China">China</option>
          </select>
      </td>
      <td><input type="text" name="idNumber" placeholder="ID Number" class="idNumber"></td>
      `
        tBody.appendChild(tr);
      }
    }
  } else {
    if (selectedFerry == 'nautika') {
      tHead.innerHTML = `<tr>
                            <th>Seat</th>
                            <th>Details</th>
                          </tr>
      `;

      // merging both seat class
      function mergeAndAddPrefix(b, p) {
        function capitalizeSeat(seat) {
          var parts = seat.match(/^(\d+)([a-zA-Z])$/);
          if (parts) {
            var digitPart = parts[1];
            var letterPart = parts[2].toUpperCase();
            return digitPart + letterPart;
          } else {
            // Handle invalid seat format if needed
            return seat;
          }
        }
      
        var bSeats = b.map(seat => 'Royal - ' + capitalizeSeat(seat));
        var pSeats = p.map(seat => 'Luxury - ' + capitalizeSeat(seat));
        var mergedSeats = bSeats.concat(pSeats);
        return mergedSeats;
      }
      
      var resultArray = mergeAndAddPrefix(varBClassSeats, varPClassSeats);
      console.log(resultArray);
      

      for (let i = 0; i < totalSeat; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${resultArray[i]}</td>
        <td>
            <div class="formBox1">
              <div class="inner">
                <div class="group">
                  <input type="text" name="name" placeholder="Name">
                </div>
                <div class="group small">
                  <select name="gender" id="">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div class="group small">
                  <input type="number" name="age" placeholder="Age">
                </div>
                <div class="group">
                  <select name="nationality" id="" onchange="nationality(value)">
                    <option value="India">India</option>
                    <option value="China">China</option>
                  </select>
                </div>
                <div class="group">
                  <input type="text" name="idNumber" placeholder="ID Number" class="idNumber">
                </div>
              </div>
            </div>
        </td>
        `;
        tBody.appendChild(tr);
      }
    } else {
      for (let i = 0; i < totalSeat; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${i + 1}</td>
        <td>
            <select name="title" id="">
                <option value="MR">MR</option>
                <option value="MRS">MRS</option>
                <option value="Miss">Miss</option>
                <option value="Master">Master</option>
                <option value="DR">DR</option>
            </select>
        </td>
        <td><input type="text" name="name" placeholder="Name"></td>
        <td>
            <select name="gender" id="">
                <option value="Male">Male</option>
                <option value="Femail">Femail</option>
            </select>
        </td>
        <td style="width:70px"><input type="number" name="age" placeholder="Age"></td>
        <td>
            <select name="nationality" id="" onchange="nationality(value)">
                <option value="India">India</option>
                <option value="China">China</option>
            </select>
        </td>
        <td><input type="text" name="idNumber" placeholder="ID Number" class="idNumber"></td>
        `
        tBody.appendChild(tr);
      }
    }
  }

};
window.addEventListener('resize', passengerDetailTableCreate(varTotalSeat))

function passengerDetailsPage() {

  if (!varTotalSeatSelected) { alert(`You Didn't selected ${document.querySelector('.tripBox input[name="adult"]').value} seats.`); return; }
  document.querySelector(".seatSelectionMainBox").classList.add("dnone");
  document.querySelector(".userDetailsMainBox").classList.remove("dnone");

  let TS = document.querySelector('input[name="adult"]').value;
  let totalSeat = parseInt(TS == '' ? 0 : TS);
  passengerDetailTableCreate(totalSeat)
}

function autoDateSet() {
  let date = new Date();
  let CM = date.getMonth() + 1; // Months are zero-based, so add 1
  let CD = date.getDate();
  let FM = CM > 9 ? CM : '0' + CM;
  let FD = CD > 9 ? CD : '0' + CD;
  let cDateString = date.getFullYear() + '-' + FM + '-' + FD;
  document.querySelector('.tripBox input[name="date"]').value = cDateString;
} autoDateSet();
