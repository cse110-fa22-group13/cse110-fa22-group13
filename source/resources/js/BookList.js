// BookList.js

/**
 * @class BookList
 *
 * @description - Defines the custom HTMLElement book-list, which will hold book entries from the user. One can add a list, add book entries to any list, and delete any list.
 */
class BookList extends HTMLElement {
  /**
     * Constructor for the book-list webcomponent
     */
  constructor() {
    super(); // inherit HTMLElement
    this.attachShadow({mode: 'open'}); // Create the Shadow DOM

    // set the styles for the shadow DOM
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../bookEntries/bookEntries.css'); ;

    // apply style to the shadow DOM
    this.shadowRoot.appendChild(link);

    // add local storage functionality
    // random class name generator
    const guid = () => {
      const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      };
      // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    let newNum;
    if (localStorage.getItem('listOfNames') === null) {
      newNum = 0;
    } else {
      const newLength = JSON.parse(localStorage.getItem('listOfNames'));
      newNum = newLength.length;
    }

    // add the section for the list to inhabit
    const section = document.createElement('section');

    // Makes the id seperate for each new section
    section.id = 'new-list' + newNum;
    const uniqueClassForSection = String(guid());
    section.classList.add(uniqueClassForSection);

    const listLabel = document.createElement('h2');
    listLabel.classList.add('list-title');
    listLabel.innerHTML = 'New List';
    section.appendChild(listLabel);

    // add the list wrapper to the document
    const list = document.createElement('div');
    list.classList.add('entry-list');
    section.appendChild(list);

    // add the header to the list
    const header = document.createElement('div');
    header.classList.add('list-header');
    list.appendChild(header);

    // create and add the labels for the columns

    // entry cover
    const entryCover = document.createElement('button');
    entryCover.classList.add('entry-cover');
    entryCover.innerHTML = 'Delete List';

    // entry name
    const entryName = document.createElement('span');
    entryName.classList.add('entry-name');
    entryName.innerHTML = 'Title';

    // entry rating
    const entryRating = document.createElement('span');
    entryRating.classList.add('entry-rating');
    entryRating.innerHTML = 'Rating';

    // entry progress
    const entryProgress = document.createElement('span');
    entryProgress.classList.add('entry-progress');
    entryProgress.innerHTML = 'Progress';

    // entry extras
    const entryExtras = document.createElement('span');
    entryExtras.classList.add('entry-extras');
    entryExtras.innerHTML = 'Genres';

    // entry review
    const entryReview = document.createElement('span');
    entryReview.classList.add('entry-review');
    entryReview.innerHTML = 'Review';

    // add book entry button
    const addBook = document.createElement('button');
    addBook.classList.add('add-button');
    addBook.innerHTML = 'Add Book';

    // delete list button
    entryCover.addEventListener('click', () => {
      const deleteList = prompt('Are you sure you want to delete this list? (y/n)');
      if (deleteList == 'y' || deleteList == 'Y' || deleteList == 'yes' || deleteList == 'YES' || deleteList == 'Yes') {
        // Name of list we are deleting
        const nameOfList = listLabel.innerHTML;

        // Name of the list of all book lists
        const listOfNames = getEntriesFromStorage('listOfNames');

        // delete the the list name from listOfNames
        const array = [];
        for (let i = 0; i < listOfNames.length; i++) {
          if (listOfNames[i] !== nameOfList) {
            array.push(listOfNames[i]);
          }
        }
        localStorage.setItem('listOfNames', JSON.stringify(array));

        // delete the entries of the list
        const entriesOfList = getEntriesFromStorage(section.id);
        for (let j = 0; j < entriesOfList.length; j++) {
          window.localStorage.removeItem(entriesOfList[j]);
        }

        // delete the list itself
        if (window.localStorage.getItem(listOfNames) === null) {
          window.localStorage.removeItem(listOfNames);
        }
        window.localStorage.removeItem(section.id);
        window.localStorage.removeItem(nameOfList);

        // refresh the page
        window.location.reload();
      } else {
        console.log('User said no');
      }
    });

    // adding book entry button
    addBook.addEventListener('click', () => {
      // get the modal from the document
      const modal = document.getElementById('modal');
      // don't do anything if you can't find it
      if (modal == null) return;
      // Change title depending on the source
      const modalTitle = document.getElementById('modal-title');
      modalTitle.className = 'add-modal';

      // otherwise show the dialog box
      modal.classList.add('active');
      overlay.classList.add('active');

      // add close button functionality
      const closeButton = document.querySelector('#modal .close-button');
      closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelector('form').reset();
      });

      // close the dialog if the user clicks outside of it
      overlay.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelector('form').reset();
      });

      const formRef = document.querySelector('form');

      // submit button on adding book entry form
      formRef.addEventListener('submit', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');

        const entries = this.shadowRoot.querySelector('.entries');
        const entry = document.createElement('book-entry');

        const uniqueIdForEntry = String(guid());

        // store the unique key for entry
        const entryDiv = entry.shadowRoot.querySelector('.entry');
        entryDiv.id = uniqueIdForEntry;

        entries.appendChild(entry);

        const formData = new FormData(formRef);
        const entryObject = {};
        for (const [key, value] of formData) {
          entryObject[key] = value;
        }

        entry.data(entryObject);

        // set a unique class name of the entry to specific title
        const entriesArray = getEntriesFromStorage(section.id);
        entriesArray.push(uniqueIdForEntry);
        localStorage.setItem(section.id, JSON.stringify(entriesArray));

        // set info to a unique class name of the entry
        const eachArray = getEntriesFromStorage(uniqueIdForEntry);
        eachArray.push(entryObject);
        localStorage.setItem(uniqueIdForEntry, JSON.stringify(eachArray));

        modal.classList.remove('active');
        overlay.classList.remove('active');
      });
    });

    // add column text to header
    header.appendChild(entryCover);
    header.appendChild(entryName);
    header.appendChild(entryRating);
    header.appendChild(entryProgress);
    header.appendChild(entryExtras);
    header.appendChild(entryReview);
    header.appendChild(addBook);


    // add the wrapper for the entries
    const entries = document.createElement('div');
    entries.classList.add('entries');
    list.appendChild(entries);

    this.shadowRoot.append(section);
  }

  /**
     * This function sets the list label text for the created list.
     *
     * @param {any} - text to set the label to
     */
  setListLabel(input) {
    const listLabel = this.shadowRoot.querySelector('.list-title');
    listLabel.innerHTML = input;
  }
}


/**
 * This function retrieves a list object from local storage and uses it to populate the webpage.
 *
 * @param {any} title - title of the entry to retrieve from local storage
 * @returns The object that has the title, or nothing if no such list exists
 */
function getEntriesFromStorage(title) {
  if (window.localStorage.getItem(title) === null) {
    return [];
  }

  return JSON.parse(window.localStorage.getItem(title));
}

// define custom htmlElement book-list
customElements.define('book-list', BookList);
