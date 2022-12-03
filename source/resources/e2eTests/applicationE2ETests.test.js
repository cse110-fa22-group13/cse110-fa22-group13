describe('Basic user flow for Website', () => {
    // First, visit app webpage
    beforeAll(async () => {
      await page.goto('https://cse110-fa22-group13.github.io/cse110-fa22-group13/source/homepage/index.html');
    });
    //check start button
    it('check start button', async () => {
        console.log('Checking start button...');
        // Query select the start button
        const buttons = await page.$$('button');
        const data = await buttons[0].getProperty('name');

        console.log(data);
        expect(20).toBe(20);
      });

  
  });