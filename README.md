App to search tweets from Twitter with React and Node.js

Run backend:
npm start

Run frontend:
cd react-ui
npm start

TODO:
- [x] Async api search instead of callbacks that Express does not support well anymore
- [x] Node 22 update
- [x] Mongoose 9.0.0 id typings
- [ ] Fix test data tweetsearches to have nested tweets. Tests work without them though.
- [ ] Replace axios with fetch
- [ ] Use modern Azure login in workflow (like OpenID Connect)