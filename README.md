# Task manager API

Task Manager Api where users can signup, login and create tasks. 

## Packages used

1. Bcryptjs used to hash and compare passwords.
2. Jsonwebtoken used to create new token for each user signup or login.
3. Sendgrid api used to send welcome email on signup.
4. Multer used to for image uploads and are resized using sharp package.

## User endpoints tested on postman
Post
1. /users
2. /users/login
3. /users/logout
4. /users/logoutAll
5. /users/me/avatar

Get
1. /users/me
2. /users/:id/avatar

Patch
1. /users/me

Delete
1. /users/me
2. /users/me/avatar

## Task endpoints
Post
1. /tasks

Get + (pagination and sorting)
1. /tasks
2. /tasks/:id
3. /tasks?completed=true
4. /tasks?limit=10&skip=10
5. /tasks?sortBy=createdAt:desc

Patch
1. /tasks/:id

Delete
1. /tasks/:id

## Automated testing
Automated testing done using Jest framework<br>
Supertest package doesn't need server running and so runs app.js