### status: accepted
### date: 2022-11-19
### consulted: Nick, Kenny,  Brendan, Ada, Dou,  Guillaume, Zach
### informed: Nick, Kenny, Brendan, Ada, Dou, Guillaume, Zach
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# CI Choices

## Context and Problem Statement

How we plan to approach our choices for our CI structure and tools.

## Considered Options

* GitHub Actions will be our go-to CI structure
* For unit testing, our tool will be jest
* We have documentation automated for jsDocs
* We are using branch protection
* We have a github action that valides the html and css files within the source directory
* Code review is required (1 other person must approve it)
* For linting, we are using commit lint and using ESLint 
* … <!-- numbers of options can vary -->

## Decision Outcome
* We decided on what to use for linting, stated our automation processes, and CI structure.
