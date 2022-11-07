### status: Approved
### date: 10/30/2022
### consulted: Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume, Zach
### informed: Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume, Zach
---

# Essential, Potential, and Out-of-Scope Features

## Context and Problem Statement
We want to have a set list of all the features we want to include in our project. They are ordered by priority. This ADR is meant to be gone over after being discussed in a group meeting.

## Considered Features

* (essential) Add/create book entries and add book reviews, where the user fills in parameters.
    * General Book Data
        * Book Title (non-optional), Author, Year
        * Book Tags (Genre, Series)
    * User Book Data
        * Rating, Date read, page progress
        * Book Status (completed, dropped, planned, in progress, not read)
* (essential) Display/view book entries and reviews
* (essential) Edit/updating book entries and reviews
* (essential) Remove/delete book entries and reviews
* (essential) Sorting list using filters
* (potential) Publish lists and/or reviews to social media
* (potential) Additional social media publishing features
    * List summary for social media publish, ex: top 5 + link
* (out of scope) Add books using web data (auto-fill general book parameters)
    * Requires some form of Webscraping
* (out of scope) Adding book recommendations using book data
* (out of scope) Account creation for users to save their reading lists
* (out of scope) Recommendations based on other users
* (out of scope) View other user book lists and reviews
    * Requires centralized location -- needs to be decentralized
* (out of scope) Display website user statistics for each book in database
    * Average rating, total users who have read/completed, etc.
    * Links to all user reviews of book
* (out of scope) Machine learning book recommendations
* (out of scope) Built-in book summary viewer


## Decision Outcome

* Moved add books using web data, display website user stats, and view other user book lists/reviews to priority potential.
    * Why: To ensure project completion and filter what is most important. The priority potential is more time consuming and tedious, but is something we want to include. 
* Approved all other features
* 11/6 Meeting: Moved features involving backend development and databases into out of scope given constraints, added CRUD based features to top of essential features. 
