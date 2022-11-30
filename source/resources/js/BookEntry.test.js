/**
* The unit test file for the BookEntry class - BookEntry.js
*@TestFile
*/
const BookEntryClass = require('./BookEntry.js');
// import {BookEntryClass} from './BookEntry.js';

// test constructor/setters
test('valid constructor', () => {
  // const testBookEntryForConstructor = new BookEntry(new Set(['Sci-fi']), new Date('November 17, 2022 03:24:00'), 9, 340, 'completed', 'I thought it was poignantly pointless.', 'A4238A53I1', 'Robert Heinlein', 'Stranger in a Strange Land')  ;
  const testBookEntryForConstructor = BookEntryClass.bookentry(new Set(['Sci-fi', 'Fiction']), new Date('November 17, 2022 03:24:00'), 9, 340, 'completed', 'I thought it was poignantly pointless.', 'A4238A53I1', 'Robert Heinlein', 'Stranger in a Strange Land');

  expect(testBookEntryForConstructor.printBookEntry()).toBe('Stranger in a Strange Land by: Robert Heinlein, rating: 9, progress: 340, status: completed, Date read: Thu Nov 17 2022 03:24:00 GMT+0000 (Coordinated Universal Time) \nReview: I thought it was poignantly pointless., ISBN: A4238A53I1, tags: Sci-fi, Fiction');
});

test('empty string constructor', () => {
  const testEntryEmptyStrings = BookEntryClass.bookentry('', '', '', '', '', '', '', '', '');
  expect(testEntryEmptyStrings.printBookEntry()).toBe('undefined by: undefined, rating: undefined, progress: undefined, status: undefined, Date read: undefined \nReview: undefined, ISBN: undefined, tags: ');
});

test('only title constructor', () => {
  const testEntryOnlyTitle = BookEntryClass.bookentry('', '', '', '', '', '', 'ISBN', '', 'title');
  expect(testEntryOnlyTitle.printBookEntry()).toBe('title by: undefined, rating: undefined, progress: undefined, status: undefined, Date read: undefined \nReview: undefined, ISBN: undefined, tags: ');
});

test('empty/undefined constructor', () => {
  const testIncorrectConstructor = BookEntryClass.bookentry();
  expect(testIncorrectConstructor.ISBN).toBe(undefined);
  expect(testIncorrectConstructor.authorName).toBe(undefined);
  expect(testIncorrectConstructor.dateRead).toBe(undefined);
  expect(testIncorrectConstructor.pageProgress).toBe(undefined);
  expect(testIncorrectConstructor.rating).toBe(undefined);
  expect(testIncorrectConstructor.reviewTextBody).toBe(undefined);
  expect(testIncorrectConstructor.status).toBe(undefined);
  expect(testIncorrectConstructor.tags).toBe(undefined);
  expect(testIncorrectConstructor.title).toBe(undefined);
});

test('non-set tag constructor', () => {
  const testEntryUndefinedDate = BookEntryClass.bookentry('sci-fi, fantasy', '', '', '', '', '', '', '', '');
  expect(testEntryUndefinedDate.tags).toBe('sci-fi, fantasy');
});

test('8/9 entries constructor', () => {
  const testEntry8Entries = BookEntryClass.bookentry('', '', '', '', '', '', '', '');
  expect(testEntry8Entries.ISBN).toBe(undefined);
  expect(testEntry8Entries.authorName).toBe(undefined);
  expect(testEntry8Entries.dateRead).toBe(undefined);
  expect(testEntry8Entries.pageProgress).toBe(undefined);
  expect(testEntry8Entries.rating).toBe(undefined);
  expect(testEntry8Entries.reviewTextBody).toBe(undefined);
  expect(testEntry8Entries.status).toBe(undefined);
  expect(testEntry8Entries.tags).toBe(''); // should be empty set
  expect(testEntry8Entries.title).toBe(undefined);
});

