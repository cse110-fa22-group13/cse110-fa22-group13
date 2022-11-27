let addButton;
let addBookButton;
let deleteBookButton;

window.addEventListener('DOMContentLoaded', init);

function init() {
    addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', addNewList);

}

function addNewList(){
    let label = prompt("Name of new list?");
    const testList = document.createElement('book-list');
    testList.setListLabel(label);
    document.querySelector('#booklist').appendChild(testList);
    /*let amount = prompt("How many books do you want in your new list?");
    while(amount < 0 || amount > 25){
        amount = prompt("Invalid, try smaller or lower value");
    }
    for(let i = 0; i < amount; i++){
        const testEntry = document.createElement('book-entry');
        testList.addEntry(testEntry);
    }*/
    //const testEntry2 = document.createElement('book-entry');
    //testList.addEntry(testEntry2);
}

function deleteBook(){
    let deleteBooks = prompt("Are you sure? (y/n)");
}