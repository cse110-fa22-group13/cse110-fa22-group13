/**
 * @global
 * @constant STATUSES
*  The STATUSES constant which holds the 3 possibilities for the status variable: completed, in progress, and planned
*
*/
const STATUSES = ['completed', 'in progress', 'planned'];


 class BookEntry extends HTMLElement {
    /**
     * 
     * @class BookEntry
     * The BookEntry class, which represents a book entry, which includes a book and the requisite information like title, ISBN, and authorName, as well as ancillary information like the status of being read, 
     * the current review for the book, the genres the book is tagged in, the date the book was read (if finished) and the current page progress of the user for that book. 
     * @description The constructor for the BookEntry Class, which takes in 9 pieces of information to represent a BookEntry, 
     * which is more than simply a book, it is also user information related to reading that book. 
     * @param {string} tags - a string to hold the tags representing genres for the book
     * @param {Date} dateRead - the date the book was read
     * @param {Number} rating - a number rating, representing the rating the user has given the book
     * @param {Number} pageProgress - a number representing the number of pages currently read for the book, should be a positive integer
     * @param {string} status - a string representing the current status of the book being planned, in progress, or completed
     * @param {string} reviewTextBody - a string representing the review for the book
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
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../bookEntries/bookEntries.css');;

        // apply css link to the shadow DOM
        this.shadowRoot.appendChild(link);

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
        const extrasWrapper = document.createElement('span');
        extrasWrapper.classList.add('entry-extras');
        
        const extrasSummary = document.createElement('summary');
        extrasSummary.innerHTML = '';
        extrasWrapper.appendChild(extrasSummary);
        
        const genreList = document.createElement('ul');
        genreList.classList.add('entry-genres');
        genreList.innerHTML = 'N/A';
        extrasWrapper.appendChild(genreList);

        entryWrapper.appendChild(extrasWrapper);

        // entry review
        const entryReviewWrapper = document.createElement('details');
        entryReviewWrapper.classList.add('entry-review');
        const reviewSummary = document.createElement('summary');
        reviewSummary.innerHTML = 'View Review';
        entryReviewWrapper.appendChild(reviewSummary);
        const reviewBody = document.createElement('p');
        reviewBody.innerHTML = 'N/A';
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
        if(data.modalBookTitle) {
            const entryName = entryDiv.querySelector('.entry-name');
            entryName.innerHTML = `${data.modalBookTitle}`;
        }

        if(data.modalBookRating) {
            const entryRating = entryDiv.querySelector('.entry-rating');
            const entryScore = entryRating.querySelector('.entry-score');
            entryScore.innerHTML = `${data.modalBookRating}`;
        }

        if(data.modalBookCurrPageNum1 && data.modalBookCurrPageNum2) {
            const entryProgress = entryDiv.querySelector('.entry-progress');
            entryProgress.innerHTML = `${data.modalBookCurrPageNum1}/${data.modalBookCurrPageNum2}`;
        }

        if(data.modalBookGenre) {
            const extras = entryDiv.querySelector('.entry-extras');
            const extrasGenresTitle = extras.querySelector('.entry-genres');
            extrasGenresTitle.innerHTML = `${data.modalBookGenre}`;
        }
        

        if(data.modalBookReview) {
            const entryReviewWrapper = entryDiv.querySelector('.entry-review');
            const reviewBody = entryReviewWrapper.querySelector('p');
            reviewBody.innerHTML = `${data.modalBookReview}`;
        }

        if(data.modalBookLnk) {
            const entryCover = entryDiv.querySelector('.entry-cover');
            const cover = entryCover.querySelector('.entry-img');
            cover.alt = `${data.modalBookTitle}`;
            cover.src = `${data.modalBookLnk}`;
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
        document.querySelector('form').reset();
        
    });

    // close the dialog if the user clicks outside of it
    overlay.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelector('form').reset();
        
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
    const deleteEntry = prompt("Are you sure you want to delete this book entry? (y/n)");
    if(deleteEntry == 'y' || deleteEntry == 'Y' || deleteEntry == 'yes' || deleteEntry == 'YES' || deleteEntry == 'Yes'){
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
    else{
        console.log("User said no");
    }
}

function getEntriesFromStorage(title) {
    if (window.localStorage.getItem(title) === null) {
      return [];
    }
    
    return JSON.parse(window.localStorage.getItem(title));
  
}
customElements.define('book-entry', BookEntry);