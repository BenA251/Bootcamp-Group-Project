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
