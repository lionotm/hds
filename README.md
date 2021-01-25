# Introduction

This is a POC project to create a booking system prototype to assist with the booking of share resources. It is targeted at reducing inefficiencies to due unable to find a right space.

## POC Demo
https://main.d5lnn4vwtx8z1.amplifyapp.com 

## Features
- Social signin/signup using AWS Cognito
- Login into booking page
- Users able to select different resources and book them on a date and timeslot
- Resources/timeslots filter as the user is selecting
- Admin able to create new resources and see all bookings
- CI/CD with AWS Amplify & GitHub

## Cloud Stack
![Cloudstack](https://github.com/lionotm/hds/blob/main/HDSarch.png?raw=true)

- AWS Amplify
- AWS AppSync + GraphQL
- AWS Cognito
- AWS DynamoDB

## Known Issues
- AWS GraphQL schema automatic updates results in missing field after every publish which causes some failed queries. Have to edit the schema manually in Appsync console.

## Features to add
- Admin can block out whole day/days
- Hero section in homepage
- Admin can see and delete resources (instead of going into DynamoDB)
- Book several timeslots at once
- Responsive UI (only nav bar is responsive now)

## To Install

In the project directory, you can run:
```
npm i
npm start
```
