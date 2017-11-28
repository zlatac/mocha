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

        if($scope.game.min === '0' & $scope.game.max === '1'){
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