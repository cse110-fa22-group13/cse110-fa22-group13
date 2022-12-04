/**
 * @jest-environment jsdom
 */

// test constructor
test('not null constructor', () => {
  const bookEntries = document.createElement('book-entries');
  expect(bookEntries).not.toBeNull();
});
test('set to null', () => {
  let bookEntries = document.createElement('book-entries');
  bookEntries = null;
  expect(bookEntries).toBeNull();
});
