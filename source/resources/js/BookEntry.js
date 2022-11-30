/**
 * @global
 * @constant STATUSES
*  The STATUSES constant which holds the 3 possibilities for the status variable: completed, in progress, and planned
*
*/
const STATUSES = ['completed', 'in progress', 'planned'];

/** Main class for CRUD for the Book Entries. */
class BookEntry {
  /**
     *
     * The BookEntry class, which represents a book entry, which includes a book and the requisite information like title, ISBN, and authorName, as well as ancillary information like the status of being read,
     * the current review for the book, the genres the book is tagged in, the date the book was read (if finished) and the current page progress of the user for that book.
     * @description The constructor for the BookEntry Class, which takes in 9 pieces of information to represent a BookEntry,
     * which is more than simply a book, it is also user information related to reading that book.
     * @param {Set} tags - a Set DS to hold the tags representing genres for the book
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
  constructor(tags, dateRead, rating, pageProgress, status, reviewTextBody, ISBN, authorName, title) {
    this.setTags(tags);
    this.setDateRead(dateRead);
    this.setRating(rating);
    this.setPageProgress(pageProgress);
    this.setStatus(status);
    this.setReviewTextBody(reviewTextBody);
    this.setISBN(ISBN);
    this.setAuthorName(authorName);
    this.setTitle(title);
  }

  /**
     *
     * @function printBookEntry
     * @description Function which returns a formatted string representing the BookEntry
     * @return {string}
     */
  printBookEntry() {
    return `${this.title} by: ${this.authorName}, rating: ${this.rating}, progress: ${this.pageProgress}, status: ${this.status}, Date read: ${this.dateRead} \nReview: ${this.reviewTextBody}, ISBN: ${this.ISBN}, tags: ${new Array(...this.tags).join(', ')}`;
  }

  /**
     * @function addToTags
     * @description Function to add to the tags Set which represents genres for the book, will not add invalid tags passed in, need to pass in a Set of the tags (strings)
     * @param {Set} tagsToAdd
     */
  addToTags(tagsToAdd) {
    if (tagsToAdd === null || tagsToAdd === undefined ) {
      console.error('The tags to set was null or undefined, did not add:', tagsToAdd);
      return;
    }
    if (tagsToAdd.size === 0) {
      console.error('The tags set was empty, did not add:', tagsToAdd);
      return;
    }
    if (typeof tagsToAdd === 'string') {
      this.tags.add(tagsToAdd);
      return;
    }
    for (let i = 0; i < tagsToAdd.length; i++) {
      this.tags.add(tagsToAdd[i]);
    }
  }

