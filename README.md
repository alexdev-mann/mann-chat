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
