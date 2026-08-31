App to search tweets from Twitter with React and Node.js

Run backend:
npm start

Run frontend:
cd react-ui
npm start

TODO:
- [x] Async api search instead of callbacks that Express does not support well anymore
- [x] Node 22 update
- [x] Node 24 update
- [ ] Mongoose 10.0.0 update
- [ ] Fix test data tweetsearches to have nested tweets. Tests work without them though.
- [x] Replace axios with fetch
- [ ] primereact 11 update
- [ ] Use modern Azure login in workflow (like OpenID Connect)
- [x] Depricated redux connect
- [ ] Maybe migrate from redux to zustand
- [ ] Save dates as UTC.