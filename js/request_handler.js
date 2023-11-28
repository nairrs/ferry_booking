

// Function to make the getTripData request
function getTripDataRequest() {
 document.querySelector('.searchMainBox').classList.add('dnone');;
 document.querySelector('.resultMainBox').classList.remove('dnone');

  // Replace with your actual username and token
  const userName = "andamanbookings";
  const token = "U2FsdGVkX1/6f+diqV/siI2zagdg9XjliNhE5Pwna5A/KPOqR2cR9XZprm/9YuRDnEytof87Cq8i60eDMpfC9w==";

  // API endpoint for getTripData
  // const apiUrl = "http://api.dev.gonautika.com:8012/getTripData";
  const apiUrl = "js/data.json";

  // Request data
  const requestData = {
    date: "2-12-2023",
    from: "Port Blair",
    to: "Swaraj Dweep",
    userName: userName,
    token: token,
  };

  // Fetch options
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(requestData),
  };

  // Make the fetch request
  fetch(apiUrl, fetchOptions)
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
      // console.log("getTripData Response:", data);
      // You can process the 'data' object to display trip information on your webpage
      createResultCards(data)
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching getTripData:", error);
    });
}

// Call the function to make the getTripData request
// getTripDataRequest();

var ferrDetails = [
  { ID: '1', name: 'Nutika 1', img: 'nutika1.jpg', clickFun:'seatSelection()'},
  { ID: '2', name: 'Nutika 2', img: 'nutika2.jpg',clickFun:'seatSelection()'},
  { ID: '3', name: 'Makruzz', img: 'makruzz.jpg',clickFun:'passengerDetails()'}
]

function createResultCards(data) {


  // ferry data
  let vessel = [], bClass = '', pClass = '', ferrys = data.data;
console.log(ferrys)
  let ferryResultCards = document.querySelector('.ferryResultCards');
  ferryResultCards.innerHTML = '';



  ferrys.forEach(ferry => {

   
    ferrDetails.forEach(ferryDetail => {
      if (parseInt(ferryDetail.ID) == ferry.vesselID)
        vessel = ferryDetail;
    });


    // console.log(ferry)
    // components
    function createClassCard(seatClass, classTtl, bFare) {
      let seatClassBody = `
        <div class="seatClass">
        <div class="className">
            ${classTtl}
        </div>
        <div class="seatBox">
            <span class="seat">${Object.keys(seatClass).length}</span>
            <br>
            (available seats)
        </div>
        <div class="priceBox">
            <p>Rs. <span class="price">${bFare}</span>/-</p>
        </div>
    </div>
        `; return seatClassBody;
    }

    // ferry data 


    if (ferry.pClass) {
      let classTtl = 'Premium';
      let bFare = ferry.fares.pBaseFare;
      pClass = createClassCard(ferry.pClass, classTtl, bFare);
    }
    if (ferry.bClass) {
      let classTtl = 'Business';
      let bFare = ferry.fares.bBaseFare;
      bClass = createClassCard(ferry.bClass, classTtl, bFare);
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
              <i>0</i><i>0</i><i>0</i><i>0</i><i>0</i><i>0</i>
          </div>
      </div>
      <div class="shedule-class">
          <div class="timingBox">
              <div class="fromTime">
                  <p class="time">6:00</p>
                  <p class="sector">${ferry.from}</p>
              </div>
              <div class="durationBox">
                  <p class="duration">01:30 hrs</p>
              </div>
              <div class="toTime">
                  <p class="time">8:00</p>
                  <p class="sector">${ferry.to}</p>
              </div>
          </div>
          <div class="seatClasses">
            ${pClass}
            ${bClass}
          </div>
          <div class="classDesc">
              <p class="class">
                  <span class="name">Premium :</span>
                  <span class="desc">Located on the lower deck offers front and side sea views.</span>
              </p>
          </div>
      </div>
      <div class="bookBtns">
          <div class="btns">
              <button class="btn" onclick="${vessel.clickFun}">Select & Proceed</button>
          </div>
      </div>
  </div>
      `;
    ferryResultCards.appendChild(div);
  });
  resultCardSeatClassActive();
}


// delete after work
seatSelection();
getTripDataRequest()