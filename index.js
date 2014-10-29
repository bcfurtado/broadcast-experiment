var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(5000, function() {
  console.log('listening on *:5000');
});

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.write('Send a messages for everybody!');
rl.on('line', function(line) {
  io.emit('chat message', line);
  rl.prompt(true);
}).on('close', function() {
  rl.write('Bye!');
  process.exit(1);
});
