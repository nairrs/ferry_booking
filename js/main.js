

// Function to make the getTripData request
function getTripDataRequest() {
    console.log('clicked');
    // Replace with your actual username and token
    const userName = "andamanbookings";
    const token = "U2FsdGVkX1/6f+diqV/siI2zagdg9XjliNhE5Pwna5A/KPOqR2cR9XZprm/9YuRDnEytof87Cq8i60eDMpfC9w==";
  
    // API endpoint for getTripData
    const apiUrl = "http://api.dev.gonautika.com:8012/getTripData";
  
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };
  
    // Make the fetch request
    fetch(apiUrl, fetchOptions)
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        console.log("getTripData Response:", data);
        // You can process the 'data' object to display trip information on your webpage
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error("Error fetching getTripData:", error);
      });
  }
  
  // Call the function to make the getTripData request
  getTripDataRequest();

  // extra
  