### status: Approved
### date: 10/30/2022
### consulted: Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume, Zach
### informed: Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume, Zach
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# Code Convention and Documentation

## Context and Problem Statement

We need to have a coding format that we adhere to when we code. Add


## Considered Options

* Spacing: 4 spaces
* Adhere to the convention of whatever technology/language you are using.
    * If using Javascript, adhere to js conventions (use camelCase, etc), if using HTML adhere to those conventions, etc.
* Comments:
    * Headers for functions explaining what they do
* Documentation: docsify.js
* Github
    * Make issues before implementing what you plan to pull
    * Have descriptive commit messages
    * Branch Protection so we can't push straight to master
    * Commit approval
        * Have the leader of a small group (front end, back end etc) approve the commits.
    * __Don't push to master/main__
    * Add incrementally to the CI pipeline
        * As a feature is written, unit tests are required for each feature as well as documentation

## Decision Outcome

* Decided on docsify.js as documentation
* Decided on other conventions as is
