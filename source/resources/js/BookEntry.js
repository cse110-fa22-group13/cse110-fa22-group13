/**
 * @global
 * @constant STATUSES
*  The STATUSES constant which holds the 3 possibilities for the status variable: completed, in progress, and planned
* 
*/
 const STATUSES = ['completed', 'in progress', 'planned']

 class BookEntry extends HTMLElement {
    /**
     * 
     * @class BookEntry
     * The BookEntry class, which represents a book entry, which includes a book and the requisite information like title, ISBN, and authorName, as well as ancillary information like the status of being read, 
     * the current review for the book, the genres the book is tagged in, the date the book was read (if finished) and the current page progress of the user for that book. 
     * @description The constructor for the BookEntry Class, which takes in 9 pieces of information to represent a BookEntry, 
     * which is more than simply a book, it is also user information related to reading that book. 
     * @param {Set} tags - a Set DS to hold the tags representing genres for the book
     * @param {Date} dateRead - the date the book was read
     * @param {Number} rating - a number rating, representing the rating the user has given the book
     * @param {Number} pageProgress - a number representing the number of pages currently read for the book, should be a positive integer
     * @param {string} status - a string representing the current status of the book being planned, in progress, or completed
     * @param {string} reviewBodyText - a string representing the review for the book
     * @param {string} ISBN - a string representing the ISBN of the book
     * @param {string} authorName - a string representing the book author's name, should be both first and sur name
     * @param {string} title - a string representing the title of the book
     * 
     * when initially creating a BookEntry for a new book, pass pageProgress=0, reviewTextBody='', rating=NaN, dateRead=Date() for defaults
     */
    constructor(){

        super();
        // attach shadow DOM
        const shadowOpen = this.attachShadow({ mode: 'open' });

        // add css
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
            max-width: 70px;
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
            max-width: 70px;
            height: auto;

            object-fit: cover;
            display: inline-block;
            width: calc(100% + 32px);

        }
        
        .entry-cover:hover .entry-img {
            opacity: 0.1;
        }
        
        .entry-cover .modify-button {
            opacity: 0.0;
            width: 70px;
            max-width: 70px;
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

        /*data popup form*/
        .popup {
            background-color: rgba(0,0,0,0.5);
            position: absolute;
            height: 100%;
            width: 100%;
            justify-content: center;
            justify-text: center;
            align-items: center;
            display: flex;
            top: 0;
            left: 0;
        }
        `;

        // apply style to the shadow DOM
        shadowOpen.append(styles);

        //contentDialog(this);

        // wrapper for the entry
        const entryWrapper = document.createElement('div');
        entryWrapper.classList.add('entry');

        // wrapper for the cover
        const entryCover = document.createElement('div');
        entryCover.classList.add('entry-cover');
        entryWrapper.appendChild(entryCover);

        // image for the cover
        const cover = document.createElement('img');
        cover.classList.add('entry-img');
        cover.alt = this.title;
        cover.src = "/source/resources/images/icons/Books-Icon.png";
        entryCover.appendChild(cover);

        // button on hover
        const modifyButton = document.createElement('button');
        modifyButton.classList.add('modify-button');
        modifyButton.title = "Click to modify this entry.";
        modifyButton.innerHTML = 'Modify Entry';

        // button functionality
        cover.addEventListener('click', () => contentDialog(this));

        entryCover.appendChild(modifyButton);

        // entry name
        const entryName = document.createElement('span');
        entryName.classList.add('entry-name');
        entryName.innerHTML = 'Title';
        entryWrapper.appendChild(entryName);

        // entry rating
        const entryRating = document.createElement('div');
        entryRating.classList.add('entry-rating');
        
        // entry score
        const entryScore = document.createElement('span');
        entryScore.classList.add('entry-score');
        entryScore.innerHTML = `0/10`;
        entryRating.appendChild(entryScore);

        entryWrapper.appendChild(entryRating);

        // entry progress
        const entryProgress = document.createElement('span');
        entryProgress.classList.add('entry-progress');
        entryProgress.innerHTML = '0/100';
        entryWrapper.appendChild(entryProgress);

        // entry extras
        const extrasWrapper = document.createElement('details');
        extrasWrapper.classList.add('entry-extras');
        
        const extrasSummary = document.createElement('summary');
        extrasSummary.innerHTML = 'Extra Details';
        extrasWrapper.appendChild(extrasSummary);
        
        const extrasGenresTitle = document.createElement('span');
        extrasGenresTitle.classList.add('entry-genres');
        extrasGenresTitle.innerHTML = 'Genres';
        extrasWrapper.appendChild(extrasGenresTitle);
        
        const genreList = document.createElement('ul');
        genreList.classList.add('entry-genres');
        extrasWrapper.appendChild(genreList);

        entryWrapper.appendChild(extrasWrapper);


        // entry review
        const entryReviewWrapper = document.createElement('details');
        entryReviewWrapper.classList.add('entry-review');
        const reviewSummary = document.createElement('summary');
        reviewSummary.innerHTML = 'View Review';
        entryReviewWrapper.appendChild(reviewSummary);
        const reviewBody = document.createElement('p');
        reviewBody.innerHTML = 'reviewTextBody';
        entryReviewWrapper.appendChild(reviewBody);
        entryWrapper.appendChild(entryReviewWrapper);

        // delete button
        const deleteButtonWrapper = document.createElement('div');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => deleteStorage(this));

        deleteButtonWrapper.appendChild(deleteButton);
        entryWrapper.appendChild(deleteButton);

        shadowOpen.append(entryWrapper);

    }

    /**
      * @param {any} Object
      */
    data(data) {
        if(!data) return;
        
        const entryDiv = this.shadowRoot.querySelector('.entry');
        // update the information
        const entryName = entryDiv.querySelector('.entry-name');
        entryName.innerHTML = `${data.modalBookTitle}`;

        const entryRating = entryDiv.querySelector('.entry-rating');
        const entryScore = entryRating.querySelector('.entry-score');
        entryScore.innerHTML = `${data.modalBookRating}`;

        const entryProgress = entryDiv.querySelector('.entry-progress');
        entryProgress.innerHTML = `${data.modalBookCurrPageNum1}/${data.modalBookCurrPageNum2}`;

        const extras = entryDiv.querySelector('.entry-extras');
        const extrasGenresTitle = extras.querySelector('.entry-genres');
        extrasGenresTitle.innerHTML = `${data.modalBookGenre}`;

        if(data.modalBookReview) {
            const entryReviewWrapper = entryDiv.querySelector('.entry-review');
            const reviewBody = entryReviewWrapper.querySelector('p');
            reviewBody.innerHTML = `${data.modalBookReview}`;
        }
        if(data.modalBookLnk) {
            const entryCover = entryDiv.querySelector('.entry-cover');
            const cover = entryCover.querySelector('.entry-img');
            console.log(data.modalBookLnk);
            cover.src = data.modalBookLnk;
        }
    }
}

// takes a book entry as input, throws a popup on the screen, updates the entry, and closes
function contentDialog(entry) {
    
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

    const formRef = document.querySelector("form");

    formRef.addEventListener('submit', () => {

        modal.classList.remove('active');
        overlay.classList.remove('active');
        const grabEntry = entry.shadowRoot.querySelector('.entry');
        const entryKey = grabEntry.classList[2];

        const formData = new FormData(formRef);
        const entryObject = new Object();
        for (const [key, value] of formData) {
            entryObject[key] = value;
        }

        entry.data(entryObject);

        // set info to a unique class name of the entry
        window.localStorage.removeItem(entryKey);
        const eachArray = getEntriesFromStorage(entryKey);
        eachArray.push(entryObject);
        localStorage.setItem(entryKey, JSON.stringify(eachArray));
    });   
}

// when delete button is clicked, it deletes the corresponding the info from the local storage
function deleteStorage(entry) {
    const grabEntry = entry.shadowRoot.querySelector('.entry');
    //key for the entry list
    const listKey = grabEntry.classList[1];

    //key for the entry
    const entryKey = grabEntry.classList[2];

    window.localStorage.removeItem(entryKey);

    const entriesArray = getEntriesFromStorage(listKey);
    if (entriesArray.length === 1) {
        window.localStorage.removeItem(listKey);
    } else {
        const array = [];
        for(let i = 0; i < entriesArray.length; i++) {
            if (entriesArray[i] !== entryKey) {
                array.push(entriesArray[i]);
            }
        }
        localStorage.setItem(listKey, JSON.stringify(array));
    }
    
    grabEntry.remove();
}

function getEntriesFromStorage(title) {
    if (window.localStorage.getItem(title) === null) {
      return [];
    }
    
    return JSON.parse(window.localStorage.getItem(title));
  
}
customElements.define('book-entry', BookEntry);