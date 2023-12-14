import wixWindow from 'wix-window';

let varFerryId = '';
let varTripId = '';
let varVesselId = '';
let varBClassSeats = [];
let varPClassSeats = [];
let varSeatClass = '';
let varTotalSeatSelected = false;
let varTotalSeat = 1;
let totalClickedSeats = 0;


$w.onReady(function () {
  searchFormatAsScreen();
  $w.onResize(() => {
    searchFormatAsScreen();
    passengerDetailTableCreate(varTotalSeat);
  });

  seatClicked();
  resultCardSeatClassActive();
  autoDateSet();
});

function searchFormatAsScreen() {
  const opjopi = $w('.searchMainBox .mainBoxBody');
  const windowWidth = wixWindow.formFactor === 'Desktop' ? 950 : 0;

  if (wixWindow.formFactor === 'Desktop') {
    opjopi.html(`
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
        <div class="tripBox">
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
            <button class="btn" type="submit" onclick="demoGetTripData()">Search</button>
        </div>
    </div>
          `);
  } else {
    opjopi.html(`
        <div class="formBox1 mobScreen">
        <div class="tripBox">
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
            <button class="btn" type="submit" onclick="demoGetTripData()">Search</button>
        </div>
    </div>
        `);
  }
}

function toggleTrip(btn) {
  let tripBox = $w(".tripBox");
  let trips = tripBox.children(".trip");

  if (trips.length === 1) {
    let newTripBox1 = trips[0].clone();
    let newTripBox2 = trips[0].clone();
    tripBox.insert(newTripBox1);
    tripBox.insert(newTripBox2);

    btn.label = "^";

    let trips2 = tripBox.children(".trip");
    for (let i = 1; i < trips2.length; i++) {
      let btn = trips2[i].children(".tripsAddBtn");
      btn.label = "X";
      btn.onClick(() => deleteTrip(btn));
    }
  } else {
    for (let i = trips.length - 1; i > 0; i--) {
      tripBox.remove(trips[i]);
    }
    btn.label = "v";
  }
}

function deleteTrip(btn) {
  let tripBox = $w(".tripBox");
  let btnp = btn.parent;
  let btnpp = btnp.parent;
  tripBox.remove(btnpp);
}

function sectorSelection(selectElement) {
  var selectedValue = selectElement.value;
  var parent = selectElement.parent.parent;
  var toSelect = parent.children(".group.toSelect").children("select");
  let options = toSelect.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === selectedValue) {
      options[i].disable();
      options[i].selected = false;
    } else {
      options[i].enable();
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
  $w(".onlyTtlMainBox").hide();
  $w(".searchMainBox").hide();
  $w(".resultMainBox").show();
  $w(".seatSelectionMainBox").show();
  $w(".userDetailsMainBox").hide();
}

function resultCardSeatClassActive() {
  let cardBox = $w(".ferryResultCards");
  let seatClasses = cardBox.children(".seatClass");

  seatClasses.forEach((seatClass, index) => {
    seatClass.onClick(() => {
      seatClasses.forEach((seatClass1) => {
        seatClass1.removeClass("active");
      });
      seatClass.addClass("active");
      let seatClassSelected = seatClass.className;
      varSeatClass = seatClassSelected;

      // Determine the index of the selected seatClass1 element
      let selectedSeatIndex = seatClasses.indexOf(seatClass);
      selectedSeatIndex = (selectedSeatIndex + 1) / 2;
    });
  });
}

function seatClicked() {
  varTotalSeat = $w('.tripBox input[name="adult"]').value;
  varTotalSeat = parseInt(varTotalSeat === '' ? 0 : varTotalSeat);

  let seats = $w(".ferryStructure .seat");
  seats.forEach((seat) => {
    seat.onClick(() => {
      if (seat.hasClass('selected')) {
        seat.removeClass("selected");
        totalClickedSeats--;
        varTotalSeatSelected = false;
        if (seat.hasClass('royal')) {
          let seatPlace = varBClassSeats.indexOf(seat.dataset.sn);
          varBClassSeats.splice(seatPlace, 1);
        } else if (seat.hasClass('luxury')) {
          let seatPlace = varPClassSeats.indexOf(seat.dataset.sn);
          varPClassSeats.splice(seatPlace, 1);
        }
      } else {
        if (varTotalSeat <= totalClickedSeats) {
          alert(`You already selected ${varTotalSeat} seats.`);
          return;
        } else {
          seat.addClass("selected");
          totalClickedSeats++;
          if (varTotalSeat == totalClickedSeats) {
            varTotalSeatSelected = true;
          };
          if (seat.hasClass('royal')) {
            varBClassSeats.push(seat.dataset.sn);
          } else if (seat.hasClass('luxury')) {
            varPClassSeats.push(seat.dataset.sn);
          }
        }
      };
      console.log(varBClassSeats);
      console.log(varPClassSeats);
    });
  });
}

