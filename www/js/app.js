// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myapp = angular.module('starter', ['ionic'])

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

 myapp.controller('mCtrl', function($scope,$location,$rootScope,$state,$http,$ionicModal,$ionicSideMenuDelegate){
        
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
        $scope.data = [];
        //$http.get('http://127.0.0.1:8000/mocha')
        $http.get('http://twistedlovebox.com/mocha')
        .then(function(res){
            console.log(res);
            $scope.data = res.data;
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
            }
        });
     
     
        $scope.show_points = false;
        $scope.manualprice = false;
        $scope.point_earned = 0;
        $scope.test = {price:0,second_price:0,start_time:null,end_time:null,menuhide:0,hideModal:true};
        $scope.progress = 0;
        $scope.index = 0;
        //$scope.menuhide = 0;
        $scope.game = $scope.data[$scope.index];
        $scope.submitPrediction = function(){
            if($scope.index < $scope.data.length){
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
                pullNextImage(); //this pulls the next image into the DOM for smoother UX experience                
                
            }
            
            if($scope.index == $scope.data.length){
                console.log($scope.data);
                $location.path('/final');
                
            }
            
        };
     
        $scope.modal = $ionicModal.fromTemplate('<div class="modal"><header class="bar bar-header bar-positive"> <h1 class="title">I\'m A Modal</h1><div class="button button-clear" ng-click="modal2.hide()"><span class="icon ion-close"></span></div></header><content has-header="true" padding="true"><p>This is a modal</p></content></div>', {
            scope: $scope,
            animation: 'slide-in-up'
          });
        
        $scope.nextProduct = function(){
            //action for what happens after final answer is given
            if($scope.index !== $scope.data.length - 1){
                console.log($scope.data);
                $scope.index++;
                $scope.show_points = false;
                //$scope.manualprice = false;
                $scope.game = $scope.data[$scope.index];
                $scope.progress = (($scope.index)/$scope.data.length)*100;
                pullNextImage();
                //$scope.modal.show();
                //$ionicSideMenuDelegate.toggleLeft();
                
                
            }else{
                $scope.point_earned = getPoints();
                gameTimePlayed();
                $scope.test.hideModal = false;
                //$location.path('/final');
                //angular.element(document.querySelector('.modal')).modal('open');
            }
            
        };
        
        $scope.inputShow = function(){
            $scope.manualprice = true;
            //unfortunately HTML range slider returns price as string instead of number
            $scope.test.second_price = Number($scope.test.price);
            
        };
        
        $scope.startTime = function(){
            $scope.test.start_time = moment();
        };
        
        $scope.resetGame = function(a){
            $scope.show_points = false;
            $scope.manualprice = false;
            $scope.point_earned = 0;
            $scope.test.price=$scope.test.second_price=$scope.progress=0; $scope.test.start_time=$scope.test.end_time=null;
            $scope.test.hideModal = true;
            $state.go('/' + a);
            if(a == 'game'){
               $scope.startTime(); 
            }
            $scope.index = 0;
            $scope.game = $scope.data[$scope.index];
        };
        
        $scope.menuHide = function(){
            $scope.test.menuhide += 1;
        };
        
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
     
        function pullNextImage(){
            var x = new Image();
            x.onload = function(){};
            x.onerror = function(){
                $scope.data.splice($scope.index + 1,1);
                pullNextImage();
            };
            x.src = $scope.data[$scope.index + 1].url;
        }
        
//        angular.element(document.querySelector('.btn-menu')).sideNav({
//          menuWidth: 300, // Default is 300
//          edge: 'left', // Choose the horizontal origin
//          closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
//          draggable: true // Choose whether you can drag to open on touch screens
//        });
        
        //angular.element(document.querySelector('.modal')).modal();
        
    });
    
    myapp.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state("/", {
        url: "/",
        templateUrl : "../login.html"
      })
      .state("/game", {
        url: "/game",
        templateUrl : "../game.html"
      })
      .state("/dash", {
        url: "/dash",
        templateUrl : "../dash.html"
      })
      .state("/login", {
        url: "/login",
        templateUrl : "../login.html"
      });
    $urlRouterProvider.otherwise('/');
    });
    
    myapp.directive('menuButton', function() {
      return {
        template: '<a class="btn-menu main-color" ng-click="menuHide()"><i class="material-icons" style="font-size:35px">menu</i></a>',
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
