$w.onReady(function () {
    // Listen for messages from the iframe
    $w('#html1').onMessage((event) => {
      const { action, buttonId } = event.data;
  
      // Check the action and call the corresponding function in Velo
      if (action === 'createElement') {
        createIframeElement();
      } else if (action === 'clearContent') {
        clearIframeContent();
      }
    });
  
    // Define your Velo functions
    function createIframeElement() {
      // Your logic to create an element inside the iframe
      const iframeElement = document.createElement('div');
      iframeElement.textContent = 'I am a new element!';
      document.body.appendChild(iframeElement);
    }
  
    function clearIframeContent() {
      // Your logic to clear content or console some information
      const iframeElement = document.querySelector('#iframeElement');
      if (iframeElement) {
        iframeElement.textContent = '';
        console.log('Content cleared!');
      }
    }
  
    // Fetch data from an external website and send it to the iframe
    function fetchDataAndSendToIframe() {
      // Your logic to fetch data from an external website
      // For example, using fetch API
      fetch('https://example.com/data')
        .then(response => response.json())
        .then(data => {
          // Send data to the iframe
          $w('#html1').postMessage({
            action: 'displayFetchedData',
            data: data
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  
    // Call the function to fetch data and send it to the iframe
    fetchDataAndSendToIframe();
  });
  