function seatNoAllot(tripID) {
  // Same as before
}

function onlySeatClass() {
  if (varSeatClass === '') { return; }
  else {
    varSeatClass = varSeatClass.toLowerCase();
    let structureBox = $w(".ferryStructure .structureBox");
    structureBox.forEach(seatClass => {
      if (seatClass.hasClass(varSeatClass)) {
        seatClass.removeClass('dnone');
      } else { seatClass.addClass('dnone'); }
    });
  }
}

function passengerDetailTableCreate(totalSeat) {
  let selectedFerry = 'nautika';
  let userPersonalDetails = $w('.userPersonalDetails');
  let tBody = userPersonalDetails.children('tbody');
  let tHead = userPersonalDetails.children('thead');
  tBody.html('');
  tHead.html('');

  let windowWidth = $w(window).width;

  if (windowWidth > 950) {
    if (selectedFerry == 'nautika') {
      tHead.html(`
            <tr>
              <th>Sno</th>
              <th>Seat</th>
              <th>Passenger Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Nationality</th>
              <th>ID Number</th>
            </tr>
          `);

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

      for (let i = 0; i < totalSeat; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
                  <td>${i + 1}</td>
                  <td>${resultArray[i]}</td>
                  <td><input type="text" name="name" placeholder="Name"></td>
                  <td>
                      <select name="gender">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                      </select>
                  </td>
                  <td style="width:90px;"><input type="number" name="age" placeholder="Age"></td>
                  <td>
                      <select name="nationality" onchange="nationality(value)">
                          <option value="India">India</option>
                          <option value="China">China</option>
                      </select>
                  </td>
                  <td><input type="text" name="idNumber" placeholder="ID Number" class="idNumber"></td>
              `;
        tBody.appendChild(tr);
      }
    } else {
      for (let i = 0; i < totalSeat; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
                  <td>${i + 1}</td>
                  <td>
                      <select name="title">
                          <option value="MR">MR</option>
                          <option value="MRS">MRS</option>
                          <option value="Miss">Miss</option>
                          <option value="Master">Master</option>
                          <option value="DR">DR</option>
                      </select>
                  </td>
                  <td><input type="text" name="name" placeholder="Name"></td>
                  <td>
                      <select name="gender">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                      </select>
                  </td>
                  <td style="width:70px;"><input type="number" name="age" placeholder="Age"></td>
                  <td>
                      <select name="nationality" onchange="nationality(value)">
                          <option value="India">India</option>
                          <option value="China">China</option>
                      </select>
                  </td>
                  <td><input type="text" name="idNumber" placeholder="ID Number" class="idNumber"></td>
              `;
        tBody.appendChild(tr);
      }
    }
  } else {
    if (selectedFerry == 'nautika') {
      tHead.html(`
              <tr>
                  <th>Seat</th>
                  <th>Details</th>
              </tr>
          `);

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
                                  <select name="gender">
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                  </select>
                              </div>
                              <div class="group small">
                                  <input type="number" name="age" placeholder="Age">
                              </div>
                              <div class="group">
                                  <select name="nationality" onchange="nationality(value)">
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
                      <select name="title">
                          <option value="MR">MR</option>
                          <option value="MRS">MRS</option>
                          <option value="Miss">Miss</option>
                          <option value="Master">Master</option>
                          <option value="DR">DR</option>
                      </select>
                  </td>
                  <td><input type="text" name="name" placeholder="Name"></td>
                  <td>
                      <select name="gender">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                      </select>
                  </td>
                  <td style="width:70px;"><input type="number" name="age" placeholder="Age"></td>
                  <td>
                      <select name="nationality" onchange="nationality(value)">
                          <option value="India">India</option>
                          <option value="China">China</option>
                      </select>
                  </td>
                  <td><input type="text" name="idNumber" placeholder="ID Number" class="idNumber"></td>
              `;
        tBody.appendChild(tr);
      }
    }
  }
}


function passengerDetailsPage() {
  if (!varTotalSeatSelected) {
    alert(`You didn't select ${$w('.tripBox input[name="adult"]').value} seats.`);
    return;
  }
  $w('.seatSelectionMainBox').hide();
  $w('.userDetailsMainBox').show();

  let TS = $w('input[name="adult"]').value;
  let totalSeat = parseInt(TS === '' ? 0 : TS);
  passengerDetailTableCreate(totalSeat);
}


function autoDateSet() {
  let date = new Date();
  let CM = date.getMonth() + 1;
  let CD = date.getDate();
  let FM = CM > 9 ? CM : '0' + CM;
  let FD = CD > 9 ? CD : '0' + CD;
  let cDateString = date.getFullYear() + '-' + FM + '-' + FD;
  $w('.tripBox input[name="date"]').value = cDateString;
}
