let addButton;
let addBookButton;
let deleteBookButton;

window.addEventListener('DOMContentLoaded', init);

function init() {
    addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', addNewList);
    // Adds book to a list
    addBookButton = document.getElementsByClassName("addButton");
    for(let i = 0; i < addBookButton.length; i++){
        addBookButton[i].addEventListener('click', addBook);
    }
    // Deletes book from a list
    deleteBookButton = document.getElementsByClassName("deleteButton");
    for(let j = 0; j < deleteBookButton.length; j++){
        deleteBookButton[j].addEventListener('click', deleteBook);
    }
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

function addBook(){
    let title = prompt("Title?");
    let author = prompt("Author?");
    let rating = prompt("Rating? ?/10");
    let progress = prompt("Page Progress? ??/??");
    let extra = prompt("Any Extra Details? (Optional)");
    let review = prompt("Thoughts on the book? (Book Review Optional)");
    //const thisList = document
}

function deleteBook(){
    let deleteBooks = prompt("Are you sure? (y/n)");
}