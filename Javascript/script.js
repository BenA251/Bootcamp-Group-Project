$(document).ready(function () {
    // This will load tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
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

        $('#taskList').on('click', 'li', function () {
            $(this).toggleClass();
        });
    
    });
    }

    

  // This is the function to save tasks to local storage
    function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }
     // Event listener for the Add button
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