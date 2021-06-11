<div align="center">
   <h1>Welcome to Numizmat <img src="https://media.giphy.com/media/njON3jEmTYHEfRbfsk/giphy.gif" width="25px"><img src="https://media.giphy.com/media/njON3jEmTYHEfRbfsk/giphy.gif" width="25px"><img src="https://media.giphy.com/media/njON3jEmTYHEfRbfsk/giphy.gif" width="25px"> </h1>
</div>

[Numizmat](https://numizmat.herokuapp.com/) is a coin tracking application, built using Python Flask, JavaScript, React, Redux and PostgresSQL.

## Technologies

-   React/Redux
-   Python
-   Flask
-   SQLAlchemy
-   PostgresQL
-   WebSockets
-   Faker
-   AWS

## Features

#### Splash Page

#### Main Page

#### Database Schema

![db](https://github.com/nasanov/numizmat/blob/main/docs/db3.png)

#### Authentication

-   Users can sign up
-   Users can log in
-   Users can log in as a demo user

#### Coins

- Users are able to create a coin using the Add coin button on the sidebar, or at the end of the coins list
- Users are able to edit and delete the coin on the particular coin details page
- Users can only delete coins that they own
- Users are able to add the coin to the collection or to the wishlist using the `Add to collection` button


#### Collections

- Users are able to create a collection using the `Add collection` button on the collections page
- Users are able to edit and delete the collection on the collections page
- Users can only delete collections that they own

#### Search / Filter

- Users are able to search for the coins and collections using the search input field on the navigation bar
- Users are able to search only for coins and collections that were created by admin user or by themselves
- Users are able to filter by name using the input field on the sidebar
- Users are able to filter coins by Country, name e.t.c

#### Import/Export to CSV

- Users are able to import CSV file to add coins into the existing collection
- Users are able to import CSV file and create new collection


## Future Implementations
- Live chat so users will be able to talk to each other in one chat room 
- Filtering By multiple columns
- Pagination for the main page
- User Profile
- News section with parsed news from different gov mint websites
- Achievments for the collections
- Add Kyrgyz and Russian languages
- Add dark mode

## Installation

This project can be run by following these steps:

-   Clone the repo into your desired folder.
-   Run `pipenv install` from the root project directory.
-   Run `npm install` from the react-app directory
-   Create a .env file in the root directory (use .env.example).
-   Run `pipenv shell` command
-   Run `flask run` command from the root directory and `npm start` from the react-app directory

For additional information, checkout project's [Wiki](https://github.com/nasanov/numizmat/wiki) page.

> Developed By: [Nurs Asanov](https://github.com/nasanov)

<img src="https://media.giphy.com/media/s9kqO10sLE9smNFM8V/giphy.gif"><img src="https://media.giphy.com/media/s9kqO10sLE9smNFM8V/giphy.gif"><img src="https://media.giphy.com/media/s9kqO10sLE9smNFM8V/giphy.gif">
