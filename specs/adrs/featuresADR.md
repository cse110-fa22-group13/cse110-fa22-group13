### status: Approved
### date: 10/27/2022
### consulted: Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume
### informed: Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume
---

# Essential, Potential, and Out-of-Scope Features

## Context and Problem Statement
We want to have a set list of all the features we want to include in our project. They are ordered by priority. This ADR is meant to be gone over after being discussed in a group meeting.

## Considered Features


* (essential) Account creation for users to save their reading lists
* (essential) Add books manually, where the user fills in parameters.
    * General Book Data
        * Book Title (non-optional), Author, Year
        * Book Tags (Genre, Series)
    * User Book Data
        * Rating, Date read, page progress
        * Book Status (completed, dropped, planned, in progress, not read)
* (essential) Add reviews to book entries, linked to user lists
* (essential) Sorting list using filters
* (essential) Publish lists to social media
* (essential) Publish review to social media
* (priority potential) Display website user statistics for each book in database
    * Average rating, total users who have read/completed, etc.
    * Links to all user reviews of book
* (priority potential) Add books using web data (auto-fill general book parameters)
    * Requires some form of Webscraping
* (priority potential) View other user book lists and reviews
    * Requires centralized location -- needs to be decentralized
* (potential) Adding book recommendations using book data
* (potential) Recommendations based on other users
* (potential) Additional social media publishing features
    * List summary for social media publish, ex: top 5 + link
* (out of scope) Machine learning book recommendations
* (out of scope) Built-in book summary viewer

## Decision Outcome

* Moved add books using web data, display website user stats, and view other user book lists/reviews to priority potential.
    * Why: To ensure project completion and filter what is most important. The priority potential is more time consuming and tedious, but is something we want to include. 
* Approved all other features
