# A Kanban Feature request hApp for Holochain

A feature voting and tracking happ all built on a Kanban. 

It can be used for your holochain happ. It will allows your users to suggest new features and vote on them. Users only get 5 votes, and they can only add upto a maximum of 3 votes per feature. It has been designed this way to see which are the most popular feature requests.

TODO: The Kanban once permissions have been set up will allow the developers to move the cards along so the users can see the status of the feature requests.

![GitHub](https://img.shields.io/github/license/holochain/hc-ts-template.svg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Ensure holochain-proto (at least version 26) is installed on your machine by running. 

```
hcd -v
```

### Installing

Install the javascript/typescript packages with

```
npm install
```
Build the Holochain dna using

```
npm run hc:build
```
and build the UI with
```
npm run ui:build
```

The app can now be started for development purposes using
```
npm run hc:dev
```
and opening the browser to http://localhost:4141 

Check the package.json for other scripts. There are some watch scripts, testing and running multiple nodes.

Note: Some of these may not work properly cross platform, so you may need to tweak for your platform.

-----

## Status

[X] Feature Zome - Adding features, name & description, Test adding a feature. Adds with a “state” of “idea”.
[X] Listing Features. Test listing features. (Link all features to the app hash, they are global)
[X] UI - Adding & Listing features (Modal to add, list in column)
[X] UI - Layout with Columns
[ ] Feature Zome - Update feature idea (change the column)
[ ] UI - Move to column
[ ] UI - Drag to column to move
[ ] UI - Sorting A-Z, By Votes, By Your Votes
[X] voteForFeature - Similar to “rateAgent” - Commit a featureVote (voter, feature, time - each vote needs to be unique?) and then commit a featureVoteLink(base: agent, link: featureVote, tag: “voteForFeature”). Test.
[ ] voteForFeature validation - max 5 votes all up, max 3 votes on 1 feature. Get all links and then do the math.
[ ] voteForFeature - validation rule the creator of the feature cannot vote for their own feature. test
[ ] removingVotes - delete the entry and link. Test. Only the author can delete.
[X] getVotesForFeature() - test
[X] getVotesForAgent() - test
[X] voting UI - Vote for feature
[X] voting UI - Display number of votes on a feature
[ ] voting UI - Display votes remaining for current user
[ ] TODO: concept of an owner for the board
[ ] TODO: only owner can move items between columns, get the column of the feature and UI display appropriately. Lock voting depending on state. Release votes if state = done (filter them in the counts of remaining votes and validation rules).
[ ] TODO: comments and attachments
[ ] TODO: moderating the board by the owners


This was built over a weekend, so there will be plently of bugs and improvements that can be made.


## Built With

* [Holochain](https://github.com/holochain/holochain-proto)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [Angular](https://angular.io/)

## Authors

* **Ryan How** - [RyanHow](https://github.com/RyanHow)
* **Peter Pons** - [ponspeter](https://github.com/ponspeter)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details

