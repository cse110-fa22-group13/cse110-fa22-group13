describe('Basic user flow for Website', () => {
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
      });


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
      });

    //check learn more button
    it('check homepage learn more button text', async () => {
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
        console.log('Checking learn more button...');
        // Query select the learn more button
        const buttons = await page.$$('button');
        const data = await buttons[1].getProperty('textContent');
        const text = await data.jsonValue();

        expect(text).toBe('Learn more');
      });
  
    //check icon image
    it('check homepage icon image', async () => {
        await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
        console.log('Checking icon img...');
        // Query select the icon img
        const images = await page.$$('img');
        const src = await images[0].getProperty('src');
        const text = await src.jsonValue();

        expect(text).toBe('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/resources/images/vectors/Logo.svg');
      });


  });


