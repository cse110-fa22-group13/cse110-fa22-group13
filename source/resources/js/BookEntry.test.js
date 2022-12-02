/**
 * @jest-environment jsdom
 */
 const STATUSES = ['completed', 'in progress', 'planned']


//not working
 test('in progress', () => {
  const bookEntry = document.createElement('book-entry');
  console.log(bookEntry);
  const sRoot = bookEntry.shadowRoot;
  console.log(sRoot);
  const bookEntryStyleList = document.getElementsByTagName('div');
  console.log(bookEntryStyleList[0]);
  console.log(bookEntryStyleList.length);
 
  expect(bookEntry).not.toBeNull();
}); 


//test constructor
test('not null constructor', () => {
  const bookEntry = document.createElement('book-entry');
  expect(bookEntry).not.toBeNull();
}); 
test('set to null', () => {
  let bookEntry = document.createElement('book-entry');
  bookEntry = null;
  expect(bookEntry).toBeNull();
}); 

//represents the user using the form and setting values, there is input validation on the form itself
test('constructor with simulated added values', () => {
  const bookEntry = document.createElement('book-entry');
  bookEntry.title = 'Stranger in a Strange Land';
  expect(bookEntry.title).toBe('Stranger in a Strange Land');
  bookEntry.authorName = 'Robert Heinlein';
  expect(bookEntry.authorName).toBe('Robert Heinlein');

  bookEntry.rating = 9;
  expect(bookEntry.rating).toBe(9);
  bookEntry.pageProgress = 340;
  expect(bookEntry.pageProgress).toBe(340);
  bookEntry.status = STATUSES[0];
  expect(bookEntry.status).toBe('completed');

  bookEntry.dateRead = 'Thu Nov 17 2022 03:24:00 GMT-0800 (Universal Standard Time)';
  expect(bookEntry.dateRead).toBe('Thu Nov 17 2022 03:24:00 GMT-0800 (Universal Standard Time)');
  bookEntry.reviewBodyText = 'I thought it was poignantly pointless.';
  expect(bookEntry.reviewBodyText).toBe('I thought it was poignantly pointless.');

  bookEntry.ISBN = 'A4238A53I1';
  expect(bookEntry.ISBN).toBe('A4238A53I1');
  bookEntry.tags = 'Sci-Fi, Classic';
  expect(bookEntry.tags).toBe('Sci-Fi, Classic');
  
}); 