### status: WIP
### date: 10/30/2022
### consulted: Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume
### informed: Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# Code Convention and Documentation

## Context and Problem Statement

We need to have a coding format that we adhere to when we code. Add


## Considered Options

* Spacing: 4 spaces
* Adhere to the convention of whatever technology/language you are using. 
* Comments:
    * Headers for functions explaining what they do
* Decide what documentation to use (js docs, etc)
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

* Still need to decide what documentation to use.


<!-- This is an optional element. Feel free to remove. -->
### Consequences

* Good, because {positive consequence, e.g., improvement of one or more desired qualities, …}
* Bad, because {negative consequence, e.g., compromising one or more desired qualities, …}
* … <!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
## Validation

{describe how the implementation of/compliance with the ADR is validated. E.g., by a review or an ArchUnit test}

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
