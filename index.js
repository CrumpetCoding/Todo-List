const text = document.getElementById("text-box");
const list = document.getElementById("list-items");

function addItem(){

    if(text.value === ''){
        alert("Please write something.")
    }
    else{
        let li = document.createElement("LI");
        li.innerHTML = text.value
        list.appendChild(li);
        let span = document.createElement("SPAN");
        span.innerHTML = "x";
        li.appendChild(span);
    }
    text.value = "";
    saveItems();
}

list.addEventListener("click", function(e){
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveItems();
    }
}, false);

function saveItems(){
    localStorage.setItem("data", list.innerHTML);
}

function showList(){
    list.innerHTML = localStorage.getItem("data");
}

showList();