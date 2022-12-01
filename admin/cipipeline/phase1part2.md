# CI/CD Pipeline for phase 1 (part 2)

### Progress made - currently functional    
- On push or pull request, our CI/CD pipeline starts. We note that since after a pull request is approved, pushing happens, this might seem a little redundant, but in fact, this means our initial tests will run on the branch that is due to be merged, before merging. This is quite useful because it can show any issues with a potential merging branch, before we really start the process of merging.    

- The CI pipeline includes branch protection for main, with there requiring code review and approval for a teammate on a pull request before merging into main. This should protect us from the terrible merging disasters that can occur without this protection. Moreover, there will be some code style checking by a human at this stage.

- Our CI pipeline currently runs through 5 processes. First it runs an HTML/CSS validator, for the HTML files we currently have. Then, it will run the unit tests with autotests CI. It will then run the linters: Eslint for HTML and JS files, and Stylelint for CSS. Lastly it will deploy to the webapp and JSdocs. This will hopefully modularize the github actions portion of the CI unit testing we need to do. And we should be able to quickly adapt this test structure to run our unit tests contribute to engineering our software. 


### Aspects in progress    
- There are currently no aspects in progress.

### Needed improvements to make    
- We could have implemented code quality (ex. Codeclimate, Codacy, etc.), however due to time constraints, the other aspects of CI/CD took up more importance over code quality automation. If given more time we would have tried to implement this. 

#### Diagram    
![CI/CD Diagram](/admin/cipipeline/phase1Part2.png)
