
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




$(document).ready(function () {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const taskList = $('#taskList');
    taskList.empty();

    tasks.forEach((task, index) => {
        const listItem = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>');
        listItem.text(task.text);

        const checkbox = $('<input type="checkbox">');
        checkbox.prop('checked', task.completed);
        checkbox.on('change', function () {
        tasks[index].completed = $(this).prop('checked');
        saveTasks();
        renderTasks();
        });

        const deleteButton = $('<button class="btn btn-danger btn-sm ml-2">Delete</button>');
        deleteButton.on('click', function () {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        });

        listItem.prepend(checkbox);
        listItem.append(deleteButton);

        if (task.completed) {
        listItem.addClass('completed');
        }

        taskList.append(listItem);
    });
    }

    function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    $('#addButton').on('click', function () {
    const taskInput = $('#taskInput');
     const newTask = {
        text: taskInput.val(),
        completed: false,
    };

    if (newTask.text !== '') {
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.val('');
    }
    });

    renderTasks();
});

// Facts of the Day
$(document).ready(function () {

    const factTextEl = $("#fact-text");
    
    function factOfTheDay() {
        
        $.ajax({
            method: 'GET',
            url: 'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en',
            contentType: 'application/json',
            success: function(result) {
                displayFact(result.text);
            },
            error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
            }
        });
    }
    
    function displayFact(fact) {
        factTextEl.text(fact)
    }
    
    factOfTheDay();
    });

// end Facts of the Day code
