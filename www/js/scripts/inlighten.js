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
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/25009004_319815051868424_302039481987366912_n.jpg',
            price:'291',
            question:'3 shots of vodka has how many calories?',
            min:'50',
            max:'500',
            context:'',
            subcategory:'',
            p_id:'1',
            source: 'https://www.rethinkingdrinking.niaaa.nih.gov/Tools/Calculators/Calorie-Calculator.aspx'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/22158730_1657642604307057_8461293621335818240_n.jpg',
            price:'1',
            question:'Zedd produced the song "get low"?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24177252_193844907844607_486908502338437120_n.jpg',
            price:'1',
            question:'Recreational Marijuana is not legal in the following 3 US states: California, Nevada and british columbia? ',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'3'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/22071462_1967032036843290_160704018220318720_n.jpg',
            price:'2',
            question:'Which Artist inspired a zombie apocalypse fashion collection',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'4',
            options: [
                {answer: 'Lady Gaga', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/25008445_843937269142336_4158407243160616960_n.jpg'},
                {answer: 'Calvin Harris', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/19227569_308548172919446_2308404154046873600_n.jpg'},
                {answer: 'Kanye', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21294786_169404340283174_1954023967207456768_n.jpg'},
                {answer: 'Avicii', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/22071462_1967032036843290_160704018220318720_n.jpg'}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21569167_302413943568029_6996929289178316800_n.jpg',
            price:'1',
            question:'Can this Inlighten jacket be washed in machine & dryer without destroying the technology in it?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'5'                
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21690263_1947825728790866_3082305188602576896_n.jpg',
            price:'1',
            question:'Where is the EDM party capital of the world?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'6',
            options: [
                {answer: 'Berlin', url:''},
                {answer: 'ibiza', url:''},
                {answer: 'London', url:''},
                {answer: 'Las Vegas', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21147364_1938596963092946_1884110888995127296_n.jpg',
            price:'299',
            question:'what is the retail price of this inlighten jacket?',
            min:'200',
            max:'350',
            context:'',
            subcategory:'jacket',
            p_id:'7'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/23507874_1437886699657716_8411012821453635584_n.jpg',
            price:'1',
            question:'Tomorrowland festival is located in Belgium?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'8'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e15/11313615_585405418261427_1837218636_n.jpg',
            price:'1',
            question:'Swedish House Mafia isn\'t coming back together as a DJ group in 2018?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'9'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24845088_168199897260345_1550048315532378112_n.jpg',
            price:'1',
            question:'Jon Snow is Daenery\'s nephew?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'10',
            source: 'http://www.telegraph.co.uk/tv/0/game-thrones-rhaegar-targaryen-father-jon-snow-daenerys-related/'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/23417151_127037931302116_1731948396790415360_n.jpg',
            price:'71',
            question:'what is the total number of sex/nude scenes in game of thrones?',
            min:'10',
            max:'250',
            context:'',
            subcategory:'',
            p_id:'11',
            source:'http://www.mercurynews.com/2017/07/13/game-of-thrones-by-the-numbers-corpses-nude-scenes-etc/'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24332371_200930087156405_7959451569248796672_n.jpg',
            price:'3',
            question:'Where is the birth home of the clothing brand Inlighten?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'12',
            options: [
                {answer: 'Newyork', url:''},
                {answer: 'Boston', url:''},
                {answer: 'London', url:''},
                {answer: 'Toronto', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20836961_109511633106071_1868642044587540480_n.jpg',
            price:'1243',
            question:'What number of characters have been killed on game of thrones?',
            min:'400',
            max:'2500',
            context:'',
            subcategory:'',
            p_id:'13'
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
            $http.get('https://styleminions.co/api/inlightencontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/inlightenleaderboard');
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