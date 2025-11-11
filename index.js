const text = document.getElementById("text-box");
const list = document.getElementById("list-items");

function addItem(){

    if(text.value === ''){
        alert("Please write something.")
    }
    else{
            let li = document.createElement("li");
            li.innerHTML = text.value
            list.appendChild(li);
    }
}