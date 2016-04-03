'use strict';

/**
 * @ngdoc function
 * @name remoteMatrixApp.controller:MatrixCtrl
 * @description
 * # MatrixCtrl
 * Controller of the remoteMatrixApp
 */
angular.module('remoteMatrixApp')
   .controller('MatrixCtrl', ['$http','$scope','Feathers', function ($http,$scope,Feathers) {
   	console.log('start');
   $scope.cellClick = function(index,value,x,y){
   	console.log('cellClick',index,value);
   	if(value === 0 ){
   		value = 1;
   	} else {
   		value = 0;
   	}
   //	console.log($scope.matrix);
   	//$scope.matrix[index].value = value;
  	//$scope.matrix[index].$save({value:value});
  	//Matrix.update({index:index},{value:value,x:x,y:y});
  	//$scope.matrix.update({_id:index});
  	var out = {
  		id:index,

  		index:index,
  		value:value,
  		x:x,
  		y:y  	}
  		console.log(out);
  	//$http.put('http://entzun.jazar.org:3030/matrix/' + index,out);
  	$scope.matrix.update(out);
   };
   var Matrix = Feathers.service('matrix');
   $scope.matrix = Matrix;
    Matrix.refresh({}).then(function(data){
    	console.log(data);
    //	$scope.matrix = data;
    });
    Matrix.on('updated',function(data){
    	console.log(data);
    //	$scope.matrix[data.index] = data;
    });
    /*$scope.matrix = Matrix.refresh().then(function(data){

    	data.forEach(function(el,ind){
    		
console.log(el);
    	});
    });
    */
   	/*$scope.matrix = Matrix.query(
   		function(succed){
   			console.log('succed',succed);
   			//$scope.matrix = succed;
   		},
   		function(failed){
   			console.log('fail',failed);
   		} 
   		);
*/
  }]);
