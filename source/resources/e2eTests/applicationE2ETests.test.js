
describe('Basic user flow for PWA Usage', () => {
    beforeAll(async () => {
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/bookEntries/bookEntries.html');
      });

//checking book entries page, main functionality page
      it('check icon on bookentries page', async () => {
        console.log('Checking icon img on bookentries page...');
        // Query select the icon img
        const images = await page.$$('img');
        const src = await images[0].getProperty('src');
        const text = await src.jsonValue();

        expect(text).toBe('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/resources/images/vectors/Logo.svg');
      }, 5000);

      //check the add List button
      it('Check that the add-List button works', async () =>{
        console.log("Testing the 'add list' button...");

        // Query select the add List button
        let listButtonWorks = true;
        const listButton = await page.$('#add-entry .add-button');

        let buttonText = await listButton.getProperty('innerText');
        buttonText = await buttonText.jsonValue();
        console.log(buttonText);

        page.on('dialog', async dialog => {
          const message = await dialog.message();
          console.log(message);

          if (message == 'Are you sure you want to delete this book entry? (y/n)'){
            console.log('yes')
            await dialog.accept('y');
          } else if (message == 'Name of new list?'){
            console.log('Test')
            await dialog.accept("Test");
          } else {
            console.log('ok')
            await dialog.accept();
          }
        });

        // click the list and type a name for the new list
        await listButton.click();

        // check to see if the list is there
        let list = await page.$('book-list');
        let shadowRoot = await list.getProperty('shadowRoot');
        let label = await shadowRoot.$('.list-title');
        label = await label.getProperty('innerText');
        label = await label.jsonValue();
        if(label != "Test") { listButtonWorks = false;}

        // reload the page
        await page.reload();

        // make sure the list still exists
        list = await page.$('book-list');
        shadowRoot = await list.getProperty('shadowRoot');
        label = await shadowRoot.$('.list-title');
        label = await label.getProperty('innerText');
        label = await label.jsonValue();
        if(label != "Test") { listButtonWorks = false;}
        
        expect(listButtonWorks).toBe(true);
      }, 10000);

      it('Check that the book entries are being added', async () => {
        console.log("Checking Book Entries...");
        let bookAdds = true;

        // get the add button
        let list = await page.$('book-list');
        let shadow = await list.getProperty('shadowRoot');
        let bookButton = await shadow.$('.add-button');
        let buttonText = await bookButton.getProperty('innerText');
        buttonText = await buttonText.jsonValue();
        console.log(buttonText);

        // click the add button
        await bookButton.click();
        
        // wait for the dialog box
        await page.waitForSelector('.modal', {visible: true});
        const submitButton = await page.$(`#new-modal-info .entry-add-button`);

        // input dialog box info
        await page.type('#modalBookTitle', 'testBook');
        await page.type('#modalBookGenre', 'testGenre');
        await page.type('#modalBookCurrPageNum1', '1');
        await page.type('#modalBookCurrPageNum2', '100');
        await page.type('#modalBookRating', '10'); 
        await page.type('#modalBookReview', 'This is a test review');
        
        // submit
        await submitButton.click();
        await page.waitForSelector('.modal', {visible: false});

        // get the book entry
        list = await page.$('book-list');
        shadow = await list.getProperty('shadowRoot');
        let entry = await shadow.$('book-entry');
        // does the book exist?
        if (entry == null) { bookAdds = false };
        shadow = await entry.getProperty('shadowRoot');

        // Check the title
        let bookTitle = await shadow.$('.entry-name');
        bookTitle = await bookTitle.getProperty('innerText');
        bookTitle = await bookTitle.jsonValue();
        if (bookTitle != 'testBook') { 
          bookAdds = false 
          console.log(`Title: ${bookTitle}`);
        };
        
        // Check the genre
        let  bookGenre = await shadow.$('.entry-genres');
        bookGenre = await bookGenre.getProperty('innerText');
        bookGenre = await bookGenre.jsonValue();
        if (bookGenre != 'testGenre') { 
          bookAdds = false 
          console.log(`Genre: ${bookGenre}`);
        };

        // check the page progress
        let  bookPages = await shadow.$('.entry-progress');
        bookPages = await bookPages.getProperty('innerText');
        bookPages = await bookPages.jsonValue();
        if (bookPages != '1/100') { 
          bookAdds = false 
          console.log(`Pages: ${bookPages}`);
        };

        // check the rating
        let bookRating = await shadow.$('.entry-rating .entry-score');
        bookRating = await bookRating.getProperty('innerText');
        bookRating = await bookRating.jsonValue();
        if (bookRating != '10') { 
          bookAdds = false 
          console.log(`Rating: ${bookRating}`);
        };

        // check the review
        let reviewDetails = await shadow.$('details');
        await reviewDetails.click();

        let bookReview = await shadow.$('.entry-review p');
        bookReview = await bookReview.getProperty('innerText');
        bookReview = await bookReview.jsonValue();
        if (bookReview != 'This is a test review') { 
          bookAdds = false 
          console.log(`Review: ${bookReview}`);
        };

        // reload the page and make sure the changes are persistent
        await page.reload();

        // get the book entry
        list = await page.$('book-list');
        shadow = await list.getProperty('shadowRoot');
        entry = await shadow.$('book-entry');
        // does the book exist?
        if (entry == null) { bookAdds = false };
        shadow = await entry.getProperty('shadowRoot');

        // Check the title
        bookTitle = await shadow.$('.entry-name');
        bookTitle = await bookTitle.getProperty('innerText');
        bookTitle = await bookTitle.jsonValue();
        if (bookTitle != 'testBook') { 
          bookAdds = false 
          console.log(`Title: ${bookTitle}`);
        };
        
        // Check the genre
        bookGenre = await shadow.$('.entry-genres');
        bookGenre = await bookGenre.getProperty('innerText');
        bookGenre = await bookGenre.jsonValue();
        if (bookGenre != 'testGenre') { 
          bookAdds = false 
          console.log(`Genre: ${bookGenre}`);
        };

        // check the page progress
        bookPages = await shadow.$('.entry-progress');
        bookPages = await bookPages.getProperty('innerText');
        bookPages = await bookPages.jsonValue();
        if (bookPages != '1/100') { 
          bookAdds = false 
          console.log(`Pages: ${bookPages}`);
        };

        // check the rating
        bookRating = await shadow.$('.entry-rating .entry-score');
        bookRating = await bookRating.getProperty('innerText');
        bookRating = await bookRating.jsonValue();
        if (bookRating != '10') { 
          bookAdds = false 
          console.log(`Rating: ${bookRating}`);
        };

        // check the review
        reviewDetails = await shadow.$('details');
        await reviewDetails.click();

        bookReview = await shadow.$('.entry-review p');
        bookReview = await bookReview.getProperty('innerText');
        bookReview = await bookReview.jsonValue();
        if (bookReview != 'This is a test review') { 
          bookAdds = false 
          console.log(`Review: ${bookReview}`);
        };

        expect(bookAdds).toBe(true);
      }, 10000);

      it('Check local storage after the book entry is added', async () => {
        //get local storage
        const lStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
        //get key as dirty string
        let bookEntryKey = lStorage['new-list0'].toString().replaceAll('\"', '');
        bookEntryKey = bookEntryKey.replace('[', '');
        bookEntryKey = bookEntryKey.replace(']', '');

        expect(lStorage[bookEntryKey]).toBe(`[{\"modalBookTitle\":\"testBook\",\"modalBookLnk\":\"\",\"modalBookGenre\":\"testGenre\",\"modalBookCurrPageNum1\":\"1\",\"modalBookCurrPageNum2\":\"100\",\"modalBookRating\":\"10\",\"modalBookReview\":\"This is a test review\"}]`);
        //empty app has two default keys in local storage
        expect(Object.keys(lStorage).length).toBe(4);
      }, 2500);  

      it('Test whether the modify button works', async () => {
        console.log("Testing the modify button");
        let alteredSuccess = true;
        
        let list = await page.$('book-list');
        let shadow = await list.getProperty('shadowRoot');
        let entry = await shadow.$('book-entry');
        shadow = await entry.getProperty('shadowRoot');
        let modifyButton = await shadow.$('.entry-img');

        // click the button
        await modifyButton.click();

        // wait for the dialog box
        await page.waitForSelector('.modal', {visible: true});
        const submitButton = await page.$(`#new-modal-info .entry-add-button`);

        // input dialog box info

        await page.evaluate( () => document.getElementById("modalBookTitle").value = "");
        await page.type('#modalBookTitle', 'Book');
        await page.evaluate( () => document.getElementById("modalBookGenre").value = "");
        await page.type('#modalBookGenre', 'Genre');
        await page.evaluate( () => document.getElementById("modalBookCurrPageNum1").value = "");
        await page.type('#modalBookCurrPageNum1', '50');
        await page.evaluate( () => document.getElementById("modalBookCurrPageNum2").value = "");
        await page.type('#modalBookCurrPageNum2', '1000');
        await page.evaluate( () => document.getElementById("modalBookRating").value = "");
        await page.type('#modalBookRating', '7'); 
        await page.evaluate( () => document.getElementById("modalBookReview").value = "");
        await page.type('#modalBookReview', 'This is a review that is changed');
        
        // submit
        await submitButton.click();
        await page.waitForSelector('.modal', {visible: false});

        // get the book entry
        list = await page.$('book-list');
        shadow = await list.getProperty('shadowRoot');
        entry = await shadow.$('book-entry');
        shadow = await entry.getProperty('shadowRoot');

        // Check the title
        bookTitle = await shadow.$('.entry-name');
        bookTitle = await bookTitle.getProperty('innerText');
        bookTitle = await bookTitle.jsonValue();
        if (bookTitle != 'Book') { 
          alteredSuccess = false 
          console.log(`Title: ${bookTitle}`);
        };
        
        // Check the genre
        bookGenre = await shadow.$('.entry-genres');
        bookGenre = await bookGenre.getProperty('innerText');
        bookGenre = await bookGenre.jsonValue();
        if (bookGenre != 'Genre') { 
          alteredSuccess = false 
          console.log(`Genre: ${bookGenre}`);
        };

        // check the page progress
        bookPages = await shadow.$('.entry-progress');
        bookPages = await bookPages.getProperty('innerText');
        bookPages = await bookPages.jsonValue();
        if (bookPages != '50/1000') { 
          alteredSuccess = false 
          console.log(`Pages: ${bookPages}`);
        };

        // check the rating
        bookRating = await shadow.$('.entry-rating .entry-score');
        bookRating = await bookRating.getProperty('innerText');
        bookRating = await bookRating.jsonValue();
        if (bookRating != '7') { 
          alteredSuccess = false 
          console.log(`Rating: ${bookRating}`);
        };

        // check the review
        reviewDetails = await shadow.$('details');
        await reviewDetails.click();

        bookReview = await shadow.$('.entry-review p');
        bookReview = await bookReview.getProperty('innerText');
        bookReview = await bookReview.jsonValue();
        if (bookReview != 'This is a review that is changed') { 
          alteredSuccess = false 
          console.log(`Review: ${bookReview}`);
        };

        expect(alteredSuccess).toBe(true);
      });


      it('Check local storage after the book entry is modified', async () => {
        //get local storage
        const lStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
        //get key as dirty string
        let bookEntryKey = lStorage['new-list0'];
        bookEntryKey = bookEntryKey.replaceAll('\"', '');
        bookEntryKey = bookEntryKey.replace('[', '');
        bookEntryKey = bookEntryKey.replace(']', '');

        expect(lStorage[bookEntryKey]).toBe(`[{"modalBookTitle":"Book","modalBookLnk":"","modalBookGenre":"Genre","modalBookCurrPageNum1":"50","modalBookCurrPageNum2":"1000","modalBookRating":"7","modalBookReview":"This is a review that is changed"}]`);
        //empty app has two default keys in local storage, and one gets added for a list of lists
        expect(Object.keys(lStorage).length).toBe(4);
      }, 2500);   


      it("Test the delete book button", async () => {
        console.log('Testing the delete button...')
        let buttonDeleted = true;

        // locate the book list, and the book entry
        let list = await page.$('book-list');
        let shadow = await list.getProperty('shadowRoot');
        let entry = await shadow.$('book-entry');
        shadow = await entry.getProperty('shadowRoot');
        
        // get the delete button
        let deleteButton = await shadow.$('.delete-button');

        // click the delete button
        await deleteButton.click();

        // refresh the page
        await page.reload();

        // look for the book entry
        list = await page.$('book-list');
        shadow = await list.getProperty('shadowRoot');
        entry = await shadow.$('book-entry');
        
        // if it's still around, button didn't work
        if (entry != null) { buttonDeleted = false}

        expect(buttonDeleted).toBe(true);
      });

      
      it('Check local storage after the book entry is deleted', async () => {
        //get local storage
        const lStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
        //get values of local storage of test list
        expect(lStorage['Test']).toBe(`[]`); //empty local storage string, list named Test
        //empty app has two default keys in local storage
        expect(Object.keys(lStorage).length).toBe(2);
      }, 2500);   
      

//setup for checking adding multiple book entries
      it('add book entry1 WILL ALWAYS PASS', async () => {
        console.log("adding Book Entry1...");
        // get the add button
        let list = await page.$('book-list');
        let shadow = await list.getProperty('shadowRoot');
        let bookButton = await shadow.$('.add-button');
        let buttonText = await bookButton.getProperty('innerText');
        buttonText = await buttonText.jsonValue();
        console.log(buttonText);
        // click the add button
        await bookButton.click();
    
        // wait for the dialog box
        await page.waitForSelector('.modal', {visible: true});
        const submitButton = await page.$(`#new-modal-info .entry-add-button`);

        // input dialog box info
        await page.type('#modalBookTitle', 'testBook');
        await page.type('#modalBookGenre', 'testGenre');
        await page.type('#modalBookCurrPageNum1', '1');
        await page.type('#modalBookCurrPageNum2', '100');
        await page.type('#modalBookRating', '10'); 
        await page.type('#modalBookReview', 'This is a test review');
        
        // submit
        await submitButton.click();
        await page.waitForSelector('.modal', {visible: false});
      }, 2500);
      it('add book entry2 WILL ALWAYS PASS', async () => {
        console.log("adding Book Entry2...");
        // get the add button
        let list = await page.$('book-list');
        let shadow = await list.getProperty('shadowRoot');
        let bookButton = await shadow.$('.add-button');
        // click the add button
        await bookButton.click();
    
        // wait for the dialog box
        await page.waitForSelector('.modal', {visible: true});
        const submitButton = await page.$(`#new-modal-info .entry-add-button`);

        // input dialog box info
        await page.type('#modalBookTitle', 'testerBook');
        await page.type('#modalBookGenre', 'testerGenre');
        await page.type('#modalBookCurrPageNum1', '100');
        await page.type('#modalBookCurrPageNum2', '100');
        await page.type('#modalBookRating', '8'); 
        await page.type('#modalBookReview', 'This is another test review');
        
        // submit
        await submitButton.click();
        await page.waitForSelector('.modal', {visible: false});
      }, 2500);
      it('add book entry3 WILL ALWAYS PASS', async () => {
        console.log("adding Book Entry3...");
        // get the add button
        let list = await page.$('book-list');
        let shadow = await list.getProperty('shadowRoot');
        let bookButton = await shadow.$('.add-button');
        // click the add button
        await bookButton.click();
    
        // wait for the dialog box
        await page.waitForSelector('.modal', {visible: true});
        const submitButton = await page.$(`#new-modal-info .entry-add-button`);

        // input dialog box info
        await page.type('#modalBookTitle', 'testerBook');
        await page.type('#modalBookGenre', 'testerGenre');
        await page.type('#modalBookCurrPageNum1', '100');
        await page.type('#modalBookCurrPageNum2', '100');
        await page.type('#modalBookRating', '8'); 
        await page.type('#modalBookReview', 'This is another test review');
        
        // submit
        await submitButton.click();
        await page.waitForSelector('.modal', {visible: false});
      }, 2500);
      it('add book entry4 WILL ALWAYS PASS', async () => {
        console.log("adding Book Entry4...");
        // get the add button
        let list = await page.$('book-list');
        let shadow = await list.getProperty('shadowRoot');
        let bookButton = await shadow.$('.add-button');
        // click the add button
        await bookButton.click();
    
        // wait for the dialog box
        await page.waitForSelector('.modal', {visible: true});
        const submitButton = await page.$(`#new-modal-info .entry-add-button`);

        // input dialog box info
        await page.type('#modalBookTitle', 'testerBook');
        await page.type('#modalBookGenre', 'testerGenre');
        await page.type('#modalBookCurrPageNum1', '100');
        await page.type('#modalBookCurrPageNum2', '100');
        await page.type('#modalBookRating', '8'); 
        await page.type('#modalBookReview', 'This is another test review');
        
        // submit
        await submitButton.click();
        await page.waitForSelector('.modal', {visible: false});
      }, 2500);
      it('add book entry5 WILL ALWAYS PASS', async () => {
        console.log("adding Book Entry5...");
        // get the add button
        let list = await page.$('book-list');
        let shadow = await list.getProperty('shadowRoot');
        let bookButton = await shadow.$('.add-button');
        // click the add button
        await bookButton.click();
    
        // wait for the dialog box
        await page.waitForSelector('.modal', {visible: true});
        const submitButton = await page.$(`#new-modal-info .entry-add-button`);

        // input dialog box info
        await page.type('#modalBookTitle', 'testerBook');
        await page.type('#modalBookGenre', 'testerGenre');
        await page.type('#modalBookCurrPageNum1', '100');
        await page.type('#modalBookCurrPageNum2', '100');
        await page.type('#modalBookRating', '8'); 
        await page.type('#modalBookReview', 'This is another test review');
        
        // submit
        await submitButton.click();
        await page.waitForSelector('.modal', {visible: false});
      }, 2500);

//checking 5 book entries were added by checking local storage
      it('Check that multiple book entries are being added with local storage', async () => {
        //get local storage
        const lStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
        //get values of local storage
        const bookEntriesInLStorageKeys = Object.keys(lStorage);
        //after adding 5 entries, there should be 8 keys in local storage
        expect(bookEntriesInLStorageKeys.length).toBe(8); 
      }, 2500);

//checking homepage      
    //check start button
    it('check homepage start button text', async () => {
      await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
      console.log('Checking start button...');
      // Query select the start button
      const button = await page.$('button');
      const data = await button.getProperty('textContent');
      const text = await data.jsonValue();

      expect(text).toBe('Start now');
    }, 2500);

  //check learn more button
  it('check homepage learn more button text', async () => {
      console.log('Checking learn more button...');
      // Query select the learn more button
      const buttons = await page.$$('button');
      const data = await buttons[1].getProperty('textContent');
      const text = await data.jsonValue();
      
      expect(text).toBe('Learn more');
    }, 2500);

  //check icon image
  it('check homepage icon image', async () => {
      console.log('Checking icon img...');
      // Query select the icon img
      const images = await page.$$('img');
      const src = await images[0].getProperty('src');
      const text = await src.jsonValue();

      expect(text).toBe('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/resources/images/vectors/Logo.svg');
    }, 2500);


  });

  // checking book entries page, main functionality page
  it('check icon on bookentries page', async () => {
    console.log('Checking icon img on bookentries page...');
    // Query select the icon img
    const images = await page.$$('img');
    const src = await images[0].getProperty('src');
    const text = await src.jsonValue();

    expect(text).toBe('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/resources/images/vectors/Logo.svg');
  }, 5000);

  // check the add List button
  it('Check that the add-List button works', async () =>{
    console.log('Testing the \'add list\' button...');

    // Query select the add List button
    let listButtonWorks = true;
    const listButton = await page.$('#add-entry .add-button');

    let buttonText = await listButton.getProperty('innerText');
    buttonText = await buttonText.jsonValue();
    console.log(buttonText);

    page.on('dialog', async (dialog) => {
      const message = await dialog.message();
      console.log(message);

      if (message == 'Are you sure you want to delete this book entry? (y/n)') {
        console.log('yes');
        await dialog.accept('y');
      } else if (message == 'Name of new list?') {
        console.log('Test');
        await dialog.accept('Test');
      } else {
        console.log('ok');
        await dialog.accept();
      }
    });

    // click the list and type a name for the new list
    await listButton.click();

    // check to see if the list is there
    let list = await page.$('book-list');
    let shadowRoot = await list.getProperty('shadowRoot');
    let label = await shadowRoot.$('.list-title');
    label = await label.getProperty('innerText');
    label = await label.jsonValue();
    if (label != 'Test') {
      listButtonWorks = false;
    }

    // reload the page
    await page.reload();

    // make sure the list still exists
    list = await page.$('book-list');
    shadowRoot = await list.getProperty('shadowRoot');
    label = await shadowRoot.$('.list-title');
    label = await label.getProperty('innerText');
    label = await label.jsonValue();
    if (label != 'Test') {
      listButtonWorks = false;
    }

    expect(listButtonWorks).toBe(true);
  }, 10000);

  it('Check that the book entries are being added', async () => {
    console.log('Checking Book Entries...');
    let bookAdds = true;

    // get the add button
    let list = await page.$('book-list');
    let shadow = await list.getProperty('shadowRoot');
    const bookButton = await shadow.$('.add-button');
    let buttonText = await bookButton.getProperty('innerText');
    buttonText = await buttonText.jsonValue();
    console.log(buttonText);

    // click the add button
    await bookButton.click();

    // wait for the dialog box
    await page.waitForSelector('.modal', {visible: true});
    const submitButton = await page.$(`#new-modal-info .entry-add-button`);

    // input dialog box info
    await page.type('#modalBookTitle', 'testBook');
    await page.type('#modalBookGenre', 'testGenre');
    await page.type('#modalBookCurrPageNum1', '1');
    await page.type('#modalBookCurrPageNum2', '100');
    await page.type('#modalBookRating', '10');
    await page.type('#modalBookReview', 'This is a test review');

    // submit
    await submitButton.click();
    await page.waitForSelector('.modal', {visible: false});

    // get the book entry
    list = await page.$('book-list');
    shadow = await list.getProperty('shadowRoot');
    let entry = await shadow.$('book-entry');
    // does the book exist?
    if (entry == null) {
      bookAdds = false;
    };
    shadow = await entry.getProperty('shadowRoot');

    // Check the title
    let bookTitle = await shadow.$('.entry-name');
    bookTitle = await bookTitle.getProperty('innerText');
    bookTitle = await bookTitle.jsonValue();
    if (bookTitle != 'testBook') {
      bookAdds = false;
      console.log(`Title: ${bookTitle}`);
    };

    // Check the genre
    let bookGenre = await shadow.$('.entry-genres');
    bookGenre = await bookGenre.getProperty('innerText');
    bookGenre = await bookGenre.jsonValue();
    if (bookGenre != 'testGenre') {
      bookAdds = false;
      console.log(`Genre: ${bookGenre}`);
    };

    // check the page progress
    let bookPages = await shadow.$('.entry-progress');
    bookPages = await bookPages.getProperty('innerText');
    bookPages = await bookPages.jsonValue();
    if (bookPages != '1/100') {
      bookAdds = false;
      console.log(`Pages: ${bookPages}`);
    };

    // check the rating
    let bookRating = await shadow.$('.entry-rating .entry-score');
    bookRating = await bookRating.getProperty('innerText');
    bookRating = await bookRating.jsonValue();
    if (bookRating != '10') {
      bookAdds = false;
      console.log(`Rating: ${bookRating}`);
    };

    // check the review
    let reviewDetails = await shadow.$('details');
    await reviewDetails.click();

    let bookReview = await shadow.$('.entry-review p');
    bookReview = await bookReview.getProperty('innerText');
    bookReview = await bookReview.jsonValue();
    if (bookReview != 'This is a test review') {
      bookAdds = false;
      console.log(`Review: ${bookReview}`);
    };

    // reload the page and make sure the changes are persistent
    await page.reload();

    // get the book entry
    list = await page.$('book-list');
    shadow = await list.getProperty('shadowRoot');
    entry = await shadow.$('book-entry');
    // does the book exist?
    if (entry == null) {
      bookAdds = false;
    };
    shadow = await entry.getProperty('shadowRoot');

    // Check the title
    bookTitle = await shadow.$('.entry-name');
    bookTitle = await bookTitle.getProperty('innerText');
    bookTitle = await bookTitle.jsonValue();
    if (bookTitle != 'testBook') {
      bookAdds = false;
      console.log(`Title: ${bookTitle}`);
    };

    // Check the genre
    bookGenre = await shadow.$('.entry-genres');
    bookGenre = await bookGenre.getProperty('innerText');
    bookGenre = await bookGenre.jsonValue();
    if (bookGenre != 'testGenre') {
      bookAdds = false;
      console.log(`Genre: ${bookGenre}`);
    };

    // check the page progress
    bookPages = await shadow.$('.entry-progress');
    bookPages = await bookPages.getProperty('innerText');
    bookPages = await bookPages.jsonValue();
    if (bookPages != '1/100') {
      bookAdds = false;
      console.log(`Pages: ${bookPages}`);
    };

    // check the rating
    bookRating = await shadow.$('.entry-rating .entry-score');
    bookRating = await bookRating.getProperty('innerText');
    bookRating = await bookRating.jsonValue();
    if (bookRating != '10') {
      bookAdds = false;
      console.log(`Rating: ${bookRating}`);
    };

    // check the review
    reviewDetails = await shadow.$('details');
    await reviewDetails.click();

    bookReview = await shadow.$('.entry-review p');
    bookReview = await bookReview.getProperty('innerText');
    bookReview = await bookReview.jsonValue();
    if (bookReview != 'This is a test review') {
      bookAdds = false;
      console.log(`Review: ${bookReview}`);
    };

    expect(bookAdds).toBe(true);
  }, 10000);

  it('Check local storage after the book entry is added', async () => {
    // get local storage
    const lStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
    // get key as dirty string
    let bookEntryKey = lStorage['new-list0'].toString().replaceAll('\"', '');
    bookEntryKey = bookEntryKey.replace('[', '');
    bookEntryKey = bookEntryKey.replace(']', '');

    expect(lStorage[bookEntryKey]).toBe(`[{\"modalBookTitle\":\"testBook\",\"modalBookLnk\":\"\",\"modalBookGenre\":\"testGenre\",\"modalBookCurrPageNum1\":\"1\",\"modalBookCurrPageNum2\":\"100\",\"modalBookRating\":\"10\",\"modalBookReview\":\"This is a test review\"}]`);
    // empty app has two default keys in local storage
    expect(Object.keys(lStorage).length).toBe(4);
  }, 2500);

  it('Test whether the modify button works', async () => {
    console.log('Testing the modify button');
    let alteredSuccess = true;

    let list = await page.$('book-list');
    let shadow = await list.getProperty('shadowRoot');
    let entry = await shadow.$('book-entry');
    shadow = await entry.getProperty('shadowRoot');
    const modifyButton = await shadow.$('.entry-img');

    // click the button
    await modifyButton.click();

    // wait for the dialog box
    await page.waitForSelector('.modal', {visible: true});
    const submitButton = await page.$(`#new-modal-info .entry-add-button`);

    // input dialog box info
    await page.type('#modalBookTitle', 'Book');
    await page.type('#modalBookGenre', 'Genre');
    await page.type('#modalBookCurrPageNum1', '50');
    await page.type('#modalBookCurrPageNum2', '1000');
    await page.type('#modalBookRating', '7');
    await page.type('#modalBookReview', 'This is a review that is changed');

    // submit
    await submitButton.click();
    await page.waitForSelector('.modal', {visible: false});

    // get the book entry
    list = await page.$('book-list');
    shadow = await list.getProperty('shadowRoot');
    entry = await shadow.$('book-entry');
    shadow = await entry.getProperty('shadowRoot');

    // Check the title
    bookTitle = await shadow.$('.entry-name');
    bookTitle = await bookTitle.getProperty('innerText');
    bookTitle = await bookTitle.jsonValue();
    if (bookTitle != 'Book') {
      alteredSuccess = false;
      console.log(`Title: ${bookTitle}`);
    };

    // Check the genre
    bookGenre = await shadow.$('.entry-genres');
    bookGenre = await bookGenre.getProperty('innerText');
    bookGenre = await bookGenre.jsonValue();
    if (bookGenre != 'Genre') {
      alteredSuccess = false;
      console.log(`Genre: ${bookGenre}`);
    };

    // check the page progress
    bookPages = await shadow.$('.entry-progress');
    bookPages = await bookPages.getProperty('innerText');
    bookPages = await bookPages.jsonValue();
    if (bookPages != '50/1000') {
      alteredSuccess = false;
      console.log(`Pages: ${bookPages}`);
    };

    // check the rating
    bookRating = await shadow.$('.entry-rating .entry-score');
    bookRating = await bookRating.getProperty('innerText');
    bookRating = await bookRating.jsonValue();
    if (bookRating != '7') {
      alteredSuccess = false;
      console.log(`Rating: ${bookRating}`);
    };

    // check the review
    reviewDetails = await shadow.$('details');
    await reviewDetails.click();

    bookReview = await shadow.$('.entry-review p');
    bookReview = await bookReview.getProperty('innerText');
    bookReview = await bookReview.jsonValue();
    if (bookReview != 'This is a review that is changed') {
      alteredSuccess = false;
      console.log(`Review: ${bookReview}`);
    };

    expect(alteredSuccess).toBe(true);
  });


  it('Check local storage after the book entry is modified', async () => {
    // get local storage
    const lStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
    // get key as dirty string
    let bookEntryKey = lStorage['new-list0'];
    bookEntryKey = bookEntryKey.replaceAll('\"', '');
    bookEntryKey = bookEntryKey.replace('[', '');
    bookEntryKey = bookEntryKey.replace(']', '');

    expect(lStorage[bookEntryKey]).toBe(`[{"modalBookTitle":"Book","modalBookLnk":"","modalBookGenre":"Genre","modalBookCurrPageNum1":"50","modalBookCurrPageNum2":"1000","modalBookRating":"7","modalBookReview":"This is a review that is changed"}]`);
    // empty app has two default keys in local storage, and one gets added for a list of lists
    expect(Object.keys(lStorage).length).toBe(4);
  }, 2500);


  it('Test the delete book button', async () => {
    console.log('Testing the delete button...');
    let buttonDeleted = true;

    // locate the book list, and the book entry
    let list = await page.$('book-list');
    let shadow = await list.getProperty('shadowRoot');
    let entry = await shadow.$('book-entry');
    shadow = await entry.getProperty('shadowRoot');

    // get the delete button
    const deleteButton = await shadow.$('.delete-button');

    // click the delete button
    await deleteButton.click();

    // refresh the page
    await page.reload();

    // look for the book entry
    list = await page.$('book-list');
    shadow = await list.getProperty('shadowRoot');
    entry = await shadow.$('book-entry');

    // if it's still around, button didn't work
    if (entry != null) {
      buttonDeleted = false;
    }

    expect(buttonDeleted).toBe(true);
  });


  it('Check local storage after the book entry is deleted', async () => {
    // get local storage
    const lStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
    // get values of local storage of test list
    expect(lStorage['Test']).toBe(`[]`); // empty local storage string, list named Test
    // empty app has two default keys in local storage
    expect(Object.keys(lStorage).length).toBe(2);
  }, 2500);


  // setup for checking adding multiple book entries
  it('add book entry1 WILL ALWAYS PASS', async () => {
    console.log('adding Book Entry1...');
    // get the add button
    const list = await page.$('book-list');
    const shadow = await list.getProperty('shadowRoot');
    const bookButton = await shadow.$('.add-button');
    let buttonText = await bookButton.getProperty('innerText');
    buttonText = await buttonText.jsonValue();
    console.log(buttonText);
    // click the add button
    await bookButton.click();

    // wait for the dialog box
    await page.waitForSelector('.modal', {visible: true});
    const submitButton = await page.$(`#new-modal-info .entry-add-button`);

    // input dialog box info
    await page.type('#modalBookTitle', 'testBook');
    await page.type('#modalBookGenre', 'testGenre');
    await page.type('#modalBookCurrPageNum1', '1');
    await page.type('#modalBookCurrPageNum2', '100');
    await page.type('#modalBookRating', '10');
    await page.type('#modalBookReview', 'This is a test review');

    // submit
    await submitButton.click();
    await page.waitForSelector('.modal', {visible: false});
  }, 2500);
  it('add book entry2 WILL ALWAYS PASS', async () => {
    console.log('adding Book Entry2...');
    // get the add button
    const list = await page.$('book-list');
    const shadow = await list.getProperty('shadowRoot');
    const bookButton = await shadow.$('.add-button');
    // click the add button
    await bookButton.click();

    // wait for the dialog box
    await page.waitForSelector('.modal', {visible: true});
    const submitButton = await page.$(`#new-modal-info .entry-add-button`);

    // input dialog box info
    await page.type('#modalBookTitle', 'testerBook');
    await page.type('#modalBookGenre', 'testerGenre');
    await page.type('#modalBookCurrPageNum1', '100');
    await page.type('#modalBookCurrPageNum2', '100');
    await page.type('#modalBookRating', '8');
    await page.type('#modalBookReview', 'This is another test review');

    // submit
    await submitButton.click();
    await page.waitForSelector('.modal', {visible: false});
  }, 2500);
  it('add book entry3 WILL ALWAYS PASS', async () => {
    console.log('adding Book Entry3...');
    // get the add button
    const list = await page.$('book-list');
    const shadow = await list.getProperty('shadowRoot');
    const bookButton = await shadow.$('.add-button');
    // click the add button
    await bookButton.click();

    // wait for the dialog box
    await page.waitForSelector('.modal', {visible: true});
    const submitButton = await page.$(`#new-modal-info .entry-add-button`);

    // input dialog box info
    await page.type('#modalBookTitle', 'testerBook');
    await page.type('#modalBookGenre', 'testerGenre');
    await page.type('#modalBookCurrPageNum1', '100');
    await page.type('#modalBookCurrPageNum2', '100');
    await page.type('#modalBookRating', '8');
    await page.type('#modalBookReview', 'This is another test review');

    // submit
    await submitButton.click();
    await page.waitForSelector('.modal', {visible: false});
  }, 2500);
  it('add book entry4 WILL ALWAYS PASS', async () => {
    console.log('adding Book Entry4...');
    // get the add button
    const list = await page.$('book-list');
    const shadow = await list.getProperty('shadowRoot');
    const bookButton = await shadow.$('.add-button');
    // click the add button
    await bookButton.click();

    // wait for the dialog box
    await page.waitForSelector('.modal', {visible: true});
    const submitButton = await page.$(`#new-modal-info .entry-add-button`);

    // input dialog box info
    await page.type('#modalBookTitle', 'testerBook');
    await page.type('#modalBookGenre', 'testerGenre');
    await page.type('#modalBookCurrPageNum1', '100');
    await page.type('#modalBookCurrPageNum2', '100');
    await page.type('#modalBookRating', '8');
    await page.type('#modalBookReview', 'This is another test review');

    // submit
    await submitButton.click();
    await page.waitForSelector('.modal', {visible: false});
  }, 2500);
  it('add book entry5 WILL ALWAYS PASS', async () => {
    console.log('adding Book Entry5...');
    // get the add button
    const list = await page.$('book-list');
    const shadow = await list.getProperty('shadowRoot');
    const bookButton = await shadow.$('.add-button');
    // click the add button
    await bookButton.click();

    // wait for the dialog box
    await page.waitForSelector('.modal', {visible: true});
    const submitButton = await page.$(`#new-modal-info .entry-add-button`);

    // input dialog box info
    await page.type('#modalBookTitle', 'testerBook');
    await page.type('#modalBookGenre', 'testerGenre');
    await page.type('#modalBookCurrPageNum1', '100');
    await page.type('#modalBookCurrPageNum2', '100');
    await page.type('#modalBookRating', '8');
    await page.type('#modalBookReview', 'This is another test review');

    // submit
    await submitButton.click();
    await page.waitForSelector('.modal', {visible: false});
  }, 2500);

  // checking 5 book entries were added by checking local storage
  it('Check that multiple book entries are being added with local storage', async () => {
    // get local storage
    const lStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
    // get values of local storage
    const bookEntriesInLStorageKeys = Object.keys(lStorage);
    // after adding 5 entries, there should be 8 keys in local storage
    expect(bookEntriesInLStorageKeys.length).toBe(8);
  }, 2500);

  // checking homepage
  // check start button
  it('check homepage start button text', async () => {
    await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
    console.log('Checking start button...');
    // Query select the start button
    const button = await page.$('button');
    const data = await button.getProperty('textContent');
    const text = await data.jsonValue();

    expect(text).toBe('Start now');
  }, 2500);

  // check learn more button
  it('check homepage learn more button text', async () => {
    console.log('Checking learn more button...');
    // Query select the learn more button
    const buttons = await page.$$('button');
    const data = await buttons[1].getProperty('textContent');
    const text = await data.jsonValue();

    expect(text).toBe('Learn more');
  }, 2500);

  // check icon image
  it('check homepage icon image', async () => {
    console.log('Checking icon img...');
    // Query select the icon img
    const images = await page.$$('img');
    const src = await images[0].getProperty('src');
    const text = await src.jsonValue();

    expect(text).toBe('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/resources/images/vectors/Logo.svg');
  }, 2500);
});

