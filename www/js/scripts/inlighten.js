//INLIGHTEN DIRECTIVES
myapp.directive('inlightenMenuHeader', function() {
    return {
      templateUrl: 'views/inlighten/inlighten.menu-header.html'
    };
});

myapp.directive('inlightenResultModal', function() {
    return {
      templateUrl: 'views/inlighten/inlighten.result.html'          
    };
});

//inlighten CONTROLLERS BELOW
myapp.controller('inlighten.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#fe4d00';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu inlighten-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.inlighten_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/35ed57c530cc0b2086050c52016c2d22/5ADBAE99/t51.2885-15/e35/25010039_2438598009698592_2010448159460818944_n.jpg',
            price:'1',
            question:'Where is techno music born ?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'1',
            options: [
                {answer: 'Chicago', url:''},
                {answer: 'detroit', url:''},
                {answer: 'berlin', url:''},
                {answer: 'london', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24332371_200930087156405_7959451569248796672_n.jpg',
            price:'7',
            question:'how many products does inlighten carry?',
            min:'3',
            max:'20',
            context:'',
            subcategory:'',
            p_id:'2',
            source: 'https://www.rethinkingdrinking.niaaa.nih.gov/Tools/Calculators/Calorie-Calculator.aspx'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/89b5fcd93f9f7f7283724881eaffeb72/5ADF3AFF/t51.2885-15/e35/26342479_791493287703699_3490740248986517504_n.jpg',
            price:'1',
            question:'What features do we have for the second gen products?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                {answer: 'Secret compartment', url:''},
                {answer: 'Environmental sound reactivity', url:''},
                {answer: 'brightness adjustment', url:''},
                {answer: 'shake phone to change color', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24332371_200930087156405_7959451569248796672_n.jpg',
            price:'1',
            question:' How much people are there in Above and beyond?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'4',
            options: [
                {answer: '2', url:''},
                {answer: '3', url:''},
                {answer: '5', url:''},
                {answer: '10', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/656214a055dc9e5034643d5f039be621/5ADD6FA0/t51.2885-15/e35/26278049_494498060951058_5984622561416183808_n.jpg',
            price:'1',
            question:'Is it washable?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'5',
            options: [
                {answer: 'machine wash', url:''},
                {answer: 'hand wash', url:''},
                {answer: 'no', url:''},
                {answer: 'no need to wash ', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/511d926c80d8f76fa2b4360b8f44a803/5AEB46BF/t51.2885-15/e35/23735349_129013541099942_1506552722164285440_n.jpg',
            price:'21',
            question:'How old is martin garrix now?',
            min:'19',
            max:'38',
            context:'',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24332371_200930087156405_7959451569248796672_n.jpg',
            price:'3',
            question:'what are the payment options we offer?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'7',
            options: [
                {answer: 'installment', url:''},
                {answer: 'splitpay', url:''},
                {answer: 'paypal', url:''},
                {answer: 'all the options', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/9d9ab0fd5858406aaa3dffb74f9410ff/5AFC1863/t51.2885-15/e35/26186947_1642860362474738_5900632727891214336_n.jpg',
            price:'1',
            question:'where do we ship to?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'8',
            options: [
                {answer: 'brazil', url:''},
                {answer: 'worldwide', url:''},
                {answer: 'europe', url:''},
                {answer: 'america', url:''}
            ]                
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21690263_1947825728790866_3082305188602576896_n.jpg',
            price:'2',
            question:'What are the pills that we need to take to recover ?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'9',
            options: [
                {answer: 'milk thistle', url:''},
                {answer: 'melatonin', url:''},
                {answer: '5htp', url:''},
                {answer: 'ketamine', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/492d9de5234c876da620664a04ccd02c/5AEB6993/t51.2885-15/e35/26072649_1799858386980496_2651107643363426304_n.jpg',
            price:'1',
            question:'what are some tech elements we embed in the product?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'10',
            options: [
                {answer: 'bluetooth', url:''},
                {answer: 'fiber optic', url:''},
                {answer: 'color sensor', url:''},
                {answer: 'all the options', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21147364_1938596963092946_1884110888995127296_n.jpg',
            price:'3',
            question:'what magazines are we being featured on?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'11',
            options: [
                {answer: 'NOVO magazine', url:''},
                {answer: 'Ravenation', url:''},
                {answer: 'Vogue USA', url:''},
                {answer: 'vogue UK', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/0bc49a7993d065b5557a6f3e54a14950/5AE77969/t51.2885-15/e35/25016347_345627765844259_1803382666519642112_n.jpg',
            price:'3',
            question:'what social media platforms are we on?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'12',
            options: [
                {answer: 'facebook', url:''},
                {answer: 'instagram', url:''},
                {answer: 'twitter', url:''},
                {answer: 'all of the above', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24332371_200930087156405_7959451569248796672_n.jpg',
            price:'1',
            question:'what platform do we sell on?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'13',
            options: [
                {answer: 'amazon', url:''},
                {answer: 'all of the above', url:''},
                {answer: 'shopify', url:''},
                {answer: 'facebook', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/23507874_1437886699657716_8411012821453635584_n.jpg',
            price:'1',
            question:' What music festivals would you consider going to in the next year?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'14',
            options: [
                {answer: 'burning man', url:''},
                {answer: 'EDC', url:''},
                {answer: 'ultra', url:''},
                {answer: 'lostland', url:''}
            ],
            source: 'http://www.telegraph.co.uk/tv/0/game-thrones-rhaegar-targaryen-father-jon-snow-daenerys-related/'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/d32a59098dd466b112dd654e8ccc8471/5AF2190E/t51.2885-15/e35/25035955_1776636419065647_3075176672467615744_n.jpg',
            price:'3',
            question:'What is the birth home of the clothing brand Inlighten?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'15',
            options: [
                {answer: 'Newyork', url:''},
                {answer: 'Boston', url:''},
                {answer: 'London', url:''},
                {answer: 'Toronto', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/9058ab36d0b00f3f2cf11e95484504ed/5ADBA757/t51.2885-15/e35/23347635_1932511443735924_6046413384025374720_n.jpg',
            price:'3',
            question:'the calories we burn from all night dancing( 6 hours) equals how much  the calories we burn from having sex ( average session ) ?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'15',
            options: [
                {answer: '4', url:''},
                {answer: '6', url:''},
                {answer: '12', url:''},
                {answer: '18', url:''}
            ]
        }
        
        
        
        
    ];    
    
    $scope.data = [];
    angular.copy($scope.inlighten_data,$scope.data);
    $scope.inlighten = true;
    $scope.prizeStartDate = moment('2017/12/11','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/12/27 18:00','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/12/27 18:00','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.inlighten = true;
    mocha.appName = 'mocha_'+'inlighten';
    mocha.inlighten_data = $scope.inlighten_data;
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
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.inlightenSubmit = function(){mocha.submitPrediction($scope)};
    $scope.inlightenNextProduct = function(){
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
    $scope.startInlighten = function(){
        $state.go('/inlightengame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/inlightencontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('inlighten.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/inlightendash');
        },3000);
    }
    
});

myapp.controller('inlighten.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
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
                $state.go('/inlightenleaderboard');
                $scope.loader = false;
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});

myapp.controller('inlighten.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
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