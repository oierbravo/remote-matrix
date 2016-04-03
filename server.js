//index.js
'use strict';

var express = require('express');
var bodyParser = require('body-parser');


var five = require("johnny-five");
 var board = new five.Board({ port: "COM10" });



board.on("ready", function() {

  var matrix = new five.Led.Matrix({
    pins: {
      data: 2,
      clock: 3,
      cs: 4
    },
    devices: 1
  });

  var heart = [
    "01100110",
    "10011001",
    "10000001",
    "10000001",
    "01000010",
    "00100100",
    "00011000",
    "00000000"
  ];
  var nada = [
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000",
    "00000000"
  ];

	var app = express();
	
    app.set('showStackError', true);
// Set swig as the template engine
	app.engine('html', require('ejs').renderFile);

	// Set views path and view engine
	app.set('view engine', 'html');
	app.set('views', './views');


	app.use(express.static(__dirname + '/public'));
	app.use('/bower_components', express.static(__dirname + '/bower_components'));
    //app.use(express.static(__dirname + '/bower_components'));
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(function(req, res, next) {
		  res.header("Access-Control-Allow-Origin", "*");
 	 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 		 next();
	});
	app.get('/', function (req, res) {
	  res.render('index');
	});
	var NUM_ROWS = 8;
	var NUM_COLS = 8;
	var matrixData = [
					1,0,0,0,0,0,1,1,
					0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,0,
					1,0,0,0,0,0,1,1
				];
	var prepareMatrix = function(){
		for(var i = 0; i < NUM_ROWS;i++){
			for(var j = 0; j < NUM_COLS;j++){
				matrix.led(i,j,matrixData[j + i * NUM_COLS]);
			}

		}
	}
	prepareMatrix();

   app.get('/matrix',function(req,res){
		console.log('get:/matrix');
		var output = [];
		/*for(var i = 0; i < matrix.length;i++){
			for(var j = 0; j < NUM_COLS;j++){
				var el = {
					x:j,
					y:i - j* NUM_COLS,
					value:matrix[i]

				}
				output.push(el);
			}

		}*/
		for(var i = 0; i < NUM_COLS;i++){
			for(var j = 0; j < NUM_ROWS;j++){
				    var el = {
				    index:j + i * NUM_COLS,
					x:i,
					y:j,
					value:matrixData[j + i * NUM_COLS]

				}
				output.push(el);
			}

		}
		console.log(output);
		res.json(output);
	});

    app.post('/matrix/:index',function(req,res){
		console.log('/matrix/:index:params',req.body);
		console.log('/matrix/:index:index',req.params.index);
		var index = req.params.index;
		var value = req.body.value;
		matrixData[index] = value;
		res.json({
			index:req.params.index,
			x:req.body.x,
			y:req.body.y,
			value:req.body.value

		});

		matrix.led(req.body.x,req.body.y,req.body.value);

    });
	/*
	var matrix = [
					[1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0]
				];


	app.get('/matrix',function(req,res){
		console.log('get:/matrix');
		var output = [];
		for(var i = 0; i < matrix.length;i++){
			var o = {};
			o.x = 0;
			o.y = i;
			o.values = [];
			for(var j = 0; j < matrix[i].length; j++){
				var val = {
					x: j,
					y: i,
					value: matrix[i][j]
				}
				o.values.push(val);
			}
			output.push(o);
		}
		//res.sendStatus('/matrix/',200);
		console.log(output);
		res.json(output);
	});
	app.get('/matrix/:row',function(req,res){
		console.log('/matrix',req.params.body);
		console.log('/matrix:row',req.params.row);
		var output = [];
		//res.sendStatus('get:/matrix/:row',200);
		res.sendStatus(200);
	});
	app.post('/matrix/:row',function(req,res){
		console.log('/matrix',req.params.body);
		console.log('/matrix:row',req.params.row);
		var output = [];
		//res.sendStatus('post:/matrix/:row',200);
		res.sendStatus(200);
	});
	*/

	
    
    var port = 3000;
	app.listen(port, function () {
	  console.log('Example app listening on port ' + port);
	});


});
