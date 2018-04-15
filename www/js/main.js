// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myapp = angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
    
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
	  .state("/winner", {
        url: "/winner",
        templateUrl : "views/winner.html",
	  	controller: "winner.controller"
      })
      .state("/tutorial", {
        url: "/tutorial",
        templateUrl : "views/tutorial.html"
      })
      .state("/login", {
        url: "/login",
        templateUrl : "views/login.html"
      });
    $urlRouterProvider.otherwise('/carlalogin');
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

 myapp.factory('mocha', function($rootScope,$state,$stateParams,$window,$ionicSlideBoxDelegate,$http){
    this.contest = {};
    this.test = {};
    this.played_data = []; 
    this.submitPrediction = function($scope){
            if($scope.index < $scope.data.length || $scope.gameType === 'pdx'){
                //reconcile price prediction for consistent points
                if($scope.manualprice === true){
                    $scope.test.price = $scope.test.second_price;
                }    
                if(!$scope.data[$scope.index].hasOwnProperty('prediction')){
                    //for situations where prediction is automatically inserted by other functions
                    $scope.data[$scope.index].prediction = $scope.test.price;
                }
                if($scope.game.min === '0' & $scope.game.max === '1'){
                    //for situation where its a yes or no question and we need the right radio button model data
                    $scope.test.price = $scope.test.price_radio;
                }
                if($scope.gameType === 'pdx'){
                    return $scope.test.price;
                }

				var prediction = $scope.data[$scope.index].prediction;                
                $scope.data[$scope.index].raw_answer = $scope.test.price;
                $scope.test.point_earned = $scope.data[$scope.index].point = this.pointsMath($scope.index,prediction,$scope);
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
            if($scope.index !== $scope.data.length - 1 || $scope.gameType === 'pdx'){
                this.log($scope.data);
                $scope.index++;
                $scope.show_points = false;
                $scope.manualprice = false;
                $scope.game = $scope.data[$scope.index];
                $scope.progress = (($scope.index)/$scope.data.length)*100;
                if(!this.safe($scope.game.options)){
                   //this sets up the data flow when we need to see the max answer by default
                   $scope.test.price = $scope.test.second_price = Number($scope.game.max);
                   this.log('yaaaaaay it is an arrayish');
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
                //this.takeChunk($scope);
                //$location.path('/final');
                //angular.element(document.querySelector('.modal')).modal('open');
            }
            
        };

     this.getPlayedData = function(arr){
        let newArr = [];
        arr.forEach(function(item){
            let capture = {};
            capture.p_id = item.p_id;
            capture.raw_answer = item.raw_answer;
            newArr.push(capture);
        });
        return newArr
     }
	 
	 this.pointsMath = function (index, val, $scope){
            realPrice = $scope.data[index].price;
            pChange = val/realPrice;
            this.log(val, realPrice, pChange);
            
            //when prediction is more than 200% of the value
            if(pChange >= 2 || pChange <= 0){
                return 0;
            }

            //when there is no right or wrong answer. price must have the string 'survey'
            if(realPrice === 'survey'){
                return 750;
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
            var stockDefault = 'https://mochanow.com/info/images/graphic.png';
            x.onload = function(){
               if(a === 'auto'){
                   //Do not let player manually move to next if this is in place.
                   $timeout($scope.nextProduct,1300);
               }
            };
            x.onerror = function(){
                if('gameType' in $scope && $scope.gameType === 'pricex'){
                    //with the price is right game concept we want to skip the question if image fails to load
                    $scope.data.splice($scope.index + 1,1);
                    if(a === 'auto'){
                        //This is used cause we need the game to move forward automatically despite an image(s) download failure
                        this.pullNextImage('auto');
                    }else{
                        this.pullNextImage(null,$scope);
                    }
                }else{
                    //for the triviaX game concept we want to use our stock image when image fails to load
                    $scope.data[$scope.index + 1].url = stockDefault;
                    x.src = stockDefault;
                }               
                
            };
            
            if(this.safe($scope.data[$scope.index + 1])){
                //This initiates the downloading of the image into the DOM
                x.src = $scope.data[$scope.index + 1].url;
            }else{
                this.log('fuck no');
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
                    //this.log(y.src);
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
                this.log('clock is ticking');
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
            if($window.innerWidth > 600 && $window.innerWidth > 768){
                //768px is for tablet (ipad)
                //this.log('screen  to big');
                return true;
            }
            return false;
	 };
	 
	 this.playedAlready = function(start, end){
		 if(this.safe(localStorage[this.appName]) && JSON.parse(localStorage[this.appName]).hasOwnProperty('prizeplaydate')){
             let appStorage = JSON.parse(localStorage[this.appName]);
             let playDate = appStorage.prizeplaydate;
			 let dateStored = moment(playDate);
			 let afterStart = dateStored.isAfter(start);
			 let beforeEnd = dateStored.isBefore(end);
			 if(afterStart == true && beforeEnd == true){
				 return true;
			 }
		 }
		 return false;
     };
     
     this.gameEnded = function(end){
        let now = moment();
        if(end.isBefore(now) === true){
            return true;
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

     this.vibrate = function(miliseconds){
        if(!this.safe(miliseconds)){
            miliseconds = 1000; //default
        }
        //safari will crash if you dont check for vibration capability which it does not have
        (navigator.__proto__.hasOwnProperty('vibrate')) ? navigator.vibrate(miliseconds) : null;
     };

     this.socket = function(){
        if(this.devMode){
            return io('https://mochanow.com');
        }
        return io();
     };

     this.tones = function(key, octave, release, attack,type){
        tones.release = release || tones.release;
        tones.attack = attack || tones.attack;
        tones.type = type || tones.type;
        tones.play(key,octave);
     };

     this.log = (function(){
         if(location.host.includes('localhost')){
             //only log data in local environment to protect client data
             return console.log;
         }else{
             return function(){};
         }
     })();

     this.letterOption = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

     this.imageLoop = function(obj){
        var a = 0;
        obj.forEach(function(item){
            item['img'+ a] = new Image();
            item['img'+ a].onerror = function(){
                this.log(img.src + ' failed to load into the DOM');
            };
            item['img'+ a].src = item.url;
            a++;
        });
     };

     this.odessuPrize = function(val){
        //get cash prize each gamer wins after the game
        var n = (val/7500)*100;
        if(40<n && n<60){
            return 50;
        }
        if(60<n && n<70){
            return 65;
        }
        if(71<n && n<80){
            return 80;
        }
        if(n>81){
            return 100;
        }
        return 0;
     };

     this.devMode = function(){return location.host.includes('8100')}(); //when in ionic serve mode

     this.webTraffic = function(){
        //leverage users device to know if they were here during the gaming period.
        //this will eliminate double counting for accurate engagement metrics even after reloading browser
        var app = this.appName;
        var entryDateText = app + '_entryDate';
        var dateTime = moment().toISOString();
        var firstTime = false;
        if(!localStorage.hasOwnProperty(app) && !localStorage.hasOwnProperty(entryDateText)){
            //set default entry datetime when user is on the particular game for the first time
            localStorage[entryDateText] = moment().toISOString();
            firstTime = true;
        }
        var entryDate = moment(localStorage[entryDateText]);
        var visitedPreviously = entryDate.isAfter(this.prizeStartDate) && entryDate.isBefore(this.prizeEndDate);
        //var http = $http.post.bind(this);
        var self = this;
        if(!visitedPreviously || firstTime){
            // send to backend for tracking
            $http.post('https://styleminions.co/api/traffic?appname='+app+'&time='+dateTime)
            .then(function(res){
                //console.log(this)
                //console.log(self)
                if(!JSON.stringify(res.data).includes('failed')){
                    self.ip = res.data;
                }
                self.log(res);
                //console.log(this)
            });
        }
        localStorage[entryDateText] = moment().toISOString();
        // var liveId = socket.id;
        // if(!localStorage.hasOwnProperty(app)){
        //     localStorage[app+'_trafficId'] = null;
        // }
        // var savedId = (this.safe(localStorage[app+'_trafficId'])) ? localStorage[app+'_trafficId'] : null;
        //this.log(app, liveId,savedId,dateTime);
         
     };

     this.addScripts = async function(array){
        var promises = [];
        var hookScripts = function(url, src) {
            return new Promise(function(resolve,reject){
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.onload = ()=>{resolve(url)};
                s.onerror = ()=>{reject(`${url} did not load`)};
                s.src = url || null;
                s.innerHTML = src || null;
                document.getElementsByTagName("head")[0].appendChild(s);
            });
            
        };
        array.forEach(function(item){
            var exist = document.querySelector('script[src="'+ item +'"]');
            if(!exist){
                promises.push(hookScripts(item));
            }
            
        });
        return Promise.all(promises)
     };

     this.instagram = function(){
        fetch('https://www.instagram.com/bohnchild/').then((res)=>{
             return  res.text();    
        })
        .then((data)=>{
            // parser = new DOMParser();
            // let doc = parser.parseFromString(data,'text/html')
            // let node = doc.querySelector('meta[property="og:image"]')
            // console.log(node.attributes[1].value);
            let sift = data.match(/og:image.+(http.+"")/)[1];
            //json object with everything regex /window._sharedData = ({.+);/
             console.log(sift);
        });
     };

     this.webSocket =  function(){
        if('io' in window){
            var socket = io();
            return socket;
        }
                
     };

     this.submitPdx = function($scope){
        var answer = this.submitPrediction($scope);
        var gamedata = {appName:this.appName, p_id:$scope.index, raw_answer:answer,task:'question'}
        $scope.socket.emit('audience',gamedata);
     };

     this.authorize = function($scope){
        if(this.safe(this.appName) && $scope.mocha.passtext === this.appName){
            $scope.validate = true;
        }else{
            this.vibrate();
            $scope.mocha.passtext = '';
        }        
     };

     this.isAppNameSet = function(dependency){
        var dependencyCounter = 0;
        dependency.forEach(function(item){
            (item in window) ? dependencyCounter++ : null;
        });
        if(!this.safe(this.appName) || dependencyCounter !== dependency.length){
            //$state.go(route);
            return false;
        }
        return true
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
        //checkWindow();
        //$http.get('http://127.0.0.1:8000/mocha')
        // $http.get('https://styleminions.co/api/mocha?q=' + 250)
        // .then(function(res){
        //     //mocha.log(res);
        //     $scope.apiData = res.data;
        //     $scope.prizeData = $scope.apiData.slice(120,135);
		// 	$scope.apiData = mocha.randomize($scope.apiData); //Shuffle the data for practice mode.
        //     takeChunk();
        // })
        // .then(function(){
        //     //$scope.menuhide = 0;
        //     $scope.game = $scope.data[$scope.index];
        //     if($scope.screen_big !== true && (!location.hash.includes('fz'))  && (!location.hash.includes('dmz'))
        //     && (!location.hash.includes('wully')) && (!location.hash.includes('lz')) && (!location.hash.includes('nls'))
        //     && (!location.hash.includes('boro')) && (!location.hash.includes('inlighten')) 
        //     && (!location.hash.includes('ryerson')) && (!location.hash.includes('nudnik'))
        //     && (!location.hash.includes('andela'))){
        //         //This mimics a real life game loading thing. this can definitely be optimized later.
        //         $timeout(function(){
        //             $state.go('/dash');
        //         },3000);
        //     }
            
        // });
     //Don't touch any code below for legacy reasons
     /*/////////////////////////Don't touch any code below for legacy reasons/////////////////////////////////////*/
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
//                mocha.log($scope.data);
//                $location.path('/final');
//                
//            }
            
        };
        
        $scope.nextProduct = function(){
            //action for what happens after final answer is given
            if($scope.index !== $scope.data.length - 1){
                mocha.log($scope.data);
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
                mocha.log('clock is ticking');
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
				mocha.log('fuck no form not valid');
				mocha.log(form);
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
            
            mocha.log($stateParams);
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
            mocha.log(val, realPrice, pChange);
            
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
                mocha.log('fuck no');
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
                    //mocha.log(y.src);
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
            if($window.innerWidth > 600 && $window.innerWidth > 768){
                //mocha.log('screen  to big');
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

    /*/////////////////////////Don't touch any code above for legacy reasons/////////////////////////////////////*/
    
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
    
    myapp.directive('footNote', function($timeout) {
        //to use this directive all you have to do is set property $scope.footnote to true and set $scope.footnote_msg to whatever string.
        //automatially it will diappear for good after user slides the foot note away. Then reactivate again with above instruction.
      return {
        template: `
            <div class="bar bar-footer footnote animated fadeInUp" ng-init="footnote_hide = true"
                 ng-class="{'fadeOutRight': !footnote, 'hide':!footnote && footnote_hide}" 
                 on-swipe="footnote = false; footnote_hide = false">
                <div class="title" ng-bind-html="footnote_msg"></div>
            </div>`,
        link: function($scope,element,attrs){
            element.bind('touchend',function(){
                //hide the foot note after slide out animation or else it will keep showing up and sliding away
                $timeout(function(){
                    //element[0].childNodes[1].style.display = 'none';
                    $scope.footnote_hide = true;
                },3000);
            });
        }
      };
    });
       

	myapp.directive('resultModal', function() {
      return {
        templateUrl: 'views/result.html'
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
        var database_table = '';
        if(mocha.safe($stateParams.mode)){
            //Default API FOR DEMOS. No need to build backend yet till its necessary
            url = 'https://styleminions.co/api/apileaderboard?q=';
            $scope[$stateParams.mode] = true;
            database_table = '&table='+ $stateParams.mode;
        }
        if($stateParams.mode === 'fz'){
            url = 'https://styleminions.co/api/fzleaderboard?q=';
            $scope.fz = true;
        }
        if($stateParams.mode === 'dmz'){
            url = 'https://styleminions.co/api/dmzleaderboard?q=';
            $scope.dmz = true;
        }
        if($stateParams.mode === 'lz'){
            url = 'https://styleminions.co/api/lzleaderboard?q=';
            $scope.lz = true;
        }
        $scope.getList = function(){
            $scope.loader = true;
            $http.get(url + gametime + database_table)
            .then(function(res){
                mocha.log(res);
                $scope.leaderList = [];
                $scope.thisPlayer = false;
                var number = (mocha.safe(localStorage.phone)) ? localStorage.phone : null;
                var email = (mocha.safe(localStorage.email)) ? localStorage.email : null;
                var list = res.data;
                list.forEach(function(item){
                    if((mocha.safe(item.phone) && item.phone === number) || (mocha.safe(item.email) && item.email === email)){
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

        if(mocha.safe(mocha.appName) && mocha.inStore === true){
            //Send screen to dash page when app is in the store
            $timeout(function(){
                //get the client name for the location
                var appname = mocha.appName.slice(6,mocha.appName.length);
                var location = '/'+ appname +'dash';
                $state.go(location);
            },60000);
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
			//mocha.log(res);
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
			//mocha.log($scope.winnerList);
			
			$scope.loader = false;
			
		});
	});
    
    myapp.controller('analytics.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){

        $scope.result = [];
        $scope.validate = false;
        $scope.csvloader = false;
        $scope.mocha = mocha;
        mocha.addScripts(['lib/papaparse.min.js']);
        if(mocha.safe($stateParams.mode)){
            //Default API FOR DEMOS. No need to build backend yet till its necessary
            url = 'https://styleminions.co/api/apianalytics?q=null';
            $scope[$stateParams.mode] = true;
            database_table = '&table='+ $stateParams.mode;
        }
        
        $scope.getAnalytics = function(){
            $scope.loader = true;
            $http.get(url + database_table)
            .then(function(res){
                $scope.result = res.data.game;
                $scope.visitors = res.data.traffic.total;
                if($scope.result.length !== 0){
                    var lastitem = $scope.result.length - 1;
                    $scope.firstplayer = moment($scope.result[0].time).format('hh:mm a, DD/MM/YYYY');
                    $scope.lastplayer = moment($scope.result[lastitem].time).format('hh:mm a, DD/MM/YYYY');
                    $scope.statistics = report($scope.result);
                }

            })
            .then(function(){
                $scope.loader = false;
            });
        };

        $scope.download = function(){
            $scope.csvloader = true;
            var csvData = Papa.unparse(csvPrep($scope.result));
            var fileData = 'data:text/csv;charset=utf-8,' + csvData;
            fileData = encodeURI(fileData);
            var filename = mocha.appName + '.csv';
            var link = document.createElement('a');
            //link.setAttribute('href', 'data:text/txt;charset=utf-8,hello worlds');
            link.setAttribute('href', fileData);
            link.setAttribute('download', filename);
            link.click();
            $scope.csvloader = false;
            //mocha.log(csvData);
        };

        function csvPrep(obj){
            var question = mocha[mocha.appName.slice(6,mocha.appName.length) + '_data'];
            //mocha.log(question,'variable');
            if(mocha.safe(question)){//in case the game played isn't a trivia game
                obj.forEach(function(item){
                    var date = item.time;
                    var gamedata = JSON.parse(item.played_data);
                    delete item.id;
                    delete item.signup;
                    item.time = moment(date).format('DD/MM/YY hh:mm a');
                    gamedata.forEach(function(gameitem){
                        var qIndex = gameitem.p_id - 1;
                        item['Q'+ gameitem.p_id + ' (' + question[qIndex].question + ')'] = (mocha.safe(question[qIndex].options)) ? question[qIndex].options[gameitem.raw_answer].answer : gameitem.raw_answer;
                    });
                    delete item.played_data;
                    //item.played_data = gamedata;
                });
            }
            
            return obj;
            
        }

        $scope.authorize = function(){
            if(mocha.safe(mocha.appName) && $scope.mocha.passtext === mocha.appName){
                $scope.getAnalytics();
                $scope.validate = true;
            }else{
                mocha.vibrate();
                $scope.mocha.passtext = '';
            }
            //mocha.log('hey',$scope.mocha.passtext, mocha.appName);
        };

        function report(list){
            //analytics avg report for each question that was predicted to get value perception of consumer/service product.
            var basket = [];
            basket['time'] = 0;
            function average(num){return num/list.length;};
            list.forEach(function(item){
                var obj = JSON.parse(item.played_data);
                for(var x = 0; x < obj.length; x++){
                    var index = obj[x].p_id;
                    if(!mocha.safe(basket[index])){
                        basket[index] = 0;
                    }
                    basket[index] += Number(obj[x].raw_answer);
                }
                var minutesToSeconds = Number(item.playtime.substring(0,2)) * 60;
                var seconds = Number(item.playtime.substring(3,5));
                basket['time'] += (minutesToSeconds + seconds)/60;
            });
            var output = basket.map(average);
            mocha.log(basket,'report',output,'output');
            return {output:output,time:basket['time']};
        }        
	});
//BORO DIRECTIVES
myapp.directive('boroMenuHeader', function() {
    return {
      templateUrl: 'views/boro/boro.menu-header.html'
    };
});

myapp.directive('boroResultModal', function() {
    return {
      templateUrl: 'views/boro/boro.result.html'          
    };
});

myapp.directive('tapTap', function() {
    return {
      link: function($scope,element,attrs){
        element.bind('touchstart',function(e){
            //console.log(e,'wow',e.target);
            e.target.innerHTML = 'lens';
            //e.target.parentNode.children[1].className.replace('dark','');
        });
        
        element.bind('touchend',function(e){
            //console.log(e,'wow',e.target);
            e.target.innerHTML = 'panorama_fish_eye';
            //e.target.parentNode.children[1].className.replace('dark','');
        });
      }       
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("/borodash", {
        url: "/borodash",
        templateUrl : "views/boro/boro.dash.html",
	  	controller: "boro.dash.controller"
      })
      .state("/borogame", {
        url: "/borogame",
        templateUrl : "views/boro/boro.game.html",
        controller: "boro.dash.controller",
      })
      .state("/borostore", {
        url: "/borostore",
        templateUrl : "views/boro/boro.game.html",
        controller: "boro.dash.controller",
        cache: false
      })
      .state("/borologin", {
        url: "/borologin",
        templateUrl : "views/boro/boro.login.html",
        controller: "boro.login.controller"
      })
      .state("/borocontest", {
        url: "/borocontest",
        templateUrl : "views/boro/boro.contest.html",
        controller: "boro.contest.controller"
      })
      .state("/boroanswer", {
        url: "/boroanswer",
        templateUrl : "views/boro/boro.answer.html",
        controller: "boro.answer.controller"
      })
      .state("/borotest", {
        url: "/borotest",
        templateUrl : "views/boro/boro.test.html",
        controller: "boro.test.controller"
      })
      .state("/boropuzzle", {
        url: "/boropuzzle",
        templateUrl : "views/boro/boro.puzzle.html",
        controller: "boro.puzzle.controller"
      })
      .state("/boroleaderboard", {
        url: "/boroleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'boro'},
        cache: false
      })
      .state("/boroanalytics", {
        url: "/boroanalytics",
        templateUrl : "views/analytics.html",
        controller: "analytics.controller",
        params: {mode: 'boro'},
        cache: false
      });
});



//BORO CONTROLLERS BELOW
myapp.controller('boro.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    if(mocha.inStore == true){
        //in store color
        angular.element(document.querySelector('body'))[0].style.borderTopColor='#101010e6';
    }else{
        //default color
        angular.element(document.querySelector('body'))[0].style.borderTopColor='#008489';
    }
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu boro-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.boro_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/51e23d6c66b5c93dff7c13aa5f948d27/5B2B2598/t51.2885-15/e35/28753248_424973444621937_3039622860176883712_n.jpg',
            price:'3',
            question:'What\'s the brand name of this dress?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'1',
            options: [
                {answer: 'Ted Baker', url:''},
                {answer: 'Vera Wang', url:''},
                {answer: 'BCBG', url:''},
                {answer: 'None of the above', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/1531de3e59bdafe4ef046b7732ab1403/5B488E0F/t51.2885-15/e35/28430643_177700883014268_7152022482382225408_n.jpg',
            price:'94',
            question:'Predict the rental price of this dress?',
            min:'50',
            max:'110',
            context:'$',
            subcategory:'dress',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/25007210_148212529158646_8907124790167339008_n.jpg',
            price:'survey',
            question:'What type of event can you rent for?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                {answer: 'Dinner', url:''},
                {answer: 'gala', url:''},
                {answer: 'wedding', url:''},
                {answer: 'All of the Above', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/86a25a319b06e218309e08f77527f209/5B3B2700/t51.2885-15/e35/27881509_552094548502608_8370194216776630272_n.jpg',
            price:'1',
            question:'Was this dress the most rented item of the Summer in 2017?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/83980b22f43ae687ebea72926f67b5b3/5B49CC8E/t51.2885-15/e35/28157746_1826000744100730_6776555569487544320_n.jpg',
            price:'1',
            question:'What was the most rented dress of the Fall?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'5',
            options: [
                {answer: 'A', url:'https://scontent-yyz1-1.cdninstagram.com/vp/83980b22f43ae687ebea72926f67b5b3/5B49CC8E/t51.2885-15/e35/28157746_1826000744100730_6776555569487544320_n.jpg'},
                {answer: 'B', url:'https://scontent-yyz1-1.cdninstagram.com/vp/83980b22f43ae687ebea72926f67b5b3/5B49CC8E/t51.2885-15/e35/28157746_1826000744100730_6776555569487544320_n.jpg'},
                {answer: 'C', url:'https://scontent-yyz1-1.cdninstagram.com/vp/83980b22f43ae687ebea72926f67b5b3/5B49CC8E/t51.2885-15/e35/28157746_1826000744100730_6776555569487544320_n.jpg'},
                {answer: 'D', url:'https://scontent-yyz1-1.cdninstagram.com/vp/83980b22f43ae687ebea72926f67b5b3/5B49CC8E/t51.2885-15/e35/28157746_1826000744100730_6776555569487544320_n.jpg'}
            ]                
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/23734241_132513780784119_7008778111810535424_n.jpg',
            price:'3',
            question:'How much water do you save each time you use Boro instead of buying new?',
            min:'2',
            max:'7',
            context:'bathtubs',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24175221_414973372250811_7636663641420333056_n.jpg',
            price:'3500',
            question:'if you use Boro once per month for a year, this leads to a savings of ?',
            min:'2500',
            max:'5000',
            context:'$',
            subcategory:'',
            p_id:'7'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24178022_130806320921631_23203702550560768_n.jpg',
            price:'survey',
            question:'How does Boro deliver to its customers? ',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'8',
            options: [
                {answer: 'hand-delivery', url:''},
                {answer: 'mail', url:''},
                {answer: 'pickup', url:''},
                {answer: 'Any of the above', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/27029db2e727598c7db596367315bbce/5B32945C/t51.2885-15/e35/27879119_1266469950121909_200059211575459840_n.jpg',
            price:'550',
            question:'Predict the retail price of this dress?',
            min:'400',
            max:'870',
            context:'',
            subcategory:'dress',
            p_id:'9'
        }
    ];
    
    $scope.data = [];
    angular.copy($scope.boro_data,$scope.data);
    $scope.boro = true;
    $scope.prizeStartDate = moment('2017/12/14','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/12/29 23:59','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/12/29 23:59','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true,select:''};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.boro = true;
    mocha.appName = 'mocha_'+'boro';
    mocha.boro_data = $scope.boro_data;
    mocha.prizeEndDate = $scope.prizeEndDate;
    $scope.storeMode = 0;
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if(mocha.safe($scope.game.options)){
            // if(mocha.safe($scope.game.options[$scope.test.price].url)){
            //     $scope.game.url = $scope.game.options[$scope.test.price].url;
            // }
            $scope.game.context =  ($scope.test.select !== '') ? $scope.game.options[$scope.test.select].answer : null;
            //this is so that the raw answer is the exact answer
            $scope.test.price = $scope.test.select;
            if($scope.test.select !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.select;
            }
            
        }

        if($scope.game.min === '0' && $scope.game.max === '1'){
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    $scope.switchUp();
    
    $scope.boroSubmit = function(){
        mocha.submitPrediction($scope);
    };
    $scope.boroNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        if(mocha.safe($scope.game.options)){
            $scope.test.price = '';
        }
        
    };
    $scope.resetGame = function(){
        angular.copy($scope.boro_data,$scope.data);
        mocha.resetGame($scope);
    };
    $scope.inputShow = function(){mocha.inputShow($scope)};
    $scope.menuHide = function(){mocha.menuHide($scope)};
    $scope.isPredict = function(){
        if(mocha.safe($scope.game.question) && ($scope.game.question.includes('price') 
           || $scope.game.question.includes('investment'))){
            return true;
        }
        if(mocha.safe($scope.game.context) && $scope.game.context.includes('$')){
            return true;
        }
    };
    $scope.startBoro = function(){
        if(mocha.inStore === true){
            $state.go('/borostore');
        }else{
            $state.go('/borogame');
        }
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/borocontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    $scope.inStore = function(){
        $scope.storeMode++;
        if($scope.storeMode >= 2){
            angular.element(document.querySelector('body'))[0].style.borderTopColor='#101010e6';
            $scope.footnote_msg = 'Store Mode Activated';
            mocha.inStore = true;
            $scope.footnote = true;
        }      
    };
    
});

myapp.controller('boro.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/borodash');
        },3000);
    }
    
});

myapp.controller('boro.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.loader = false;
    $scope.mocha = mocha;
    $scope.mocha.contest.signup =true;
    $scope.contestSubmit = function(form){
        if(form.$valid){
            $scope.loader = true;
            $scope.contest = {};
            $scope.contest.timestamp = moment().toISOString();
            $scope.contest.points = $scope.mocha.test.point_earned;
            $scope.contest.playtime = $scope.mocha.test.timePlayed;
            $scope.contest.played_data = JSON.stringify(mocha.played_data);
            $scope.contest.signup = (mocha.inStore == true)? 1 : 0;//signup means the player played in the store
            //$scope.contest.signup = 0;
            $scope.contest.size = $scope.mocha.contest.dress_size;
            $http.get('https://styleminions.co/api/borocontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup
            +"&dress_size="+$scope.contest.size)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                localStorage[mocha.appName+'_points'] = $scope.contest.points;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/boroleaderboard');
                $scope.loader = false;
            });
            console.log($scope.contest);
        }else{
            console.log('fuck no form not valid');
            //navigator.vibrate(1000);
            //console.log(form);
        }
    };

    
});

myapp.controller('boro.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.showanswer = null;
    $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
    //var prizeEndDate = moment('2017/11/27 18:56','YYYY/MM/DD kk:mm');
    var check = $interval(function(){
        let now = moment();
        if(mocha.prizeEndDate.isBefore(now)){
            console.log('see the answers');
            $interval.cancel(check);
            $scope.showanswer = true;
        }else{
            console.log('wait for a while');
            $scope.showanswer = false;
        }
    }, 1000, 6000);
    
});

myapp.controller('boro.test.controller', function($scope,$location,$state,$stateParams,$http,$timeout,$interval,mocha){
    if(mocha.inStore == true){
        //in store color
        angular.element(document.querySelector('body'))[0].style.borderTopColor='#101010e6';
    }else{
        //default color
        //angular.element(document.querySelector('body'))[0].style.borderTopColor='#008489';
        angular.element(document.querySelector('body'))[0].style.borderTopColor='#ff855b';
        $scope.playcolor = '#ff855b';
    }
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu boro-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }

    $scope.button = [];
    $scope.basket = [];
    $scope.num = 2;
    $scope.autoplay = false;
    $scope.play = false;
    for(var x = 0; x<6; x++){
        $scope.button[x] = "panorama_fish_eye";
    }
    $scope.mindTracker = function (num){
        $scope.basket = [];
        $scope.collectBasket = [];
        $scope.news = null;
        $scope.level = num - 1;
        $scope.autoplay = true;
        $scope.play = true;
        $scope.status = [];
        $scope.color = null;
        for(var x=0; x < num; x++){
            loop(x);
            $scope.status.push('panorama_fish_eye');
        }
        function loop(item){
            let randomIndex = Math.floor(Math.random()*(5));
        
            if((x > 0 && randomIndex !== $scope.basket[item - 1]) || x === 0){
                $scope.basket.push(randomIndex);
            }else{
                loop(item);
            }
        }
        console.log($scope.basket);
        var index = 0;
        var previousIndex = 0;
        var milseconds = 700;
        var showNumber = $interval(function(){
            //console.log($scope.basket[index]);
            $scope.button[previousIndex] = 'panorama_fish_eye';
            $scope.button[$scope.basket[index]] = "lens";
            previousIndex = $scope.basket[index];
            index++;
            // if(num == index){
            //     clearInterval(showNumber);
            // }
        },milseconds,num)
        .then(function(){
            $timeout(function(){
                //console.log('heyyyyyyyyyyyyyy',previousIndex);
                $scope.button[previousIndex] = 'panorama_fish_eye';
                $scope.autoplay = false;

            },milseconds);
        });
    };

    $scope.collect = function(d){
        //console.log(d);
        if($scope.autoplay === false && $scope.play === true){
            $scope.collectBasket.push(d);
            if(d === $scope.basket[$scope.collectBasket.length - 1]){
                $scope.news = 'Right';
                $scope.color = 'green';
                $scope.status[$scope.collectBasket.length - 1] = 'check_circle';
                //console.log('right');
                if($scope.basket.length == $scope.collectBasket.length){
                    $scope.num++;
                    $scope.mindTracker($scope.num);
                }
            }else{
                $scope.news = 'Wrong - Play again';
                $scope.color = 'red';
                $scope.status[$scope.collectBasket.length - 1] = 'highlight_off';
                //safari will crash if you dont check for vibration capability which it does not have
                (navigator.__proto__.hasOwnProperty('vibrate')) ? navigator.vibrate(1000) : null;
                //console.log('wrong');
                reset();
                $scope.play = false;
            }
        }

    }

    function reset(){
        $scope.num = 2;
    }    

});

myapp.controller('boro.puzzle.controller', function($scope,$location,$state,$stateParams,$http,$timeout,$compile,mocha){

    $scope.waste = [];
    $scope.correct = [];
    $scope.dw,$scope.dh,$scope.draw;
    $scope.sw,$scope.sh;
    $scope.shuffle = [];
    $scope.basket =[];
    $scope.output = '';
    $scope.prog = 0;
    $scope.test= {end_time:null, start_time:null,time_result:null};
    $scope.mocha = mocha;
    $scope.picColumn = 2;
    $scope.picRow = 2;
    $scope.puzzLevel = 1;
    $scope.drawCanvas =function(fWidth, fHeight){
        return new Promise(function(resolve,reject){
            canvas = angular.element(document.getElementById('canvas'))[0];
            
            ctx = canvas.getContext('2d');
            //console.log(ctx)
            
            im = new Image()
            im.crossOrigin = 'Anonymous';
            //perfect on mobile for any image dimensions (square, 3:4 ratio and 4:3 ratio)
            //good on desktop for only square and 4:3 ratio image dimensions
            //im.src = 'https://scontent-yyz1-1.cdninstagram.com/vp/2c9e475a6c684b4eb20fb9c06a9c8c36/5B01A374/t51.2885-15/e35/24274488_1204373613026222_6359081673119760384_n.jpg';
            im.src = 'https://scontent-yyz1-1.cdninstagram.com/vp/a0f1f9b8a2924eb3869b5d71b3bb4fb9/5B184CB1/t51.2885-15/e35/26863250_2004244896455821_3703496126918295552_n.jpg';
            //im.src = 'https://scontent-yyz1-1.cdninstagram.com/vp/192110115a0379f7200f2aabeac9a7e5/5B094E85/t51.2885-15/e35/11849357_536498379834099_188237789_n.jpg';
            //sw and sh are the wi$scope.dh and height of the image piece to be cut from the raw image
            im.onload = ()=>{
                
                if(im.height > im.width && window.innerWidth > 768){
                    //this turns the image into a square (1:1) dimension only on desktop
                    //to then be used as an image for the puzzle
                    let width = im.width;
                    let height = im.height;
                    canvas.setAttribute('width',width);
                    canvas.setAttribute('height',width);
                    ctx.imageSmoothingQuality = "high";
                    ctx.drawImage(im,0,0,width,width,0,0,width,width);
                    im.src = canvas.toDataURL('image/png', 1); //this triggers the image onload() method

                }else{
                    //this continues the task normally either after square transformation or when the if block requirement isn't met
                    var space = 2;
                    var sw = Math.round((im.width - space * $scope.picColumn)/$scope.picColumn);
                    var sh = Math.round((im.height - space* $scope.picRow)/$scope.picRow);
                    
                    //$scope.dw and $scope.dh are the height and width to be drawn on the canvas based on the aspect ratio of the raw image
                    $scope.dw = Math.round((fWidth - space * $scope.picColumn)/ $scope.picColumn);
                    $scope.dh = Math.round((fHeight - space * $scope.picRow)/$scope.picRow);

                    canvas.setAttribute('width',sw);
                    canvas.setAttribute('height',sh);
                    $scope.sw = sw;
                    $scope.sh = sh;
                    ctx.imageSmoothingQuality = "high";


                    //ctx.$scope.drawImage(im,0,0,sw,sh,0,0,$scope.dw,$scope.dh)
                    //by default i want 30 pieces of any image i.e 5 columns and 6 rows for mobile devices.
                    for(let i = 0; i < $scope.picColumn; i++){
                        for(let j = 0; j < $scope.picRow; j++){
                            //ctx.$scope.drawImage(im,i*(sw + 1),j*(sh + 1),sw,sh,i*($scope.dw + 5),j*($scope.dh + 5),$scope.dw,$scope.dh);
                            ctx.drawImage(im,i*(sw + 1),j*(sh + 1),sw,sh,0,0,sw,sh);
                            drawdata = {};  
                            drawdata.img = canvas.toDataURL('image/png', 1);
                            drawdata.x = i*($scope.dw + space);
                            drawdata.y = j*(Math.round(($scope.sh*$scope.dw)/$scope.sw) + space);
                            $scope.basket.push(drawdata);
                            //ctx.clearRect(0,0,sw,sh);
                        }
                    }
                    
                    //console.log($scope.basket);
                    $scope.shuffle = $scope.basket.map((item)=>{return {x:item.x,y:item.y}})
                    $scope.shuffle = mocha.randomize($scope.shuffle)
                    resolve($scope.shuffle);

                }               
                
            }
        });    
        
        
    }
    $scope.setUp = function(w,h){
        $scope.picBoxes = $scope.picColumn * $scope.picRow;
        $scope.footnote_hide = false;
        $scope.footnote = true;
        $scope.footnote_msg = 'Level ' + $scope.puzzLevel;
        $scope.drawCanvas(w,h)
        .then((data)=>{
            //console.log('yeaaaaaaaaaah', $scope.basket);
            if(!mocha.safe($scope.draw)){
                $scope.svg = angular.element(document.getElementById('svg'))[0];
                $scope.draw = SVG($scope.svg).size(w, h);
            }
            
            //console.log($scope.basket);
            let z = 0;
            $scope.basket.forEach((item)=>{
                //let elem = $scope.draw.image(item.img,$scope.dw,$scope.dh);
                let elem = $scope.draw.image(item.img,$scope.dw,Math.round(($scope.sh*$scope.dw)/$scope.sw));
                elem.x($scope.shuffle[z].x);
                elem.y($scope.shuffle[z].y);
                elem.truth = {x:item.x,y:item.y};
                elem.attr('ng-buzz','yes');
                // elem.click(()=>{
                //     elem.animate(100).width($scope.dw - $scope.dw*0.3);
                //     if($scope.waste.length < 2){
                //         $scope.waste.push(elem);
                //     }
                //     if($scope.waste.length === 2 && $scope.waste[0].node.id !== $scope.waste[1].node.id ){
                //         let a = {x:$scope.waste[0].node.x.baseVal.value,
                //                     y:$scope.waste[0].node.y.baseVal.value,
                //                     truth: $scope.waste[0].truth
                //                 }
                //         let b = {x:$scope.waste[1].node.x.baseVal.value,
                //                     y:$scope.waste[1].node.y.baseVal.value,
                //                     truth: $scope.waste[1].truth
                //                 }
                //         SVG.get($scope.waste[0].node.id).animate(500).move(b.x,b.y).animate(100).width($scope.dw);
                //         SVG.get($scope.waste[1].node.id).animate(500).move(a.x,a.y).animate(100).width($scope.dw);
                //         $scope.checker(a,b);
                //         $scope.checker(b,a);
                //         $scope.waste = [];
                        
                //         //console.log(a,b)
                //     }else if($scope.waste.length === 2 && $scope.waste[0].node.id == $scope.waste[1].node.id){
                //         //this is the situation where the same box is touched
                //         elem.animate(100).width($scope.dw);
                //         $scope.waste = [];
                //     }
                //     //console.log(elem);
                // });
                
                elem.loaded (()=>{
                    //on initialization check if element is in the right position
                    let pos = {x:elem.node.x.baseVal.value,
                                    y:elem.node.y.baseVal.value
                                }
                    if(pos.x === elem.truth.x && pos.y === elem.truth.y){
                        $scope.correct.push(elem.truth.x+':'+elem.truth.y);
                    }
                    $scope.progressFunc();
                    $scope.isLevelCompleted(); //sometimes the randomized data can be exactly solved on the first round
                });
                
                z++;
                //elem.mouseout(()=>{elem.animate(100).width(50);});
            });
            $compile($scope.draw.node)($scope); //this is important for the new elements added to the DOM to be compiled by angular
        });
        
    };
    
    $scope.svgSpace = angular.element(document.getElementById('svg'))[0]
    $scope.setUp($scope.svgSpace.clientWidth,$scope.svgSpace.clientHeight);

    $scope.checker = function(d,e){
			
        if(e.x === d.truth.x && e.y === d.truth.y){
            //Player is right
            if(!$scope.correct.includes(d.truth.x+':'+d.truth.y)){
                $scope.correct.push(d.truth.x+':'+d.truth.y);
                //console.log('right boy')
            }
        }else{
            //player is wrong
            if($scope.correct.includes(d.truth.x+':'+d.truth.y)){
                let pos = $scope.correct.indexOf(d.truth.x+':'+d.truth.y)
                $scope.correct.splice(pos,1);
            }
            //console.log('wrong boy')
        }
        
        $scope.isLevelCompleted();
    }

    $scope.isLevelCompleted = function(){
        if($scope.correct.length === $scope.picBoxes){
            //$scope.draw.text('you win').move(50,50);
            $scope.output = 'Completed'
            $scope.test.time_result = mocha.gameTimePlayed($scope).split(':');
            $scope.mocha.tones('f',5,500);
            //$scope.mocha.vibrate(2000);
            $timeout(()=>{
                $scope.levelUp();
            },2000)
            //console.log('THE END FAM')
        }
    };

    $scope.progressFunc = function(){
        $scope.prog = (($scope.correct.length)/$scope.picBoxes)*100;
    };

    $scope.isStarted = function(){
        if($scope.test.start_time === null){
            $scope.test.start_time = moment();
        }
    };

    $scope.levelUp = function(){
        $scope.draw.clear();
        $scope.waste = [];
        $scope.correct = [];
        $scope.dw,$scope.dh,$scope.draw;
        $scope.sw,$scope.sh;
        $scope.shuffle = [];
        $scope.basket =[];
        $scope.prog = 0;
        $scope.picColumn += 1;
        $scope.picRow += ($scope.picColum == $scope.picRow) ? 2 : 1;
        $scope.puzzLevel += 1;
        $scope.setUp($scope.svgSpace.clientWidth,$scope.svgSpace.clientHeight);
    }

});

myapp.directive('ngBuzz', function() {
    return{
        link: function($scope,elem,attrs){       
            
            elem.bind('click', function() {
                $scope.isStarted();
                //$scope.mocha.vibrate(60);
                $scope.mocha.tones('e',5,10,null,'sine');
                elem[0].instance.animate(100).width($scope.dw - $scope.dw*0.3);
                if($scope.waste.length < 2){
                    $scope.waste.push(elem[0].instance);
                }
                //$scope.waste[0].animate(500).move(0,0).animate(100).width($scope.dw);
                if($scope.waste.length === 2 && $scope.waste[0].node.id !== $scope.waste[1].node.id ){
                    var a = {x:$scope.waste[0].node.x.baseVal.value,
                                y:$scope.waste[0].node.y.baseVal.value,
                                truth: $scope.waste[0].truth
                            }
                    var b = {x:$scope.waste[1].node.x.baseVal.value,
                                y:$scope.waste[1].node.y.baseVal.value,
                                truth: $scope.waste[1].truth
                            }
                    $scope.waste[0].animate(500).move(b.x,b.y).animate(100).width($scope.dw);
                    
                    $scope.waste[1].animate(500).move(a.x,a.y).animate(100).width($scope.dw);
                    
                    $scope.checker(a,b);
                    $scope.checker(b,a);
                    $scope.progressFunc();
                    $scope.waste = [];
                    
                }else if($scope.waste.length === 2 && $scope.waste[0].node.id == $scope.waste[1].node.id){
                    //this is the situation where the same box is touched
                    elem[0].instance.animate(100).width($scope.dw);
                    $scope.waste = [];
                   // console.log('i failed in life');
                }
               //console.log('am alive bitch',elem[0].instance);
               $scope.$apply(); //this is important for the model data to update in the DOM
            });
        }
    }
});
//carla DIRECTIVES
myapp.directive('carlaMenuHeader', function() {
    return {
      templateUrl: 'views/carla/carla.menu-header.html'
    };
});

myapp.directive('carlaResultModal', function() {
    return {
      templateUrl: 'views/carla/carla.result.html'          
    };
});

//ROUTES
myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("/carladash", {
        url: "/carladash",
        templateUrl : "views/carla/carla.dash.html",
	  	controller: "carla.dash.controller"
      })
      .state("/carlagame", {
        url: "/carlagame",
        templateUrl : "views/carla/carla.game.html",
        controller: "carla.dash.controller"
      })
      .state("/carlalogin", {
        url: "/carlalogin",
        templateUrl : "views/carla/carla.login.html",
        controller: "carla.login.controller"
      })
      .state("/carlacontest", {
        url: "/carlacontest",
        templateUrl : "views/carla/carla.contest.html",
        controller: "carla.contest.controller"
      })
      .state("/carlaanswer", {
        url: "/carlaanswer",
        templateUrl : "views/carla/carla.answer.html",
        controller: "carla.answer.controller"
      })
      .state("/carlaleaderboard", {
        url: "/carlaleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'carla'},
        cache: false
      })
      .state("/carlaanalytics", {
        url: "/carlaanalytics",
        templateUrl : "views/analytics.html",
        controller: "analytics.controller",
        params: {mode: 'carla'},
        cache: false
      });
});

//carla CONTROLLERS BELOW
myapp.controller('carla.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#FF69B4';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu carla-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.carla_data = [
        {
            url:'https://media2.giphy.com/media/26FL9OTTL0m8LPa8g/giphy.gif',
            price:'2',
            question:'What\'s the best way to prepare for a radiant skin the day before going on a date?', 
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'1',
            options: [
                {answer: 'Watch Netflix and eat lots of snacks', url:''},
                {answer: 'Drink Wine and eat chocolate', url:''},
                {answer: 'Drink water, and get a good night sleep', url:''},
                {answer: 'Call all your girlfriends and consult with them', url:''}
            ]
        },
        {
            url:'https://drive.google.com/uc?id=0B3udcDa1xiXoMFFtMG5DVGNqWXNYZnRJanI5VWlvRjdiWTJn',
            price:'survey',
            question:'Which of these outfit\'s would you wear on a date?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'2',
            picOption: [
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoMFFtMG5DVGNqWXNYZnRJanI5VWlvRjdiWTJn'},
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoNGI4U1JPU2JBNlZSSFRDaGxmVDFsd2tFV2gw'},
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoU1lCTDc5U0ROMXFMZi1FX1E4NkRTcHllWUhv'},
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoLTJZa2pIRVQ5WWIzSU93WjctbDR2V21CM1VV'}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/0aa12222535f74b026d5b5486c509fab/5B51B597/t51.2885-15/e35/25010617_1699187613479211_8963877556008779776_n.jpg',
            price:'3',
            question:'Sexiest colour to wear?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [ 
                {answer: 'Blue', url:''},
                {answer: 'Black', url:''},
                {answer: 'Purple', url:''},
                {answer: 'Red', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/46600a18f22c31a53b0f934d01d31b63/5B6EDFEF/t51.2885-15/e35/21689319_1503083616449529_8239281689449201664_n.jpg',
            price:'1',
            question:'Which of these shoes would you wear on a date?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'4',
            options: [ 
                {answer: 'Summer flip-flops', url:''},
                {answer: 'Adorable comfortable heels/shoes', url:''},
                {answer: 'Cutest heels but most uncomfortable ..but still cutest', url:''},
                {answer: 'Barefoot', url:''}
            ]
        },
        {
            url:'https://media1.giphy.com/media/Dp6wyIExnG3ZK/giphy.gif',
            price:'2',
            question:'So you\'re all stressed out and want to impress your date, what is the best way to do so?',   
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'5',
            options: [ 
                {answer: 'You freak out, call your BFF for some emotional support', url:''},
                {answer: 'You cancel on your date cause you are too stressed out', url:''},
                {answer: 'Be yourself and the right people will come your way.', url:''},
                {answer: 'You start singing and taking selfies', url:''}
            ]
        },
        {
            url:'https://media0.giphy.com/media/xUOxfcNVMcLSBVFV60/giphy.gif',
            price:'1',
            question:'So, you like this guy (obv, otherwise why go on a date), What should you talk about?',     
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'6',
            options: [ 
                {answer: 'Don\'t talk at all, just stare at other people ', url:''},
                {answer: 'Talk about your hobbies, passions, and remember to be yourself!', url:''},
                {answer: 'Bring up your Ex', url:''},
                {answer: 'Get your laptop and do some work, show him you are a multi-tasker and can be very productive', url:''}
            ]
        },
        {
            url:'https://media.giphy.com/media/y8btJ3OOxT4sg/giphy.gif',
            price:'3',
            question:'Conversation is going great, and you like this guy. What are the next steps?',    
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'7',
            options: [ 
                {answer: 'Playhard to get, ignore him forever, and never talk to him', url:''},
                {answer: 'Just leave, he will somehow think you are into him', url:''},
                {answer: 'Change your phone number, and move to a different city, and give him space', url:''},
                {answer: 'Mention you are having a great time and you should do it again soon.', url:''}
            ]
        },
        {
            url:'https://media2.giphy.com/media/1Zt3z4uEBPZQY/giphy.gif',
            price:'2',
            question:'You thought he liked you, it\'s been a day and he hasn\'t texted back (Oh no), What now?',   
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'8',
            options: [  
                {answer: 'Block his number', url:''},
                {answer: 'Adopt a cat', url:''},
                {answer: 'Give it sometime, it\'s only been a day!', url:''},
                {answer: 'Chocolate, ice-cream, snacks and some tissues', url:''}
            ]
        },
        {
            url:'https://media1.giphy.com/media/xUOwGpYrEordpYKzv2/giphy.gif',
            price:'survey',
            question:'It\'s been 3 days and he hasn\'t texted back?', 
            min:'0',
            max:'2',
            context:'',
            subcategory:'',
            p_id:'9',
            options: [  
                {answer: 'Texting back option: (it\'s 2018... girls c\'mon...)', url:''},
                {answer: 'Waiting for him to text first option: (someone enjoys the chase!)', url:''},
                {answer: 'Not texting back option: (it\'s ok to simply move on)', url:''}
            ]
        },
        {
            url:'https://media0.giphy.com/media/3o6Ztg2MgUkcXyCgtG/giphy.gif',
            price:'1',
            question:'It\'s been 7 days and he hasn\'t texted back? ',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'10',
            options: [  
                {answer: 'Bring back the chocolate, ice-cream, snacks and tissue box!', url:''},
                {answer: 'Zero communication generally means a person is not interested, remember there are plenty of fish in the sea.', url:''},
                {answer: 'Email him professionally and let him know he is not part of your life anymore.', url:''},
                {answer: 'Post a selfie and caption it; A strong woman needs no man.', url:''}
            ]
        }

                
    ];    
    
    $scope.data = [];
    angular.copy($scope.carla_data,$scope.data);
    $scope.carla = true;
    $scope.prizeStartDate = moment('2018/02/01','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2019/04/03 23:59','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/12/27 18:00','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true,select:''};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.carla = true;
    mocha.appName = 'mocha_'+'carla';
    mocha.carla_data = $scope.carla_data;
    mocha.prizeStartDate = $scope.prizeStartDate;
    mocha.prizeEndDate = $scope.prizeEndDate;
    mocha.webTraffic(); //very key that start date and end date is added to the mocha service object before calling the func
    
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if(mocha.safe($scope.game.options)){
            // if(mocha.safe($scope.game.options[$scope.test.price].url)){
            //     $scope.game.url = $scope.game.options[$scope.test.price].url;
            // }
            $scope.game.context =  ($scope.test.select !== '') ? $scope.game.options[$scope.test.select].answer : null;
            //this is so that the raw answer is the exact answer
            $scope.test.price = $scope.test.select;
            if($scope.test.select !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.select;
            }
            
        }

        if($scope.game.min === '0' && $scope.game.max === '1'){
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.carlaSubmit = function(){mocha.submitPrediction($scope)};
    $scope.carlaNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        if(mocha.safe($scope.game.options)){
            $scope.test.price = '';
        }
        if(mocha.safe($scope.game.picOption)){
            mocha.log('pic options here')
            mocha.imageLoop($scope.game.picOption);
        }
    };
    $scope.resetGame = function(){mocha.resetGame($scope)};
    $scope.inputShow = function(){mocha.inputShow($scope)};
    $scope.menuHide = function(){mocha.menuHide($scope)};
    $scope.isPredict = function(){
        if(mocha.safe($scope.game.question) && ($scope.game.question.includes('price') 
           || $scope.game.question.includes('investment'))){
            return true;
        }
        if(mocha.safe($scope.game.context) && $scope.game.context.includes('$')){
            return true;
        }
    };
    $scope.startCarla = function(){
        $state.go('/carlagame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/carlacontest');
    };
    $scope.radioFunc = function(){
        $scope.game.subcategory = '';
        $scope.test.price = $scope.test.price_radio;
        $scope.game.url = $scope.game.picOption[$scope.test.price].url;
        $scope.hide_question = true;
        $timeout(function(){
            $scope.game.subcategory = mocha.letterOption[$scope.test.price_radio];
            $scope.hide_question = false;
        }, 1000);
        //$scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('carla.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/carladash');
        },3000);
    }
    
});

myapp.controller('carla.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.loader = false;
    $scope.mocha = mocha;
    $scope.mocha.contest.signup =true;
    $scope.contestSubmit = function(form){
        if(form.$valid){
            $scope.loader = true;
            $scope.contest = {};
            $scope.contest.timestamp = moment().toISOString();
            $scope.contest.points = $scope.mocha.test.point_earned;
            $scope.contest.playtime = $scope.mocha.test.timePlayed;
            $scope.contest.played_data = JSON.stringify(mocha.played_data);
            $scope.contest.signup = ($scope.mocha.contest.signup == true)? 1 : 0;
            //$scope.contest.signup = 0;
            $http.get('https://styleminions.co/api/carlacontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                localStorage[mocha.appName+'_points'] = $scope.contest.points;
                //localStorage[mocha.appName+'_prize'] = $scope.contest.prize;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/carlaleaderboard');
                $scope.loader = false;
            });
        }else{
            mocha.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});

myapp.controller('carla.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.showanswer = null;
    $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
    var check = $interval(function(){
        let now = moment();
        if(mocha.prizeEndDate.isBefore(now)){
            mocha.log('see the answers');
            $interval.cancel(check);
            $scope.showanswer = true;
        }else{
            mocha.log('wait for a while');
            $scope.showanswer = false;
        }
    }, 1000, 6000);
    
});

myapp.directive('dmzMenuHeader', function() {
    return {
      templateUrl: 'views/dmz/dmz.menu-header.html'
    };
});

myapp.directive('dmzResultModal', function() {
    return {
      templateUrl: 'views/dmz/dmz.result.html'          
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
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
      });
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
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true,select:''};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.dmz = true;
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if(mocha.safe($scope.game.options)){
            // if(mocha.safe($scope.game.options[$scope.test.price].url)){
            //     $scope.game.url = $scope.game.options[$scope.test.price].url;
            // }
            $scope.game.context =  ($scope.test.select !== '') ? $scope.game.options[$scope.test.select].answer : null;
            //this is so that the raw answer is the exact answer
            $scope.test.price = $scope.test.select;
            if($scope.test.select !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.select;
            }
            
        }

        if($scope.game.min === '0' && $scope.game.max === '1'){
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.dmzSubmit = function(){mocha.submitPrediction($scope)};
    $scope.dmzNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        if(mocha.safe($scope.game.options)){
            $scope.test.price = '';
        }
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
myapp.directive('fzMenuHeader', function() {
    return {
      templateUrl: 'views/fz/fz.menu-header.html'
    };
});

myapp.directive('fzResultModal', function() {
    return {
      templateUrl: 'views/fz/fz.result.html'          
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
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
      .state("/fzanalytics", {
        url: "/fzanalytics",
        templateUrl : "views/analytics.html",
        controller: "analytics.controller",
        params: {mode: 'fz'},
        cache: false
      })
      .state("/fzleaderboard", {
        url: "/fzleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'fz'},
        cache: false
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
    mocha.appName = 'mocha_'+'fz';
    mocha.fz_data = $scope.fz_data;
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
//INLIGHTEN DIRECTIVES
myapp.directive('inlightenMenuHeader', function() {
    return {
      templateUrl: 'views/inlighten/inlighten.menu-header.html'
    };
});

myapp.directive('inlightenResultModal', function() {
    return {
      templateUrl: 'views/inlighten/inlighten.result.html'          
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("/inlightendash", {
        url: "/inlightendash",
        templateUrl : "views/inlighten/inlighten.dash.html",
	  	controller: "inlighten.dash.controller"
      })
      .state("/inlightengame", {
        url: "/inlightengame",
        templateUrl : "views/inlighten/inlighten.game.html",
        controller: "inlighten.dash.controller"
      })
      .state("/inlightenlogin", {
        url: "/inlightenlogin",
        templateUrl : "views/inlighten/inlighten.login.html",
        controller: "inlighten.login.controller"
      })
      .state("/inlightencontest", {
        url: "/inlightencontest",
        templateUrl : "views/inlighten/inlighten.contest.html",
        controller: "inlighten.contest.controller"
      })
      .state("/inlightenanswer", {
        url: "/inlightenanswer",
        templateUrl : "views/inlighten/inlighten.answer.html",
        controller: "inlighten.answer.controller"
      })
      .state("/inlightenprize", {
        url: "/inlightenprize",
        templateUrl : "views/inlighten/inlighten.prize.html",
        controller: "inlighten.prize.controller"
      })
      .state("/inlightenleaderboard", {
        url: "/inlightenleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'inlighten'},
        cache: false
      })
      .state("/inlightenanalytics", {
        url: "/inlightenanalytics",
        templateUrl : "views/analytics.html",
        controller: "analytics.controller",
        params: {mode: 'inlighten'},
        cache: false
      });
});

//inlighten CONTROLLERS BELOW
myapp.controller('inlighten.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#fe4d00';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu inlighten-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.inlighten_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/d7a761bd563d58cf346ec8ecad2b2ced/5ADF6097/t51.2885-15/e35/26333738_157137628252127_3034955948713050112_n.jpg',
            price:'1',
            question:'Where is techno music born ?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'1',
            options: [
                {answer: 'Chicago', url:''},
                {answer: 'detroit', url:''},
                {answer: 'berlin', url:''},
                {answer: 'london', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/852228c96f888dd66a474d1ebbd16c4a/5AF71AB7/t51.2885-15/e35/26267627_200044620572350_841489895510769664_n.jpg',
            price:'7',
            question:'how many products does inlighten carry?',
            min:'3',
            max:'20',
            context:'',
            subcategory:'',
            p_id:'2',
            source: 'https://www.rethinkingdrinking.niaaa.nih.gov/Tools/Calculators/Calorie-Calculator.aspx'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/8de78e3c94d7d4b6c6d3dec5d5cd59ae/5ADAAE01/t51.2885-15/e35/25019161_2021905281387262_2531557653881028608_n.jpg',
            price:'1',
            question:'What features do we have for the second gen products?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                {answer: 'Secret compartment', url:''},
                {answer: 'Environmental sound reactivity', url:''},
                {answer: 'brightness adjustment', url:''},
                {answer: 'shake phone to change color', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/e82ffc1a0a942d26358be102511a5d56/5ADE36C5/t51.2885-15/e35/25024714_1583528291728535_7295001359550513152_n.jpg',
            price:'1',
            question:' How many people are there in Above and beyond?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'4',
            options: [
                {answer: '2', url:''},
                {answer: '3', url:''},
                {answer: '5', url:''},
                {answer: '10', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/07fcba6c5d7c53c41ffa6953a2eb77d8/5AE87E3F/t51.2885-15/e35/23098716_126619421369388_7340628824360484864_n.jpg',
            price:'1',
            question:'Is it washable?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'5',
            options: [
                {answer: 'machine wash', url:''},
                {answer: 'hand wash', url:''},
                {answer: 'no', url:''},
                {answer: 'no need to wash ', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/511d926c80d8f76fa2b4360b8f44a803/5AEB46BF/t51.2885-15/e35/23735349_129013541099942_1506552722164285440_n.jpg',
            price:'21',
            question:'How old is martin garrix now?',
            min:'19',
            max:'38',
            context:'',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/ca4ec8441ef3863558d083a7698914f2/5AE55398/t51.2885-15/e35/22344177_127022191338397_6753242233601785856_n.jpg',
            price:'3',
            question:'what are the payment options we offer?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'7',
            options: [
                {answer: 'installment', url:''},
                {answer: 'splitpay', url:''},
                {answer: 'paypal', url:''},
                {answer: 'all the options', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/44fe4a37f07c9d5a2ce4b0e66f902e47/5AE8F132/t51.2885-15/e35/18094899_1153108111467956_8164066899311722496_n.jpg',
            price:'1',
            question:'where do we ship to?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'8',
            options: [
                {answer: 'brazil', url:''},
                {answer: 'worldwide', url:''},
                {answer: 'europe', url:''},
                {answer: 'america', url:''}
            ]                
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/d263bb0d5021423a58ae233ebce38539/5ADF4F7B/t51.2885-15/e35/18094862_1377814435628951_4125549854287986688_n.jpg',
            price:'2',
            question:'What are the pills that we need to take to recover ?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'9',
            options: [
                {answer: 'milk thistle', url:''},
                {answer: 'melatonin', url:''},
                {answer: '5htp', url:''},
                {answer: 'ketamine', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/f3528351196312e9a6b054d7c98091aa/5AE276B2/t51.2885-15/e35/17881140_208217066346776_2630688045988315136_n.jpg',
            price:'1',
            question:'what are some tech elements we embed in the product?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'10',
            options: [
                {answer: 'bluetooth', url:''},
                {answer: 'fiber optic', url:''},
                {answer: 'color sensor', url:''},
                {answer: 'all the options', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/3ee0d96a8c51f10e7879f883d2e3a2c5/5AE8FF4A/t51.2885-15/s1080x1080/e35/18094703_833119983531158_7881689601511784448_n.jpg',
            price:'3',
            question:'what magazines are we being featured on?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'11',
            options: [
                {answer: 'NOVO magazine', url:''},
                {answer: 'Ravenation', url:''},
                {answer: 'Vogue USA', url:''},
                {answer: 'vogue UK', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/9677b1bb9290e78403303a53c6c5b7bf/5AF3D532/t51.2885-15/e35/18094646_1934428426791672_7189601088285179904_n.jpg',
            price:'3',
            question:'what social media platforms are we on?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'12',
            options: [
                {answer: 'facebook', url:''},
                {answer: 'instagram', url:''},
                {answer: 'twitter', url:''},
                {answer: 'all of the above', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/f5fb602f4670bde5e44d75a2b6de05ed/5AF53F8C/t51.2885-15/e35/18013973_1928285407404446_6087253240200560640_n.jpg',
            price:'1',
            question:'what platform do we sell on?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'13',
            options: [
                {answer: 'amazon', url:''},
                {answer: 'all of the above', url:''},
                {answer: 'shopify', url:''},
                {answer: 'facebook', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/99110a8c0b8e32e943a7fc4bf80be84c/5AE25B62/t51.2885-15/e35/18094529_1319501248127200_4504383020815351808_n.jpg',
            price:'survey',
            question:' What music festival would you consider going to in the next year?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'14',
            options: [
                {answer: 'burning man', url:''},
                {answer: 'EDC', url:''},
                {answer: 'ultra', url:''},
                {answer: 'lostland', url:''}
            ],
            source: 'http://www.telegraph.co.uk/tv/0/game-thrones-rhaegar-targaryen-father-jon-snow-daenerys-related/'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/982dff6b8e99caa7c648e832dc28bb50/5ADC2DE0/t51.2885-15/e35/18013913_803013549874616_8718980771353722880_n.jpg',
            price:'3',
            question:'What is the birth home of the clothing brand Inlighten?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'15',
            options: [
                {answer: 'Newyork', url:''},
                {answer: 'Boston', url:''},
                {answer: 'London', url:''},
                {answer: 'Toronto', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/865b51b3aa6167ba084203333488737e/5AF6C6EC/t51.2885-15/e35/17934541_799299920222797_134993012546600960_n.jpg',
            price:'3',
            question:'the calories we burn from all night dancing( 6 hours) equals how much  the calories we burn from having sex ( average session ) ?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'15',
            options: [
                {answer: '4', url:''},
                {answer: '6', url:''},
                {answer: '12', url:''},
                {answer: '18', url:''}
            ]
        }
        
        
        
        
    ];    
    
    $scope.data = [];
    angular.copy($scope.inlighten_data,$scope.data);
    $scope.inlighten = true;
    $scope.prizeStartDate = moment('2018/02/01','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2018/02/14 18:00','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/12/27 18:00','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true,select:''};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.inlighten = true;
    mocha.appName = 'mocha_'+'inlighten';
    mocha.inlighten_data = $scope.inlighten_data;
    mocha.prizeEndDate = $scope.prizeEndDate;
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if($scope.safe($scope.game.options)){
            // if(mocha.safe($scope.game.options[$scope.test.price].url)){
            //     $scope.game.url = $scope.game.options[$scope.test.price].url;
            // }
            $scope.game.context =  ($scope.test.select !== '') ? $scope.game.options[$scope.test.select].answer : null;
            //this is so that the raw answer is the exact answer
            $scope.test.price = $scope.test.select;
            if($scope.test.select !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.select;
            }
            
        }

        if($scope.game.min === '0' && $scope.game.max === '1'){
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.inlightenSubmit = function(){mocha.submitPrediction($scope)};
    $scope.inlightenNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        if(mocha.safe($scope.game.options)){
            $scope.test.price = '';
        }
    };
    $scope.resetGame = function(){mocha.resetGame($scope)};
    $scope.inputShow = function(){mocha.inputShow($scope)};
    $scope.menuHide = function(){mocha.menuHide($scope)};
    $scope.isPredict = function(){
        if(mocha.safe($scope.game.question) && ($scope.game.question.includes('price') 
           || $scope.game.question.includes('investment'))){
            return true;
        }
        if(mocha.safe($scope.game.context) && $scope.game.context.includes('$')){
            return true;
        }
    };
    $scope.startInlighten = function(){
        $state.go('/inlightengame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/inlightencontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('inlighten.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/inlightendash');
        },3000);
    }
    
});

myapp.controller('inlighten.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.loader = false;
    $scope.mocha = mocha;
    $scope.mocha.contest.signup =true;
    $scope.contestSubmit = function(form){
        if(form.$valid){
            $scope.loader = true;
            $scope.contest = {};
            $scope.contest.timestamp = moment().toISOString();
            $scope.contest.points = $scope.mocha.test.point_earned;
            $scope.contest.playtime = $scope.mocha.test.timePlayed;
            $scope.contest.played_data = JSON.stringify(mocha.played_data);
            //$scope.contest.signup = ($scope.mocha.contest.signup == true)? 1 : 0;
            $scope.contest.signup = 0;
            $http.get('https://styleminions.co/api/inlightencontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                localStorage[mocha.appName+'_points'] = $scope.contest.points;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/inlightenleaderboard');
                $scope.loader = false;
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});

myapp.controller('inlighten.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.showanswer = null;
    $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
    var check = $interval(function(){
        let now = moment();
        if(mocha.prizeEndDate.isBefore(now)){
            console.log('see the answers');
            $interval.cancel(check);
            $scope.showanswer = true;
        }else{
            console.log('wait for a while');
            $scope.showanswer = false;
        }
    }, 1000, 6000);
    
});
myapp.controller('inlighten.prize.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.prize = [
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Improvision_Light_Up_3_600x600.jpg?v=1515006458',
        name: 'Revival Hoodie'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Mens-Feature-1_35a47cf3-c172-497b-968f-cbb4e150c528_600x600.jpg?v=1515002931',
        name: 'Divinity Mask'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/front-yellow_600x600.jpg?v=1515006221',
        name: 'Prophecy Bomber'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Womens-Bra-Feature-1_600x600.jpg?v=1515003037',
        name: 'Firefly Bra'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Womens-Feature-1_600x600.jpg?v=1515005976',
        name: 'Promises Hoodie'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Jacket_5_600x600.jpg?v=1515006115',
        name: 'Prophecy Bomber'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Mens-Feature-1_35a47cf3-c172-497b-968f-cbb4e150c528_600x600.jpg?v=1515002931',
        name: 'Divinity Mask'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Tie-Feature_600x600.JPG?v=1515002851',
        name: 'Momentum Tie'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Accessories-Feature_600x600.JPG?v=1515006349',
        name: 'Purity Clutch'
        }
    ]
    
});
//LEGAL ZONE DIRECTIVES
myapp.directive('lzMenuHeader', function() {
    return {
      templateUrl: 'views/lz/lz.menu-header.html'
    };
});

myapp.directive('lzResultModal', function() {
    return {
      templateUrl: 'views/lz/lz.result.html'          
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
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
        templateUrl : "views/lz/lz.answer.html",
        controller: "lz.answer.controller"
    })
    .state("/lzleaderboard", {
        url: "/lzleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'lz'},
        cache: false
    });
});

//lz CONTROLLERS BELOW
myapp.controller('lz.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#ef4319';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu lz-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.lz_data = [
        {
            url:'https://pbs.twimg.com/media/DOslz-VXkAIT_Ql.jpg',
            price:'2015',
            question:'What year was LIZ founded?',
            min:'1994',
            max:'2017',
            context:'',
            subcategory:'',
            p_id:'1'
        },
        {
            url:'https://pbs.twimg.com/profile_images/875804768169480192/N62ZSo-a_400x400.jpg',
            price:'2',
            question:'Which LIZ startup automates the incorporation process for companies using smart technology?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'2',
            options: [
                {answer: 'Legalbox', url:'https://pbs.twimg.com/profile_images/826534198940938243/Ytn1ZHQK_400x400.jpg'},
                {answer: 'Legalswipe', url:'https://pbs.twimg.com/profile_images/719025068223758337/GnhaTm9i_400x400.jpg'},
                {answer: 'Founded', url:'https://pbs.twimg.com/profile_images/919763209434918915/Xx5ZibzS_400x400.jpg'},
                {answer: 'Loom Analytics', url:'https://pbs.twimg.com/profile_images/875804768169480192/N62ZSo-a_400x400.jpg'}
            ]
        },
        {
            url:'https://pbs.twimg.com/profile_images/890647564160311296/0KRdC6U4_400x400.jpg',
            price:'3',
            question:'Who did the LIZ partner with for the AI Legal Challenge?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                {answer: 'BMO ', url:'https://pbs.twimg.com/profile_images/797833739795595264/KHzGCVxn_400x400.jpg'},
                {answer: 'Siemens', url:'https://pbs.twimg.com/profile_images/808958766628605952/yB14UlXl_400x400.jpg'},
                {answer: 'Legal Aid Ontario', url:'https://pbs.twimg.com/profile_images/752493286334537729/Eae-dore_400x400.jpg'},
                {answer: 'Ministry of the Attorney General', url:'https://pbs.twimg.com/profile_images/890647564160311296/0KRdC6U4_400x400.jpg'}
            ]
        },
        {
            url:'https://pbs.twimg.com/media/DGUZmzsUIAAgA1j.jpg',
            price:'2',
            question:'The LIZ just launched a Global Initiative around what type of law?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'4',
            options: [
                {answer: 'Aboriginal Law', url:''},
                {answer: 'Consumer Law', url:''},
                {answer: 'Family Law', url:''},
                {answer: 'Criminal Law', url:''}
            ]
        },
        {
            url:'https://pbs.twimg.com/media/DL4ebbFVAAA0KLF.jpg',
            price:'1',
            question:'Winners of the AI Legal Challenge can win up to $80,000 in seed funding?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'5'                
        },
        {
            url:'https://pbs.twimg.com/media/DM2pthZVwAAkQOf.jpg',
            price:'17',
            question:'How many startups are currently active at the Legal Innovation Zone?',
            min:'8',
            max:'40',
            context:'',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://pbs.twimg.com/profile_images/775777754868551681/-uHIQj_b_400x400.jpg',
            price:'3',
            question:'Which startup won the Ontario A2J Challenge at the Legal Innovation Zone last year?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'7',
            options: [
                {answer: 'Legally Inc.', url:'https://pbs.twimg.com/profile_images/770622149061206016/dYoA4cDe_400x400.jpg'},
                {answer: 'NoticeConnect', url:'https://pbs.twimg.com/media/DFHFzJaUQAE3bMG.jpg'},
                {answer: 'Evichat', url:'https://pbs.twimg.com/profile_images/872920905827074048/M5r9pQGI_400x400.jpg'},
                {answer: 'ParDONE', url:'https://pbs.twimg.com/profile_images/775777754868551681/-uHIQj_b_400x400.jpg'}
            ]
        },
        {
            url:'https://pbs.twimg.com/media/DM2x_YpXUAEAVaD.jpg',
            price:'12',
            question:'How many advisors are available to LIZ startups?',
            min:'4',
            max:'24',
            context:'',
            subcategory:'',
            p_id:'8'
        },
        {
            url:'https://pbs.twimg.com/media/DPrFx4CX0AEOi7V.jpg',
            price:'1',
            question:'The LIZ recently partnered with Osler for a successful Associate Innovation Challenge',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'9'
        },
        {
            url:'https://pbs.twimg.com/media/DIaYD6yUwAIvWTK.jpg',
            price:'1',
            question:'LIZ has partnered with the Law Foundation of Ontario to run an initiative around?',
            min:'0',
            max:'2',
            context:'',
            subcategory:'',
            p_id:'10',
            options: [
                {answer: 'Criminal Law', url:''},
                {answer: 'Youth Access to Justice', url:''},
                {answer: 'Consumer Issues', url:''}
            ]
        }
        
    ];
    
    
    $scope.data = [];
    angular.copy($scope.lz_data,$scope.data);
    $scope.lz = true;
    $scope.prizeStartDate = moment('2017/11/28','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/11/28 19:30','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/11/28 19:00','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.lz = true;
    mocha.lz_data = $scope.lz_data;
    mocha.prizeEndDate = $scope.prizeEndDate;
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if($scope.safe($scope.game.options)){
            if(mocha.safe($scope.game.options[$scope.test.price].url)){
                $scope.game.url = $scope.game.options[$scope.test.price].url;
            }
            $scope.game.context =  $scope.game.options[$scope.test.price].answer;
            if($scope.test.price !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.price;
            }
            
        }

        if($scope.game.min === '0' && $scope.game.max === '1'){
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.lzSubmit = function(){mocha.submitPrediction($scope)};
    $scope.lzNextProduct = function(){
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
    $scope.startLz = function(){
        $state.go('/lzgame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/lzcontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('lz.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/lzdash');
        },3000);
    }
    
});

myapp.controller('lz.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
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
            $http.get('https://styleminions.co/api/lzcontest?name='+$scope.mocha.contest.name+"&phone="+
            $scope.mocha.contest.phone+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.phone = $scope.mocha.contest.phone;
                localStorage.prizeplaydate = moment().toISOString();
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/lzleaderboard');
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});

myapp.controller('lz.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.showanswer = null;
    //var prizeEndDate = moment('2017/11/27 18:56','YYYY/MM/DD kk:mm');
    var check = $interval(function(){
        let now = moment();
        if(mocha.prizeEndDate.isBefore(now)){
            console.log('see the answers');
            $interval.cancel(check);
            $scope.showanswer = true;
        }else{
            console.log('wait for a while');
            $scope.showanswer = false;
        }
    }, 1000, 6000);
    
});
//NEXT LEVEL STARTUPS DIRECTIVES
myapp.directive('nlsMenuHeader', function() {
    return {
      templateUrl: 'views/nls/nls.menu-header.html'
    };
});

myapp.directive('nlsResultModal', function() {
    return {
      templateUrl: 'views/nls/nls.result.html'          
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("/nlsdash", {
        url: "/nlsdash",
        templateUrl : "views/nls/nls.dash.html",
	  	controller: "nls.dash.controller"
      })
      .state("/nlsgame", {
        url: "/nlsgame",
        templateUrl : "views/nls/nls.game.html",
        controller: "nls.dash.controller"
      })
      .state("/nlslogin", {
        url: "/nlslogin",
        templateUrl : "views/nls/nls.login.html",
        controller: "nls.login.controller"
      })
      .state("/nlscontest", {
        url: "/nlscontest",
        templateUrl : "views/nls/nls.contest.html",
        controller: "nls.contest.controller"
      })
      .state("/nlsanswer", {
        url: "/nlsanswer",
        templateUrl : "views/nls/nls.answer.html",
        controller: "nls.answer.controller"
      })
      .state("/nlsleaderboard", {
        url: "/nlsleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'nls'},
        cache: false
      })
      .state("/nlsanalytics", {
        url: "/nlsanalytics",
        templateUrl : "views/analytics.html",
        controller: "analytics.controller",
        params: {mode: 'nls'},
        cache: false
      });
});

//nls CONTROLLERS BELOW
myapp.controller('nls.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#5C96CE';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu nls-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.nls_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20686715_141651436334024_7875736373112602624_n.jpg',
            price:'1',
            question:'What\'s Canada\'s most popular food?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'1',
            options: [
                {answer: 'Burger', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21435368_495444827474387_8279421719358210048_n.jpg'},
                {answer: 'Poutine', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/23421740_542027096136543_6088780208448471040_n.jpg'},
                {answer: 'Pizza', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/23507133_156576184953361_289457645876674560_n.jpg'},
                {answer: 'Burrito', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20686715_141651436334024_7875736373112602624_n.jpg'}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/19120414_271228573283019_1335674875607515136_n.jpg',
            price:'150',
            question:'For how long has Canada been an independent country?',
            min:'50',
            max:'300',
            context:'years',
            subcategory:'',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18581342_1331186293603166_2850323134383390720_n.jpg',
            price:'3',
            question:'How do Canadians typically end a phrase? ',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                {answer: 'ok', url:''},
                {answer: 'neh', url:''},
                {answer: 'alrighty', url:''},
                {answer: 'eh', url:''}
            ]
        },
        {
            url:'https://pbs.twimg.com/media/DO8-IBaWsAAG7sJ.jpg',
            price:'1',
            question:'In Manitoba, Canada, you have to leave your car doors unlocked in case of a bear attack',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20902290_732602140257917_9177391336754511872_n.jpg',
            price:'1.42',
            question:'How long is a flight from Toronto to New York?',
            min:'0.42',
            max:'5.42',
            context:'hours',
            subcategory:'',
            p_id:'5'                
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/19985613_292352497904223_2565680700896313344_n.jpg',
            price:'50',
            question:'How many immigration programs does Canada offer to potential immigrants?',
            min:'20',
            max:'100',
            context:'',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18299308_312981482454284_7852578553697665024_n.jpg',
            price:'6',
            question:'How long can Brazilians stay in Canada as a tourist?',
            min:'2',
            max:'12',
            context:'months',
            subcategory:'',
            p_id:'7'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18161024_206946959811816_861075835438759936_n.jpg',
            price:'26',
            question:'How many startup incubators and accelerators are accredited by the startup visa program?',
            min:'5',
            max:'50',
            context:'',
            subcategory:'',
            p_id:'8'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18251596_423583818007092_6429849582967980032_n.jpg',
            price:'1',
            question:'Can you get a visa to develop your own business in Canada?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'9'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21688987_796701347168151_7615492347459010560_n.jpg',
            price:'200',
            question:'How many IT talents do Canadian companies plan to hire by 2019?',
            min:'20',
            max:'500',
            context:'thousand',
            subcategory:'',
            p_id:'10'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21690325_275768359592351_7888265419780259840_n.jpg',
            price:'14',
            question:'How long does it usually take for a Canadian company to bring a Brazilian IT professional to Canada',
            min:'5',
            max:'30',
            context:'days',
            subcategory:'',
            p_id:'11'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/17933857_1093543380751227_8388722233245171712_n.jpg',
            price:'51',
            question:'What percentage of Toronto\'s population isn\'t born in Toronto?',
            min:'5',
            max:'100',
            context:'%',
            subcategory:'',
            p_id:'12'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18095984_659848654219908_4977467299033251840_n.jpg',
            price:'60',
            question:'How much is it to open your own business a sole proprietor in Ontario?',
            min:'10',
            max:'150',
            context:'$',
            subcategory:'',
            p_id:'13'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21576705_1938832166333282_8519165385071656960_n.jpg',
            price:'1',
            question:'You don\'t need a special type of visa to open your business in Ontario?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'14'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18160360_215201732304368_7562590307561242624_n.jpg',
            price:'survey',
            question:'Would you come to Toronto to explore the innovation ecosystem and opportunities for your startup, company or IT career?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'15'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21689961_276224896210936_4024863915220402176_n.jpg',
            price:'survey',
            question:'How much would you invest in a program that takes you to explore candian startups and accelerators?',
            min:'5000',
            max:'10000',
            context:'R$',
            subcategory:'',
            p_id:'16'
        },
        
    ];

    //Salmans book launch event questions
    // $scope.nls_data = [
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20686715_141651436334024_7875736373112602624_n.jpg',
    //         price:'1',
    //         question:`What's the capital of Brazil?`,
    //         min:'0',
    //         max:'3',
    //         context:'',
    //         subcategory:'',
    //         p_id:'1',
    //         options: [
    //             {answer: 'São Paulo', url:''},
    //             {answer: 'Brasília', url:''},
    //             {answer: 'Rio de Janeiro', url:''},
    //             {answer: 'Buenos Aires', url:''}
    //         ]
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/19120414_271228573283019_1335674875607515136_n.jpg',
    //         price:'3',
    //         question:`What's the largest city in the Americas?`,
    //         min:'0',
    //         max:'3',
    //         context:'years',
    //         subcategory:'',
    //         p_id:'2',
    //         options: [
    //             {answer: 'Toronto', url:''},
    //             {answer: 'Mexico City', url:''},
    //             {answer: 'New York', url:''},
    //             {answer: 'São Paulo', url:''}
    //         ]
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18581342_1331186293603166_2850323134383390720_n.jpg',
    //         price:'2',
    //         question:'What language do Brazilians speak?',
    //         min:'0',
    //         max:'3',
    //         context:'',
    //         subcategory:'',
    //         p_id:'3',
    //         options: [
    //             {answer: 'Brazilian', url:''},
    //             {answer: 'Spanish', url:''},
    //             {answer: 'Portuguese', url:''},
    //             {answer: 'Tupi-guarani', url:''}
    //         ]
    //     },
    //     {
    //         url:'https://pbs.twimg.com/media/DO8-IBaWsAAG7sJ.jpg',
    //         price:'2.56',
    //         question:'$1.00 CAD is equal to how many Brazilian Real (R$)?',
    //         min:'0.56',
    //         max:'10.56',
    //         context:'R$',
    //         subcategory:'',
    //         p_id:'4'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20902290_732602140257917_9177391336754511872_n.jpg',
    //         price:'3',
    //         question:'What city is Latin America\'s HQ of 65% of Fortune 500 companies?',
    //         min:'0',
    //         max:'3',
    //         context:'',
    //         subcategory:'',
    //         p_id:'5',
    //         options: [
    //             {answer: 'Buenos Aires', url:''},
    //             {answer: 'Mexico City', url:''},
    //             {answer: 'Santiago', url:''},
    //             {answer: 'São Paulo', url:''}
    //         ]               
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/19985613_292352497904223_2565680700896313344_n.jpg',
    //         price:'1',
    //         question:`What's the leading city for FDI (Foreign Direct Investment) in Latin America?`,
    //         min:'0',
    //         max:'3',
    //         context:'',
    //         subcategory:'',
    //         p_id:'6',
    //         options: [
    //             {answer: 'Buenos Aires', url:''},
    //             {answer: 'São Paulo', url:''},
    //             {answer: 'Fortaleza', url:''},
    //             {answer: 'Monterrey', url:''}
    //         ] 
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18299308_312981482454284_7852578553697665024_n.jpg',
    //         price:'1',
    //         question:'In 2018, Canadians won\'t need a visa to travel to Brazil? ',
    //         min:'0',
    //         max:'1',
    //         context:'',
    //         subcategory:'',
    //         p_id:'7'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18161024_206946959811816_861075835438759936_n.jpg',
    //         price:'170',
    //         question:'How many fintechs are in Brazil?',
    //         min:'5',
    //         max:'500',
    //         context:'',
    //         subcategory:'',
    //         p_id:'8'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18251596_423583818007092_6429849582967980032_n.jpg',
    //         price:'1',
    //         question:'Brazil is home to 50% of Latin America\'s startups',
    //         min:'0',
    //         max:'1',
    //         context:'',
    //         subcategory:'',
    //         p_id:'9'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21688987_796701347168151_7615492347459010560_n.jpg',
    //         price:'survey',
    //         question:'Would you explore Brazilian innovation and tech ecosystem and main touristic points during Canadian winter?',
    //         min:'0',
    //         max:'1',
    //         context:'',
    //         subcategory:'',
    //         p_id:'10'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21689961_276224896210936_4024863915220402176_n.jpg',
    //         price:'3',
    //         question:'Which company can connect your business to the main Brazilian tech players?',
    //         min:'0',
    //         max:'3',
    //         context:'',
    //         subcategory:'',
    //         p_id:'11',
    //         options: [
    //             {answer: 'Hatchery', url:''},
    //             {answer: 'LatAm Startups', url:''},
    //             {answer: 'PanAm Mexico', url:''},
    //             {answer: 'Next level startups', url:''}
    //         ] 
    //     }        
    // ];
    
    
    $scope.data = [];
    angular.copy($scope.nls_data,$scope.data);
    $scope.nls = true;
    $scope.prizeStartDate = moment('2018/4/23','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2018/5/31 23:59','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/12/31 23:59','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true,select:''};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.nls = true;
    mocha.appName = 'mocha_'+'nls';
    mocha.nls_data = $scope.nls_data;
    mocha.prizeEndDate = $scope.prizeEndDate;
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if(mocha.safe($scope.game.options)){
            // if(mocha.safe($scope.game.options[$scope.test.price].url)){
            //     $scope.game.url = $scope.game.options[$scope.test.price].url;
            // }
            $scope.game.context =  ($scope.test.select !== '') ? $scope.game.options[$scope.test.select].answer : null;
            //this is so that the raw answer is the exact answer
            $scope.test.price = $scope.test.select;
            if($scope.test.select !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.select;
            }
            
        }

        if($scope.game.min === '0' && $scope.game.max === '1'){
            $scope.show_radio = true;
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.nlsSubmit = function(){mocha.submitPrediction($scope)};
    $scope.nlsNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        if(mocha.safe($scope.game.options)){
            $scope.test.price = '';
        }
    };
    $scope.resetGame = function(){mocha.resetGame($scope)};
    $scope.inputShow = function(){mocha.inputShow($scope)};
    $scope.menuHide = function(){mocha.menuHide($scope)};
    $scope.isPredict = function(){
        if(mocha.safe($scope.game.question) && ($scope.game.question.includes('price') 
           || $scope.game.question.includes('investment'))){
            return true;
        }
        if(mocha.safe($scope.game.context) && $scope.game.context.includes('$')){
            return true;
        }
    };
    $scope.startNls = function(){
        $state.go('/nlsgame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/nlscontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('nls.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/nlsdash');
        },3000);
    }
    
});

myapp.controller('nls.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.loader = false;
    $scope.mocha = mocha;
    $scope.mocha.contest.signup =true;
    $scope.contestSubmit = function(form){
        if(form.$valid){
            $scope.loader = true;
            $scope.contest = {};
            $scope.contest.timestamp = moment().toISOString();
            $scope.contest.points = $scope.mocha.test.point_earned;
            $scope.contest.playtime = $scope.mocha.test.timePlayed;
            $scope.contest.played_data = JSON.stringify(mocha.played_data);
            //$scope.contest.signup = ($scope.mocha.contest.signup == true)? 1 : 0;
            $scope.contest.signup = 0;
            $http.get('https://styleminions.co/api/nlscontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                localStorage[mocha.appName+'_points'] = $scope.contest.points;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/nlsleaderboard');
                $scope.loader = false;
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});

myapp.controller('nls.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.showanswer = null;
    $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
    var check = $interval(function(){
        let now = moment();
        if(mocha.prizeEndDate.isBefore(now)){
            console.log('see the answers');
            $interval.cancel(check);
            $scope.showanswer = true;
        }else{
            console.log('wait for a while');
            $scope.showanswer = false;
        }
    }, 1000, 6000);
    
});
//nudnik DIRECTIVES
myapp.directive('nudnikMenuHeader', function() {
    return {
      templateUrl: 'views/nudnik/nudnik.menu-header.html'
    };
});

myapp.directive('nudnikResultModal', function() {
    return {
      templateUrl: 'views/nudnik/nudnik.result.html'          
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("/nudnikdash", {
        url: "/nudnikdash",
        templateUrl : "views/nudnik/nudnik.dash.html",
	  	controller: "nudnik.dash.controller"
      })
      .state("/nudnikgame", {
        url: "/nudnikgame",
        templateUrl : "views/nudnik/nudnik.game.html",
        controller: "nudnik.dash.controller"
      })
      .state("/nudniklogin", {
        url: "/nudniklogin",
        templateUrl : "views/nudnik/nudnik.login.html",
        controller: "nudnik.login.controller"
      })
      .state("/nudnikcontest", {
        url: "/nudnikcontest",
        templateUrl : "views/nudnik/nudnik.contest.html",
        controller: "nudnik.contest.controller"
      })
      .state("/nudnikanswer", {
        url: "/nudnikanswer",
        templateUrl : "views/nudnik/nudnik.answer.html",
        controller: "nudnik.answer.controller"
      })
      .state("/nudnikleaderboard", {
        url: "/nudnikleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'nudnik'},
        cache: false
      })
      .state("/nudnikanalytics", {
        url: "/nudnikanalytics",
        templateUrl : "views/analytics.html",
        controller: "analytics.controller",
        params: {mode: 'nudnik'},
        cache: false
      });
});

//nudnik CONTROLLERS BELOW
myapp.controller('nudnik.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#f0595d';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu nudnik-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.nudnik_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/4bcf71f3817127950f4637d7161dcc71/5B3B1548/t51.2885-15/e35/28765565_585431385134477_1793436321126023168_n.jpg',
            price:'10',
            question:'How many bathtubs of water do you save by buying a nudnik product?',
            min:'3',
            max:'20',
            context:'',
            subcategory:'',
            p_id:'1'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/24cd2e35f1f74daaf1b74b964358398a/5B29BD6C/t51.2885-15/e35/22582015_925336977617693_3032400443171930112_n.jpg',
            price:'1',
            question:'Are Nudnik products Unisex??',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/88fba2b9d8672b650af446c0f3b34a1b/5B326AB9/t51.2885-15/e35/18579951_431880163847441_4296984612074160128_n.jpg',
            price:'1',
            question:'Where in Canada are Nudnik products designed and produced?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                
                {answer: 'montreal', url:''},
                {answer: 'toronto', url:''},
                {answer: 'ottawa', url:''},
                {answer: 'vancouver', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/e993cd6e23b645e058690cbc58de18eb/5B3CBC46/t51.2885-15/e35/20837023_1927461270803288_6129871590793412608_n.jpg',
            price:'1',
            question:'Nudnik products are designed using leading child development research data?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://cdn.shopify.com/s/files/1/2098/6327/products/IMG_4486_1050x.progressive.jpg?v=1505701849',
            price:'35',
            question:'Predict the price of this Nudnik product',
            min:'20',
            max:'45',
            context:'',
            subcategory:'',
            p_id:'5'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/ad49082c94c37c3761a2e567896dfe91/5B4AD894/t51.2885-15/e35/21041026_170258393543917_532440764903325696_n.jpg',
            price:'2016',
            question:'Nudnik launched in what year?',
            min:'2003',
            max:'2018',
            context:'',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/f7f7bbb6f3b75303527ff002ff867ff7/5B29A67F/t51.2885-15/e35/20838502_428358670893015_3237864669225943040_n.jpg',
            price:'1',
            question:'Nudnik products are for children between the ages of?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'7',
            options: [
                {answer: '0 - 1', url:''},
                {answer: '0 - 3', url:''},
                {answer: '0 - 4', url:''},
                {answer: '0 - 7', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/d78f2e8680d6577a1f1676e9567408a7/5B38CF8A/t51.2885-15/e35/22580542_667723720318705_1124645754917355520_n.jpg',
            price:'1',
            question:'Does Nundik use zero harmful chemicals in their process',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'8'              
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/e3793b510296d2f1f49737fecde82f36/5B46E023/t51.2885-15/e35/28429757_173013590010392_5741398653638017024_n.jpg',
            price:'3',
            question:'How many times can the Rogers Centre be filled using the textile waste generated annually by Canadians?',
            min:'1',
            max:'9',
            context:'times',
            subcategory:'',
            p_id:'9'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/cdc43fb79762928dfc736cfba2230c47/5B36F82D/t51.2885-15/e35/18878847_1669850423038423_3492685976545787904_n.jpg',
            price:'1',
            question:'The founders of Nudnik aren\'t identical twin sisters?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'10'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/6cf8662e51ab1c2d92860ba1303548c6/5B3C8CD0/t51.2885-15/e35/18949829_1313957618717328_6324137879329046528_n.jpg',
            price:'100',
            question:' What percent of Nudnik\'s clothing is upcycled?',
            min:'85',
            max:'100',
            context:'%',
            subcategory:'',
            p_id:'11'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/f1616142b23a7a69cb78e85468729859/5B3FD9B1/t51.2885-15/e35/26863250_2004244896455821_3703496126918295552_n.jpg',
            price:'1',
            question:'Does Nudnik donate a portion of its revenue to "1% for the planet" initiative?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'12'
        }
            
    ];    
    
    $scope.data = [];
    angular.copy($scope.nudnik_data,$scope.data);
    $scope.nudnik = true;
    $scope.prizeStartDate = moment('2018/02/01','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2018/02/14 18:00','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/12/27 18:00','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true,select:''};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.nudnik = true;
    mocha.appName = 'mocha_'+'nudnik';
    mocha.nudnik_data = $scope.nudnik_data;
    mocha.prizeEndDate = $scope.prizeEndDate;
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if($scope.safe($scope.game.options)){
            // if(mocha.safe($scope.game.options[$scope.test.price].url)){
            //     $scope.game.url = $scope.game.options[$scope.test.price].url;
            // }
            $scope.game.context =  ($scope.test.select !== '') ? $scope.game.options[$scope.test.select].answer : null;
            //this is so that the raw answer is the exact answer
            $scope.test.price = $scope.test.select;
            if($scope.test.select !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.select;
            }
            
        }

        if($scope.game.min === '0' && $scope.game.max === '1'){
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.nudnikSubmit = function(){mocha.submitPrediction($scope)};
    $scope.nudnikNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        if(mocha.safe($scope.game.options)){
            $scope.test.price = '';
        }
    };
    $scope.resetGame = function(){mocha.resetGame($scope)};
    $scope.inputShow = function(){mocha.inputShow($scope)};
    $scope.menuHide = function(){mocha.menuHide($scope)};
    $scope.isPredict = function(){
        if(mocha.safe($scope.game.question) && ($scope.game.question.includes('price') 
           || $scope.game.question.includes('investment'))){
            return true;
        }
        if(mocha.safe($scope.game.context) && $scope.game.context.includes('$')){
            return true;
        }
    };
    $scope.startNudnik = function(){
        $state.go('/nudnikgame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/nudnikcontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('nudnik.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/nudnikdash');
        },3000);
    }
    
});

myapp.controller('nudnik.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.loader = false;
    $scope.mocha = mocha;
    $scope.mocha.contest.signup =true;
    $scope.contestSubmit = function(form){
        if(form.$valid){
            $scope.loader = true;
            $scope.contest = {};
            $scope.contest.timestamp = moment().toISOString();
            $scope.contest.points = $scope.mocha.test.point_earned;
            $scope.contest.playtime = $scope.mocha.test.timePlayed;
            $scope.contest.played_data = JSON.stringify(mocha.played_data);
            //$scope.contest.signup = ($scope.mocha.contest.signup == true)? 1 : 0;
            $scope.contest.signup = 0;
            $http.get('https://styleminions.co/api/nudnikcontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                localStorage[mocha.appName+'_points'] = $scope.contest.points;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/nudnikleaderboard');
                $scope.loader = false;
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});

myapp.controller('nudnik.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.showanswer = null;
    $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
    var check = $interval(function(){
        let now = moment();
        if(mocha.prizeEndDate.isBefore(now)){
            console.log('see the answers');
            $interval.cancel(check);
            $scope.showanswer = true;
        }else{
            console.log('wait for a while');
            $scope.showanswer = false;
        }
    }, 1000, 6000);
    
});

//odessu DIRECTIVES
myapp.directive('odessuMenuHeader', function() {
    return {
      templateUrl: 'views/odessu/odessu.menu-header.html'
    };
});

myapp.directive('odessuResultModal', function() {
    return {
      templateUrl: 'views/odessu/odessu.result.html'          
    };
});

//ROUTES
myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("/odessudash", {
        url: "/odessudash",
        templateUrl : "views/odessu/odessu.dash.html",
	  	controller: "odessu.dash.controller"
      })
      .state("/odessugame", {
        url: "/odessugame",
        templateUrl : "views/odessu/odessu.game.html",
        controller: "odessu.dash.controller"
      })
      .state("/odessulogin", {
        url: "/odessulogin",
        templateUrl : "views/odessu/odessu.login.html",
        controller: "odessu.login.controller"
      })
      .state("/odessucontest", {
        url: "/odessucontest",
        templateUrl : "views/odessu/odessu.contest.html",
        controller: "odessu.contest.controller"
      })
      .state("/odessuanswer", {
        url: "/odessuanswer",
        templateUrl : "views/odessu/odessu.answer.html",
        controller: "odessu.answer.controller"
      })
      .state("/odessuleaderboard", {
        url: "/odessuleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'odessu'},
        cache: false
      })
      .state("/odessuanalytics", {
        url: "/odessuanalytics",
        templateUrl : "views/analytics.html",
        controller: "analytics.controller",
        params: {mode: 'odessu'},
        cache: false
      });
});

//odessu CONTROLLERS BELOW
myapp.controller('odessu.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#0071bc';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu odessu-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }

    // If you get above 81% receive 100$ in credit from odessu.com 
    // if you get 71 - 80% receive 80$ in credit from odessu
    // if you get 60-70% receive 65$ in credit from odessu
    // if you get between 40 - 60 receive 50$ in credit from odessu 
    
    $scope.odessu_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/e22164a021640ede1b74ec76a601b241/5B304C6D/t51.2885-15/e35/28430827_353292461837496_1363788619130601472_n.jpg',
            price:'1',
            question:'What\'s the average number of different stores women shop from?',
            min:'0',
            max:'2',
            context:'',
            subcategory:'',
            p_id:'1',
            options: [
                {answer: '1-2', url:''},
                {answer: '3-5', url:''},
                {answer: '6-10', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/e2b2d2b86842ef1265706bc03d9b3a2b/5B299DEB/t51.2885-15/e35/28429816_232595620641367_4349753220222943232_n.jpg',
            price:'1',
            question:'What is the number one reason women don\'t try new stores?',
            min:'0',
            max:'2',
            context:'',
            subcategory:'',
            p_id:'2',
            options: [
                {answer: 'prizes', url:''},
                {answer: 'size and fit', url:''},
                {answer: 'style', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/dc7c728cd284a9bf32c0c8cd686d2d9f/5B2E161F/t51.2885-15/e35/28156303_392769877854516_4025069244721922048_n.jpg',
            price:'2',
            question:'How many women in MILLIONS had a hard time finding clothes off the rack in Canada?',
            min:'0',
            max:'2',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                {answer: '6 million', url:''},
                {answer: '7.5 million', url:''},
                {answer: '10 million', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/f97da158c3db4faea0f0449fb8081bfa/5B3477C6/t51.2885-15/e35/28427663_552642121801422_8370153199838953472_n.jpg',
            price:'50',
            question:'How many women in Canada feel like they are a special size?',
            min:'20',
            max:'90',
            context:'%',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/75b5bdadbc6c5edfd623beaa5ffd250e/5B3C8B81/t51.2885-15/e35/28153636_893206687527398_4785596176319643648_n.jpg',
            price:'63',
            question:'How many women from that group have difficulty finding styles for their body shapes?',
            min:'35',
            max:'87',
            context:'%',
            subcategory:'',
            p_id:'5',
           
        },
        {
            url:'https://drive.google.com/uc?id=0B3udcDa1xiXoOVJKUkFVU2oteFc2eUJxekJERmJ2U2lmUkZr',
            price:'3',
            question:'which of the following is an inverted triangle?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'6',
            picOption: [
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoOVJKUkFVU2oteFc2eUJxekJERmJ2U2lmUkZr'},
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoNTlkWkZWM0RPZGw5OTAySnZDMzk4UHJ4Q05F'},
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoN1pSZTRYSWtvaURNSWczMnJzVmhSNXNjcGMw'},
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXod2U1OHM3OE05S1NKdnhjSDhma1FCRkdFTHpV'},                
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoRnpmV29GRm5WRmZ5TE42Y2dLTFZkRlR3TjdZ'}
            ]
        },
        {
            url:'https://drive.google.com/uc?id=0B3udcDa1xiXoWHpwTHJOXzl4WVhaOFFGTGQwR19qMk53bkVZ',
            price:'1',
            question:'Which silhouette has a bust bigger than hips',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'7',
            picOption: [
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoWHpwTHJOXzl4WVhaOFFGTGQwR19qMk53bkVZ'},
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoVi1NSjAxWmd4X1loMjR1eGhpZkJ0cFpBaUtZ'},
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXoNXBJNkJSby1EZExHZ2c3dTlkamRjd1JKdUlr'}
            ]
        },
        {
            url:'https://drive.google.com/uc?id=0B3udcDa1xiXob29pYlNpdGxZMkcwa3NLZmFoajFoYXFJMmQw',
            price:'2',
            question:'which picture shows shoulders that are smaller than hips?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'8',
            picOption: [
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXob29pYlNpdGxZMkcwa3NLZmFoajFoYXFJMmQw'},
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXocWRhWW9VTkxqSXFaWlNncUNWVHBNM1FwRnRn'},
                { url:'https://drive.google.com/uc?id=0B3udcDa1xiXobkVzWGo4bm1Mckd6aUVmbUE1WGdtYXFnRFhV'}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/df3e58da26893521808a547c3b7cc2e9/5B42674C/t51.2885-15/e35/28152320_536301183403282_8827340726057566208_n.jpg',
            price:'3',
            question:'How many fees do international buyers have to pay for?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'9',
            options: [
                {answer: 'shipping', url:''},
                {answer: 'duties', url:''},
                {answer: 'taxes on imports', url:''},
                {answer: 'all the above', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/8d05bac861bb91063d3e95914f11c3ae/5B341866/t51.2885-15/e35/27891166_1706371616108252_5970632521493250048_n.jpg',
            price:'28',
            question:'What is the purchasing power of plus size women? ',
            min:'12',
            max:'40',
            context:'%',
            subcategory:'',
            p_id:'10',               
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/183afd52d6797db28ee46f000e002fcf/5B28DB5C/t51.2885-15/e35/26863412_1915341968779277_8695320518074564608_n.jpg',
            price:'27',
            question:'What is the percentage of women that are a size 14+ in Canada?',
            min:'10',
            max:'60',
            context:'%',
            subcategory:'',
            p_id:'11'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/18340eee4aab7ec99c26f6b90834a5b6/5B3137D4/t51.2885-15/e35/27580000_148188809200450_6273159181621002240_n.jpg',
            price:'34',
            question:'What percentage of purchase increase was there for 13-17yr olds in plus size market?',
            min:'8',
            max:'40',
            context:'%',
            subcategory:'',
            p_id:'12'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/c510214694ba9b558d3b6e093db0dd14/5B35CC6C/t51.2885-15/e35/26864896_2049045895364938_4843974492793339904_n.jpg',
            price:'2',
            question:'What\'s the increase of online shopping for plus size women in Canada?',
            min:'0',
            max:'2',
            context:'',
            subcategory:'',
            p_id:'13',
            options: [
                {answer: '10%', url:''},
                {answer: '2%', url:''},
                {answer: '31%', url:''}
            ]
        }        
    ];    
    
    $scope.data = [];
    angular.copy($scope.odessu_data,$scope.data);
    $scope.odessu = true;
    $scope.prizeStartDate = moment('2018/02/01','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2018/04/03 23:59','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/12/27 18:00','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true,select:''};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.odessu = true;
    mocha.appName = 'mocha_'+'odessu';
    mocha.odessu_data = $scope.odessu_data;
    mocha.prizeStartDate = $scope.prizeStartDate;
    mocha.prizeEndDate = $scope.prizeEndDate;
    mocha.webTraffic(); //very key that start date and end date is added to the mocha service object before calling the func
    
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if(mocha.safe($scope.game.options)){
            // if(mocha.safe($scope.game.options[$scope.test.price].url)){
            //     $scope.game.url = $scope.game.options[$scope.test.price].url;
            // }
            $scope.game.context =  ($scope.test.select !== '') ? $scope.game.options[$scope.test.select].answer : null;
            //this is so that the raw answer is the exact answer
            $scope.test.price = $scope.test.select;
            if($scope.test.select !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.select;
            }
            
        }

        if($scope.game.min === '0' && $scope.game.max === '1'){
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.odessuSubmit = function(){mocha.submitPrediction($scope)};
    $scope.odessuNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        if(mocha.safe($scope.game.options)){
            $scope.test.price = '';
        }
        if(mocha.safe($scope.game.picOption)){
            mocha.log('pic options here')
            mocha.imageLoop($scope.game.picOption);
        }
    };
    $scope.resetGame = function(){mocha.resetGame($scope)};
    $scope.inputShow = function(){mocha.inputShow($scope)};
    $scope.menuHide = function(){mocha.menuHide($scope)};
    $scope.isPredict = function(){
        if(mocha.safe($scope.game.question) && ($scope.game.question.includes('price') 
           || $scope.game.question.includes('investment'))){
            return true;
        }
        if(mocha.safe($scope.game.context) && $scope.game.context.includes('$')){
            return true;
        }
    };
    $scope.startOdessu = function(){
        $state.go('/odessugame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/odessucontest');
    };
    $scope.radioFunc = function(){
        $scope.game.subcategory = '';
        $scope.test.price = $scope.test.price_radio;
        $scope.game.url = $scope.game.picOption[$scope.test.price].url;
        $scope.hide_question = true;
        $timeout(function(){
            $scope.game.subcategory = mocha.letterOption[$scope.test.price_radio];
            $scope.hide_question = false;
        }, 1000);
        //$scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('odessu.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/odessudash');
        },3000);
    }
    
});

myapp.controller('odessu.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.loader = false;
    $scope.mocha = mocha;
    $scope.mocha.contest.signup =true;
    $scope.contestSubmit = function(form){
        if(form.$valid){
            $scope.loader = true;
            $scope.contest = {};
            $scope.contest.timestamp = moment().toISOString();
            $scope.contest.points = $scope.mocha.test.point_earned;
            $scope.contest.playtime = $scope.mocha.test.timePlayed;
            $scope.contest.played_data = JSON.stringify(mocha.played_data);
            $scope.contest.prize = mocha.odessuPrize($scope.contest.points);
            //$scope.contest.signup = ($scope.mocha.contest.signup == true)? 1 : 0;
            $scope.contest.signup = 0;
            $http.get('https://styleminions.co/api/odessucontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&website="+$scope.contest.website
            +"&prize="+$scope.contest.prize)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                localStorage[mocha.appName+'_points'] = $scope.contest.points;
                localStorage[mocha.appName+'_prize'] = $scope.contest.prize;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/odessuleaderboard');
                $scope.loader = false;
            });
        }else{
            mocha.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});

myapp.controller('odessu.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.showanswer = null;
    $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
    var check = $interval(function(){
        let now = moment();
        if(mocha.prizeEndDate.isBefore(now)){
            mocha.log('see the answers');
            $interval.cancel(check);
            $scope.showanswer = true;
        }else{
            mocha.log('wait for a while');
            $scope.showanswer = false;
        }
    }, 1000, 6000);
    
});

//NEXT LEVEL STARTUPS DIRECTIVES
myapp.directive('ryersonMenuHeader', function() {
    return {
      templateUrl: 'views/ryerson/ryerson.menu-header.html'
    };
});

myapp.directive('ryersonResultModal', function() {
    return {
      templateUrl: 'views/ryerson/ryerson.result.html'          
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("/ryersondash", {
        url: "/ryersondash",
        templateUrl : "views/ryerson/ryerson.dash.html",
	  	controller: "ryerson.dash.controller"
      })
      .state("/ryersongame", {
        url: "/ryersongame",
        templateUrl : "views/ryerson/ryerson.game.html",
        controller: "ryerson.dash.controller"
      })
      .state("/ryersonlogin", {
        url: "/ryersonlogin",
        templateUrl : "views/ryerson/ryerson.login.html",
        controller: "ryerson.login.controller"
      })
      .state("/ryersoncontest", {
        url: "/ryersoncontest",
        templateUrl : "views/ryerson/ryerson.contest.html",
        controller: "ryerson.contest.controller"
      })
      .state("/ryersonanswer", {
        url: "/ryersonanswer",
        templateUrl : "views/ryerson/ryerson.answer.html",
        controller: "ryerson.answer.controller"
      })
      .state("/ryersonleaderboard", {
        url: "/ryersonleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'ryerson'},
        cache: false
      })
      .state("/ryersonanalytics", {
        url: "/ryersonanalytics",
        templateUrl : "views/analytics.html",
        controller: "analytics.controller",
        params: {mode: 'ryerson'},
        cache: false
      });
});

//ryerson CONTROLLERS BELOW
myapp.controller('ryerson.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#5C96CE';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu ryerson-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.ryerson_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/12822270_1541244052842361_65257355_n.jpg',
            price:'55',
            question:'What\'s the avergae salary after graduation?',
            min:'35',
            max:'70',
            context:'k',
            subcategory:'',
            p_id:'1'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/12940784_1013620305388825_269538246_n.jpg',
            price:'1',
            question:'When asked about your salary expectation do you respond with the market rate over what you feel it should be?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/25012157_366738660454458_8212933559736860672_n.jpg',
            price:'670',
            question:'What number of university students graduate every year in Ontario? ',
            min:'100',
            max:'900',
            context:'thousand',
            subcategory:'',
            p_id:'3'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/16123211_1619190575056833_7988695421746675712_n.jpg',
            price:'survey',
            question:'Do you have any internship experience?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/23594273_182979802253733_1829206827401740288_n.jpg',
            price:'survey',
            question:'Will having a Masters degree give you a competitve edge over work experience?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'5'                
        }
        
    ];
    
    $scope.data = [];
    angular.copy($scope.ryerson_data,$scope.data);
    $scope.ryerson = true;
    $scope.prizeStartDate = moment('2017/12/23','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/12/31 23:59','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/12/31 23:59','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true,select:''};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.ryerson = true;
    mocha.appName = 'mocha_'+'ryerson';
    mocha.ryerson_data = $scope.ryerson_data;
    mocha.prizeEndDate = $scope.prizeEndDate;
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if(mocha.safe($scope.game.options)){
            // if(mocha.safe($scope.game.options[$scope.test.price].url)){
            //     $scope.game.url = $scope.game.options[$scope.test.price].url;
            // }
            $scope.game.context =  ($scope.test.select !== '') ? $scope.game.options[$scope.test.select].answer : null;
            //this is so that the raw answer is the exact answer
            $scope.test.price = $scope.test.select;
            if($scope.test.select !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.select;
            }
            
        }

        if($scope.game.min === '0' & $scope.game.max === '1'){
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.ryersonSubmit = function(){mocha.submitPrediction($scope)};
    $scope.ryersonNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        if(mocha.safe($scope.game.options)){
            $scope.test.price = '';
        }
    };
    $scope.resetGame = function(){mocha.resetGame($scope)};
    $scope.inputShow = function(){mocha.inputShow($scope)};
    $scope.menuHide = function(){mocha.menuHide($scope)};
    $scope.isPredict = function(){
        if(mocha.safe($scope.game.question) && ($scope.game.question.includes('price') 
           || $scope.game.question.includes('investment'))){
            return true;
        }
        if(mocha.safe($scope.game.context) && $scope.game.context.includes('$')){
            return true;
        }
    };
    $scope.startRyerson = function(){
        $state.go('/ryersongame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/ryersoncontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('ryerson.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/ryersondash');
        },3000);
    }
    
});

myapp.controller('ryerson.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.loader = false;
    $scope.mocha = mocha;
    $scope.mocha.contest.signup =true;
    $scope.contestSubmit = function(form){
        if(form.$valid){
            $scope.loader = true;
            $scope.contest = {};
            $scope.contest.timestamp = moment().toISOString();
            $scope.contest.points = $scope.mocha.test.point_earned;
            $scope.contest.playtime = $scope.mocha.test.timePlayed;
            $scope.contest.played_data = JSON.stringify(mocha.played_data);
            //$scope.contest.signup = ($scope.mocha.contest.signup == true)? 1 : 0;
            $scope.contest.signup = 0;
            $http.get('https://styleminions.co/api/inlightencontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                localStorage[mocha.appName+'_points'] = $scope.contest.points;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/ryersonleaderboard');
                $scope.loader = false;
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});

myapp.controller('ryerson.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.showanswer = null;
    $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
    var check = $interval(function(){
        let now = moment();
        if(mocha.prizeEndDate.isBefore(now)){
            console.log('see the answers');
            $interval.cancel(check);
            $scope.showanswer = true;
        }else{
            console.log('wait for a while');
            $scope.showanswer = false;
        }
    }, 1000, 6000);
    
});
//SEW science every where DIRECTIVES
myapp.directive('sewMenuHeader', function() {
    return {
      templateUrl: 'views/sew/sew.menu-header.html'
    };
});

myapp.directive('sewResultModal', function() {
    return {
      templateUrl: 'views/sew/sew.result.html'          
    };
});

myapp.directive('pdxLoader', function() {
    return {
        templateUrl: 'views/sew/sew.loader.html'
        
    };
});
myapp.directive('sewAnalytics', function() {
    return {
        templateUrl: 'views/sew/sew.analytics.html'
        
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("/sewgame", {
        url: "/sewgame",
        templateUrl : "views/sew/sew.game.html",
        controller: "sew.dash.controller",
        cache: false
      })
      .state("/sewlogin", {
        url: "/sewlogin",
        templateUrl : "views/sew/sew.login.html",
        controller: "sew.login.controller",
        cache: false
      })
      .state("/sewcontrol", {
        url: "/sewcontrol",
        templateUrl : "views/sew/sew.control.html",
        controller: "sew.control.controller",
        cache: false
      });
});

//sew CONTROLLERS BELOW
myapp.controller('sew.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#ff0000';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu sew-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.sew_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/112902388a70330909948c7b3fc394be/5B51E6D4/t51.2885-15/e35/26157494_1158900284244745_486437155447504896_n.jpg',
            price:'10',
            question:'How many bathtubs of water do you save not taking a shower for 12 weeks?',
            min:'3',
            max:'20',
            context:'',
            subcategory:'',
            p_id:'1'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/62386d52d2fbedccc23491b814de4756/5B6EF816/t51.2885-15/e35/26869673_173512470086835_7366131786113351680_n.jpg',
            price:'1',
            question:'Will AI replace humans completely in the workforce',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/98e23d628a1819234b38fd74d3910ebb/5B511071/t51.2885-15/e35/27880352_863303720535601_7696369824342999040_n.jpg',
            price:'1',
            question:'Where in canada are dinousar remains mostly found?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                
                {answer: 'montreal', url:''},
                {answer: 'toronto', url:''},
                {answer: 'ottawa', url:''},
                {answer: 'vancouver', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/088608f2bf57dd86a375e1946906bb35/5B5D0CE6/t51.2885-15/e35/28154665_1504332979680515_5085929284980178944_n.jpg',
            price:'1',
            question:'Will your heart explode if you dive 2000ft below see level?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/544cda0e685cf02619018b46824e6025/5B5F0A09/t51.2885-15/e35/28763711_1944985042498099_1337264846730690560_n.jpg',
            price:'35',
            question:'what\'s the age of elon Musk',
            min:'20',
            max:'45',
            context:'',
            subcategory:'',
            p_id:'5'
        }            
    ];    
    
    $scope.data = [];
    $scope.metrics = [];
    $scope.socketLoader = true;
    $scope.isConnected = false
    angular.copy($scope.sew_data,$scope.data);
    $scope.sew = true;
    $scope.gameType = 'pdx';
    $scope.prizeStartDate = moment('2018/02/01','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2018/02/14 18:00','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/12/27 18:00','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true,select:''};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    $scope.showMetrics = false;
    $scope.mocha.comment = '';
    $scope.commentDisplay = false;
    mocha.sew = true;
    mocha.appName = 'mocha_'+'sew';
    if(mocha.isAppNameSet(['io','tones'])){
        mocha.sew_data = $scope.sew_data;
        mocha.prizeEndDate = $scope.prizeEndDate;
        $scope.socket = mocha.webSocket();
        //mocha.livesocket = $scope.socket;
        $scope.socket.on('connect', function(data) {
            $scope.isConnected = true;
            $scope.socket.emit('join',{appName:mocha.appName});
            //console.log(data, 'connected my nigga');
        });
        //$scope.socket.emit('join','we in this bitch son');
        $scope.socket.on('question', function(data){
            mocha.log(data)
            if(data.appName === mocha.appName){
                if('task' in data && data.task === 'question'){
                    //$scope.game = $scope.data[data.p_id];
                    $scope.index = data.p_id - 1;
                    $scope.sewNextProduct();
                    $scope.socketLoader = false;
                    $scope.showMetrics = false;
                    mocha.tones('f',5,500);
                    
                }
                if('task' in data && data.task === 'comment'){
                    $scope.commentDisplay = data.comment;
                    mocha.tones('f',5,500);
                }
                $scope.$apply();                
            }
        });
        $scope.socket.on('sendMetrics',function(data){
            mocha.log(data,'metric data');
            if(data.appName === mocha.appName){
                $scope.metrics = data;
                $scope.showMetrics = true;
                $scope.$apply();
            }
        });
    }else{
        $state.go('/sewlogin');
    }
    
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if($scope.safe($scope.game.options)){
            // if(mocha.safe($scope.game.options[$scope.test.price].url)){
            //     $scope.game.url = $scope.game.options[$scope.test.price].url;
            // }
            $scope.game.context =  ($scope.test.select !== '') ? $scope.game.options[$scope.test.select].answer : null;
            //this is so that the raw answer is the exact answer
            $scope.test.price = $scope.test.select;
            if($scope.test.select !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.select;
            }
            
        }

        if($scope.game.min === '0' && $scope.game.max === '1'){
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.sewSubmit = function(){
        $scope.socketLoader = true;
        mocha.submitPdx($scope);
    };
    $scope.sewNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        if(mocha.safe($scope.game.options)){
            $scope.test.price = '';
        }
    };
    $scope.resetGame = function(){mocha.resetGame($scope)};
    $scope.inputShow = function(){mocha.inputShow($scope)};
    $scope.menuHide = function(){mocha.menuHide($scope)};
    $scope.isPredict = function(){
        if(mocha.safe($scope.game.question) && ($scope.game.question.includes('price') 
           || $scope.game.question.includes('investment'))){
            return true;
        }
        if(mocha.safe($scope.game.context) && $scope.game.context.includes('$')){
            return true;
        }
    };
    $scope.startSew = function(){
        $state.go('/sewgame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/sewcontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    $scope.goToControl = function(){
        delete $scope.socket;
        $state.go('/sewcontrol')
    }
    $scope.sendComment = function(){
        mocha.log($scope.mocha.comment)
        if($scope.mocha.comment !== ''){
            let post = {post:$scope.mocha.comment};
            $scope.socket.emit('audience',{appName:mocha.appName,task:'comment',comment:post});
            $scope.mocha.comment = '';
        }
        
    }
    
});

myapp.controller('sew.login.controller', function($scope,$ionicHistory,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    mocha.addScripts(['lib/socket.io.js','lib/tone.js'])
    .catch((err)=>{throw new Error(err)})
    .then((data)=>{
        //console.log('yay',data);
        if($scope.screen_big !== true){
            //This mimics a real life game loading thing. this can definitely be optimized later.
            $timeout(function(){
                $state.go('/sewgame');
            },3000);
        }
    })
    
    
});

myapp.controller('sew.control.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    if(mocha.isAppNameSet(['io','tones'])){
        $scope.mocha = mocha;
        $scope.showanswer = true;
        $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
        $scope.controlSocket = mocha.webSocket();
        $scope.validate = true;
        $scope.message = false;
        $scope.toggle = false;
        $scope.toggleCounter = 1;
        $scope.commentData = [];
        $scope.comment = 1;
        $scope.pushQuestion = function(index){
            if($scope.comment % 2 === 0){
                //close comments when new questions are served
                $scope.allowComments();  
            }
            $scope.controlSocket.emit('remoteControl',{appName:mocha.appName,p_id:index,task:'question'});
            //$scope.mocha.sew_data[index].disable = true;
        };
        $scope.controlSocket.on('answer',function(data){
            if(data.appName === mocha.appName){
                if('task' in data && data.task === 'question'){
                    var realIndex = data.p_id;
                    var num = Number(data.raw_answer);
                    if(!('raw_answer' in $scope.mocha.sew_data[realIndex])){
                        $scope.mocha.sew_data[realIndex].raw_answer = [];
                        $scope.mocha.sew_data[realIndex].raw_answer.push(num);
                    }else{
                        $scope.mocha.sew_data[realIndex].raw_answer.push(num);
                    }
                    $scope.metricAnalysis(realIndex);
                }
                if('task' in data && data.task === 'comment'){
                    $scope.commentData.push(data.comment);
                    mocha.tones('f',5,500);
                }
                
                $scope.$apply();
            }
            
        });
    }else{
        $state.go('/sewlogin');  
    }
    
    $scope.showResult = function(index){
        mocha.log($scope.mocha.sew_data[index]);
    }
    $scope.authorize = function(){mocha.authorize($scope);}
    $scope.metricAnalysis = function(index){
        var question = $scope.mocha.sew_data[index];
        var total = question.raw_answer.length;
        if('options' in question){
            //this is for question with options
            let obj = question.options.keys();
            question.metrics = [];
            for(let i of obj){
                let container = {};
                container.name = question.options[i].answer;
                container.val = Math.round((question.raw_answer.filter(word=>word === i).length/total)*100);
                question.metrics.push(container);
            }
            
        }
        if(!('options' in question) && question.min==='0' && question.max==='1'){
            //question with yes or no
            let obj = {};
            obj.yes = Math.round((question.raw_answer.filter(word=>word === 1).length/total)*100);
            obj.no = Math.round((question.raw_answer.filter(word=>word === 0).length/total)*100);
            question.metrics = [{name:'yes',val:obj.yes},{name:'no',val:obj.no}];
        }
        if(!('options' in question) && question.min >='0' && question.max !=='1'){
            //question with predictions (numbers only)
            let low = Number(question.min);
            let high = Number(question.max);
            let quarter = Math.round((low + high)/5);
            let qlow = low + quarter;
            let qmid = qlow + quarter;
            let qhigh = qmid + quarter;
            let a_low = Math.round((question.raw_answer.filter(word=> low<=word && word<qlow).length/total)*100);
            let a_qlow = Math.round((question.raw_answer.filter(word=> qlow<=word && word<qmid).length/total)*100);
            let a_qmid = Math.round((question.raw_answer.filter(word=> qmid<=word && word<qhigh).length/total)*100);
            let a_high = Math.round((question.raw_answer.filter(word=> qhigh<=word && word<=high).length/total)*100);
            question.metrics = [
                {name:`${low} - ${qlow - 1}`,val:a_low},
                {name:`${qlow} - ${qmid - 1}`,val:a_qlow},
                {name:`${qmid} - ${qhigh - 1}`,val:a_qmid},
                {name:`${qhigh} - ${high}`,val:a_high}            
            ];
        }
        $scope.controlSocket.emit('analytics',{appName:mocha.appName,p_id:index,metrics:question.metrics});
        mocha.log(question);
        return question.metrics;
    };
    $scope.toggleFab = function(){
        $scope.toggleCounter++;
        if($scope.toggleCounter % 2 === 0){
            $scope.toggle = true;
        }else{
            $scope.toggle = false;
        }
    };
    $scope.allowComments = function(){
        $scope.comment++;
        if($scope.comment % 2 === 0){
            $scope.controlSocket.emit('remoteControl',{appName:mocha.appName,task:'comment',comment:true})
        }else{
            $scope.controlSocket.emit('remoteControl',{appName:mocha.appName,task:'comment',comment:false})
        }
    }
    
});


//WULLY DIRECTIVES
myapp.directive('wullyMenuHeader', function() {
    return {
      templateUrl: 'views/wully/wully.menu-header.html'
    };
});

myapp.directive('wullyResultModal', function() {
    return {
      templateUrl: 'views/wully/wully.result.html'          
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
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
      });
});

//WULLY CONTROLLERS BELOW
myapp.controller('wully.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='rgba(224, 24, 43, 0.91)';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu wully-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.wully_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21909710_115559839139284_2536705386933649408_n.jpg',
            price:'1245',
            question:'How many animals has Wully saved in total since launch?',
            min:'1000',
            max:'1500',
            context:'',
            subcategory:'',
            p_id:'1'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18950047_457101204639111_8252268334817476608_n.jpg',
            price:'729',
            question:'Predict the price of this Jacket.',
            min:'500',
            max:'1000',
            context:'',
            subcategory:'jacket',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/17076453_395943147440848_8888064781869645824_n.jpg',
            price:'13',
            question:'1 Wully Jacket spares the lives of how many animals?',
            min:'0',
            max:'30',
            context:'',
            subcategory:'',
            p_id:'3'
        },
        {
            url:'https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/16583180_163288994176752_6167586102346514432_n.jpg',
            price:'649',
            question:'Predict the price of this Jacket.',
            min:'500',
            max:'1000',
            context:'',
            subcategory:'jacket',
            p_id:'4'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18095282_224668581353323_7557851820467421184_n.jpg',
            price:'1',
            question:'Wully Jackets are made in California? <p>1 - No</p> <p>0 - Yes</p>',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'5'                
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18382007_1384574631589888_4089628285422534656_n.jpg',
            price:'-20',
            question:'What\'s the coldest temperature to wear this jacket?',
            min:'-100',
            max:'-1',
            context:'degrees',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18011469_1775695206076417_9048892774320963584_n.jpg',
            price:'6',
            question:'1 Wully jacket takes how many weeks to produce?',
            min:'1',
            max:'20',
            context:'Weeks',
            subcategory:'',
            p_id:'7',
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/15101788_599006020224290_2198237972321533952_n.jpg',
            price:'2012',
            question:'Wully Outerwear launched in what year?',
            min:'2010',
            max:'2017',
            context:'',
            subcategory:'',
            p_id:'8'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/12818980_519161731596821_1859894505_n.jpg',
            price:'1253',
            question:'1 Wully Jacket saves how many liters of water?',
            min:'800',
            max:'1300',
            context:'Litres',
            subcategory:'',
            p_id:'9',
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21372233_306885123111795_3977466434258206720_n.jpg',
            price:'1',
            question:'Wully jackets come in sizes extra-small to extra-large? <p>1 - Yes</p> <p>0 - No</p>',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'10',
        },
        
    ];
    
    
    $scope.data = [];
    angular.copy($scope.wully_data,$scope.data);
    $scope.wully = true;
    $scope.prizeStartDate = moment('2017/11/15','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/11/20','YYYY/MM/DD');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true,select:''};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.wully = true;
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if(mocha.safe($scope.game.options)){
            // if(mocha.safe($scope.game.options[$scope.test.price].url)){
            //     $scope.game.url = $scope.game.options[$scope.test.price].url;
            // }
            $scope.game.context =  ($scope.test.select !== '') ? $scope.game.options[$scope.test.select].answer : null;
            //this is so that the raw answer is the exact answer
            $scope.test.price = $scope.test.select;
            if($scope.test.select !==  $scope.game.price){
                //this will make sure that the player gets zero points if they choose the wrong option
                $scope.data[$scope.index].prediction = '100';
            }else{
                $scope.data[$scope.index].prediction = $scope.test.select;
            }
            
        }

        if($scope.game.min === '0' && $scope.game.max === '1'){
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.wullySubmit = function(){mocha.submitPrediction($scope)};
    $scope.wullyNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        if(mocha.safe($scope.game.options)){
            $scope.test.price = '';
        }
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
    $scope.startWully = function(){
        $state.go('/wullygame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/wullycontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('wully.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/wullydash');
        },3000);
    }
    
});

myapp.controller('wully.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
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
                $state.go('/wullyleaderboard');
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});
//andela DIRECTIVES
myapp.directive('andelaMenuHeader', function() {
    return {
      templateUrl: 'views/andela/andela.menu-header.html'
    };
});

myapp.directive('andelaResultModal', function() {
    return {
      templateUrl: 'views/andela/andela.result.html'          
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("/andeladash", {
        url: "/andeladash",
        templateUrl : "views/andela/andela.dash.html",
	  	controller: "andela.dash.controller"
      })
      .state("/andelagame", {
        url: "/andelagame",
        templateUrl : "views/andela/andela.game.html",
        controller: "andela.game.controller"
      })
      .state("/andelalogin", {
        url: "/andelalogin",
        templateUrl : "views/andela/andela.login.html",
        controller: "andela.login.controller"
      })
      .state("/andelacontest", {
        url: "/andelacontest",
        templateUrl : "views/andela/andela.contest.html",
        controller: "andela.contest.controller"
      })
      .state("/andelaanswer", {
        url: "/andelaanswer",
        templateUrl : "views/andela/andela.answer.html",
        controller: "andela.answer.controller"
      })
      .state("/andelaleaderboard", {
        url: "/andelaleaderboard",
        templateUrl : "views/leaderboard.html",
        controller: "leaderboard.controller",
        params: {mode: 'andela'},
        cache: false
      })
      .state("/andelaanalytics", {
        url: "/andelaanalytics",
        templateUrl : "views/analytics.html",
        controller: "analytics.controller",
        params: {mode: 'andela'},
        cache: false
      });
});

//andela CONTROLLERS BELOW
myapp.controller('andela.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#3359df';
    //mocha.addScripts(jsScripts);
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu andela-color';
 
    
    // $scope.data = [];
    // angular.copy($scope.andela_data,$scope.data);
    $scope.andela = true;
    $scope.prizeStartDate = moment('2017/02/01','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/02/14 18:00','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    // $scope.game = $scope.data[$scope.index];
    
    // $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    // mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    // $scope.hide_question = false;
    // $scope.show_radio = false;
    mocha.andela = true;
    mocha.appName = 'mocha_'+'andela';
    // mocha.andela_data = $scope.andela_data;
    mocha.prizeEndDate = $scope.prizeEndDate;
    //console.log($scope.data);

    
    
    
   
    
    $scope.andelaSubmit = function(){mocha.submitPrediction($scope)};
    $scope.andelaNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        $scope.test.price = '';
    };
    $scope.resetGame = function(){mocha.resetGame($scope)};
    $scope.inputShow = function(){mocha.inputShow($scope)};
    $scope.menuHide = function(){mocha.menuHide($scope)};
   
    $scope.startAndela = function(){
        $state.go('/andelagame');
    };
    
    
    
});

myapp.controller('andela.game.controller', function($scope,$location,$compile,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.test = {start_time:null,end_time:null,time_result:null,menuhide:0,hideModal:true};
    $scope.waste = [];
    $scope.correct = [];
    $scope.dw,$scope.dh,$scope.draw;
    $scope.sw,$scope.sh;
    $scope.shuffle = [];
    $scope.basket =[];
    $scope.output = '';
    $scope.prog = 0;
    $scope.picColumn = 2;
    $scope.picRow = 2;
    $scope.puzzLevel = 1;
    $scope.drawCanvas =function(fWidth, fHeight){
        return new Promise(function(resolve,reject){
            canvas = angular.element(document.getElementById('canvas'))[0];
            
            ctx = canvas.getContext('2d');
            //console.log(ctx)
            
            im = new Image()
            im.crossOrigin = 'Anonymous';
            //perfect on mobile for any image dimensions (square, 3:4 ratio and 4:3 ratio)
            //good on desktop for only square and 4:3 ratio image dimensions
            im.srcdefault = 'https://scontent-yyz1-1.cdninstagram.com/vp/6514e74ccbb2ca45e99b59993c71f789/5B59267B/t51.2885-15/e35/24845274_530096207350422_600968630263349248_n.jpg';
            //only use instagram image links in url query
            im.src = location.hash.includes('q=') ? location.hash.split('=')[1].replace(/%2F/gi,'/') : im.srcdefault;
            
            //sw and sh are the wi$scope.dh and height of the image piece to be cut from the raw image
            im.onload = ()=>{
                
                if(im.height > im.width && window.innerWidth > 768){
                    //this turns the image into a square (1:1) dimension only on desktop
                    //to then be used as an image for the puzzle
                    let width = im.width;
                    let height = im.height;
                    canvas.setAttribute('width',width);
                    canvas.setAttribute('height',width);
                    ctx.imageSmoothingQuality = "high";
                    ctx.drawImage(im,0,0,width,width,0,0,width,width);
                    im.src = canvas.toDataURL('image/png', 1); //this triggers the image onload() method

                }else{
                    //this continues the task normally either after square transformation or when the if block requirement isn't met
                    var space = 2;
                    var sw = Math.round((im.width - space * $scope.picColumn)/$scope.picColumn);
                    var sh = Math.round((im.height - space* $scope.picRow)/$scope.picRow);
                    
                    //$scope.dw and $scope.dh are the height and width to be drawn on the canvas based on the aspect ratio of the raw image
                    $scope.dw = Math.round((fWidth - space * $scope.picColumn)/ $scope.picColumn);
                    $scope.dh = Math.round((fHeight - space * $scope.picRow)/$scope.picRow);

                    canvas.setAttribute('width',sw);
                    canvas.setAttribute('height',sh);
                    $scope.sw = sw;
                    $scope.sh = sh;
                    ctx.imageSmoothingQuality = "high";


                    //ctx.$scope.drawImage(im,0,0,sw,sh,0,0,$scope.dw,$scope.dh)
                    //by default i want 30 pieces of any image i.e 5 columns and 6 rows for mobile devices.
                    for(let i = 0; i < $scope.picColumn; i++){
                        for(let j = 0; j < $scope.picRow; j++){
                            //ctx.$scope.drawImage(im,i*(sw + 1),j*(sh + 1),sw,sh,i*($scope.dw + 5),j*($scope.dh + 5),$scope.dw,$scope.dh);
                            ctx.drawImage(im,i*(sw + 1),j*(sh + 1),sw,sh,0,0,sw,sh);
                            drawdata = {};  
                            drawdata.img = canvas.toDataURL('image/png', 1);
                            drawdata.x = i*($scope.dw + space);
                            drawdata.y = j*(Math.round(($scope.sh*$scope.dw)/$scope.sw) + space);
                            $scope.basket.push(drawdata);
                            //ctx.clearRect(0,0,sw,sh);
                        }
                    }
                    
                    //console.log($scope.basket);
                    $scope.shuffle = $scope.basket.map((item)=>{return {x:item.x,y:item.y}})
                    $scope.shuffle = mocha.randomize($scope.shuffle)
                    resolve($scope.shuffle);

                }               
                
            }
            
            im.onerror = ()=>{
                im.src = im.srcdefault;
            }
        });    
        
        
    }
    $scope.setUp = function(w,h){
        $scope.loader = true;
        $scope.picBoxes = $scope.picColumn * $scope.picRow;
        $scope.footnote_hide = false;
        $scope.footnote = true;
        $scope.footnote_msg = $scope.puzzLevel < 2 ? 'Round ' + $scope.puzzLevel : 'Final Round';
        $scope.drawCanvas(w,h)
        .then((data)=>{
            //console.log('yeaaaaaaaaaah', $scope.basket);
            if(!mocha.safe($scope.draw)){
                $scope.svg = angular.element(document.getElementById('svg'))[0];
                $scope.draw = SVG($scope.svg).size(w, h);
            }
            
            //console.log($scope.basket);
            let z = 0;
            $scope.basket.forEach((item)=>{
                //let elem = $scope.draw.image(item.img,$scope.dw,$scope.dh);
                let elem = $scope.draw.image(item.img,$scope.dw,Math.round(($scope.sh*$scope.dw)/$scope.sw));
                elem.x($scope.shuffle[z].x);
                elem.y($scope.shuffle[z].y);
                elem.truth = {x:item.x,y:item.y};
                elem.attr('ng-buzz','yes');
                
                elem.loaded (()=>{
                    //on initialization check if element is in the right position
                    let pos = {x:elem.node.x.baseVal.value,
                                    y:elem.node.y.baseVal.value
                                }
                    if(pos.x === elem.truth.x && pos.y === elem.truth.y){
                        $scope.correct.push(elem.truth.x+':'+elem.truth.y);
                    }
                    $scope.progressFunc();
                    $scope.isLevelCompleted();//sometimes the randomized data can be exactly solved on the first round
                });
                
                z++;
                //elem.mouseout(()=>{elem.animate(100).width(50);});
            });
            $compile($scope.draw.node)($scope); //this is important for the new elements added to the DOM to be compiled by angular
            $scope.loader = false;
            $scope.$apply();
        });
        
    };
    
    $scope.svgSpace = angular.element(document.getElementById('svg'))[0]
    $scope.setUp($scope.svgSpace.clientWidth,$scope.svgSpace.clientHeight);
    
    

    $scope.checker = function(d,e){
			
        if(e.x === d.truth.x && e.y === d.truth.y){
            //Player is right
            if(!$scope.correct.includes(d.truth.x+':'+d.truth.y)){
                $scope.correct.push(d.truth.x+':'+d.truth.y);
                //console.log('right boy')
            }
        }else{
            //player is wrong
            if($scope.correct.includes(d.truth.x+':'+d.truth.y)){
                let pos = $scope.correct.indexOf(d.truth.x+':'+d.truth.y)
                $scope.correct.splice(pos,1);
            }
            //console.log('wrong boy')
        }

        $scope.isLevelCompleted();
        
        
    }

    $scope.isLevelCompleted = function(){
        if($scope.correct.length === $scope.picBoxes){
            //$scope.draw.text('you win').move(50,50);
            $scope.output = 'Completed'
            $scope.test.time_result = mocha.gameTimePlayed($scope).split(':');
            $scope.mocha.tones('f',5,500);
            //$scope.mocha.vibrate(2000);
            $timeout(()=>{
                $scope.levelUp();
            },2000)
            //console.log('THE END FAM')
        }
    };

    $scope.progressFunc = function(){
        $scope.prog = (($scope.correct.length)/$scope.picBoxes)*100;
    };

    $scope.isStarted = function(){
        if($scope.test.start_time === null){
            $scope.test.start_time = moment();
        }
    };

    $scope.levelUp = function(){
        if($scope.puzzLevel < 2){
            $scope.draw.clear();
            $scope.waste = [];
            $scope.correct = [];
            $scope.dw,$scope.dh,$scope.draw;
            $scope.sw,$scope.sh;
            $scope.shuffle = [];
            $scope.basket =[];
            $scope.prog = 0;
            $scope.picColumn = 6;
            $scope.picRow = 6;
            $scope.puzzLevel += 1;
            $scope.setUp($scope.svgSpace.clientWidth,$scope.svgSpace.clientHeight);
        }else{
            // game is finished and time to move on
            $scope.test.hideModal = false;
        }
    };

    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/andelacontest');
    };
    
});

myapp.controller('andela.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = false;
    var jsScripts = [
        'lib/tone.js',
        'https://cdnjs.cloudflare.com/ajax/libs/svg.js/2.6.3/svg.min.js'
    ];
    //if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        mocha.addScripts(jsScripts)
        .catch((err)=>{throw new Error(err)})
        .then((data)=>{
            $timeout(function(){
                $state.go('/andeladash');
            },3000);
        
        })
    //}
    
});

myapp.controller('andela.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.loader = false;
    $scope.mocha = mocha;
    $scope.mocha.contest.signup =true;
    $scope.contestSubmit = function(form){
        if(form.$valid){
            $scope.loader = true;
            $scope.contest = {};
            $scope.contest.timestamp = moment().toISOString();
            $scope.contest.points = -100;
            $scope.contest.playtime = $scope.mocha.test.timePlayed;
            $scope.contest.played_data = JSON.stringify({});
            //$scope.contest.signup = ($scope.mocha.contest.signup == true)? 1 : 0;
            $scope.contest.signup = 0;
            $http.get('https://styleminions.co/api/andelacontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                localStorage[mocha.appName+'_points'] = $scope.contest.points;
                localStorage[mocha.appName+'_playtime'] = $scope.contest.playtime;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/andelaleaderboard');
                $scope.loader = false;
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});