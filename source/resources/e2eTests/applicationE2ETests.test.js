describe('Basic user flow for Website', () => {
    // First, visit app webpage
    beforeAll(async () => {
      await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
    });
    //check start button
    it('check start button text', async () => {
        console.log('Checking start button...');
        // Query select the start button
        const button = await page.$('button');
        const data = await button.getProperty('textContent');
        const text = await data.jsonValue();

        expect(text).toBe('Start now');
      });

  
  });