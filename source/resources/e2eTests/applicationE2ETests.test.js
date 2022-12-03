const { Dialog, default: puppeteer } = require("puppeteer");

describe('Basic user flow for Website', () => {
    beforeAll(async () => {
      const browser = await puppeteer.launch({headless: false, slowMo: 10});
      const page = await browser.newPage();
      
      });

//checking book entries page, main functionality page
      it('check icon on bookentries page', async () => {
        console.log('Checking icon img on bookentries page...');
        const browser = await puppeteer.launch({headless: false, slowMo: 10});
        const page = await browser.newPage();
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/bookEntries/bookEntries.html');
        // Query select the icon img
        const images = await page.$$('img');
        const src = await images[0].getProperty('src');
        const text = await src.jsonValue();

        await browser.close();

        expect(text).toBe('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/resources/images/vectors/Logo.svg');
      }, 2500);


//checking homepage      
    //check start button
    it('check homepage start button text', async () => {
        const browser = await puppeteer.launch({headless: false, slowMo: 10});
        const page = await browser.newPage();
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
        console.log('Checking start button...');
        // Query select the start button
        const button = await page.$('button');
        const data = await button.getProperty('textContent');
        const text = await data.jsonValue();

        await browser.close();

        expect(text).toBe('Start now');
      }, 2500);

    //check learn more button
    it('check homepage learn more button text', async () => {
        const browser = await puppeteer.launch({headless: false, slowMo: 10});
        const page = await browser.newPage();
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
        console.log('Checking learn more button...');
        // Query select the learn more button
        const buttons = await page.$$('button');
        const data = await buttons[1].getProperty('textContent');
        const text = await data.jsonValue();
        
        await browser.close();

        expect(text).toBe('Learn more');
      }, 2500);
  
    //check icon image
    it('check homepage icon image', async () => {
        const browser = await puppeteer.launch({headless: false, slowMo: 10});
        const page = await browser.newPage();
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
        console.log('Checking icon img...');
        // Query select the icon img
        const images = await page.$$('img');
        const src = await images[0].getProperty('src');
        const text = await src.jsonValue();

        await browser.close();

        expect(text).toBe('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/resources/images/vectors/Logo.svg');
      }, 2500);


      //check the add List buttton
      it('Check that the add-List button works', async () =>{
        const browser = await puppeteer.launch({headless: false, slowMo:100});
        const page = await browser.newPage();
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/bookEntries/bookEntries.html');
        console.log("Testing the 'add list' button...");
        // Query select the add List button
        const listButton = await page.$('#add-entry .add-button');

        let buttonText = await listButton.getProperty('innerText');
        buttonText = await buttonText.jsonValue();

        // click the list and type a name for the new list
        listButton.click();

        // 
        page.on('dialog', async dialog => {
          console.log(dialog.type());
          console.log(dialog.message());
          await dialog.accept("Test");
        });

        const list = await page.$('book-list');
        console.log(list);
        
        
        
        expect().toBe('Test');
      }, 10000);

  });


