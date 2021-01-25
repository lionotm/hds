# Introduction

This is a POC project to create a booking system prototype to assist with the booking of share resources. It is targeted at reducing inefficiencies to due unable to find a right space.

## POC Demo



## Features
- Social signin/signup using AWS Cognito
- Login into booking page
- Users able to select different resources and book them on a date and timeslot
- Resources/timeslots filter as the user is selecting
- Admins able to create new resources and see all bookings
- CI/CD with AWS Amplify 

## Cloud Stack

- AWS Amplify
- AWS AppSync + GraphQL
- AWS Cognito
- AWS DynaoDB

## Known Issues
- AWS GraphQL schema automatic updates results in missing field after every publish which causes some failed queries. Have to edit the schema manually in Appsync console.


## To Install

In the project directory, you can run:
```
npm i
npm start
```
