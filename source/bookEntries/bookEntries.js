let addButton;

window.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        await fetchItems();
    } 
    catch (err) {
        console.log(`Error fetch items: ${err}`);
        return; // Return if fetch fails
    }
    addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', addNewList);
}

function addNewList(){
    let label = prompt("Name of new list?");
    if(label != null){
        let testList = document.createElement('book-list');
        let emptyList = [];
        if(localStorage.getItem("listOfNames") === null){
            localStorage.setItem(label, JSON.stringify(emptyList));
            emptyList.push(label);
            localStorage.setItem("listOfNames", JSON.stringify(emptyList));
        }
        else{
            let newEntries = JSON.parse(localStorage.getItem("listOfNames"));
            for (var i = 0; i < newEntries.length; i++) {
                if(newEntries[i] == label){
                    return;
                }
            }
            newEntries.push(label);
            localStorage.setItem(label, JSON.stringify(emptyList));
            localStorage.setItem("listOfNames", JSON.stringify(newEntries));
        }
        testList.setListLabel(label);
        document.querySelector('#bookList').appendChild(testList);
    }
}


async function fetchItems() {
    return new Promise(async (resolve, reject) => {
        if(localStorage.getItem("listOfNames") === null){
            resolve();
        }
        else{
            const storedInfo = await localStorage.getItem("listOfNames");
            const newLists = await JSON.parse(storedInfo);
            for (let i = 0; i < newLists.length; i++) {
                const testList = await document.createElement('book-list');
                const section = await testList.shadowRoot.querySelector('section');
                section.id = 'new-list' + i;
                testList.setListLabel(newLists[i]);
                document.querySelector('#bookList').appendChild(testList);
                
                const newEntries = await JSON.parse(localStorage.getItem(section.id));
                const entries = await testList.shadowRoot.querySelector('.entries');
                
                if(newEntries !== null){
                    for (let j = 0; j < newEntries.length; j++) {
                        const testEntry = document.createElement('book-entry');
                        const storeListID = testEntry.shadowRoot.querySelector('.entry');
                        storeListID.classList.add('new-list' + i);
                        const retrievedData = newEntries[j];
                        const newEntry = await JSON.parse(localStorage.getItem(retrievedData));
                        testEntry.data(newEntry[0]);  
                        storeListID.classList.add(newEntries[j]);
                        entries.appendChild(testEntry);
                    }
                }
            }
            resolve();
        }
    });
}