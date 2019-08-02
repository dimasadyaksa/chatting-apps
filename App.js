const App   = require('express')()
const http  = require('http').Server(App)
const io    = require('socket.io')(http)
const port  = process.env.PORT || 5000

App.get('/', function(req, res){
    res.sendFile(__dirname + '/View.html')
})
  
//io.set('origins', 'http://localhost:5000');
io.on('connection', function(socket){
    console.log('user connected')
    socket.on('disconnect',function(){
        console.log('user disconnected')
    })
    socket.on('chat message',function(msg){
        io.emit('chat message',msg)
    })
    socket.on('new user',function(msg){
        io.emit('new user',msg)
    })
})
http.listen(port,function(){
    console.log('listen on port : '+port)
})