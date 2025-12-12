const textBoxEl = document.getElementById("text-box");
const listEl = document.getElementById("list-items");
const toDos = JSON.parse(localStorage.getItem("toDos")) ?? [];
console.log(toDos);

function addItem(){

    if(textBoxEl.value === ''){
        alert("Please write something.")
        return;
    }
    const newToDo = createEmptyToDo(textBoxEl.value);
    renderToDo(newToDo);
    toDos.push(newToDo);
    saveItems();
    textBoxEl.value = "";
    textBoxEl.focus();
}

function renderToDo(toDoItem){
    const li = document.createElement("li");
    li.dataset.toDoID = toDoItem.id;
    listEl.appendChild(li);

    const textSpan = document.createElement("span");
    textSpan.classList.add("textItem");
    textSpan.innerText = toDoItem.text;
    if (toDoItem.isCompleted) {
        textSpan.classList.add("completed");
    }
    li.appendChild(textSpan);

    const deleteSpan = document.createElement("span");
    deleteSpan.innerText = "✕";
    deleteSpan.classList.add("actionIcon");
    deleteSpan.setAttribute('id', "delete");
    deleteSpan.dataset.delete = "true"; // This reads from the HTML as a string.
    li.appendChild(deleteSpan);

    const completeSpan = document.createElement("span");
    completeSpan.innerText = "✓";
    completeSpan.classList.add("actionIcon");
    completeSpan.setAttribute('id', "complete");
    completeSpan.dataset.complete = "true"; // This reads from the HTML as a string.
    li.appendChild(completeSpan);

}

listEl.addEventListener("click", function(e){
    console.log(e);
    const dataset = e.target?.dataset;
    if(dataset?.delete === "true"){
        const toDoID = e.target.parentElement.dataset.toDoID;
        const toDoIndex = toDos.findIndex(toDo => toDo.id === toDoID);
        toDos.splice(toDoIndex, 1);
        document.querySelector(`[data-to-do-i-d="${toDoID}"]`).remove();
        saveItems();
    return;
    }

    if(dataset?.complete){
        const toDoID = e.target.parentElement.dataset.toDoID;
        const toDo = toDos.find(toDo => toDo.id === toDoID);
        // find the li tag based on the todo.id
        // Then find the text item (add a dataset item if you want to or just access with the class)
        // if completed, add the class, otherwise remove it
        // Add some styles to the "completed" class
        if (toDo.isCompleted){
            toDo.isCompleted = false;
            // Need to remove "completed" class
            toDo.classList.remove("completed");
        }
        else{
            toDo.isCompleted = true;
            // Need to add "completed" class
            toDo.classList.add("completed");
        }
        saveItems();
    }
}, false);

function saveItems(){
    console.log(toDos)
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function addEventListener(){
    textBoxEl.focus();
    textBoxEl.addEventListener("keyup", event => {
        if (event.key === "Enter"){
            addItem();
        }
    })
}

function createEmptyToDo(text){
    const newToDo = {
        text,
        isCompleted: false,
        id: crypto.randomUUID(),
    }
    return newToDo;
}

if (toDos.length > 0){
    toDos.forEach((toDo) => {
        renderToDo(toDo);
    });
}

addEventListener();