# Mann chat app

## `Description`

It's a simple chat application. Enter a user name, then chat.

There are messages from the server when someone joins or leaves. When you post a message, the view port  automatically scrolls down. When you receive a message, either you were srolled down and you'll see the new message, or the view not totally scrolled down and you'll see a "New message" notification.

## `Commands`
- npm start
```
To test the application, run "npm start", it will start webpack and the node.js server concurrently. Then connect to http://localhost:3000/ using different browsers.
```
- npm run dev 

    &

- npm run server
```
For development, it is more convenient to run webpack and the server separately. Type "npm run dev" to run webpack and "npm run server" to start the server. That way you can restart one without restarting the other.
```
## `Test the app on a local network`
By default the application will work only on a local machine. To make it work on a network, you just need to edit the SOCKET.HOST in the file src/config/index.ts. Put your local ip, or your local hostname if you have a DNS server. Then connect to it, don't forget the port!

## `Server`

Node.js server communicating with clients through websockets (socket.io). Two type of socket events: "get" and "post". The payload signature is { cmd: string, params: string }. The response signature is { success: boolean, data: any }. For the moment, these are the possible cmd:
- SEND_MESSAGE_TO_SERVER
- REGISTER_USER
- GET_USER_LIST
- GLOBALS

On connection, a client sends a GLOBALS command (using <Globals />). Once logged in, the client sends a REGISTER_USER command.
Future improvements: handle rooms, tokenize every socket, store messages.

## `Tests`

Components are tested using enzyme. Run "npm test".

## `UI tests`

They use pupeteer; to run them type "npm ui-tests".

_`Please note`:_ you need to run npm start first; these tests are intended to be used while in active development. As they write a JSON result file and a screenshot, they could be used in a custom devtool.


# Notes on dev

## `React`

- The app is split in two: an "_engine" folder and everything else in src/. The structure of the engine folder mimics the structure of the main application. Should the project evolve, there should be a lot more in the engine.
- Use the getSocketData HOC to get data. It uses currying like so: getSocketData('COMMAND')(Component)
- The <Globals /> component uses the render prop pattern and sets the GlobalsContext context object. Simply import GlobalsContext and use <GlobalsContext.Consumer> to access globals coming from the server.
- Simple react app, no static bind to children components, no compound, no cloning or react magic as a simple app doesn’t need any of that. I tried to keep it simple while showing modern react good practices.
- Main app state in redux, some components have a local state for simplicity, efficiency. These components “react” to the redux store, so that we could write an enhancer for redux to log every action to the server (on dispatch, dispatch to store and send action). That way we could record and replay user’s sessions, either synchronously, live, or log it and replay it later.
- There are some comments, but I encourage people to keep a clear logic and self explanatory code, with explicit naming. The react component model and JSX are a big help to achieve that (vs classic OOP).


## `Devtools`

There are no devtools in this project for the moment (no time!), but there are some code supporting its implementation. 
Application components extends src/_engine/components/Component (which extends React.Component). While in DEV mode, that component could register / unregister them and stack them in the store. A <Devtools /> component, embedded or in an external window (using a React Portal), could list all of them, displaying the list of the components used to build the current view. The server already has an "open" command; we could open the files directly from the app. While not really needed for such a simple application, it is extremely helpful in a large app.
Another user would be to display a stack of websockets request, their status, timings, params and results.
We could also trigger ui-tests ([above](#server)) and display the results (including screenshot).
We could overwrite the console object using a proxy (to keep sourcemaps intact). That proxy could enhance any console call, and either perform it in DEV, or return in PROD. Although uglify can remove console calls for us, it’s better not to rely on its correct configuration.