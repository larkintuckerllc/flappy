var indexControllers = angular.module('indexControllers', []);

indexControllers.controller('IndexHomeCtrl', ['$scope', '$window', function($scope, $window) {
	$scope.state = 'begin'; // begin | play | error | success
	var goPlay = function() {
		$scope.state = 'play';
	};
	var goError = function() {
		$scope.state = 'error';
	};
	var goSuccess = function() {
		$scope.state = 'success';
	};
	var goBegin = function() {
		resetGame();
		$scope.state = 'begin';
	};
	$scope.goPlay = goPlay;
	$scope.goBegin = goBegin;	
	$scope.world = {
		left: 0,
		update: function() {
			if ($scope.state == 'play') {
				if (this.left - 1 >= -400) {
					this.left -= 1;
				} else {
					goSuccess();
				}
			}
		},
		reset: function() {
			this.left = 0;
		}
	};
	$scope.flappy = {
		x: 9,
		y: 45,
		xv: 0.2,
		yv: 0,
		see: 0,
		update: function() {
			if ($scope.state == 'play') {
				this.x += this.xv;
				this.y += this.yv;
				this.yv += 0.005;
				if ((this.y <= 0) || (this.y >= 90)) {
					goError();
				}
				if (this.see != -1) {
 					if ((this.x >= $scope.walls[this.see].x - 2) && (this.y >= (100 - $scope.walls[this.see].height - 10))) {
						goError();
					}	
					if (this.x >= $scope.walls[this.see].x + 2) {
						if (this.see == $scope.walls.length - 1) {
							this.see = -1;
						} else {
							this.see += 1;
						}
					}
				}
			}
		},
		reset: function() {
			this.x = 9;
			this.y = 45;
			this.yv = 0;
			this.see = 0;
		},
		flap: function() {
			this.yv = -0.3;
		}
	};
	$scope.walls = [
		{
			x: 40,
			height: 30
		},
		{
			x: 60,
			height: 50
		},
		{
			x: 80,
			height: 50
		}
	];
	var updateGame = function() {
		$scope.world.update();
		$scope.flappy.update();
	};
	var drawGame = function() {
		$scope.$apply();
	};
	var resetGame = function() {
		$scope.world.reset();
		$scope.flappy.reset();
	};
	var mainloop = function() {
		updateGame();
		drawGame();
	};
	var animFrame = $window.requestAnimationFrame ||
		$window.webkitRequestAnimationFrame ||
		$window.mozRequestAnimationFrame    ||
		$window.oRequestAnimationFrame      ||
		$window.msRequestAnimationFrame     ||
		null ;
	if (animFrame !== null) {
		var recursiveAnim = function() {
			mainloop();
			animFrame(recursiveAnim);
		};
		animFrame(recursiveAnim);
	} else {
		var ONE_FRAME_TIME = 1000.0 / 60.0 ;
		setInterval( mainloop, ONE_FRAME_TIME );
	}
}]);
