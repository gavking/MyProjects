Chat application that uses Socket.io for bi-directional communication between
the server and the client.
This is based on the tutorial from here:
https://www.youtube.com/watch?v=tHbCkikFfDE

This video, and subsequent ones, has a good explanation of what is going on in the code as there is
not much explanation in the tutorial:
https://www.youtube.com/watch?v=HZWmrt3Jy10

Project was initialized by creating the project folder and then running
"npm init" inside it, during which the Entry point was set to "server.js".
Then opened the created "Package.json" file and added dependencies section.
After that ran "npm install" which installs the dependencies.

Socket.io needs to be 1) installed in node, 2) required in the server code, and
3) you also need to reference the socket.io scripts in the .html client-side code.

Process of sending messages from the client to the server
1. Client sends a message
2. Server receives the message
3. Server sends the message to everyone connected to the socket

We write complementary code on:
1. the server-side that can send (ie. socket.emit()) and receive (i.e socket.on())
messages from the client and,
2. the client-side that can send and receive messages from the server

Messages have a name attribute that identifies the message and a data attribute
that contains any data sent with the message.