  // Setter functions, value will not get set in the error case, and thus be undefined for the object, will log an error statement to console.
  /**
     * @function setTags
     * @description Function to set the tags Set which represents genres for the book, will not set invalid tags passed in
     * @param {Set} tagsToSet
     */
  setTags(tagsToSet) {
    if (tagsToSet === null || tagsToSet === undefined ) {
      console.error('The tags to set was null or undefined, did not set:', tagsToSet);
      return;
    }
    if (tagsToSet.size === 0) {
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
  setDateRead(dateToSet) {
    if (dateToSet === null || dateToSet === undefined ) {
      console.error('The Date to set was null or undefined, did not set:', dateToSet);
      return;
    }
    if (typeof dateToSet != 'object') {
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
  setRating(ratingToSet) {
    if (ratingToSet === null || ratingToSet === undefined ) {
      console.error('The ratings to set was null or undefined, did not set:', ratingToSet);
      return;
    }
    if (typeof ratingToSet != 'number') {
      console.error('The rating passed in was not of type Number, did not set:', ratingToSet);
      return;
    }
    if (ratingToSet < 0) {
      console.error('The rating passed in was not a positive rating, did not set:', ratingToSet);
      return;
    }
    if (ratingToSet < 0 && ratingToSet > 10) {
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
  setPageProgress(pageProgressToSet) {
    if (pageProgressToSet === null || pageProgressToSet === undefined ) {
      console.error('The page progress to set was null or undefined, did not set:', pageProgressToSet);
      return;
    }
    if (typeof pageProgressToSet != 'number') {
      console.error('The page progress passed in was not of type Number, did not set:', pageProgressToSet);
      return;
    }
    if (!Number.isInteger(pageProgressToSet)) {
      console.error('The page progress passed in was of type Number, but it was a float, did not set:', pageProgressToSet);
      return;
    }
    if (pageProgressToSet < 0) {
      console.error('The page progress passed in was not a positive page progress, did not set:', pageProgressToSet);
      return;
    }
    if (pageProgressToSet < this.pageProgress) {
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
  setStatus(statusToSet) {
    if (statusToSet === null || statusToSet === undefined ) {
      console.error('The status to set was null or undefined, did not set:', statusToSet);
      return;
    }
    if (typeof statusToSet !== 'string') {
      console.error('The status passed in was not of type string, did not set:', statusToSet);
      return;
    }
    if (statusToSet !== STATUSES[0] && statusToSet !== STATUSES[1] && statusToSet !== STATUSES[2]) {
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
  setReviewTextBody(reviewTextBodyToSet) {
    if (reviewTextBodyToSet === null || reviewTextBodyToSet === undefined ) {
      console.error('The review to set was null or undefined, did not set:', reviewTextBodyToSet);
      return;
    }
    if (typeof reviewTextBodyToSet !== 'string') {
      console.error('The review passed in was not of type string, did not set:', reviewTextBodyToSet);
      return;
    }
    if (reviewTextBodyToSet === '') {
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
  setISBN(ISBNtoSet) {
    if (ISBNtoSet === null || ISBNtoSet === undefined ) {
      console.error('The ISBN to set was null or undefined, did not set:', ISBNtoSet);
      return;
    }
    if (typeof ISBNtoSet !== 'string') {
      console.error('The ISBN passed in was not of type string, did not set:', ISBNtoSet);
      return;
    }
    if (ISBNtoSet.length < 10) {
      console.error('The ISBN passed in was not valid, it needs to be at least 10 characters:', ISBNtoSet);
      return;
    }
    if (ISBNtoSet.length > 13) {
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
  setAuthorName(authorNameToSet) {
    if (authorNameToSet === null || authorNameToSet === undefined ) {
      console.error('The author name to set was null or undefined, did not set:', authorNameToSet);
      return;
    }
    if (typeof authorNameToSet !== 'string') {
      console.error('The author name passed in was not of type string, did not set:', authorNameToSet);
      return;
    }
    if (authorNameToSet.length < 1) {
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
  setTitle(titleToSet) {
    if (titleToSet === null || titleToSet === undefined ) {
      console.error('The title to set was null or undefined, did not set:', titleToSet);
      return;
    }
    if (typeof titleToSet !== 'string') {
      console.error('The title passed in was not of type string, did not set:', titleToSet);
      return;
    }
    if (titleToSet.length < 1) {
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
    *    @param {Set} pTags - a Set DS to hold the tags representing genres for the book
     * @param {Date} pDateRead - the date the book was read
     * @param {Number} pRating - a number rating, representing the rating the user has given the book
     * @param {Number} pPageProgress - a number representing the number of pages currently read for the book, should be a positive integer
     * @param {string} pStatus - a string representing the current status of the book being planned, in progress, or completed
     * @param {string} reviewTextBody - a string representing the review for the book
     * @param {string} ISBN - a string representing the ISBN of the book
     * @param {string} authorName - a string representing the book author's name, should be both first and sur name
     * @param {string} title - a string representing the title of the book
     * @return {BookEntry}
*/
function bookentry(pTags, pDateRead, pRating, pPageProgress, pStatus, reviewTextBody, ISBN, authorName, title) {
  return new BookEntry(pTags, pDateRead, pRating, pPageProgress, pStatus, reviewTextBody, ISBN, authorName, title);
}

/**
 *
 * @global module.exports
 * @description module of class file to export
*/
module.exports = {BookEntry, STATUSES, bookentry}; // to use require in the test file, we must label functions or classes as exports

