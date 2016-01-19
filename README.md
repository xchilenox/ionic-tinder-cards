Ionic Tinder Cards
===================

Swipeable card based layout for Ionic and Angular. As seen in apps like [Tinder](http://www.gotinder.com/)  
Note: There is also a similar ion library here: https://github.com/driftyco/ionic-ion-swipe-cards where you swipe the cards down instead of left or right.

## Install

```shell
bower install ionic-tinder-cards --save
```

## Example

Include ion-tinder-cards.min.js and ion-tinder-cards.min.css after the rest of your Ionic and Angular includes. Add ionTinderCards as a module dependency of your app. Then use the AngularJS directives like in the following example:

```html
<html ng-app="App">
<head>
	<title>Ionic Tinder Cards</title>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
	<link href="http://code.ionicframework.com/1.2.4/css/ionic.min.css" rel="stylesheet" />
	<link href="/bower_components/ionic-tinder-cards/dist/ion-tinder-cards.min.css" rel="stylesheet" />
</head>
<body ng-controller="AppController">
	<ion-header-bar class="bar-calm">
		<h1 class="title">Ionic Tinder Cards</h1>
	</ion-header-bar>
	<ion-content scroll="false">

		<td-pulse ng-if="pulse">
			<img src="http://api.randomuser.me/portraits/med/women/35.jpg" />
		</td-pulse>

		<td-cards delegate-handle="cards" ng-if="cards.length > 0">
			<td-card ng-repeat="card in cards" on-destroy="remove($index)" on-transition-left="reject($index)" on-transition-right="like($index)">
				<span class="no">NOPE</span>
				<span class="yes">LIKE</span>
				<img ng-src="{{card.image}}" width="300" height="300" />
				<div class="caption">
					<h2 class="title">{{card.name}}, {{card.age}}</h2>
					<p class="description">{{card.description}}</p>
				</div>
			</td-card>
		</td-cards>

		<td-controls ng-if="cards.length > 0">
			<td-control-button action="no" icon="ion-close" ng-click="swipeLeft()"></td-control-button>
			<td-control-button action="yes" icon="ion-heart" ng-click="swipeRight()"></td-control-button>
		</td-controls>

	</ion-content>

	<script src="http://code.ionicframework.com/1.2.4/js/ionic.bundle.min.js"></script>
	<script src="/bower_components/collide/collide.js"></script>
	<script src="/bower_components/ionic-tinder-cards/dist/ion-tinder-cards.min.js"></script>
	<script src="app.js"></script>
</body>
</html>
```

```javascript
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
```