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
            price:'2014',
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

        if($scope.game.min === '0' & $scope.game.max === '1'){
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
