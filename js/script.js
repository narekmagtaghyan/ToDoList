const todoList = document.querySelector("#todo-list"),
    todoForm = document.querySelector("#todo-form"),
    addInput = document.querySelector("#add-input"),
    todoItems = document.querySelectorAll(".todo-item");

function createTodoItem(title) {
    const todoPreview = document.createElement("div");
    todoPreview.className = "todo-item__preview";

    const checkbox = document.createElement("input");
    checkbox.className = "checkbox";
    checkbox.type = "checkbox";

    const label = document.createElement("label");
    label.textContent = title;
    label.className = "title";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "textfield";

    const todoSettings = document.createElement("div");
    todoSettings.className = "todo-item__settings";

    const editButton = document.createElement("button");
    editButton.innerText = "Изменить";
    editButton.className = "edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerText = "Удалить";

    const listItem = document.createElement("li");
    listItem.className = "todo-item";

    todoPreview.appendChild(checkbox);
    todoPreview.appendChild(label);
    todoPreview.appendChild(editInput);

    todoSettings.appendChild(editButton);
    todoSettings.appendChild(deleteButton);

    listItem.appendChild(todoPreview);
    listItem.appendChild(todoSettings);

    bindEvents(listItem);

    return listItem;
}

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector(".checkbox"),
        editButton = todoItem.querySelector(".edit"),
        deleteBtn = todoItem.querySelector(".delete");

    checkbox.addEventListener("change", toggleTodoItem);
    editButton.addEventListener("click", editTodoItem);
    deleteBtn.addEventListener("click", deleteTodoItem);
}

function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value) {
        const listItem = createTodoItem(addInput.value);
        todoList.appendChild(listItem);

        todoForm.reset();
    } else {
        return alert("Необходимо ввести название задачи.");
    }
}

function toggleTodoItem({ target }) {
    const listItem = target.closest(".todo-item");

    listItem.classList.toggle("completed");
}

function editTodoItem({ target }) {
    const listItem = target.closest(".todo-item"),
        title = listItem.querySelector(".title"),
        editInput = listItem.querySelector(".textfield"),
        isEditing = listItem.classList.contains("editing");

    if (isEditing) {
        title.innerText = editInput.value;
        target.innerText = "Изменить";
    } else {
        editInput.value = title.innerText;
        target.innerText = "Сохранить";
    }

    listItem.classList.toggle("editing");
}

function deleteTodoItem({ target }) {
    const listItem = target.closest(".todo-item");

    todoList.removeChild(listItem);
}

function main() {
    todoForm.addEventListener("submit", addTodoItem);
    todoItems.forEach((item => {
        bindEvents(item);
    }));
}

main();