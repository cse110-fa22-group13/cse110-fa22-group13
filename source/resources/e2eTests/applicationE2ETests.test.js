const { Dialog, default: puppeteer, Browser } = require("puppeteer");

describe('Basic user flow for Website', () => {
    beforeAll(async () => {
      
      });

//checking book entries page, main functionality page
      it('check icon on bookentries page', async () => {
        console.log('Checking icon img on bookentries page...');
       
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/bookEntries/bookEntries.html');
        // Query select the icon img
        const images = await page.$$('img');
        const src = await images[0].getProperty('src');
        const text = await src.jsonValue();

        expect(text).toBe('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/resources/images/vectors/Logo.svg');
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
        
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
        console.log('Checking learn more button...');
        // Query select the learn more button
        const buttons = await page.$$('button');
        const data = await buttons[1].getProperty('textContent');
        const text = await data.jsonValue();
        
        
        expect(text).toBe('Learn more');
      }, 2500);
  
    //check icon image
    it('check homepage icon image', async () => {
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
        console.log('Checking icon img...');
        // Query select the icon img
        const images = await page.$$('img');
        const src = await images[0].getProperty('src');
        const text = await src.jsonValue();

       

        expect(text).toBe('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/resources/images/vectors/Logo.svg');
      }, 2500);


      //check the add List buttton
      it('Check that the add-List button works', async () =>{
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/bookEntries/bookEntries.html');
        console.log("Testing the 'add list' button...");
        // Query select the add List button
        
        let listButtonWorks = true;
        const listButton = await page.$('#add-entry .add-button');

        let buttonText = await listButton.getProperty('innerText');

        buttonText = await buttonText.jsonValue();

        page.on('dialog', async dialog => {
          console.log(await dialog.message());
          await dialog.accept("Test");
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

      it('Test whether the modify button works', async () => {

      });
  });


