### status: {Accepted}
### date: {2022-11-28}
### consulted: { Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume, Zach}
### informed: { Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume, Zach}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# Web Components

## Context and Problem Statement

 We want to decide how to render the booklist for each entry

## Considered Options


* JS object (no web components)
   * Doesn't render entries as an "element"
* Web Components

## Decision Outcome

We are using web components as it works better for our situation.
