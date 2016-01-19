(function() {

	'use strict';

	angular
		.module('App', ['ionic', 'ionTinderCards'])
		.controller('AppController', AppController);

	AppController.$inject = ['$scope', '$timeout', 'TDCardDelegate'];

	function AppController($scope, $timeout, TDCardDelegate) {
		$scope.cards = [];
		$scope.list = [
			{
			  name: 'User 1',
			  age: 26,
			  image: 'http://api.randomuser.me/portraits/med/women/39.jpg',
			  description: 'Lorem ipsum dolor sit amet'
			},
			{
			  name: 'User 2',
			  age: 34,
			  image: 'http://api.randomuser.me/portraits/med/men/39.jpg',
			  description: 'Lorem ipsum dolor sit amet'
			},
			{
			  name: 'User 3',
			  age: 66,
			  image: 'http://api.randomuser.me/portraits/med/lego/2.jpg',
			  description: 'Lorem ipsum dolor sit amet'
			},
			{
			  name: 'User 4',
			  age: 31,
			  image: 'http://api.randomuser.me/portraits/med/women/38.jpg',
			  description: 'Lorem ipsum dolor sit amet'
			}
		];

		$scope.getCards = function() {
			$scope.pulse = true;
			$timeout(function() {
				angular.forEach($scope.list, function(card) {
					$scope.cards.push(card);
				});
				$scope.pulse = false;
			}, 1700);
		};

		$scope.remove = function(index) {
			$scope.cards.splice(index, 1);
			if($scope.cards.length <= 0) {
				$scope.getCards();
			}
		};

		$scope.reject = function(index) {
			console.log('LEFT SWIPE');
		};

		$scope.like = function(index) {
			console.log('RIGHT SWIPE');
		};

		$scope.swipeLeft = function() {
			TDCardDelegate.$getByHandle('cards').getFirstCard().swipe('left');
		};

		$scope.swipeRight = function() {
			TDCardDelegate.$getByHandle('cards').getFirstCard().swipe('right');
		};

		$scope.getCards();
	}

})();