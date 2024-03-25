## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

# General Info
  budget-app is an expense and budget tracker.
  
  Here is the deployed [website](https://budget-mern-7e102b331f36.herokuapp.com/)
 
# Technologies
 The project is created with:
## Front-End Technologies
### Frameworks
* React 18.2
* React-Redux 9.1
* React-Router-Dom 6.16
* Chart.js 4.4
* React-Chartsjs-2
* Reduxjs/toolkit 2.0.1

### Styling
* Material UI 5.14.16
* Icons-Material 5.14.16
* React-Icons 4.11

## Back-End Technologies
* Express 4.18.2
* Express-Session 1.17.3
* Axios 1.6.2
* Mongoose 6.12.3

## Database
* MongoDB

# Getting Started
## Step 1: Clone the repository
```
$ Clone Repo "https://github.com/Alisa1989/budget-app.git"
```
## Step 2: Create Your MongoDB Account and Database Cluster
- Create your own MongoDB account by visiting the MongoDB website and signing up for a new account.

- Create a new database or cluster by following the instructions provided in the MongoDB documentation. Remember to note down the "Connect to your application URI" for the database, as you will need it later. Also, make sure to change <password> with your own password

- add your current IP address to the MongoDB database's IP whitelist to allow connections (this is needed whenever your ip changes)

## Step 3: Create .env file in the /server directory 
```
$cd server
$echo .env
```
and include
```
MONGODB_CONNECT_STRING=[your MongoDB uri]
PORT=[the port you choose for your backend]
NODE_ENV = development
ACCESS_TOKEN_SECRET =[your JWT secret key]
```
## Step 4: install dependencies and start the server
```
$ npm install
$ npm start
```

## Step 5: Create .env file in the /client directory
Open a new terminal window
```
$ cd client
```
create .env file
```
$ echo .env
```
and include:
```
PORT=[the port you choose for your frontend]
```

## Step 6: install dependencies and run the frontend 
```
$ npm install
$ npm start
```

## Step: Happy Coding!!

# License
[MIT](https://github.com/Alisa1989/Store64/blob/main/LICENSE) Alexandre Steinhauslin





