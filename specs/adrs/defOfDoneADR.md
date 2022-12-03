### status: accepted
### date: 2022-12-01
### consulted: Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume, Zach
### informed: Nick, Kenny, Amaan, Brendan, Ada, Dou, Matthew, Guillaume, Zach
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# Defining our Definition of Done

## Context and Problem Statement

We need to have a definition of done such that we're not lingering on whether something is done or not. Ideally we should split it into things like "pretty much done", "almost done", "done done" etc. 

## Considered Options
We have the current format for our sprint progess:
* TODO - this is our backlog
* In Progress - this is what we are actively working on
* To Review - these are tasks that are in need of group approval or acknowledgement
* Done - the task is finished
* … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: Keep the 4 "categories" of finality as we have it in GitHub Projects. However we've decided to elaborate more on what each part means exactly.
* TODO - backlog, task is not started
* In Progress - task is actively being worked on
* To Review - task is completed and needs review, if rejected, it goes back into In Progress
* Done - task is done with review and the pr associated with it is merged to main. The task is done. 

