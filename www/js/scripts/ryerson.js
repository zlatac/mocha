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
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true};
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

        if($scope.game.min === '0' & $scope.game.max === '1'){
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.ryersonSubmit = function(){mocha.submitPrediction($scope)};
    $scope.ryersonNextProduct = function(){
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