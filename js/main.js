
// single multi trip toggle
function toggleTrip(btn) {
  let tripBox = document.querySelector(".tripBox");
  let trips = tripBox.querySelectorAll(".trip");
codesandbox-cli
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
  // document.querySelector(".resultMainBox").classList.add("dnone");
  // document.querySelector(".searchMainBox").classList.remove("dnone");
}

function resultCardSeatClassActive() {
  let cardBox = document.querySelector(".ferryResultCards");
  let cards = cardBox.querySelectorAll(".card");
  cards.forEach((card) => {
    let seatClasses = card.querySelectorAll(".seatClass");
    seatClasses.forEach((seatClass) => {
      seatClass.addEventListener("click", () => {
        seatClasses.forEach((seatClass1) => {
          seatClass1.classList.remove("active");
        });
        seatClass.classList.add("active");
      });
    });
  });
}

function seatSelection() {
  // document.querySelector(".resultMainBox").classList.add("dnone");
  // document.querySelector(".seatSelectionMainBox").classList.remove("dnone");
  seatClicked(2);
  seatNoAllot();
}
let totalNoOfSeats = 0;
function seatClicked(totalSeat) {
  let TS = totalSeat;
  let seats = document.querySelectorAll(".seats .seat");

  seats.forEach((seat) => {
    seat.addEventListener("click", () => {
      if(seat.classList.contains('selected')){
        seat.classList.remove("selected");
        totalNoOfSeats--;
      }else{
        if(TS <= totalNoOfSeats){
          alert(`You already selected ${TS} seats.`)
          return;
        }else{
          seat.classList.add("selected");
          totalNoOfSeats++;
        }
      }
    });
  });
}

function seatNoAllot(){
  let seats = document.querySelectorAll('.ferryStructure .seat');
  seats.forEach(seat => {
    let sd = seat.getAttribute('data-sn');
    if(sd){
      sd = sd.toLocaleUpperCase()
      seat.innerHTML = sd;
    }
  });
}

// delete after work

