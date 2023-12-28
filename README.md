# websockets planning poker

## About
This is a React.js app that uses websockets to allow users on a Scrum team to vote on the complexity of a given user story. See https://default.wsplanningpoker.com

The app has 3 screens:

1. User Info Entry: The initial screen where users enter their name and choose whether they are a Scrum Master or a Developer. See `components/UserInfoEntryScreen.jsx`
2. Scrum Master Menu: The screen shown to Scrum Masters. A Scrum Master can enter the name of a story, start the voting on that story, and reveal the vote count once voting has concluded. See `components/ScrumMasterScreen.jsx`
2. Developer Menu: The screen shown to voters. A voter can select a Fibonacci number representing the estimated complexity of the story the ScrumMaster has selected. See `components/DeveloperScreen.jsx`

## Architecture
This app can support potentially infinite simultaneous Planning Poker sessions, one for each team. Each team has a dedicated subdomain at wsplanningpoker.com. For example, a team called Office has the subdomain office.wsplanningpoker.com. Within the app, there is a concept of a `teamId` which is simply the subdomain of the URL. This is used to keep voting sessions separate on the backend within the DynamoDB tables used by the API. This frontend code has a hook at `hooks/useTeamId.js` that is used to access this ID.

A websocket connection is used on each client to connect to the API. This allows the backend to update users of one another's actions in real time. A service at `services/WebSocketService.js` has been implemented which wraps the client's socket in a Singleton pattern in order to avoid duplicate connections among the app's components, as would happen with a `useWebSocket` hook. This service is used directly by the components in several places, as well as by `hooks/useVotes.js` which listens to vote updates and recalculates voting data when it changes. The `useVotes` hook is used in turn by various components which display this data.

## Running the app locally

1. Create a `.env` file at the root of the local directory. Mine looks like this:

```
REACT_APP_WEBSOCKET_URL=wss://cvgtsjdmze.execute-api.us-east-1.amazonaws.com/prod 
REACT_APP_SESSION_ID=development
```

* `REACT_APP_WEBSOCKET_URL` will change each time the API is recreated.
* `REACT_APP_SESSION_ID` sets the `teamId` for local development. If you want to develop or test in isolation, you should set a unique / custom one.

2. `npm i` (if you haven't already)

3. `npm start`

## Tests

e2e Playwright tests are found in the `tests` folder.

Some tests expect the app to be running locally.

To run tests:

1. Run the app locally
2. `npx playwright test`

## Todo
* Refactor to wrap User Info Entry in a real HTML form so that the user can hit Enter rather than having to click the "Join Planning" button.
* Add a SFXService so that the app can play the Jeopardy theme during voting.
* Replace ugly NVD3Chart pie chart with one that is better.
* Implement Playwright tests
* Save user info in local storage so users don't have to re-enter their name each time they come to the screen
* Allow users to change their name during voting
* Add a donate link
* Add a keepalive to avoid connection timeouts
* Upgrade to mui v5