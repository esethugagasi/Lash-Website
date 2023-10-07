// Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Define the URL you want to send the POST request to
var url = 'https://example.com/api';

// Define the data you want to send in the request body (as a JSON string)
var data = JSON.stringify({
  key1: 'value1',
  key2: 'value2'
});

// Configure the request
xhr.open('POST', url, true);
xhr.setRequestHeader('Content-Type', 'application/json'); // Set the content type to JSON

// Set up a callback function to handle the response
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Request was successful, handle the response here
    var response = JSON.parse(xhr.responseText);
    console.log(response);
  } else if (xhr.readyState === 4 && xhr.status !== 200) {
    // Request failed, handle the error here
    console.error('Request failed with status code ' + xhr.status);
  }
};

// Send the POST request with the data
xhr.send(data);
