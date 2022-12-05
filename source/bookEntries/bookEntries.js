window.addEventListener('DOMContentLoaded', init);
/**
 * This function initializes the webpage by first fetching from local storage, displaying all current book entries in their list, in they exist.
 *
 */
async function init() {
  try {
    await fetchItems();
  } catch (err) {
    console.log(`Error fetch items: ${err}`);
    return; // Return if fetch fails
  }
  const addButton = document.querySelector('.add-list-btn');
  addButton.addEventListener('click', addNewList);
}

/**
 * This function adds a new list to the page using the name given by the user
 */
function addNewList() {
  const label = prompt('Name of new list?');
  if (label != null) {
    const testList = document.createElement('book-list');
    const emptyList = [];
    if (localStorage.getItem('listOfNames') === null) {
      localStorage.setItem(label, JSON.stringify(emptyList));
      emptyList.push(label);
      localStorage.setItem('listOfNames', JSON.stringify(emptyList));
    } else {
      const newEntries = JSON.parse(localStorage.getItem('listOfNames'));
      for (let i = 0; i < newEntries.length; i++) {
        if (newEntries[i] == label) {
          return;
        }
      }
      newEntries.push(label);
      localStorage.setItem(label, JSON.stringify(emptyList));
      localStorage.setItem('listOfNames', JSON.stringify(newEntries));
    }
    testList.setListLabel(label);
    document.querySelector('#bookList').appendChild(testList);
  }
}

/**
 * This function finds out what needs to be populated based on the contents of localStorage, and then fetches them from local storage
 */
async function fetchItems() {
  return new Promise( (resolve, reject) => {
    if (localStorage.getItem('listOfNames') === null) {
      resolve();
    } else {
      const storedInfo = localStorage.getItem('listOfNames');
      const newLists = JSON.parse(storedInfo);
      for (let i = 0; i < newLists.length; i++) {
        const testList = document.createElement('book-list');
        const section = testList.shadowRoot.querySelector('section');
        section.id = 'new-list' + i;
        testList.setListLabel(newLists[i]);
        document.querySelector('#bookList').appendChild(testList);

        const newEntries = JSON.parse(localStorage.getItem(section.id));
        const entries = testList.shadowRoot.querySelector('.entries');

        if (newEntries !== null) {
          for (let j = 0; j < newEntries.length; j++) {
            const testEntry = document.createElement('book-entry');
            const storeListID = testEntry.shadowRoot.querySelector('.entry');
            storeListID.classList.add('new-list' + i);
            const retrievedData = newEntries[j];
            const newEntry = JSON.parse(localStorage.getItem(retrievedData));
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