test('space string constructor', () => {
  const testEntryEmptyStrings = BookEntryClass.bookentry(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  console.log(testEntryEmptyStrings.printBookEntry());
  expect(testEntryEmptyStrings.printBookEntry()).toBe('  by:  , rating: undefined, progress: undefined, status: undefined, Date read: undefined \nReview:  , ISBN: undefined, tags:  ');
});

test('random undefined constructor', () => {
  const testEntryRandomUndefined = BookEntryClass.bookentry('', undefined, '', undefined, undefined, '', undefined, undefined, undefined);
  expect(testEntryRandomUndefined.printBookEntry()).toBe('undefined by: undefined, rating: undefined, progress: undefined, status: undefined, Date read: undefined \nReview: undefined, ISBN: undefined, tags: ');
});

test('empty date set constructor', () => {
  const testEntryEmptyDateSet = BookEntryClass.bookentry(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  testEntryEmptyDateSet.setDateRead('');
  expect(testEntryEmptyDateSet.dateRead).toBe(undefined);
});

test('setting all constructor', () => {
  const testEntryEmptyDateSet = BookEntryClass.bookentry(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  testEntryEmptyDateSet.setTags(['tag']);
  testEntryEmptyDateSet.setAuthorName('tag');
  testEntryEmptyDateSet.setDateRead();
  testEntryEmptyDateSet.setISBN('102854810328');
  testEntryEmptyDateSet.setPageProgress(4);
  testEntryEmptyDateSet.setRating(8);
  testEntryEmptyDateSet.setReviewTextBody('tag');
  testEntryEmptyDateSet.setStatus('planned');
  testEntryEmptyDateSet.setTitle('tag');
  expect(testEntryEmptyDateSet.printBookEntry()).toBe('tag by: tag, rating: 8, progress: 4, status: planned, Date read: undefined \nReview: tag, ISBN: 102854810328, tags: tag');
});

test('set ISBN too few constructor', () => {
  const testEntryIsbnTooFew = BookEntryClass.bookentry(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  testEntryIsbnTooFew.setISBN('A');
  expect(testEntryIsbnTooFew.ISBN).toBe(undefined);
  expect(testEntryIsbnTooFew.ISBN).not.toBe('A');
});

test('set ISBN too long ', () => {
  const testISBNTooLong = BookEntryClass.bookentry(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  testISBNTooLong.setISBN('FNAUFAS1FAS1FA2FFIDSANNFMASF');
  expect(testISBNTooLong.ISBN).toBe(undefined);
  expect(testISBNTooLong.ISBN).not.toBe('FNAUFAS1FAS1FA2FFIDSANNFMASF');
});

test('set float page number', () => {
  const testFloatPageNum = BookEntryClass.bookentry(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  testFloatPageNum.setPageProgress(5.43);
  expect(testFloatPageNum.pageProgress).toBe(undefined);
  expect(testFloatPageNum.pageProgress).not.toBe(5.43);
});

test('set page negative', () => {
  const testFloatPageNum = BookEntryClass.bookentry(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  testFloatPageNum.setPageProgress(-5);
  expect(testFloatPageNum.pageProgress).toBe(undefined);
  expect(testFloatPageNum.pageProgress).not.toBe(-5);
});

test('all null constructor', () => {
  const testEntryAllNull = BookEntryClass.bookentry(null, null, null, null, null, null, null, null, null);
  expect(testEntryAllNull.ISBN).toBe(undefined);
  expect(testEntryAllNull.authorName).toBe(undefined);
  expect(testEntryAllNull.dateRead).toBe(undefined);
  expect(testEntryAllNull.pageProgress).toBe(undefined);
  expect(testEntryAllNull.rating).toBe(undefined);
  expect(testEntryAllNull.reviewTextBody).toBe(undefined);
  expect(testEntryAllNull.status).toBe(undefined);
  expect(testEntryAllNull.tags).toBe(undefined);
  expect(testEntryAllNull.title).toBe(undefined);
});


test('null constructor', () => {
  const testEntryNull = BookEntryClass.bookentry(null);
  expect(testEntryNull.ISBN).toBe(undefined);
  expect(testEntryNull.authorName).toBe(undefined);
  expect(testEntryNull.dateRead).toBe(undefined);
  expect(testEntryNull.pageProgress).toBe(undefined);
  expect(testEntryNull.rating).toBe(undefined);
  expect(testEntryNull.reviewTextBody).toBe(undefined);
  expect(testEntryNull.status).toBe(undefined);
  expect(testEntryNull.tags).toBe(undefined);
  expect(testEntryNull.title).toBe(undefined);
});

test('addToTags function test', () => {
  const testAddToSet = BookEntryClass.bookentry(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  const setToCompareTo = new Set(['hey']);
  setToCompareTo.add('ok');
  testAddToSet.tags = new Set(['hey']);
  testAddToSet.addToTags('ok');

  expect(testAddToSet.tags.toString()).toBe(setToCompareTo.toString());
  expect(testAddToSet.tags).toStrictEqual(setToCompareTo);

  testAddToSet.addToTags('then');
  setToCompareTo.add('then');
  expect(testAddToSet.tags).toStrictEqual(setToCompareTo);
  testAddToSet.addToTags('General');
  setToCompareTo.add('General');
  expect(testAddToSet.tags).toStrictEqual(setToCompareTo);
  testAddToSet.addToTags('Kenobi');
  setToCompareTo.add('Kenobi');
  expect(testAddToSet.tags).toStrictEqual(setToCompareTo);
});

test('addToTags function test failure', () => {
  const testAddToSet = BookEntryClass.bookentry(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  const setToCompareTo = new Set(['hey']);
  setToCompareTo.add('ok');
  testAddToSet.tags = new Set(['hey']);
  testAddToSet.addToTags('ok');
  testAddToSet.addToTags('there');

  expect(testAddToSet.tags.toString()).not.toBe(setToCompareTo);

  testAddToSet.addToTags('then');
  setToCompareTo.add('then.');
  expect(testAddToSet.tags.toString()).not.toBe(setToCompareTo);
});

