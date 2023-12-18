
function tripFetchFunction (){
    fetch('../js/data-ferry2.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {console.log('Fetched data:', data);createResultCards(data)})
    .catch(error => {console.error('Error during fetch:', error);});
}

let okk = [
    {class:'Royal',pax:2,fare:1000, total:0},
    {class:'Luxury',pax:1,fare:1000, total:0},
    {class:'Infant',pax:1,fare:1000, total:0}
]