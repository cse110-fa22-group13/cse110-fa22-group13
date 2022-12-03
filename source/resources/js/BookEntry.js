/**
 * 
 * @class BookEntry
 * The BookEntry class, a custom HTML Element used to display a book entry in a list.
 * 
 * @description The BookEntry Class, which defines the custom book-entry htmlelement.
 */
class BookEntry extends HTMLElement {
    
    /**
     * Constructor for the book-entry webcomponent. 
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
        cover.src = "https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/resources/images/icons/Books-Icon.png";
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
      * @param {any} Object - Data used to populate the entry with data from local storage   
      */
    data(data) {
        if(!data) return;
        
        // the entry container
        const entryDiv = this.shadowRoot.querySelector('.entry');
        
        // update the title
        if(data.modalBookTitle) {
            const entryName = entryDiv.querySelector('.entry-name');
            entryName.innerHTML = `${data.modalBookTitle}`;
        }

        // update the rating
        if(data.modalBookRating) {
            const entryRating = entryDiv.querySelector('.entry-rating');
            const entryScore = entryRating.querySelector('.entry-score');
            entryScore.innerHTML = `${data.modalBookRating}`;
        }

        // update the page progress
        if(data.modalBookCurrPageNum1 && data.modalBookCurrPageNum2) {
            const entryProgress = entryDiv.querySelector('.entry-progress');
            entryProgress.innerHTML = `${data.modalBookCurrPageNum1}/${data.modalBookCurrPageNum2}`;
        }

        // update the genre
        if(data.modalBookGenre) {
            const extras = entryDiv.querySelector('.entry-extras');
            const extrasGenresTitle = extras.querySelector('.entry-genres');
            extrasGenresTitle.innerHTML = `${data.modalBookGenre}`;
        }
        
        // update the review content
        if(data.modalBookReview) {
            const entryReviewWrapper = entryDiv.querySelector('.entry-review');
            const reviewBody = entryReviewWrapper.querySelector('p');
            reviewBody.innerHTML = `${data.modalBookReview}`;
        }

        // update the book cover
        if(data.modalBookLnk) {
            const entryCover = entryDiv.querySelector('.entry-cover');
            const cover = entryCover.querySelector('.entry-img');
            cover.alt = `${data.modalBookTitle}`;
            cover.src = `${data.modalBookLnk}`;
        }
    }
}

/**
 * This function shows the content dialog box populated with information pulled
 * from the entry passed as an argument
 * 
 * @param {any} entry - The entry whose info is being updated by the dialog
 */
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

    // store the data in local storage if the user hits submit
    formRef.addEventListener('submit', () => {

        modal.classList.remove('active');
        overlay.classList.remove('active');
        const grabEntry = entry.shadowRoot.querySelector('.entry');
        const entryKey = grabEntry.classList[2];

        const formData = new FormData(formRef);
        const entryObject = {};
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

/**
 *  This function deletes an entry from local storage
 * 
 * @param {any} entry - Entry to be deleted
 */
function deleteStorage(entry) {
    const deleteEntry = prompt("Are you sure you want to delete this book entry? (y/n)");
    const userInput = deleteEntry.toUpperCase();
    if(userInput == 'Y' || userInput == 'YES'){
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


/**
 * 
 * @param {any} title - title of the entry
 * @returns object, if it exists, empty array otherwise
 */
function getEntriesFromStorage(title) {
    if (window.localStorage.getItem(title) === null) {
      return [];
    }
    
    return JSON.parse(window.localStorage.getItem(title));
  
}

// define the custom HTMLElement
customElements.define('book-entry', BookEntry);