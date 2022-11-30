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

        // add the section for the list to inhabit
        const section = document.createElement('section');
        // Makes the id seperate for each new section
        const allNewIds = document.querySelectorAll('*[id^="new-list"]');
        section.id = 'new-list' + allNewIds.length;
        
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
            const addButton = document.querySelectorAll('#modal .entry-add-button')
            addButton.forEach(button => {
                button.addEventListener('click', () => {
                    const entries = this.shadowRoot.querySelector('.entries');
                    const entry = document.createElement('book-entry');
                    entries.appendChild(entry);
                        
                    modal.classList.remove('active');
                    overlay.classList.remove('active');

                });
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

customElements.define('book-list', BookList);