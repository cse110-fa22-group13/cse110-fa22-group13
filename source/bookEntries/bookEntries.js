let addButton;
let addBookButton;
let deleteBookButton;

window.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        await fetchItems();
      } catch (err) {
        console.log(`Error fetch items: ${err}`);
        return; // Return if fetch fails
      }
    addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', addNewList);
    

}

function addNewList(){
    let label = prompt("Name of new list?");
    let testList = document.createElement('book-list');
    let emptyList = [];
    if(localStorage.getItem("listofNames") === null){
        localStorage.setItem(label, JSON.stringify(emptyList));
        emptyList.push(label);
        localStorage.setItem("listofNames", JSON.stringify(emptyList));
    }
    else{
        let newEntries = JSON.parse(localStorage.getItem("listofNames"));
        for (var i = 0; i < newEntries.length; i++) {
            if(newEntries[i] == label){
                return;
            }
        }
        newEntries.push(label);
        localStorage.setItem(label, JSON.stringify(emptyList));
        localStorage.setItem("listofNames", JSON.stringify(newEntries));
    }
    testList.setListLabel(label);
    document.querySelector('#booklist').appendChild(testList);
    /*
    let amount = prompt("How many books do you want in your new list?");
    while(amount < 0 || amount > 25){
        amount = prompt("Invalid, try smaller or lower value");
    }
    for(let i = 0; i < amount; i++){
        const testEntry = document.createElement('book-entry');
        testList.addEntry(testEntry);
    }
    const testEntry2 = document.createElement('book-entry');
    testList.addEntry(testEntry2);
    */
}


async function fetchItems() {
    return new Promise((resolve, reject) => {
        if(localStorage.getItem("listofNames") === null){
            resolve();
        }else{
            let newEntries = JSON.parse(localStorage.getItem("listofNames"));
            let testList = document.createElement('book-list');
            for (var i = 0; i < newEntries.length; i++) {
                testList = document.createElement('book-list');
                testList.setListLabel(newEntries[i]);
                document.querySelector('#booklist').appendChild(testList);
            }
            resolve();
        }
    });
}

function deleteBook(){
    let deleteBooks = prompt("Are you sure? (y/n)");
}