let editButton

window.addEventListener('DOMContentLoaded', init);

function init() {
    editButton = document.getElementById("edit button");
    editButton.addEventListener('click', toggleEditMode);
}

function toggleEditMode(){
    let elements = document.querySelectorAll('#booklist > *');

    if(editButton.innerText == "Edit"){ 
        editButton.innerText = "Done";
        for(el in elements){
            el.contenteditable = true;
        }
        
    } else{ 
        editButton.innerText = "Edit";
        for(el in elements){
            el.contenteditable = false;
        }
    }
}