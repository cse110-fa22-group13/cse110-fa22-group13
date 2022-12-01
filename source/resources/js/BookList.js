// BookList.js

//import {BookEntry} from './BookEntry';

class BookList extends HTMLElement {
    constructor() {
        super();  // inherit HTMLElement
        this.attachShadow({ mode: 'open' }); // Create the Shadow DOM

        // set the styles for the shadow DOM
        const styles = document.createElement('style');
        styles.innerHTML = `
        
        /* Single Booklist, includes list header and all list entries */
        .entry-list {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-content: space-between;
            row-gap: 0px;
            border: 2px #E57A44 solid;
            background-color: #E57A44;
            margin: 5px;
        }
        
        /* Contains all list entries */
        .entries {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-content: space-between;
            row-gap: 0px;
        }
        
        /* List header and individual entries */
        .list-header, .entry {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            align-content: space-between;
            text-align: center;
            gap: 10px;
            border: 1px #422040 solid;
            color: #DBC6BB;
        }
        
        .list-header {
            font-weight: bold;
            background-color: #422040;
        }
        
        /* Entry rating and progress */
        .entry-rating, .entry-progress {
            flex: 1;
        }
        
        /* Entry image/modify button */
        .entry-cover {
            width: 70px;
            height: auto;
            flex: 0 1 auto;
        }
        
        .entry .entry-cover {
            display: grid;
            justify-items: center;
            justify-content: center;
            align-items: center;
            align-content: center;
            text-align: center;
        }
        
        .entry-cover .entry-img, .entry-cover .modify-button {
            grid-column: 1;
            grid-row: 1;
        }
        
        .entry-img {
            opacity: 1.0;
            width: 70px;
            height: auto;
        }
        
        .entry-cover:hover .entry-img {
            opacity: 0.1;
        }
        
        .entry-cover .modify-button {
            opacity: 0.0;
            width: 70px;
            height: 100%;
            border: none;
        }
        
        .entry-cover:hover .modify-button {
            opacity: 1.0;
        }
        
        .entry-name {
            flex: 5;
            text-align: left;
        }
        
        .entry-extras, .entry-review {
            flex: 2;
        }
        
        .entries .entry-review p, .entry-genres {
            text-align: left;
        }
        `;

        this.shadowRoot.append(styles);

        // add local storage functionality
        // random class name generator 
        let guid = () => {
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        
        let newNum;
        if(localStorage.getItem("listOfNames") === null){
            newNum = 0;
        }
        else {
            const newLength = JSON.parse(localStorage.getItem("listOfNames"));
            newNum = newLength.length;
        }

        // add the section for the list to inhabit
        const section = document.createElement('section');
        // Makes the id seperate for each new section
        // const allNewIds = document.querySelectorAll('*[id^="new-list"]');
        
        section.id = 'new-list' + newNum;
        const uniqueClassForSection = String(guid());
        section.classList.add(uniqueClassForSection);

        const listLabel = document.createElement('h2');
        listLabel.classList.add('list-title');
        listLabel.innerHTML = 'New List';
        section.appendChild(listLabel);

        // add the list wrapper to the document
        const list = document.createElement('div');
        list.classList.add('entry-list')
        section.appendChild(list);

        // add the header to the list
        const header = document.createElement('div');
        header.classList.add('list-header');
        list.appendChild(header);

        // create and add the labels for the columns
        
        // entry cover
        const entryCover = document.createElement('span');
        entryCover.classList.add('entry-cover');
        entryCover.innerHTML = '&nbsp;';

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
        entryExtras.innerHTML = 'Extras';

        // entry review
        const entryReview = document.createElement('span');
        entryReview.classList.add('entry-review');
        entryReview.innerHTML = 'Review';

        // add book entry button
        const addBook = document.createElement('button');
        addBook.classList.add('addButton');
        addBook.innerHTML = 'Add-Book';

        addBook.addEventListener('click', () => {
            
            // get the modal from the document
            const modal = document.getElementById("modal");
            
            // don't do anything if you can't find it
            if(modal == null) return;
            
            // otherwise show the dialog box
            modal.classList.add('active');
            overlay.classList.add('active');
            
            // add close button functionality
            const closeButton = document.querySelector('#modal .close-button'); 
            closeButton.addEventListener('click', () => {
                modal.classList.remove('active');
                overlay.classList.remove('active');
            });

            // close the dialog if the user clicks outside of it
            overlay.addEventListener('click', () => {
                modal.classList.remove('active');
                overlay.classList.remove('active');
            });


            // add the book and close the dialog if the user hits the add button
            // const addButton = document.querySelectorAll('#modal .entry-add-button')
            // addButton.forEach(button => {
            //     button.addEventListener('click', () => {
            //         const entries = this.shadowRoot.querySelector('.entries');
            //         const entry = document.createElement('book-entry');
            //         entries.appendChild(entry);
            //         modal.classList.remove('active');
            //         overlay.classList.remove('active');

            //         const recipeObject = new Object();
            //         entry.data = recipeObject;

            //         // add local storage functionality
            //         // random class name generator 
            //         let guid = () => {
            //             let s4 = () => {
            //                 return Math.floor((1 + Math.random()) * 0x10000)
            //                     .toString(16)
            //                     .substring(1);
            //             }
            //             //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
            //             return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            //         }
            //         const uniqueClass = String(guid());

            //     });
            // });

            
            
            
            const formRef = document.querySelector("form");

            formRef.addEventListener('submit', () => {

                modal.classList.remove('active');
                overlay.classList.remove('active');

                const entries = this.shadowRoot.querySelector('.entries');
                const entry = document.createElement('book-entry');

                const uniqueIdForEntry = String(guid());

                // entry.classList.add(uniqueIdForEntry);

                // store the unique key for entry
                const entryDiv = entry.shadowRoot.querySelector('.entry');
                entryDiv.id = uniqueIdForEntry;
                
                entries.appendChild(entry);

                // store the section.id value to a child node of entry node
                // to avoid having the same id, add 1 to the front
                const entryExtra = entryDiv.querySelector('.entry-extras');
                const infoStorage = entryExtra.querySelector('summary');
                infoStorage.id= '1' + section.id;

                //const entrySome = entryDiv.querySelector('.entry-cover');
                //const editButton = entrySome.querySelector('button');
                // editButton.classList.add(section.id);                

                const formData = new FormData(formRef);
                const entryObject = new Object();
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

    /*
    *
    *
    */
    setListLabel(entry){
        const listLabel = this.shadowRoot.querySelector(".list-title");
        listLabel.innerHTML = entry;
    }
}

function getEntriesFromStorage(title) {
    if (window.localStorage.getItem(title) === null) {
      return [];
    }
    
    return JSON.parse(window.localStorage.getItem(title));
  
}

customElements.define('book-list', BookList);