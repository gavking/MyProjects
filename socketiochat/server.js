/*Manually created file
This creates a server and enables sockets on the server. In order to use sockets
on the client side you will need to add the socket.io library in the client code,
see index.html. Socket.io module needs to be installed in node.js. See README.
*/

//Import dependencies
var express = require('express');

//Initialise the app
var app = express();

//Create the server
var server = require('http').createServer(app);

/*Create io (input/output) object and link it to the server. This also creates a
socket object, which is used below*/
var io = require('socket.io').listen(server);
/*Alternatively can be done like this:
var socket = require('socket.io');
var io = socket(server);
*/

//Arrays
users = []; //for storing the list of users that are logged in
connections = []; //for storing the list of sockets that are connected

//Start the server
server.listen(process.env.port || 3000);

//Routes
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

/*Handle a 'connection' event being made to the socket from client
  Go inside the io object, to the sockets object and call the "on" function.
  Pass it the event type, and an anonymous function that passes in the socker
  object.  Note it does not need to be anonymous. The socket object has lots of meta-data which can be output to the
  console. Read this as "if there is an event of type connection from the client
  then trigger the passed in function"
*/
io.sockets.on('connection', function(socket){
  //add the new connection to the connections array
  connections.push(socket);
  //output the number of connections
  console.log('Connected: %s sockets connected', connections.length);
  /*Output all the meta-data from the connected socket, very useful stuff here
  including IPs and details about the client */
  //console.log(socket);
  //Each connection gets an ID
  //console.log('new connection ' + socket.id);

  /*Handle a disconnect event from the client. If there is a message of type
  disconnect then trigger the passed in function */
  socket.on('disconnect', function(data){
    //if(!socket.username)return;
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  /*When an event from the client of type 'send message; is received.
  Send the received message i.e. data, to all socket connections and
  also the user that created it*/
  socket.on('send message', function(data){
    console.log(data); //for testing to check the server received the data
    /*Send event with type 'new message' to all connected clients
    including the client that send the original message (this is the
    io.sockets part which refers to everything). If you want to omit
    the originating client you can do this:
    socket.broadcast.emit('message_name', data);
    */
    io.sockets.emit('new message', {msg: data, user:socket.username});
  });

  //Handle an incoming event of type 'new user' from the clients
  socket.on('new user', function(data, callback){
    callback(true);
    socket.username = data;
    //add the username received from the client to the array of users
    users.push(socket.username);
    /*Call the function below to send the username out through the sockets*/
    updateUsernames();
  });

  /*Send the usernames out through the sockets to all connected clients so they
  can update the list of Online Users*/
  function updateUsernames(){
    io.sockets.emit('update users', users);
  };

});
