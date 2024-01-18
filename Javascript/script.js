
//function that runs once page loaded, this ensures html & styling loaded prior to running javascript.

function pageFunction() {
  getRandomWord();
  //getLocalStorage();
}

//random word API 
function getRandomWord() {

let options = {
  method: 'GET',
  headers: { 'x-api-key': 'YdZ93eaf9/lPDJWzKd54Cw==SM2tbGXwQvwZfeB5' }
}

let queryURL = `https://api.api-ninjas.com/v1/randomword`

fetch(queryURL, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let randomWord = data.word
    wordDefinition(randomWord);
    })

}

//dictionary API (no API required)
function wordDefinition(search) {

let queryURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`;

fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //access word 
    $("#DIV1").text(data[0].word);
    //access definition
    $("#DIV2").text(data[0].meanings[0].definitions[0].definition);
      })

    }

$( document ).ready(pageFunction());




