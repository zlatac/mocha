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

        if($scope.game.min === '0' & $scope.game.max === '1'){
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
