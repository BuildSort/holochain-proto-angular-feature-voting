# A Kanban Feature request hApp for Holochain

A feature voting and tracking happ all built on a Kanban. 

It can be used for your holochain happ. It will allows your users to suggest new features and vote on them. Users only get 5 votes, and they can only add upto a maximum of 3 votes per feature. It has been designed this way to see which are the most popular feature requests.

TODO: The Kanban once permissions have been set up will allow the developers to move the cards along so the users can see the status of the feature requests.

![GitHub last commit](https://img.shields.io/github/last-commit/holochain/hc-ts-template.svg)
![GitHub](https://img.shields.io/github/license/holochain/hc-ts-template.svg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Ensure holochain-proto (at least version 26) is installed on your machine by running. 

```
hcd -v
```

Subsequent steps also assumes npm/yarn is installed.

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
npm run build
```

The app can now be started for development purposes using
```
npm run hc:dev
```
and opening the browser to http://localhost:4141 

-----

If you would like to persist data between sessions install to the local holochain directory by running the following from the project root directory:
```
hcadmin init <id/name string>
hcadmin join ./build/ minesweeper
hcd minesweeper
```

## Running the tests

Run holochain test using

```
npm run hc:build && npm run hc:test
```

----

Run jest front-end tests using 
```
npm run test
```

## Built With

* [Holochain](https://github.com/holochain/holochain-proto)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [Angular](https://angular.io/)

## Authors

* **Ryan How** - [RyanHow](https://github.com/RyanHow)
* **Peter Pons** - [ponspeter](https://github.com/ponspeter)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details

