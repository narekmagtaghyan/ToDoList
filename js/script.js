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

    if (addInput.value.trim() !== "" && addInput.value.length <= 24) {
        const listItem = createTodoItem(addInput.value);
        todoList.appendChild(listItem);

        todoForm.reset();
    } else if (addInput.value.trim() !== "" && addInput.value.length >= 24) {
        const listItem = createTodoItem(`${addInput.value.substring(0, 24)}...`);
        todoList.appendChild(listItem);

        todoForm.reset();
    } else {
        return alert("Необходимо ввести название задачи.");
    }
}

function toggleTodoItem({ target }) {
    const listItem = target.closest(".todo-item"),
        editButton = listItem.querySelector(".edit"),
        deleteBtn = listItem.querySelector(".delete");

    listItem.classList.toggle("completed");

    if (listItem.classList.contains('completed')) {
        editButton.setAttribute("disabled", "off");
        deleteBtn.setAttribute("disabled", "off");
    } else {
        editButton.removeAttribute("disabled");
        deleteBtn.removeAttribute("disabled");
    }
}

function editTodoItem({ target }) {
    const listItem = target.closest(".todo-item"),
        checkbox = listItem.querySelector(".checkbox"),
        title = listItem.querySelector(".title"),
        editInput = listItem.querySelector(".textfield"),
        isEditing = listItem.classList.contains("editing");

    if (isEditing) {
        if (editInput.value.trim() !== "" && editInput.value.length <= 24) {
            title.innerText = editInput.value;
        } else if (editInput.value.trim() !== "" && editInput.value.length >= 24) {
            title.innerText = `${editInput.value.substring(0, 24)}...`;
        }

        target.innerText = "Изменить";
        checkbox.style.display = "block";
    } else {
        editInput.value = title.innerText;
        target.innerText = "Сохранить";

        checkbox.style.display = "none";
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