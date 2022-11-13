# CI/CD Pipeline for phase 1    

### Progress made - currently functional    
- On push or pull request, our CI/CD pipeline starts. We note that since after a pull request is approved, pushing happens, this might seem a little redundant, but in fact, this means our initial tests will run on the branch that is due to be merged, before merging. This is quite useful because it can show any issues with a potential merging branch, before we really start the process of merging.    

- The CI pipeline includes branch protection for main, with there requiring code review and approval for a teammate on a pull request before merging into main. This should protect us from the terrible merging disasters that can occur without this protection. Moreover, there will be some code style checking by a human at this stage.

- Our CI pipeline currently runs two things. It runs an HTML validator, for the HTML files we currently have. And then it runs a basic hello world test. This will hopefully modularize the github actions portion of the CI unit testing we need to do. And we should be able to quickly adapt this test structure to run our unit tests contribute to engineering our software. 


### Aspects in progress    
- Documentation generation through the CI pipeline is in progress. We have actually made good progress on this aspect and we have it set up on a testerApplication so, through github actions, on push to main; it looks at all javascript code in a source folder, and runs JSDocs on all of them, and then publishes/deploys those files to the repo's github pages webpage. The documentation appears as a static webpage hosted by github pages, and this is updated every time there is a push to main. However, this has not been converted or adapted into the project repo. We are looking into that, keeping in mind that might be something to do closer to the end, when we have more files and the file structure is totally established.

### Needed improvements to make    
- Because our time frame is very limited and short term, we understand the need for tools that facilitate us to code in a more comprehensive and enhanced way. Therefore, code quality assistance tools like Codeclimate and Codacy would help inspect, proofread, and produce more qualitative and quantitative code.

- Our features, as implemented, include many different functional buttons  along with book objects to store information, this involves a lot of different aspects of JavaScript, so we need to include unit testing tools, such as Jest, Tape, Cypress, Mocha, etc. That will automatically test our JS code after a pull request has been made, so we can check if it is working properly before we merge it. If the tests fail during the pull request, we can obviously cancel that pull request and try to fix the issues.

### Ancillary improvements to make    
- Unit testing functionality for branches could be nice. But it could also slow down development.

#### Diagram    
![CI/CD Diagram](/admin/cipipeline/phase1.png)