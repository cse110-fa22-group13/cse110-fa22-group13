let addButton;

window.addEventListener('DOMContentLoaded', init);

function init() {
    addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', addNewList);

}

function addNewList(){
    const testList = document.createElement('book-list');
    document.querySelector('#booklist').appendChild(testList);

    const testEntry = document.createElement('book-entry');
    testList.addEntry(testEntry);

    const testEntry2 = document.createElement('book-entry');
    testList.addEntry(testEntry2);
}