// 14 dec 1600

import {postTripData} from 'backend/myBackend.jsw';

$w.onReady(function () {
  // Listen for messages from the iframe
  $w('#getTripData').onMessage((event) => {
    const { action, funName, array } = event.data;

    // Check the action and call the corresponding function in Velo
    if (action === 'callFunctionInVelo') {
      console.log(array)
      const tFrom = array['0'];
      const tTo = array[1];
      const tDate = array[2];

      postTripData(tFrom,tTo,tDate)
      .then(result => {
        // Handle the result here
        console.log('API response:', result);
        // You can update your UI or do other actions based on the result
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
        // You can show an error message or take other actions
      });
    } 
  });

});

// ################## ################## ################## ################## ################## ################## ################## ################## ################## ################## ##################


// import {postTripData} from 'backend/myBackend.jsw';

// $w.onReady(function () {
//   // Listen for messages from the iframe
//   $w('#getTripData').onMessage((event) => {
//     const { action, funName, array } = event.data;

//     // Check the action and call the corresponding function in Velo
//     if (action === 'callFunctionInVelo') {
//       console.log(array)
//       const tFrom = array['0'];
//       const tTo = array[1];
//       const tDate = array[2];

//       postTripData(tFrom,tTo,tDate)
//       .then(result => {
//         // Handle the result here
//         console.log('API response:', result);
//         // You can update your UI or do other actions based on the result
//       })
//       .catch(error => {
//         // Handle errors here
//         console.error('Error:', error);
//         // You can show an error message or take other actions
//       });
//     } 
//   });

// });

