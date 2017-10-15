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
        templateUrl : "login.html"
      })
      .state("/practice", {
        url: "/game",
        templateUrl : "game.html",
        params: {demo: 'practice'}
      })
      .state("/wully", {
        url: "/game",
        templateUrl : "game.html",
        params: {demo: 'wully'}
      })
      .state("/prize", {
        url: "/game",
        templateUrl : "game.html",
        params: {demo: 'prize'}
      })
      .state("/dash", {
        url: "/dash",
        templateUrl : "dash.html"
      })
      .state("/contest", {
        url: "/contest",
        templateUrl : "contest.html"
      })
      .state("/login", {
        url: "/login",
        templateUrl : "login.html"
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

 myapp.controller('mCtrl', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout){
        
        //$scope.price = 300;
//        $scope.data = [
//            {url:"http://s7d9.scene7.com/is/image/Aritzia/large/s17_04_a08_61865_11902_on_a.jpg",
//            price:'125'
//            },
//            {
//                url:'http://katespade.',
//                price:'448'
//            },
//            {
//                url:'http://media.aldoshoes.com/v2/product/pisana/97/pisana_black_97_main_sq_gy_1600x1600.jpg',
//                price:'60'
//            },
//            {
//                url:'http://media.topshop.com/wcsstore/TopShop/images/catalog/TS24J32LBLE_Large_M_1.jpg',
//                price:'40'
//            },
//            {
//                url:'http://images.urbanoutfitters.com/is/image/UrbanOutfitters/42187435_070_b?$medium$&defaultImage=',
//                price:'65'
//            },
//            {
//                url:'http://images.urbanoutfitters.com/is/image/UrbanOutfitters/42470492_001_b?$medium$&defaultImage=',
//                price:'39'
//            },
//            {
//                url:'http://media.topshop.com/wcsstore/TopShop/images/catalog/TS32M24LNUD_Large_F_1.jpg',
//                price:'65'
//            },
//            {
//                url:'http://img1.fpassets.com/is/image/FreePeople/35286665_036_b?$pdp$',
//                price:'185'
//            },
//            {
//                url:'http://media.topshop.com/wcsstore/TopShop/images/catalog/TS62B06LMUL_Large_M_1.jpg',
//                price:'40'
//            },
//            {
//                url:'http://sits-pod26.demandware.net/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dwdd27cdf1/PF0263_SUQ_24.jpg?sw=656&sh=656&sm=fit',
//                price:'175'
//            }
//        ];
        $scope.wully_data = [
            {
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21909710_115559839139284_2536705386933649408_n.jpg',
                price:'1245',
                question:'How many animals has Wully saved in total since launch?',
                min:'1000',
                max:'1500',
                context:'',
                subcategory:''
            },
            {
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18950047_457101204639111_8252268334817476608_n.jpg',
                price:'729',
                question:'Predict the price of this Jacket.',
                min:'500',
                max:'1000',
                context:'',
                subcategory:'jacket'
            },
            {
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/17076453_395943147440848_8888064781869645824_n.jpg',
                price:'13',
                question:'1 Wully Jacket spares the lives of how many animals?',
                min:'0',
                max:'30',
                context:'',
                subcategory:''
            },
            {
                url:'https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/16583180_163288994176752_6167586102346514432_n.jpg',
                price:'649',
                question:'Predict the price of this Jacket.',
                min:'500',
                max:'1000',
                context:'',
                subcategory:'jacket'
            },
            {
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18095282_224668581353323_7557851820467421184_n.jpg',
                price:'1',
                question:'Wully Jackets are made in California? <p>1 - No</p> <p>0 - Yes</p>',
                min:'0',
                max:'1',
                context:'',
                subcategory:''                
            },
            {
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18382007_1384574631589888_4089628285422534656_n.jpg',
                price:'-20',
                question:'What\'s the coldest temperature to wear this jacket?',
                min:'-100',
                max:'-1',
                context:'degrees',
                subcategory:''
            },
            {
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18011469_1775695206076417_9048892774320963584_n.jpg',
                price:'6',
                question:'1 Wully jacket takes how many weeks to produce?',
                min:'1',
                max:'20',
                context:'Weeks',
                subcategory:''
            },
            {
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/15101788_599006020224290_2198237972321533952_n.jpg',
                price:'2012',
                question:'Wully Outerwear launched in what year?',
                min:'2010',
                max:'2017',
                context:'',
                subcategory:''
            },
            {
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/12818980_519161731596821_1859894505_n.jpg',
                price:'1253',
                question:'1 Wully Jacket saves how many liters of water?',
                min:'800',
                max:'1300',
                context:'Litres',
                subcategory:''
            },
            {
                url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21372233_306885123111795_3977466434258206720_n.jpg',
                price:'1',
                question:'Wully jackets come in sizes extra-small to extra-large? <p>1 - Yes</p> <p>0 - No</p>',
                min:'0',
                max:'1',
                context:'',
                subcategory:''
            },
            
        ];
        //$scope.data = [];
        $scope.apiData = [];
        $scope.contest = {};
        $scope.apiCounter = 1;
        $scope.show_points = false;
        $scope.manualprice = false;
        $scope.point_earned = 0;
        $scope.test = {price:250,second_price:250,start_time:null,end_time:null,menuhide:0,hideModal:true};
        $scope.progress = 0;
        $scope.index = 0;
        $scope.wully_dashboard = 0;
        checkWindow();
        //$http.get('http://127.0.0.1:8000/mocha')
        $http.get('http://twistedlovebox.com/mocha?q=' + 250)
        .then(function(res){
            console.log(res);
            $scope.apiData = res.data;
            $scope.prizeData = $scope.apiData.slice(120,145);
            takeChunk();
        })
        .then(function(){
            //$scope.menuhide = 0;
            $scope.game = $scope.data[$scope.index];
            if($scope.screen_big !== true){
                //This mimics a real life game loading thing. this can definitely be optimized later.
                $timeout(function(){
                    $state.go('/dash');
                },3000);
            }
            
        });
     
        $scope.submitPrediction = function(){
            if($scope.index <= $scope.data.length - 1){
                $scope.data[$scope.index].prediction = $scope.test.price;
                //$scope.index++;
                //$scope.game = $scope.data[$scope.index];
                
                //reconcile price prediction for consistent points
                if($scope.manualprice === true)
                    $scope.test.price = $scope.test.second_price;
                
                $scope.point_earned = $scope.data[$scope.index].point =  pointsMath($scope.index,$scope.test.price);
                //$scope.data[$scope.index].point = pointsMath($scope.index,x);
                $scope.show_points = true;
                $scope.manualprice = false;
                pullNextImage('auto'); //this pulls the next image into the DOM for smoother UX experience
                
                if($scope.index == $scope.data.length - 1){
                    //$scope.index++;
                    $timeout($scope.nextProduct,1300);
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
     
//        $scope.modal = $ionicModal.fromTemplate('<div class="modal"><header class="bar bar-header bar-positive"> <h1 class="title">I\'m A Modal</h1><div class="button button-clear" ng-click="modal2.hide()"><span class="icon ion-close"></span></div></header><content has-header="true" padding="true"><p>This is a modal</p></content></div>', {
//            scope: $scope,
//            animation: 'slide-in-up'
//          });
        
        $scope.nextProduct = function(){
            //action for what happens after final answer is given
            if($scope.index < $scope.data.length - 1){
                console.log($scope.data);
                $scope.index++;
                $scope.show_points = false;
                //$scope.manualprice = false;
                $scope.game = $scope.data[$scope.index];
                $scope.progress = (($scope.index)/$scope.data.length)*100;
                if($scope.wully == true){
                   //$scope.test.price = $scope.test.second_price = 5;
                   $scope.test.price = $scope.test.second_price = Number($scope.game.max);
                }
                pullNextImage();
                //$scope.modal.show();
                //$ionicSideMenuDelegate.toggleLeft();
                
                
            }else{
                $scope.point_earned = getPoints();
                gameTimePlayed();
                getTokens();
                $scope.test.hideModal = false;
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
        };
        
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
            $scope.point_earned = 0;
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
     
        $scope.contestSubmit = function(){
            $scope.contest.timestamp = moment().toISOString();
            $scope.contest.points = $scope.point_earned;
            $scope.contest.playtime = $scope.test.timePlayed;
            $http.get('http://twistedlovebox.com/contest?name='+$scope.contest.name+"&phone="+$scope.contest.phone+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points+"&playtime="+$scope.contest.playtime)
            .then(function(res){
                localStorage.name = $scope.contest.name;
                localStorage.phone = $scope.contest.phone;
                $scope.resetGame('dash');
            });
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
            }
            $scope.startTime();
            $scope.prize = true;
            $state.go('/prize');
        }
        
        $scope.startPractice = function(){
            if($scope.wully === true || $scope.prize === true){
                $scope.data = $scope.apiData;
                takeChunk();
                $scope.wully = $scope.prize = false;
                $scope.resetGame('practice');
            }
            $scope.startTime();
            $scope.practice = true;
            $state.go('/practice');
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
            var round = 25; //No of products for each round
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
            var b = Number($scope.point_earned);
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
        
//        angular.element(document.querySelector('.btn-menu')).sideNav({
//          menuWidth: 300, // Default is 300
//          edge: 'left', // Choose the horizontal origin
//          closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
//          draggable: true // Choose whether you can drag to open on touch screens
//        });
        
        //angular.element(document.querySelector('.modal')).modal();
        
    });
    
    myapp.directive('menuButton', function() {
      return {
        template: '<a class="btn-menu main-color" ng-click="menuHide()" ng-class="{\'main-color\':wully !== true, \'wully-color\':wully==true}"><i class="material-icons" style="font-size:35px">menu</i></a>',
        link: function(scope, elem, attrs) {
            /*angular.element(document.querySelector('.btn-menu')).sideNav({
              menuWidth: 300, // Default is 300
              edge: 'right', // Choose the horizontal origin
              closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
              draggable: true // Choose whether you can drag to open on touch screens
            });*/
        }
      };
    });

    myapp.directive('menuHeader', function() {
      return {
        templateUrl: 'menu-header.html'
        
      };
    });

    myapp.directive('selectType', function() {
      return {
        link: function(scope, elem, attrs){
            angular.element('select').material_select();
        }
        
      };
    });
