This is a back-end part of **Chatify** chat mini-app. You can find [front-end part here](https://github.com/theodoregold/chatify-frontend) and [task description here](https://github.com/theodoregold/chatify-frontend/blob/master/TASK.md).

## Demo
[https://optimistic-saha-ab65d9.netlify.com/](https://optimistic-saha-ab65d9.netlify.com/)

## Note
I am used to REST API and don't usually use sockets. IMHO, WebSocket protocol, in general, is horrible, especially error handling (how they silently fail) and lack of promises. In this case, I use single REST endpoint for nickname signup/check (easy for validation), but in real-world app REST API and sockets would probably be split into different servers/clusters. In this case, there is also no real authorization and persistent data, and in place of access token verification I pass user "nickname".

## Docker
```
docker-compose up
```

## Requirements
Your usual suspects
* Node.js (something recent like v8.10)
* Redis

## Getting started
- `yarn install` to install dependencies.
- `redis-server` to run your Redis instance.
- `yarn start:live` to run the server.
