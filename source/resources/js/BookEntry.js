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
        this.attachShadow({ mode: 'open' });

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

        // apply style to the shadow DOM
        this.shadowRoot.append(styles);

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

        deleteButton.addEventListener('click', () => {
            entryWrapper.remove();
        });

        deleteButtonWrapper.appendChild(deleteButton);
        entryWrapper.appendChild(deleteButton);



        this.shadowRoot.append(entryWrapper);

    }


    /**
     * @function addToTags 
     * @description Function to add to the tags Set which represents genres for the book, will not add invalid tags passed in, need to pass in a Set of the tags (strings)
     * @param {Set} tagsToAdd
     */
         addToTags(tagsToAdd){
            if(tagsToAdd === null || tagsToAdd === undefined ) {
                console.error('The tags to set was null or undefined, did not add:', tagsToAdd);
                return;
            }  
            if(tagsToAdd.size === 0){
                console.error('The tags set was empty, did not add:', tagsToAdd);
                return;
            }
            if(typeof tagsToAdd === 'string'){
                this.tags.add(tagsToAdd);
                return;
            }
            for (let i = 0; i < tagsToAdd.length; i++) {
                this.tags.add(tagsToAdd[i]);
            }
          } 

    //Setter functions, value will not get set in the error case, and thus be undefined for the object, will log an error statement to console.
    /**
     * @function setTags 
     * @description Function to set the tags Set which represents genres for the book, will not set invalid tags passed in
     * @param {Set} tagsToSet
     */
     setTags(tagsToSet){
        if(tagsToSet === null || tagsToSet === undefined ) {
            console.error('The tags to set was null or undefined, did not set:', tagsToSet);
            return;
        }  
        if(tagsToSet.size === 0){
            console.error('The tags set was empty, did not set:', tagsToSet);
            return;
        }
        this.tags = tagsToSet;
      } 

    /**
     * 
     * @function setDateRead 
     * @description Function to set the dateRead which represents the date the book was read, will not set invalid Dates
     * @param {Date} dateToSet
     */
    setDateRead(dateToSet){
        if(dateToSet === null || dateToSet === undefined ){
            console.error('The Date to set was null or undefined, did not set:', dateToSet);
            return;
        }  
        if(typeof dateToSet != 'object'){
            console.error('The date passed in was not an object, did not set:', dateToSet);
            return;
        }
        this.dateRead = dateToSet;
    } 

    /**
     * 
     * @function setRating 
     * @description Function to set the rating for the book, which should be between 0 and 10, will not set invalid ratings
     * @param {Number} ratingToSet
     */
     setRating(ratingToSet){
        if(ratingToSet === null || ratingToSet === undefined ){
            console.error('The ratings to set was null or undefined, did not set:', ratingToSet);
            return;
        }  
        if(typeof ratingToSet != 'number'){
            console.error('The rating passed in was not of type Number, did not set:', ratingToSet);
            return;
        }
        if(ratingToSet < 0){
            console.error('The rating passed in was not a positive rating, did not set:', ratingToSet);
            return;
        }
        if(ratingToSet < 0 && ratingToSet > 10){
            console.error('The rating passed in was not between 0 and 10, end inclusive, did not set:', ratingToSet);
            return;
        }
        this.rating = ratingToSet;
    } 

    /**
     * 
     * @function setPageProgress 
     * @description Function to set the pageProgress which represents the current page number the user is on for the book, will not set invalid page progress
     * @param {Number} pageProgressToSet
     */
     setPageProgress(pageProgressToSet){
        if(pageProgressToSet === null || pageProgressToSet === undefined ){
            console.error('The page progress to set was null or undefined, did not set:', pageProgressToSet);
            return;
        }  
        if(typeof pageProgressToSet != 'number'){
            console.error('The page progress passed in was not of type Number, did not set:', pageProgressToSet);
            return;
        }
        if(!Number.isInteger(pageProgressToSet)){
            console.error('The page progress passed in was of type Number, but it was a float, did not set:', pageProgressToSet);
            return;
        }
        if(pageProgressToSet < 0){
            console.error('The page progress passed in was not a positive page progress, did not set:', pageProgressToSet);
            return;
        }
        if(pageProgressToSet < this.pageProgress){
            console.error('The page progress passed in was less than the current page progress, did not set:', pageProgressToSet);
            return;
        }
        this.pageProgress = pageProgressToSet;
    } 


    /**
     * @function setStatus 
     * @description Function to set the status of the book which represents the read status of the book, can be planned, in progress, and completed, will not set invalid statuses
     * @param {string} statusToSet
     */
     setStatus(statusToSet){
        if(statusToSet === null || statusToSet === undefined ){
            console.error('The status to set was null or undefined, did not set:', statusToSet);
            return;
        }  
        if(typeof statusToSet !== 'string'){
            console.error('The status passed in was not of type string, did not set:', statusToSet);
            return;
        }
        if(statusToSet !== STATUSES[0] && statusToSet !== STATUSES[1] && statusToSet !== STATUSES[2]){
            console.error('The status passed in was not one of the 3 possibilities, completed, in progress, and planned, did not set:', statusToSet);
            return;
        }
        this.status = statusToSet;
    } 

    /**
     * @function setReviewTextBody
     * @description Function to set the user's review for the book, will not set invalid reviews
     * @param {string} reviewTextBodyToSet
     */
     setReviewTextBody(reviewTextBodyToSet){
        if(reviewTextBodyToSet === null || reviewTextBodyToSet === undefined ){
            console.error('The review to set was null or undefined, did not set:', reviewTextBodyToSet);
            return;
        }  
        if(typeof reviewTextBodyToSet !== 'string'){
            console.error('The review passed in was not of type string, did not set:', reviewTextBodyToSet);
            return;
        }
        if(reviewTextBodyToSet === ''){
            console.error('The review passed in was empty, did not set:', reviewTextBodyToSet);
            return;
        }
        this.reviewTextBody = reviewTextBodyToSet;
    } 

    /**
     * @function setISBN
     * @description Function to set the ISBN for the book, will not set invalid ISBNs
     * @param {string} ISBNtoSet
     */
     setISBN(ISBNtoSet){
        if(ISBNtoSet === null || ISBNtoSet === undefined ){
            console.error('The ISBN to set was null or undefined, did not set:', ISBNtoSet);
            return;
        }  
        if(typeof ISBNtoSet !== 'string'){
            console.error('The ISBN passed in was not of type string, did not set:', ISBNtoSet);
            return;
        }
        if(ISBNtoSet.length < 10){
            console.error('The ISBN passed in was not valid, it needs to be at least 10 characters:', ISBNtoSet);
            return;
        }
        if(ISBNtoSet.length > 13){
            console.error('The ISBN passed in was not valid, it needs to be at most 13 characters:', ISBNtoSet);
            return;
        }
        this.ISBN = ISBNtoSet;
    } 

    /**
     * @function setAuthorName
     * @description Function to set the book's author's name, will not set invalid author name's
     * @param {string} authorNameToSet
     */
     setAuthorName(authorNameToSet){
        if(authorNameToSet === null || authorNameToSet === undefined ){
            console.error('The author name to set was null or undefined, did not set:', authorNameToSet);
            return;
        }  
        if(typeof authorNameToSet !== 'string'){
            console.error('The author name passed in was not of type string, did not set:', authorNameToSet);
            return;
        }
        if(authorNameToSet.length < 1){
            console.error('The author name passed in was not valid, it was of 0 length', authorNameToSet);
            return;
        }
        this.authorName = authorNameToSet;
    } 

    /**
     * @function setTitle
     * @description Function to set the book's title, will not set invalid titles
     * @param {string} titleToSet
     */
     setTitle(titleToSet){
        if(titleToSet === null || titleToSet === undefined ){
            console.error('The title to set was null or undefined, did not set:', titleToSet);
            return;
        }  
        if(typeof titleToSet !== 'string'){
            console.error('The title passed in was not of type string, did not set:', titleToSet);
            return;
        }
        if(titleToSet.length < 1){
            console.error('The title passed in was not valid, it was of 0 length', titleToSet);
            return;
        }
        this.title = titleToSet;
    } 



}
/**
 * 
 * @function bookentry
 * @description function which creates a new bookEntry object outside of the class.
*/
function bookentry(pTags, pDateRead, pRating, pPageProgress, pStatus, reviewTextBody, ISBN, authorName, title) {
    return new BookEntry(pTags, pDateRead, pRating, pPageProgress, pStatus, reviewTextBody, ISBN, authorName, title);
    
}

customElements.define('book-entry', BookEntry);