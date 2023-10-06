# chat-app
Web chat application
Open source application. for realtime chat in discussion for technology or progamming.

## Tech stack
### Front end. vite + vuejs 3
- Pinia - State manager
- socket.io-client - socket.io for client side realtime plugin

### Backend
nodejs + Expressjs
- mysql2 - sql
- socket.io - realtime plugin

### architecture 
use layered architecture


## Contributing
### Requirements
- Nodejs include npm
- Vuejs - use vite

### local development ecosystem
1. Config app url
   Just search any url & change it by your self
2. setting databases
   Import database structure


use npm
**Chat app (frontend)**
```
cd chat-app
npm install
npm run dev
```

**Server api**
```
cd socket
npm install
# nodemon or use node instead
nodemon ./index.js
```
