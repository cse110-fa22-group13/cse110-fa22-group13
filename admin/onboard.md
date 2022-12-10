# Single Source of Truth
As a SSoT, we can find all the detailed documents about the project here in the repository.

# Description
Upon entering the GitHub repository, we can find a brief description of our project at the bottom of the repository page. As it describes, we have strived to create an application that supports a powerful, efficient, and utility-based book review and progress aggregator and tracker for users. Then, with each link, we can access the team introduction page, application page, code documentation page, as well as project public video page, respectively.

## Folders and Files:
There are the README file, other automated pipeline-related files as well as 4 different folders in the repository, including .github, admin, source, and specs:


### ___.github:___
In the ISSUE_TEMPLATE folder, We can find the GitHub issue templates we have created in order to facilitate creating GitHub issues. Also, in the workflow folder, we can see 5 important yml files written to generate the automated CI/CD pipeline.

### ___admin:___
In this folder, we can find all the non-technical documents we have created to display the big picture of our project and team. We can check the team introduction with team.md as well as other checkpoint videos and documents that support how we have organized and proceeded with our team and project. 

### ___source:___
In this source folder, we can check all the actual code that we have written for the project using HTML, CSS, and JavaScript. In addition to that, in the resources folder, we can find End to End testing cases and other non-script resources that we have used for our project. 

### ___specs:___
We can explore the fundamental pieces of our project in this folder from both technical and non-technical points of view. With the different aspects of the project, we can see the important blueprint of the project and its detailed answers to what types of project we need to produce, who we need to create the project for, and why we need to create this project. Also, it is important to notice there is the adrs folder where you can find each decision we have made for the project and the reasons why and how we made each decision.


## GitHub Issues:
We can notice that each GitHub issue is created with a specific title and labels that denote what we exactly need to fix/implement/manage. We can also find the description of the issue if the title and labels do not fully explain the tasks needed to be done. Therefore, we can grasp We can also see that some issue is titled “extra,” which denotes the priority of the task. Once clicking the issue, we can see the description of the issue, its assignees, status, comments, and connected developing pull request where we can find more detailed information about the issue.

## Pull requests:
Similar to the GitHub issue, upon clicking any closed pull request, we can see the detailed procedure we developed while implementing the assigned task. Each pull request will have its assignees, commits, labels, status, reviews, and approvals from the reviewer. Therefore, with the labels, we can grab a sense of the required tasks for the pull request, and then with the mentioned items on the pull request, we can thoroughly explore the procedure of the task.

## Actions:
In this tab, we can find 5 major automated workflows created from the yml files in the .github/workflow folder. We can check all the workflows that we have run while making changes to the repository. As a part of our CI/CD pipeline, on every pull request and push to the main branch, the automated GitHub workflows start running their generated tests and deployment. On Actions, we have the following workflows:

### ___AutoTests CI:___
We run our unit testing and e2e testing cases in our automated environment where we run the said testing cases on our code and website to check all the functionalities our application has. 

### ___Deploy static content to Pages:___
We run JSDocs deployment for our code documentation. Upon the successful deployment of our code documentation, we are able to see the description of each function and class written in JavaScript on deployed JSDocs website.

### ___HTML Validator:___
We run the HTML/CSS validator on our HTML and CSS scripts and check the validity of our code. With the validator throwing warnings and errors, we can keep the HTML and CSS scripts clean and systemic.

### ___Run EsLint:___
We run the ESLint on our JS code as a JS validator to check the validity of our JS code. With the ESLint, we can keep our code consistent and free from errors.

### ___Stylelint:___
With Stylelint, we can improve the readability of our code and avoid error-prone code styles as it throws an error for an unpreferable style of code.

## Projects
We can see the process of each iteration for the sprint with the 4 different stages:

- Todo: This is backlog; in other words, the task is not started yet.
- In Progress: the task is actively being worked on by teammates.
- To review: the task is completed and needs to be reviewed by other team members. If rejected, the task needs to go back into In Progress.
- Done: the task got approval from other team members through their reviews and thus it is merged into the main repository; in other words, the task is done.

It can also be found in [Definition of Done](https://github.com/cse110-fa22-group13/cse110-fa22-group13/blob/main/specs/adrs/defOfDoneADR.md).


# Building process
After a developer makes some changes to the repository in non-main branch (the main branch is protected, and thus it is prohibited from directly pushing to the main), the developer needs to create a pull request to the main. Then, upon the creation of the pull request, the automated GitHub workflows will start running on our current branch with each of our GitHub workflows. Once our workflows properly ran and passed all the tests, we need other teammate to review and approve our changes. After successful approval from other teammates, we are now allowed to merge the changes into the main repository.

The documents covering the building process in details can also be found in [CI Pipeline](https://github.com/cse110-fa22-group13/cse110-fa22-group13/tree/main/admin/cipipeline).