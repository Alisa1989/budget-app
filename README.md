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
These instructions require you to have Git, Node, and NPM installed locally
## Step 1: Clone the repository
```
$ git clone "https://github.com/Alisa1989/budget-app.git"
```
## Step 2: Create Your MongoDB Account and Database Cluster
- Create your own MongoDB account by visiting the MongoDB website and signing up for a new account.
- Create a new project
- Use the side menu to navigate to Database under Deployment and click on Build a Database
- Click on Create Database User and then Choose a Connection Method
- Click MongoDB for VSCode and then follow the instructions provided by MongoDB and Copy the connection string and place it in your local application /server/.env file (you will create this in the next step)
- make sure that your IP address has been added to the IP Access List.

## Step 3: Create .env file in the /server directory 
```
$ cd budget-app 
$ cd server
$ code .env
```
and include
```
MONGODB_CONNECT_STRING=[your MongoDB uri it will look something like this and it will need single quotation marks: 'mongodb+srv://<username>:<password>@cluster0.e48fsl0.mongodb.net']
PORT=[the port you choose for your backend, like: 3000]
NODE_ENV = development
ACCESS_TOKEN_SECRET =[your JWT secret key, make something up like: thisismysecret]
```
replace the square brackets and save
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