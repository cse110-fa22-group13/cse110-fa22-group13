### status: proposed
### date: 10/27/2022
### consulted: Nick, Kenny, Amaan, Brendan
### informed: Nick, Kenny, Amaan, Brendan
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
* (essential) Add books using web data (auto-fill general book parameters)
* (essential) Add reviews to book entries, linked to user lists
* (essential) Sorting list using filters
* (essential) View other user book lists and reviews
* (essential) Publish lists to social media
* (essential) Publish review to social media
* (essential) Display website user statistics for each book in database
    * Average rating, total users who have read/completed, etc.
    * Links to all user reviews of book
* (potential) Adding book recommendations using book data
* (potential) Recommendations based on other users
* (potential) Additional social media publishing features
    * List summary for social media publish, ex: top 5 + link
* (out of scope) Machine learning book recommendations
* (out of scope) Built-in book summary viewer

## Decision Outcome

Chosen option: "{title of option 1}", because
{justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force {force} | … | comes out best (see below)}.

<!-- This is an optional element. Feel free to remove. -->
### Consequences

* Good, because {positive consequence, e.g., improvement of one or more desired qualities, …}
* Bad, because {negative consequence, e.g., compromising one or more desired qualities, …}
* … <!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### {title of option 1}

<!-- This is an optional element. Feel free to remove. -->
{example | description | pointer to more information | …}

* Good, because {argument a}
* Good, because {argument b}
<!-- use "neutral" if the given argument weights neither for good nor bad -->
* Neutral, because {argument c}
* Bad, because {argument d}
* … <!-- numbers of pros and cons can vary -->

### {title of other option}

{example | description | pointer to more information | …}

* Good, because {argument a}
* Good, because {argument b}
* Neutral, because {argument c}
* Bad, because {argument d}
* …

<!-- This is an optional element. Feel free to remove. -->
## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.}
