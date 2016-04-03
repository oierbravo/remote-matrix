
var five = require("johnny-five");
 var board = new five.Board({ port: "COM10" });
const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');

var NUM_ROWS = 8;
var NUM_COLS = 8;



board.on("ready", function() {

  var matrix = new five.Led.Matrix({
    pins: {
      data: 2,
      clock: 3,
      cs: 4
    },
    devices: 1
  });

var prepareMatrix = function(){
	//console.log(matrixData);
	console.log('prepareMatrix start');
	//Whait for data.
	matrixData.then(function(data){
		//iterate over data.
		data.forEach(function(el,ind){
			//make the led change
			matrix.led(el.x,el.y,el.value);
		});
	});
}
	
	//socket and feathers initialization
	const socket = io('http://entzun.jazar.org:3030');
	const app = feathers().configure(socketio(socket));
	//bind for connect: just for debug.
	socket.on('connect',function(){
		console.log('connected');
	});

	//Connect to the feathers serrvice
	const matrixService = app.service('matrix');
	//Get initial data.
	var matrixData = matrixService.find(function(){
//console.log(matrixData);
		console.log('find-end');
		//prepare matrix with new data.
		prepareMatrix();

	});
	
	matrixService.on('updated',function(data){
		console.log('updated-data',data);
		//update th led
		matrix.led(data.x,data.y,data.value);


	});
});	