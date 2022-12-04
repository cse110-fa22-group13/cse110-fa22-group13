const { Dialog, default: puppeteer } = require("puppeteer");

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
        const listButton = await page.$('#add-entry .add-button');

        let buttonText = await listButton.getProperty('innerText');

        buttonText = await buttonText.jsonValue();

        page.on('dialog', async dialog => {
          console.log(await dialog.message());
          await dialog.accept("Test");
        });

        // click the list and type a name for the new list
        await listButton.click();

        const list = await page.$('book-list');
        const shadowRoot = await list.getProperty('shadowRoot');
        let label = await shadowRoot.$('.list-title');
        label = await label.getProperty('innerText');
        label = await label.jsonValue();
        
        
        
        expect(label).toBe('Test');
      }, 10000);

  });


