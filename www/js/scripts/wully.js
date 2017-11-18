//WULLY DIRECTIVES
myapp.directive('wullyMenuHeader', function() {
    return {
      templateUrl: 'views/wully/wully.menu-header.html'
    };
});

myapp.directive('wullyResultModal', function() {
    return {
      templateUrl: 'views/wully/wully.result.html'          
    };
});

//WULLY CONTROLLERS BELOW
myapp.controller('wully.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='rgba(224, 24, 43, 0.91)';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu wully-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.wully_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21909710_115559839139284_2536705386933649408_n.jpg',
            price:'1245',
            question:'How many animals has Wully saved in total since launch?',
            min:'1000',
            max:'1500',
            context:'',
            subcategory:'',
            p_id:'1'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18950047_457101204639111_8252268334817476608_n.jpg',
            price:'729',
            question:'Predict the price of this Jacket.',
            min:'500',
            max:'1000',
            context:'',
            subcategory:'jacket',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/17076453_395943147440848_8888064781869645824_n.jpg',
            price:'13',
            question:'1 Wully Jacket spares the lives of how many animals?',
            min:'0',
            max:'30',
            context:'',
            subcategory:'',
            p_id:'3'
        },
        {
            url:'https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/16583180_163288994176752_6167586102346514432_n.jpg',
            price:'649',
            question:'Predict the price of this Jacket.',
            min:'500',
            max:'1000',
            context:'',
            subcategory:'jacket',
            p_id:'4'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18095282_224668581353323_7557851820467421184_n.jpg',
            price:'1',
            question:'Wully Jackets are made in California? <p>1 - No</p> <p>0 - Yes</p>',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'5'                
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18382007_1384574631589888_4089628285422534656_n.jpg',
            price:'-20',
            question:'What\'s the coldest temperature to wear this jacket?',
            min:'-100',
            max:'-1',
            context:'degrees',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18011469_1775695206076417_9048892774320963584_n.jpg',
            price:'6',
            question:'1 Wully jacket takes how many weeks to produce?',
            min:'1',
            max:'20',
            context:'Weeks',
            subcategory:'',
            p_id:'7',
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/15101788_599006020224290_2198237972321533952_n.jpg',
            price:'2012',
            question:'Wully Outerwear launched in what year?',
            min:'2010',
            max:'2017',
            context:'',
            subcategory:'',
            p_id:'8'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/12818980_519161731596821_1859894505_n.jpg',
            price:'1253',
            question:'1 Wully Jacket saves how many liters of water?',
            min:'800',
            max:'1300',
            context:'Litres',
            subcategory:'',
            p_id:'9',
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21372233_306885123111795_3977466434258206720_n.jpg',
            price:'1',
            question:'Wully jackets come in sizes extra-small to extra-large? <p>1 - Yes</p> <p>0 - No</p>',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'10',
        },
        
    ];
    
    
    $scope.data = [];
    angular.copy($scope.wully_data,$scope.data);
    $scope.wully = true;
    $scope.prizeStartDate = moment('2017/11/15','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/11/20','YYYY/MM/DD');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.wully = true;
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
    
    $scope.wullySubmit = function(){mocha.submitPrediction($scope)};
    $scope.wullyNextProduct = function(){
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
    $scope.startWully = function(){
        $state.go('/wullygame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/wullycontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no'
    };
    
});

myapp.controller('wully.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/wullydash');
        },3000);
    }
    
});

myapp.controller('wully.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
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
                $state.go('/wullyleaderboard');
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});