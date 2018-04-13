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
