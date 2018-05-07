'use strict'

const http = require('http').createServer(server),
	  fs = require('fs'),
	  io = require('socket.io')(http)

var connections = 0	

function server(req, res)
{

	fs.readFile('index.html', (err, data) => {
		if(err){
			res.writeHead(500,{'Content-Type' : 'text/html'})
			return res.end('<h1>Error Interno del Servidor!</h1>')
		}else{
			res.writeHead(200, {'Content-Type' : 'text/html'})
			return res.end(data, 'utf-8')
		}
	})

}

http.listen(3000, () => {
	console.log("Server Runinng...")
})

io.on('connection', (socket) => {
	socket.emit('hellow',{ message : "Hellow World With Socket IO" })

	socket.on('event', (data) => {
		console.log(data)
	})	

	connections++
	console.log(`Conexiones Activas: ${connections}`)

	socket.emit('connect users', { numbers : connections})
	socket.broadcast.emit('connect users', { numbers : connections})
	socket.on('disconnect', () => {
		connections--
		console.log(`Conexiones Activas: ${connections}`)
		socket.broadcast.emit('connect users', { numbers : connections})		
	})


})
