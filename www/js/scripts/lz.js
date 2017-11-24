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
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21909710_115559839139284_2536705386933649408_n.jpg',
            price:'2015',
            question:'What year was LIZ founded?',
            min:'1000',
            max:'1500',
            context:'',
            subcategory:'',
            p_id:'1'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18950047_457101204639111_8252268334817476608_n.jpg',
            price:'2',
            question:'Which LIZ startup automates the incorporation process for companies using smart technology?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'2',
            options: [
                {answer: 'Legalbox', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/15048227_218441365259697_2371854405990350848_n.jpg'},
                {answer: 'Legalswipe', url:'https://pbs.twimg.com/media/DDRp6L6W0AApnUF.jpg:small'},
                {answer: 'Founded', url:'https://pbs.twimg.com/media/DDU3598XYAEojTV.jpg:small'},
                {answer: 'Loom Analytics', url:'https://pbs.twimg.com/media/DKU6SOmVYAAcq-8.jpg:small'}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/17076453_395943147440848_8888064781869645824_n.jpg',
            price:'3',
            question:'Who did the LIZ partner with for the AI Legal Challenge?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                {answer: 'BMO ', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/15048227_218441365259697_2371854405990350848_n.jpg'},
                {answer: 'Siemens Canada', url:'https://pbs.twimg.com/media/DDRp6L6W0AApnUF.jpg:small'},
                {answer: 'Legal Aid Ontario', url:'https://pbs.twimg.com/media/DDU3598XYAEojTV.jpg:small'},
                {answer: 'Ontario Ministry of the Attorney General', url:'https://pbs.twimg.com/media/DKU6SOmVYAAcq-8.jpg:small'}
            ]
        },
        {
            url:'https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/16583180_163288994176752_6167586102346514432_n.jpg',
            price:'2',
            question:'The LIZ just launched a Global Initiative around?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'4',
            options: [
                {answer: 'Aboriginal Law', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/15048227_218441365259697_2371854405990350848_n.jpg'},
                {answer: 'Consumer Law', url:'https://pbs.twimg.com/media/DDRp6L6W0AApnUF.jpg:small'},
                {answer: 'Family Law', url:'https://pbs.twimg.com/media/DDU3598XYAEojTV.jpg:small'},
                {answer: 'Criminal Law', url:'https://pbs.twimg.com/media/DKU6SOmVYAAcq-8.jpg:small'}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18095282_224668581353323_7557851820467421184_n.jpg',
            price:'1',
            question:'Winners of the AI Legal Challenge can win up to $80,000 in seed funding?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'5'                
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18382007_1384574631589888_4089628285422534656_n.jpg',
            price:'17',
            question:'How many startups are currently active at the Legal Innovation Zone?',
            min:'8',
            max:'40',
            context:'',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18011469_1775695206076417_9048892774320963584_n.jpg',
            price:'3',
            question:'Which startup won the Ontario A2J Challenge at the Legal Innovation Zone last year?',
            min:'0',
            max:'3',
            context:'Weeks',
            subcategory:'',
            p_id:'7',
            options: [
                {answer: 'Legally Inc.', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/15048227_218441365259697_2371854405990350848_n.jpg'},
                {answer: 'NoticeConnect', url:'https://pbs.twimg.com/media/DDRp6L6W0AApnUF.jpg:small'},
                {answer: 'Evichat', url:'https://pbs.twimg.com/media/DDU3598XYAEojTV.jpg:small'},
                {answer: 'ParDONE', url:'https://pbs.twimg.com/media/DKU6SOmVYAAcq-8.jpg:small'}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/15101788_599006020224290_2198237972321533952_n.jpg',
            price:'12',
            question:'How many advisors are available to LIZ startups?',
            min:'4',
            max:'24',
            context:'',
            subcategory:'',
            p_id:'8'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/12818980_519161731596821_1859894505_n.jpg',
            price:'1',
            question:'The LIZ recently partnered with Osler for a successful Associate Innovation Challenge',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'9'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21372233_306885123111795_3977466434258206720_n.jpg',
            price:'0',
            question:'LIZ owns 5% of every alumni startup once they become profitable ventures?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'10'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21372233_306885123111795_3977466434258206720_n.jpg',
            price:'1',
            question:'LIZ has partnered with the Law Foundation of Ontario to run an initiative around?',
            min:'0',
            max:'2',
            context:'',
            subcategory:'',
            p_id:'11',
            options: [
                {answer: 'Criminal Law', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/15048227_218441365259697_2371854405990350848_n.jpg'},
                {answer: 'Youth Access to Justice', url:'https://pbs.twimg.com/media/DDRp6L6W0AApnUF.jpg:small'},
                {answer: 'Consumer Issues', url:'https://pbs.twimg.com/media/DDU3598XYAEojTV.jpg:small'}
            ]
        }
        
    ];
    
    
    $scope.data = [];
    angular.copy($scope.lz_data,$scope.data);
    $scope.lz = true;
    $scope.prizeStartDate = moment('2017/11/28','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/11/29','YYYY/MM/DD');
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
                $state.go('/lzleaderboard');
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});