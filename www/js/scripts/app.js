// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myapp = angular.module('starter', ['ionic','ionic.cloud'])

.config(function($ionicCloudProvider,$stateProvider, $urlRouterProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "c2f7c8b5"
    }
  });
    
  $stateProvider
      .state("/", {
        url: "/",
        templateUrl : "views/login.html"
      })
      .state("/practice", {
        url: "/game",
        templateUrl : "views/game.html",
        params: {demo: 'practice'}
      })
      .state("/wully", {
        url: "/game",
        templateUrl : "views/game.html",
        params: {demo: 'wully'}
      })
      .state("/prize", {
        url: "/game",
        templateUrl : "views/game.html",
        params: {demo: 'prize'}
      })
      .state("/dash", {
        url: "/dash",
        templateUrl : "views/dash.html"
      })
      .state("/contest", {
        url: "/contest",
        templateUrl : "views/contest.html"
      })
	  .state("/leaderboard", {
        url: "/leaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        cache: false
      })
      .state("/fzleaderboard", {
        url: "/fzleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'fz'},
        cache: false
      })
	  .state("/winner", {
        url: "/winner",
        templateUrl : "views/winner.html",
	  	controller: "winner.controller"
      })
	  .state("/fzdash", {
        url: "/fzdash",
        templateUrl : "views/fz/fz.dash.html",
	  	controller: "fz.dash.controller"
      })
	  .state("/fzgame", {
        url: "/fzgame",
        templateUrl : "views/fz/fz.game.html",
        controller: "fz.dash.controller"
      })
      .state("/fzlogin", {
        url: "/fzlogin",
        templateUrl : "views/fz/fz.login.html",
        controller: "fz.login.controller"
      })
      .state("/fzcontest", {
        url: "/fzcontest",
        templateUrl : "views/fz/fz.contest.html",
        controller: "fz.contest.controller"
      })
      .state("/tutorial", {
        url: "/tutorial",
        templateUrl : "views/tutorial.html"
      })
      .state("/login", {
        url: "/login",
        templateUrl : "views/login.html"
      })
      .state("/dmzdash", {
        url: "/dmzdash",
        templateUrl : "views/dmz/dmz.dash.html",
	  	controller: "dmz.dash.controller"
      })
      .state("/dmzgame", {
        url: "/dmzgame",
        templateUrl : "views/dmz/dmz.game.html",
        controller: "dmz.dash.controller"
      })
      .state("/dmzlogin", {
        url: "/dmzlogin",
        templateUrl : "views/dmz/dmz.login.html",
        controller: "dmz.login.controller"
      })
      .state("/dmzcontest", {
        url: "/dmzcontest",
        templateUrl : "views/dmz/dmz.contest.html",
        controller: "dmz.contest.controller"
      })
      .state("/dmzleaderboard", {
        url: "/dmzleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'dmz'},
        cache: false
      })
      .state("/wullydash", {
        url: "/wullydash",
        templateUrl : "views/wully/wully.dash.html",
	  	controller: "wully.dash.controller"
      })
      .state("/wullygame", {
        url: "/wullygame",
        templateUrl : "views/wully/wully.game.html",
        controller: "wully.dash.controller"
      })
      .state("/wullylogin", {
        url: "/wullylogin",
        templateUrl : "views/wully/wully.login.html",
        controller: "wully.login.controller"
      })
      .state("/wullycontest", {
        url: "/wullycontest",
        templateUrl : "views/wully/wully.contest.html",
        controller: "wully.contest.controller"
      })
      .state("/wullyleaderboard", {
        url: "/wullyleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'wully'},
        cache: false
      })
      .state("/lzdash", {
        url: "/lzdash",
        templateUrl : "views/lz/lz.dash.html",
	  	controller: "lz.dash.controller"
      })
      .state("/lzgame", {
        url: "/lzgame",
        templateUrl : "views/lz/lz.game.html",
        controller: "lz.dash.controller"
      })
      .state("/lzlogin", {
        url: "/lzlogin",
        templateUrl : "views/lz/lz.login.html",
        controller: "lz.login.controller"
      })
      .state("/lzcontest", {
        url: "/lzcontest",
        templateUrl : "views/lz/lz.contest.html",
        controller: "lz.contest.controller"
      })
      .state("/lzanswer", {
        url: "/lzanswer",
        templateUrl : "views/lz/lz.answer.html"
      })
      .state("/lzleaderboard", {
        url: "/lzleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'lz'},
        cache: false
      });
    $urlRouterProvider.otherwise('/');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

 myapp.factory('mocha', function($rootScope,$state,$stateParams,$window,$ionicSlideBoxDelegate){
    this.contest = {};
    this.test = {};
    this.played_data = []; 
    this.submitPrediction = function($scope){
            if($scope.index < $scope.data.length){
                if(!$scope.data[$scope.index].hasOwnProperty('prediction')){
                    //for situations where prediction is automatically inserted by other functions
                    $scope.data[$scope.index].prediction = $scope.test.price;
                }
				var prediction = $scope.data[$scope.index].prediction;
                //$scope.index++;
                //$scope.game = $scope.data[$scope.index];
                
                //reconcile price prediction for consistent points
                if($scope.manualprice === true)
                    $scope.test.price = $scope.test.second_price;
                
                $scope.test.point_earned = $scope.data[$scope.index].point =  this.pointsMath($scope.index,prediction,$scope);
                //$scope.data[$scope.index].point = pointsMath($scope.index,x);
                $scope.show_points = true;
                $scope.manualprice = false;
                this.pullNextImage(null,$scope); //this pulls the next image into the DOM for smoother UX experience
                //pullNextImage('auto'); //this pulls the next image into the DOM for smoother UX experience
                
                if($scope.index == $scope.data.length - 1){
                    //$scope.index++;
                    //$timeout($scope.nextProduct,1300);
					this.nextProduct($scope);
                   }
                
            }else{
                this.nextProduct($scope);
            }
            
        };
	 
	 this.nextProduct = function($scope){
            //action for what happens after final answer is given
            if($scope.index !== $scope.data.length - 1){
                console.log($scope.data);
                $scope.index++;
                $scope.show_points = false;
                //$scope.manualprice = false;
                $scope.game = $scope.data[$scope.index];
                $scope.progress = (($scope.index)/$scope.data.length)*100;
                if(location.hash.includes('dmz') || location.hash.includes('fz') || $scope.wully == true){
                   //$scope.test.price = $scope.test.second_price = 5;
                   $scope.test.price = $scope.test.second_price = Number($scope.game.max);
                    //angular.element(document.querySelectorAll('input[type="range"]'))[3].value =700;
                }
                this.pullNextImage(null,$scope);
                //$scope.modal.show();
                //$ionicSideMenuDelegate.toggleLeft();
                
                
            }else{
                $scope.test.point_earned = this.getPoints($scope);
                this.gameTimePlayed($scope);
                this.getTokens($scope);
                $scope.test.hideModal = false;
                this.played_data = this.getPlayedData($scope.data);
                this.takeChunk($scope);
                //$location.path('/final');
                //angular.element(document.querySelector('.modal')).modal('open');
            }
            
        };

     this.getPlayedData = function(arr){
        let newArr = [];
        arr.forEach(function(item){
            let capture = {};
            capture.p_id = item.p_id;
            capture.prediction = item.prediction;
            newArr.push(capture);
        });
        return newArr
     }
	 
	 this.pointsMath = function (index, val, $scope){
            realPrice = $scope.data[index].price;
            pChange = val/realPrice;
            console.log(val, realPrice, pChange);
            
            //when prediction is more than 200% of the value
            if(pChange >= 2 || pChange <= 0){
                return 0;
            }
            
            //when prediction is more than 100% of the real value
            if(pChange > 1 && pChange < 2){
                return Math.round(750 - pChange*750 + 750);
            }else{
               return Math.round(pChange*750);
            }
        };
	 
	 this.pullNextImage = function(a,$scope){
            var x = new Image();
            x.onload = function(){
               if(a === 'auto'){
                   //Do not let player manually move to next if this is in place.
                   $timeout($scope.nextProduct,1300);
               }
            };
            x.onerror = function(){
                $scope.data.splice($scope.index + 1,1);
                if(a === 'auto'){
                    //This is used cause we need the game to move forward automatically despite an image(s) download failure
                   this.pullNextImage('auto');
                }else{
                   this.pullNextImage(null,$scope);
                }
                
            };
            
            if(this.safe($scope.data[$scope.index + 1])){
                //This initiates the downloading of the image into the DOM
                x.src = $scope.data[$scope.index + 1].url;
            }else{
                console.log('fuck no');
            }
            //x.src = $scope.data[$scope.index + 1].url;
        };
	 
	 this.safe = function (a){
            if(a === undefined || a === null || a === ''){
                return false;
            }
            return true;
	 };
	 
	 this.getPoints = function ($scope){
            let y = 0;
            for(x in $scope.data){
                y += $scope.data[x].point;
            }
            y = Math.round((y/($scope.data.length*750))*7500);
            
            return y;
        };
        
     this.gameTimePlayed = function ($scope){
            //get current time
            $scope.test.end_time = moment();
            //get difference between start and end in miliseconds
            var dif = $scope.test.end_time.diff($scope.test.start_time);
            //format the miliseconds to minutes,seconds and milliseconds
            $scope.test.timePlayed = moment(dif).format("mm:ss:SS");
            return $scope.test.timePlayed;
        };
	 
	 this.takeChunk = function ($scope){
            $scope.data = [];
            var round = 15; //No of products for each round
            if($scope.apiCounter*round >= $scope.apiData.length){
                $scope.apiCounter = 1;
            }
            var a = ($scope.apiCounter - 1)*round;
              
            for(a; a<$scope.apiCounter*round; a++){
                $scope.data.push($scope.apiData[a]);
            }
            
            if($scope.data.length != 0){
                let y = new Image();
                for(let x=0; x < 1; x++){
                    
                    y.onload = function(){};
                    y.onerror = function(){
                        $scope.data.splice(x,1);
                        //pullNextImage();
                    };
                    y.src = $scope.data[x].url;
                    //console.log(y.src);
                }
                $scope.game = $scope.data[0];
                $scope.apiCounter++
            }
            
        };
     
     this.getTokens = function ($scope){
            var b = Number($scope.test.point_earned);
            if(b >= 3750 && b <= 5750){
               $scope.test.token = 3;
            }
            if(b > 5750 && b <= 6750){
               $scope.test.token = 4;
            }
            if(b > 6750 && b < 7500){
               $scope.test.token = 5;
            }
            if(b == 7500){
               $scope.test.token = 10;
            }
            if(b < 3750){
               $scope.test.token = 0;
            } 
        };
	 
	 this.inputShow = function($scope){
            if($scope.show_points !== true && !this.safe($scope.game.options) && !$scope.show_radio){
                //unfortunately HTML range slider returns price as string instead of number
                $scope.test.second_price = Number($scope.test.price);
                $scope.manualprice = true;
            }
        };
        
     this.startTime = function($scope,c){
            //use true parameter to force a new time stamp
            if(!$scope.data[0].hasOwnProperty('point') || c === true){
                $scope.test.start_time = moment();
                console.log('clock is ticking');
            }
        };
	 
	 this.menuHide = function($scope){
            $scope.test.menuhide += 1;
        };
	 
	 this.resetGame = function($scope,a,b){
            $scope.show_points = false;
            $scope.manualprice = false;
            $scope.test.point_earned = 0;
            $scope.test.price=$scope.test.second_price=250;$scope.progress=0; $scope.test.start_time=$scope.test.end_time=null;
            $scope.test.hideModal = true;
            if(b == true && a == 'practice'){
                $scope.apiCounter = $scope.apiCounter - 2;
                this.takeChunk($scope);
                this.startTime($scope,true); 
               }
            if(a == 'practice' && b !== true){
               $scope.startTime(); 
            }
            if($stateParams.demo === 'wully'){
                $scope.data = $scope.wully_data;
                a = 'wully';
            }
            if($stateParams.demo === 'prize'){
                $scope.data = $scope.prizeData;
                a = 'prize';
            }
		 	if(location.hash.includes('fz')){
                angular.copy($scope.fz_data,$scope.data);
				this.startTime($scope,true);
                a = 'fzgame';
            }
            $scope.index = 0;
            $scope.game = $scope.data[$scope.index];
            $state.go('/' + a);
        };
	 
	 this.checkWindow = function(){
            if($window.innerWidth > 600){
                //console.log('screen  to big');
                return true;
            }
	 };
	 
	 this.playedAlready = function(start, end){
		 if(localStorage.hasOwnProperty('prizeplaydate') && this.safe(localStorage.prizeplaydate)){
			 let dateStored = moment(localStorage.prizeplaydate);
			 let afterStart = dateStored.isAfter(start);
			 let beforeEnd = dateStored.isBefore(end);
			 if(afterStart == true && beforeEnd == true){
				 return true;
			 }
		 }
		 return false;
	 };
	 
	 this.randomize = function(array) {
			//Algorithm to shuffle an array
			var input = array;

			for (var i = input.length-1; i >=0; i--) {

				var randomIndex = Math.floor(Math.random()*(i+1)); 
				var itemAtIndex = input[randomIndex]; 

				input[randomIndex] = input[i]; 
				input[i] = itemAtIndex;
			}
			return input;
     };
        
     this.goDash = function(slider){
        //$ionicSlideBoxDelegate.$getByHandle('slider').previous();
        //slider._slidePrev(1000);
        //slider._slideTo(0,500);
        slider._slideNext(500);
     };
	 
	 return this;
 });

 myapp.controller('mCtrl', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
	 
        //$scope.data = [];
	 	$scope.mocha = mocha;
        $scope.apiData = [];
        $scope.contest = {};
        $scope.apiCounter = 1;
        $scope.show_points = false;
        $scope.manualprice = false;
        $scope.test = {price:250,second_price:250,start_time:null,end_time:null,menuhide:0,hideModal:true};
        $scope.test.point_earned = 0;
        $scope.progress = 0;
        $scope.index = 0;
	 	$scope.retryNum = 3;
        $scope.wully_dashboard = 0;
        $scope.dashimage = 'https://styleminions.co/images/SM%20Logo%20White.svg';
	 	//setting the prize dates manually is crucial for now but must be from the server when converted to native app
	 	$scope.prizeStartDate = moment('2017/10/25','YYYY/MM/DD');
	 	$scope.prizeEndDate = moment('2017/11/02','YYYY/MM/DD');
        checkWindow();
        //$http.get('http://127.0.0.1:8000/mocha')
        $http.get('https://styleminions.co/api/mocha?q=' + 250)
        .then(function(res){
            //console.log(res);
            $scope.apiData = res.data;
            $scope.prizeData = $scope.apiData.slice(120,135);
			$scope.apiData = mocha.randomize($scope.apiData); //Shuffle the data for practice mode.
            takeChunk();
        })
        .then(function(){
            //$scope.menuhide = 0;
            $scope.game = $scope.data[$scope.index];
            if($scope.screen_big !== true && (!location.hash.includes('fz'))  && (!location.hash.includes('dmz'))
            && (!location.hash.includes('wully')) && (!location.hash.includes('lz'))){
                //This mimics a real life game loading thing. this can definitely be optimized later.
                $timeout(function(){
                    $state.go('/dash');
                },3000);
            }
            
        });
     
        $scope.submitPrediction = function(){
            if($scope.index < $scope.data.length){
				$scope.data[$scope.index].prediction = $scope.test.price;	
								
				var prediction = $scope.data[$scope.index].prediction;
                //$scope.index++;
                //$scope.game = $scope.data[$scope.index];
                
                //reconcile price prediction for consistent points
                if($scope.manualprice === true)
                    $scope.test.price = $scope.test.second_price;
                
                $scope.test.point_earned = $scope.data[$scope.index].point =  pointsMath($scope.index,prediction);
                //$scope.data[$scope.index].point = pointsMath($scope.index,x);
                $scope.show_points = true;
                $scope.manualprice = false;
                pullNextImage(); //this pulls the next image into the DOM for smoother UX experience
                //pullNextImage('auto'); //this pulls the next image into the DOM for smoother UX experience
                
                if($scope.index == $scope.data.length - 1){
                    //$scope.index++;
                    //$timeout($scope.nextProduct,1300);
					$scope.nextProduct();
                   }
                
            }else{
                $scope.nextProduct();
            }
            
//            if($scope.index == $scope.data.length){
//                console.log($scope.data);
//                $location.path('/final');
//                
//            }
            
        };
        
        $scope.nextProduct = function(){
            //action for what happens after final answer is given
            if($scope.index !== $scope.data.length - 1){
                console.log($scope.data);
                $scope.index++;
                $scope.show_points = false;
                //$scope.manualprice = false;
                $scope.game = $scope.data[$scope.index];
                $scope.progress = (($scope.index)/$scope.data.length)*100;
                if($scope.wully == true){
                   //$scope.test.price = $scope.test.second_price = 5;
                   $scope.test.price = $scope.test.second_price = Number($scope.game.max);
                    //angular.element(document.querySelectorAll('input[type="range"]'))[3].value =700;
                }
                pullNextImage();
                //$scope.modal.show();
                //$ionicSideMenuDelegate.toggleLeft();
                
                
            }else{
                $scope.test.point_earned = getPoints();
                gameTimePlayed();
                getTokens();
                $scope.test.hideModal = false;
                mocha.played_data = mocha.getPlayedData($scope.data);
                takeChunk();
                //$location.path('/final');
                //angular.element(document.querySelector('.modal')).modal('open');
            }
            
        };
        
        $scope.inputShow = function(){
            if($scope.show_points !== true){
                $scope.manualprice = true;
                //unfortunately HTML range slider returns price as string instead of number
                $scope.test.second_price = Number($scope.test.price);
            }
			if($scope.prize && $scope.show_points == true){
				//retry feature trigger
				$scope.retry();			   
		    }
        };
	 
	 	$scope.retry = function(){
			if($scope.retryNum > 0){
				$scope.retryNum -= 1;
				$scope.show_points = false;
			}
			
		}
        
        $scope.startTime = function(c){
            //use true parameter to force a new time stamp
            if(!$scope.data[0].hasOwnProperty('point') || c === true){
                $scope.test.start_time = moment();
                console.log('clock is ticking');
            }
        };
        
        $scope.resetGame = function(a,b){
            $scope.show_points = false;
            $scope.manualprice = false;
            $scope.test.point_earned = 0;
            $scope.test.price=$scope.test.second_price=250;$scope.progress=0; $scope.test.start_time=$scope.test.end_time=null;
            $scope.test.hideModal = true;
            if(b == true && a == 'practice'){
                $scope.apiCounter = $scope.apiCounter - 2;
                takeChunk();
                $scope.startTime(true); 
               }
            if(a == 'practice' && b !== true){
               $scope.startTime(); 
            }
            if($stateParams.demo === 'wully'){
                $scope.data = $scope.wully_data;
                a = 'wully';
            }
            if($stateParams.demo === 'prize'){
                $scope.data = $scope.prizeData;
                a = 'prize';
            }
            $scope.index = 0;
            $scope.game = $scope.data[$scope.index];
            $state.go('/' + a);
        };
        
        $scope.menuHide = function(){
            $scope.test.menuhide += 1;
        };
     
        $scope.goContest = function(){
            $scope.test.hideModal = true;
            if($scope.safe(localStorage.name)){
                //Pull saved user data if it exists
                $scope.contest.name = localStorage.name;
                $scope.contest.phone = Number(localStorage.phone);
            }
            $state.go('/contest');
        };
     
        $scope.contestSubmit = function(form){
			if(form.$valid){
				$scope.contest.timestamp = moment().toISOString();
				$scope.contest.points = $scope.test.point_earned;
                $scope.contest.playtime = $scope.test.timePlayed;
                $scope.contest.played_data = JSON.stringify(mocha.played_data);
                $http.get('https://styleminions.co/api/contest?name='+$scope.contest.name+"&phone="+$scope.contest.phone+
                "&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points+"&playtime="+$scope.contest.playtime+
                "&played_data="+$scope.contest.played_data)
				.then(function(res){
					localStorage.name = $scope.contest.name;
					localStorage.phone = $scope.contest.phone;
					localStorage.prizeplaydate = moment().toISOString();
					//$scope.thankyou = true;
					//$scope.resetGame('dash');
					$state.go('/leaderboard');
				});
			}else{
				console.log('fuck no form not valid');
				console.log(form);
			}
        };
        
        $scope.startWully = function(){
            $scope.data = $scope.wully_data;
            $scope.prize = $scope.practice = false;
            $scope.game = $scope.data[$scope.index];
            $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true};
            $scope.test.price = $scope.test.second_price = Number($scope.game.max);
            $scope.startTime();
            angular.element(document.querySelector('body'))[0].style.borderTopColor='rgba(224, 24, 43, 0.91)';
//            angular.element(document.querySelector('a.btn-menu'))[0].style.backgroundColor='#b9150e';
            $scope.wully = true;
            $state.go('/wully');
            
            console.log($stateParams);
        };
     
        $scope.startPrize = function(){
            if($scope.prize !== true){
                $scope.data = $scope.prizeData;
                // create function called default that acts like the reset function
                $scope.index = $scope.progress = 0;
                $scope.wully = $scope.practice = false;
                $scope.game = $scope.data[$scope.index];
				$scope.startTime();
            }
            
            $scope.prize = true;
            $state.go('/prize');
        }
        
        $scope.startPractice = function(){
            if($scope.wully === true || $scope.prize === true){
                $scope.data = $scope.apiData;
                takeChunk();
                $scope.wully = $scope.prize = false;
                $scope.resetGame('practice');
				//$scope.startTime(); its already starting time in the resetGame method
            }
            
			$scope.startTime();
            $scope.practice = true;
            $state.go('/practice');
        }
        
        $scope.wullyAppear = function(){
            $scope.wully_dashboard += 1;
            if($scope.wully_dashboard >= 2){
                angular.element(document.querySelector('body'))[0].style.borderTopColor='rgba(224, 24, 43, 0.91)';
                $scope.wully = true;
                $scope.dashimage = 'https://scontent-yyz1-1.cdninstagram.com/t51.2885-19/s150x150/16908361_720960684745218_2933981757210361856_a.jpg';
            }
            
        }
        
        function pointsMath(index, val){
            realPrice = $scope.data[index].price;
            pChange = val/realPrice;
            console.log(val, realPrice, pChange);
            
            //when prediction is more than 200% of the value
            if(pChange >= 2 || pChange <= 0){
                return 0;
            }
            
            //when prediction is more than 100% of the real value
            if(pChange > 1 && pChange < 2){
                return Math.round(750 - pChange*750 + 750);
            }else{
               return Math.round(pChange*750);
            }
        }
        
        function getPoints(){
            let y = 0;
            for(x in $scope.data){
                y += $scope.data[x].point;
            }
            y = Math.round((y/($scope.data.length*750))*7500);
            
            return y;
        }
        
        function gameTimePlayed(){
            //get current time
            $scope.test.end_time = moment();
            //get difference between start and end in miliseconds
            var dif = $scope.test.end_time.diff($scope.test.start_time);
            //format the miliseconds to minutes,seconds and milliseconds
            $scope.test.timePlayed = moment(dif).format("mm:ss:SS");
            return $scope.test.timePlayed;
        }
     
        function pullNextImage(a){
            var x = new Image();
            x.onload = function(){
               if(a === 'auto'){
                   //Do not let player manually move to next if this is in place.
                   $timeout($scope.nextProduct,1300);
               }
            };
            x.onerror = function(){
                $scope.data.splice($scope.index + 1,1);
                if(a === 'auto'){
                    //This is used cause we need the game to move forward automatically despite an image(s) download failure
                   pullNextImage('auto');
                }else{
                   pullNextImage();
                }
                
            };
            
            if($scope.safe($scope.data[$scope.index + 1])){
                //This initiates the downloading of the image into the DOM
                x.src = $scope.data[$scope.index + 1].url;
            }else{
                console.log('fuck no');
            }
            //x.src = $scope.data[$scope.index + 1].url;
        }
        
        function takeChunk(){
            $scope.data = [];
            var round = 15; //No of products for each round
            if($scope.apiCounter*round >= $scope.apiData.length){
                $scope.apiCounter = 1;
            }
            var a = ($scope.apiCounter - 1)*round;
              
            for(a; a<$scope.apiCounter*round; a++){
                $scope.data.push($scope.apiData[a]);
            }
            
            if($scope.data.length != 0){
                let y = new Image();
                for(let x=0; x < 1; x++){
                    
                    y.onload = function(){};
                    y.onerror = function(){
                        $scope.data.splice(x,1);
                        //pullNextImage();
                    };
                    y.src = $scope.data[x].url;
                    //console.log(y.src);
                }
                $scope.game = $scope.data[0];
                $scope.apiCounter++
            }
            
        }
     
        function getTokens(){
            var b = Number($scope.test.point_earned);
            if(b >= 3750 && b <= 5750){
               $scope.test.token = 3;
            }
            if(b > 5750 && b <= 6750){
               $scope.test.token = 4;
            }
            if(b > 6750 && b < 7500){
               $scope.test.token = 5;
            }
            if(b == 7500){
               $scope.test.token = 10;
            }
            if(b < 3750){
               $scope.test.token = 0;
            } 
        }
        
        function checkWindow(){
            if($window.innerWidth > 600){
                //console.log('screen  to big');
                $scope.screen_big = true;
            }
        }
        
        $scope.safe = function (a){
            if(a === undefined || a === null || a === ''){
                return false;
            }
            return true;
        }
        
    });
    
    myapp.directive('menuButton', function() {
      return {
        templateUrl: 'views/menu-button.html'
      };
    });

    myapp.directive('menuHeader', function() {
      return {
        templateUrl: 'views/menu-header.html' 
      };
    });

    myapp.directive('fzMenuHeader', function() {
        return {
          templateUrl: 'views/fz/fz.menu-header.html'
        };
    });

    myapp.directive('dmzMenuHeader', function() {
        return {
          templateUrl: 'views/dmz/dmz.menu-header.html'
        };
    });

	myapp.directive('resultModal', function() {
      return {
        templateUrl: 'views/result.html'
      };
    });

    myapp.directive('fzResultModal', function() {
        return {
          templateUrl: 'views/fz/fz.result.html'          
        };
    });

    myapp.directive('dmzResultModal', function() {
        return {
          templateUrl: 'views/dmz/dmz.result.html'          
        };
    });

    myapp.directive('selectType', function() {
      return {
        link: function(scope, elem, attrs){
            angular.element('select').material_select();
        }        
      };
    });

	myapp.directive('loader', function() {
      return {
        template: '<div class="loader center-align"><ion-spinner icon="ripple"></ion-spinner><div>'
        
      };
    });

	myapp.controller('leaderboard.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
		$scope.loader = true;
		//$timeout(function(){$scope.loader = false;},3000)
        var gametime = moment('2017/10/16','YYYY/MM/DD').toISOString();
        var url = 'https://styleminions.co/api/leaderboard?q=';
        if(mocha.safe($stateParams.mode)){
            //Default API FOR DEMOS. No need to build backend yet till its necessary
            url = 'https://styleminions.co/api/dmzleaderboard?q=';
            $scope[$stateParams.mode] = true;
        }
        if($stateParams.mode === 'fz'){
            url = 'https://styleminions.co/api/fzleaderboard?q=';
            $scope.fz = true;
        }
        if($stateParams.mode === 'dmz'){
            url = 'https://styleminions.co/api/dmzleaderboard?q=';
            $scope.dmz = true;
        }
        $scope.getList = function(){
            $scope.loader = true;
            $http.get(url + gametime)
            .then(function(res){
                console.log(res);
                $scope.leaderList = [];
                $scope.thisPlayer = false;
                var number = localStorage.phone;
                var list = res.data;
                list.forEach(function(item){
                    if(item.phone === number){
                        item.thisplayer = true;
                        $scope.thisPlayer = true;
                        if(!localStorage.hasOwnProperty('points')){
                            localStorage.points = item.points;
                        }
                        
                    }else{
                        item.thisplayer = false;
                    }
                    $scope.leaderList.push(item);
                });
                $scope.player = localStorage;
                //report($scope.leaderList);
                $scope.loader = false;
                
            });
        };
        $scope.getList();
        
        function report(list){
            //analytics avg report for each question that was predicted to get value perception of consumer/service product.
            var basket = [];
            function average(num){return num/list.length;};
            list.forEach(function(item){
                var obj = JSON.parse(item.played_data);
                for(var x = 0; x < obj.length; x++){
                    var index = obj[x].p_id;
                    if(!mocha.safe(basket[index])){
                        basket[index] = 0;
                    }
                    basket[index] += Number(obj[x].prediction);
                }	
            });
            var output = basket.map(average);
            console.log(basket,'report',output,'output');
        }
		
	});
	
	myapp.controller('winner.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,$sce){
		$scope.loader = true;
		//In this version of Angular 1.x you have to add &callback=JSON_CALLBACK to the url when you use JSONP or else it will fail horibbly. http.get() wont work because of cross browser scripting.
		//stackoverflow refrence link - https://stackoverflow.com/questions/12066002/parsing-jsonp-http-jsonp-response-in-angular-js
		var url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=6066396632.c4c182e.998085c27363408aab71d3dd30f542b0';
		//var trustedUrl = $sce.trustAsResourceUrl(url);
		//mocha instagram id is "6066396632"
		
		$http.jsonp(url + '&callback=JSON_CALLBACK')
		.then(function(res){
			//console.log(res);
			$scope.winnerList = [];
			var list = res.data.data;
			list.forEach(function(item){
				if(item.tags.indexOf('winner') !== -1){
					var obj = {};
					obj.url = item.images.standard_resolution.url;
					obj.user = item.users_in_photo[0].user.username;
					obj.link = item.link;
			    	$scope.winnerList.push(obj);
					
				}
				
			});
			//console.log($scope.winnerList);
			
			$scope.loader = false;
			
		});
	});

    //FASHION ZONE CONTROLLERS BELOW
    myapp.controller('fz.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
		angular.element(document.querySelector('body'))[0].style.borderTopColor='#f64348';
        //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu wully-color';
		if(mocha.checkWindow() === true){
			$state.go('/');
		}
		
		$scope.fz_data = [
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18950047_457101204639111_8252268334817476608_n.jpg',
                price:'729',
                question:'Predict the price of this wully Jacket.',
                min:'500',
                max:'1000',
                context:'',
                subcategory:'jacket',
                p_id:'1'
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/21689320_127859157860810_5234811534567276544_n.jpg',
                price:'2013',
                question:'When was fashion zone founded.',
                min:'1998',
                max:'2018',
                context:'',
                subcategory:'',
                p_id:'2'
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18512847_296309494153999_6008173804130402304_n.jpg',
                price:'595',
                question:'Predict the price of this ledaveed duffle bag.',
                min:'400',
                max:'1000',
                context:'',
                subcategory:'duffle bag',
                p_id:'3'
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/19052186_1688222418151349_804088633102434304_n.jpg',
                price:'1',
                question:'Did 20/20 Armor recently acquire a client in Quebec? <p>1 - Yes</p> <p>0 - No</p>',
                min:'0',
                max:'1',
                context:'',
                subcategory:'',
                p_id:'4'
            },
			{
                url:'https://pbs.twimg.com/media/C_JMKWvV0AAy5YU.jpg:small',
                price:'2',
                question:'Who is the director of community at Fashion Zone?',
                min:'0',
                max:'3',
                context:'',
                subcategory:'',
                p_id:'5',
				options: [
					{answer: 'Olga', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/14240740_307522816281498_488219416_n.jpg'},
					{answer: 'Olena', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20633240_302904566847350_2678176726286073856_n.jpg'},
					{answer: 'Andrea', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/14134779_987256658060687_458447697_n.jpg'},
					{answer: 'Robert', url:'https://pbs.twimg.com/media/C_JMKWvV0AAy5YU.jpg:small'}
				]
            },
			{
                url:'https://pbs.twimg.com/media/DKU6SOmVYAAcq-8.jpg:small',
                price:'2',
                question:'Which Joe Fresh Centre member recently spoke at the startup fashion week?',
                min:'0',
                max:'3',
                context:'',
                subcategory:'',
                p_id:'6',
				options: [
					{answer: 'James', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/15048227_218441365259697_2371854405990350848_n.jpg'},
					{answer: 'Michelle', url:'https://pbs.twimg.com/media/DDRp6L6W0AApnUF.jpg:small'},
					{answer: 'Ahmer', url:'https://pbs.twimg.com/media/DDU3598XYAEojTV.jpg:small'},
					{answer: 'Lindsay', url:'https://pbs.twimg.com/media/DKU6SOmVYAAcq-8.jpg:small'}
				]
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/22427059_141471486472588_9135289309950115840_n.jpg',
                price:'175',
                question:'What is the monthly fee for Fashion Zone\'s full desk membership if you have a Ryerson student in your team?',
                min:'100',
                max:'600',
                context:'',
                subcategory:'',
                p_id:'7'
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/14583368_219840081783732_5908804998388514816_n.jpg',
                price:'1',
                question:'Do Fashion Zone members have access to the DMZ space in New York? <p>1 - No</p> <p>0 - Yes</p>',
                min:'0',
                max:'1',
                context:'',
                subcategory:'',
                p_id:'8'
            },
			{
                url:'http://fashionzone.ca/uploads/advisors/3fa2e2fff61dd45b561318cab516aa74.jpg',
                price:'1',
                question:'Who is the social media advisor for Fashion Zone?',
                min:'0',
                max:'3',
                context:'',
                subcategory:'',
                p_id:'9',
				options: [
					{answer: 'Lyndon', url:'http://fashionzone.ca/uploads/advisors/e5b202abb53bb394f9f365b8fa94fc95.jpg'},
					{answer: 'Cammi', url:'http://fashionzone.ca/uploads/advisors/1c10e7de5ce1414b04761b5296b7be4c.jpg'},
					{answer: 'Rebecca', url:'http://fashionzone.ca/uploads/advisors/9ab1d98495e97433107f9119f91db587.jpg'},
					{answer: 'Steve', url:'http://fashionzone.ca/uploads/advisors/3fa2e2fff61dd45b561318cab516aa74.jpg'}
				]
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/14550126_308480726183912_5838350698462314496_n.jpg',
                price:'52',
                question:'Predict the price of this nudypatooty crop top.',
                min:'30',
                max:'100',
                context:'',
                subcategory:'crop top',
                p_id:'10'
            },
		];
		
        
        $scope.data = [];
        angular.copy($scope.fz_data,$scope.data);
        $scope.fz = true;
        $scope.prizeStartDate = moment('2017/11/07','YYYY/MM/DD');
        $scope.prizeEndDate = moment('2017/11/10','YYYY/MM/DD');
        //$scope.game = $scope.data[0];
        $scope.index = 0;
        $scope.game = $scope.data[$scope.index];
        $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true};
        $scope.test.price = $scope.test.second_price = Number($scope.game.max);
        mocha.startTime($scope);
        $scope.mocha = mocha; // expose service to the view
        $scope.hide_question = false;
        mocha.fz = true;
        console.log($scope.data);
        
		
		$scope.switchUp = function(){
			//console.log(game);
			if($scope.safe($scope.game.options)){
			   	$scope.game.url = $scope.game.options[$scope.test.price].url;
				$scope.game.context =  $scope.game.options[$scope.test.price].answer;
				if($scope.test.price !==  $scope.game.price){
					//this will make sure that the player gets zero if they choose the wrong option
                    $scope.data[$scope.index].prediction = '100';
				   }else{
                    $scope.data[$scope.index].prediction = $scope.test.price;
				   }
			   }
		};
		
		$scope.fzSubmit = function(){mocha.submitPrediction($scope)};
		$scope.fzNextProduct = function(){
			mocha.nextProduct($scope);
			$scope.switchUp();
		};
		$scope.resetGame = function(){mocha.resetGame($scope)};
		$scope.inputShow = function(){mocha.inputShow($scope)};
		$scope.menuHide = function(){mocha.menuHide($scope)};
		$scope.isPredict = function(){
			if(mocha.safe($scope.game.question) && ($scope.game.question.includes('price') || $scope.game.question.includes('fee'))){
				return true;
			}
        };
        $scope.startFz = function(){
            $state.go('/fzgame');
        };
        $scope.goContest = function(){
            $scope.test.hideModal = true;
            mocha.test = $scope.test;
            if(mocha.safe(localStorage.name)){
                //Pull saved user data if it exists
                mocha.contest.name = localStorage.name;
                mocha.contest.phone = Number(localStorage.phone);
            }
            $state.go('/fzcontest');
        };
		
    });
    
    myapp.controller('fz.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
        $scope.screen_big = mocha.checkWindow();
        if($scope.screen_big !== true){
            //This mimics a real life game loading thing. this can definitely be optimized later.
            $timeout(function(){
                $state.go('/fzdash');
            },3000);
        }
        
    });
    
    myapp.controller('fz.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
        $scope.mocha = mocha;
        $scope.mocha.contest.signup =true;
        $scope.contestSubmit = function(form){
			if(form.$valid){
                $scope.contest = {};
				$scope.contest.timestamp = moment().toISOString();
				$scope.contest.points = $scope.mocha.test.point_earned;
                $scope.contest.playtime = $scope.mocha.test.timePlayed;
                $scope.contest.played_data = JSON.stringify(mocha.played_data);
                $scope.contest.signup = ($scope.mocha.contest.signup == true)? 1 : 0;
                $http.get('https://styleminions.co/api/fzcontest?name='+$scope.mocha.contest.name+"&phone="+
                $scope.mocha.contest.phone+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
                +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
				.then(function(res){
					localStorage.name = $scope.mocha.contest.name;
					localStorage.phone = $scope.mocha.contest.phone;
					localStorage.prizeplaydate = moment().toISOString();
					//$scope.thankyou = true;
					//$scope.resetGame('dash');
					$state.go('/fzleaderboard');
				});
			}else{
				console.log('fuck no form not valid');
				console.log(form);
			}
        };

        
    });

    //DMZ CONTROLLERS BELOW
    myapp.controller('dmz.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
		angular.element(document.querySelector('body'))[0].style.borderTopColor='#00b3f0';
        //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu dmz-color';
		if(mocha.checkWindow() === true){
			$state.go('/');
		}
		
		$scope.dmz_data = [
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.44.1080.1080/22221390_533359833665379_7213411321822314496_n.jpg',
                price:'2010',
                question:'When was DMZ founded?',
                min:'1991',
                max:'2017',
                context:'',
                subcategory:'',
                p_id:'1'
            },
			{
                url:'https://cdn.technologyreview.com/i/legacy/hossein.rahnama.jpg',
                price:'1',
                question:'Who was the first executive director of DMZ?',
                min:'0',
                max:'3',
                context:'',
                subcategory:'',
                p_id:'2',
                options: [
					{answer: 'Abdullah', url:'http://notablelife.com/media/2017/03/DMZ-Ryerson-Paul-Steward-Photography-19.jpg'},
					{answer: 'Valerie', url:'http://www.womenofinfluence.ca/wp-content/uploads/2017/03/valerie-fox_featured-image.jpg'},
					{answer: 'Hussaam', url:'https://dmz.ryerson.ca/wp-content/uploads/2017/01/DMZ-Ryerson-Paul-Steward-Photography-1-5-e1485046459651.png'},
					{answer: 'Hussan', url:'https://cdn.technologyreview.com/i/legacy/hossein.rahnama.jpg'}
				]
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/18513275_665066930370249_2577613984060407808_n.jpg',
                price:'3',
                question:'Which DMZ startup is building affordable educational tablets for children in poor countries?',
                min:'0',
                max:'3',
                context:'',
                subcategory:'',
                p_id:'3',
                options: [
					{answer: 'Algocian', url:''},
					{answer: 'Erplain', url:''},
					{answer: 'Flybits', url:''},
                    {answer: 'Rumie', url:''}
				]

            },
			{
                url:'http://www.digitaljournal.com/img/6/8/1/5/3/0/i/1/1/6/o/SheldonLevyPage26big.jpg',
                price:'1',
                question:'Sheldon Levy is the Ryerson president that helped launch DMZ? <p>- Yes</p> <p>- No</p>',
                min:'0',
                max:'1',
                context:'',
                subcategory:'',
                p_id:'4'
            },
			{
                url:'https://pbs.twimg.com/media/C_JMKWvV0AAy5YU.jpg:small',
                price:'2',
                question:'Who is the Startup Services Lead at DMZ?',
                min:'0',
                max:'3',
                context:'',
                subcategory:'',
                p_id:'5',
				options: [
					{answer: 'Ahmed', url:'https://dmz.ryerson.ca/wp-content/uploads/2017/01/DMZ-Ryerson-Paul-Steward-Photography-1605-e1486574518694.jpg'},
					{answer: 'Calypso', url:'https://dmz.ryerson.ca/wp-content/uploads/2017/01/DMZ-Ryerson-Paul-Steward-Photography-1785-e1486573711279.jpg'},
					{answer: 'Shane', url:'https://talent2tconference.com/wp-content/uploads/2017/09/Shane.png'},
					{answer: 'Hussaam', url:'https://dmz.ryerson.ca/wp-content/uploads/2017/01/DMZ-Ryerson-Paul-Steward-Photography-1-5-e1485046459651.png'}
				]
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/18012099_1390680900975189_404795968953778176_n.jpg',
                price:'312',
                question:'How many startups have incubated and accelerated in DMZ since inception?',
                min:'100',
                max:'600',
                context:'',
                subcategory:'',
                p_id:'6'
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/14583300_1313365472057447_5115198945936539648_n.jpg',
                price:'61',
                question:'How many startup members does DMZ currently have?',
                min:'20',
                max:'200',
                context:'',
                subcategory:'',
                p_id:'7'
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c136.0.808.808/13167230_1720280664926144_1775319026_n.jpg',
                price:'391',
                question:'How much investment has been raised by DMZ startups?',
                min:'60',
                max:'500',
                context:'million',
                subcategory:'',
                p_id:'8'
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/18443672_1638498986164746_5569293880953667584_n.jpg',
                price:'3',
                question:'Which DMZ startup is building an in-space telecommunication network for space-borne assets?',
                min:'0',
                max:'3',
                context:'',
                subcategory:'',
                p_id:'9',
				options: [
					{answer: 'Fortuna', url:''},
					{answer: 'Hubbli', url:''},
					{answer: 'Komodo', url:''},
					{answer: 'Kepler', url:''}
                ]
            },
			{
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/21294394_508033522874860_3400474622133534720_n.jpg',
                price:'2962',
                question:'How many jobs have been created through DMZ?',
                min:'500',
                max:'5000',
                context:'jobs',
                subcategory:'',
                p_id:'10'
            },
		];
		
        
        $scope.data = [];
        angular.copy($scope.dmz_data,$scope.data);
        $scope.dmz = true;
        $scope.prizeStartDate = moment('2017/11/15','YYYY/MM/DD');
        $scope.prizeEndDate = moment('2017/11/20','YYYY/MM/DD');
        //$scope.game = $scope.data[0];
        $scope.index = 0;
        $scope.game = $scope.data[$scope.index];
        $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true};
        $scope.test.price = $scope.test.second_price = Number($scope.game.max);
        mocha.startTime($scope);
        $scope.mocha = mocha; // expose service to the view
        $scope.hide_question = false;
        $scope.show_radio = false;
        mocha.dmz = true;
        //console.log($scope.data);
        
		
		$scope.switchUp = function(){
			//console.log(game);
			if($scope.safe($scope.game.options)){
                if(mocha.safe($scope.game.options[$scope.test.price].url)){
                    $scope.game.url = $scope.game.options[$scope.test.price].url;
                }
				$scope.game.context =  $scope.game.options[$scope.test.price].answer;
				if($scope.test.price !==  $scope.game.price){
                    //this will make sure that the player gets zero if they choose the wrong option
                    $scope.data[$scope.index].prediction = '100';
                }else{
                    $scope.data[$scope.index].prediction = $scope.test.price;
                }
            }

            if($scope.game.min === '0' & $scope.game.max === '1'){
                $scope.show_radio = true;
            }else{
                $scope.show_radio = false;
            }
		};
		
		$scope.dmzSubmit = function(){mocha.submitPrediction($scope)};
		$scope.dmzNextProduct = function(){
			mocha.nextProduct($scope);
			$scope.switchUp();
		};
		$scope.resetGame = function(){mocha.resetGame($scope)};
		$scope.inputShow = function(){mocha.inputShow($scope)};
		$scope.menuHide = function(){mocha.menuHide($scope)};
		$scope.isPredict = function(){
            if(mocha.safe($scope.game.question) && ($scope.game.question.includes('price') 
               || $scope.game.question.includes('investment'))){
				return true;
			}
        };
        $scope.startDmz = function(){
            $state.go('/dmzgame');
        };
        $scope.goContest = function(){
            $scope.test.hideModal = true;
            mocha.test = $scope.test;
            if(mocha.safe(localStorage.name)){
                //Pull saved user data if it exists
                mocha.contest.name = localStorage.name;
                mocha.contest.phone = Number(localStorage.phone);
            }
            $state.go('/dmzcontest');
        };
        $scope.radioFunc = function(){
            $scope.test.price = $scope.test.price_radio;
            $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no'
        };
		
    });
    
    myapp.controller('dmz.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
        $scope.screen_big = mocha.checkWindow();
        if($scope.screen_big !== true){
            //This mimics a real life game loading thing. this can definitely be optimized later.
            $timeout(function(){
                $state.go('/dmzdash');
            },3000);
        }
        
    });
    
    myapp.controller('dmz.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
        $scope.mocha = mocha;
        $scope.mocha.contest.signup =true;
        $scope.contestSubmit = function(form){
			if(form.$valid){
                $scope.contest = {};
				$scope.contest.timestamp = moment().toISOString();
				$scope.contest.points = $scope.mocha.test.point_earned;
                $scope.contest.playtime = $scope.mocha.test.timePlayed;
                $scope.contest.played_data = JSON.stringify(mocha.played_data);
                //$scope.contest.signup = ($scope.mocha.contest.signup == true)? 1 : 0;
                $scope.contest.signup = 0;
                $http.get('https://styleminions.co/api/dmzcontest?name='+$scope.mocha.contest.name+"&phone="+
                $scope.mocha.contest.phone+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
                +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
				.then(function(res){
					localStorage.name = $scope.mocha.contest.name;
					localStorage.phone = $scope.mocha.contest.phone;
					localStorage.prizeplaydate = moment().toISOString();
					//$scope.thankyou = true;
					//$scope.resetGame('dash');
					$state.go('/dmzleaderboard');
				});
			}else{
				console.log('fuck no form not valid');
				//console.log(form);
			}
        };

        
    });

