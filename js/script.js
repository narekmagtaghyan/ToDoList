const todoList = document.querySelector("#todo-list"),
    todoForm = document.querySelector("#todo-form"),
    addInput = document.querySelector("#add-input"),
    todoItems = document.querySelectorAll(".todo-item");

function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value) {
        const value = addInput.value;
        todoList.innerHTML += `
        <li class="todo-item">
            <div class="todo-item__preview">
                <input class="checkbox" type="checkbox">
                <label class="title">${value}</label>
            </div>
            <div class="todo-item__settings">
                <button class="edit">Изменить</button>
                <button class="delete">Удалить</button>
            </div>
        </li>`;

        todoForm.reset();
    } else {
        return alert("Необходимо ввести название задачи.");
    }
}

todoForm.addEventListener("submit", addTodoItem);