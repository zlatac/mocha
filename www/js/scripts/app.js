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
        this.resumeAudioContext() //By default thanks to the guys at chrome audio context is suspended till user interaction
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
        var isGameEnded = this.prizeEndDate.isBefore(moment());
        //var http = $http.post.bind(this);
        var self = this;
        if((!visitedPreviously && !isGameEnded) || firstTime){
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

     this.resumeAudioContext =  function(){
        //fucking chrome suspends audio context till the user acts on an event in the browser
        if(tones.context.state.includes('suspended')){
            tones.context.resume()
            .then(()=>{console.log('audio context back online')})
        }
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