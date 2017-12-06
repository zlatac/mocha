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