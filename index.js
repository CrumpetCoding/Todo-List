const textBoxEl = document.getElementById("text-box");
const listEl = document.getElementById("list-items");
const toDos = JSON.parse(localStorage.getItem("toDos")) ?? [];

function addItem(){

    if(textBoxEl.value === ''){
        alert("Please write something.")
        return;
    }
    const newToDo = createEmptyToDo(textBoxEl.value);
    renderToDo(newToDo);
    textBoxEl.value = "";
    saveItems();
    textBoxEl.focus();
}

function renderToDo(toDoItem){
    const li = document.createElement("LI");
    li.innerText = toDoItem.text;
    li.dataset.toDoID = toDoItem.id;
    const span = document.createElement("SPAN");
    span.innerText = "x";
    span.dataset.delete = true;
    li.appendChild(span);
    listEl.appendChild(li);
}

listEl.addEventListener("click", function(e){
    console.log(e);
    if(e.target.dataset.delete === true){
        const toDoID = e.target.parentElement.dataset.toDoID;
        const toDoIndex = toDos.findIndex(toDo => toDo.id === toDoID);
        toDos.splice(toDoIndex, 1);
        document.querySelector(`[data-to-do-i-d=${toDoID}]`).remove();
        saveItems();
    }
}, false);

function saveItems(){
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

addEventListener();