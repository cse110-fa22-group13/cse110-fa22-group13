/**
 * @jest-environment jsdom
 */

//test constructor
test('not null constructor', () => {
  const bookList = document.createElement('book-list');
  expect(bookList).not.toBeNull();
}); 
test('set to null', () => {
  let bookList = document.createElement('book-list');
  bookList = null;
  expect(bookList).toBeNull();
}); 
