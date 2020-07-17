'use strict';

// put your own value below!
const apiKey = 'AIzaSyCEzGfXJTky7unD7eHNhqbvUUEgZP5mr74'; 
const searchURL = 'https://www.googleapis.com/youtube/v3/search';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  
  console.log(responseJson);
  $('#results-list').empty();
  
  for (let i = 0; i < responseJson.items.length; i++){
    
    $('#results-list').append(`<li>`, responseJson.items[i].snippet.title, responseJson.items[i].snippet.description, responseJson.items[i].snippet.thumbnails,  `</li>`)
  
      
      };
        
    $('#results').removeClass('hidden');
  };


function getYouTubeVideos(query, maxResults=10) {
  const params = {
    key: apiKey,
    q: query,
    part: 'snippet',
    maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })



    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, maxResults);
  });
}

$(watchForm);