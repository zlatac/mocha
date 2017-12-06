myapp.directive('dmzMenuHeader', function() {
    return {
      templateUrl: 'views/dmz/dmz.menu-header.html'
    };
});

myapp.directive('dmzResultModal', function() {
    return {
      templateUrl: 'views/dmz/dmz.result.html'          
    };
});

//DMZ CONTROLLERS BELOW
myapp.controller('dmz.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#00b3f0';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu dmz-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.dmz_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.44.1080.1080/22221390_533359833665379_7213411321822314496_n.jpg',
            price:'2010',
            question:'When was DMZ founded?',
            min:'1991',
            max:'2017',
            context:'',
            subcategory:'',
            p_id:'1'
        },
        {
            url:'https://cdn.technologyreview.com/i/legacy/hossein.rahnama.jpg',
            price:'1',
            question:'Who was the first executive director of DMZ?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'2',
            options: [
                {answer: 'Abdullah', url:'http://notablelife.com/media/2017/03/DMZ-Ryerson-Paul-Steward-Photography-19.jpg'},
                {answer: 'Valerie', url:'http://www.womenofinfluence.ca/wp-content/uploads/2017/03/valerie-fox_featured-image.jpg'},
                {answer: 'Hussaam', url:'https://dmz.ryerson.ca/wp-content/uploads/2017/01/DMZ-Ryerson-Paul-Steward-Photography-1-5-e1485046459651.png'},
                {answer: 'Hussan', url:'https://cdn.technologyreview.com/i/legacy/hossein.rahnama.jpg'}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/18513275_665066930370249_2577613984060407808_n.jpg',
            price:'3',
            question:'Which DMZ startup is building affordable educational tablets for children in poor countries?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                {answer: 'Algocian', url:''},
                {answer: 'Erplain', url:''},
                {answer: 'Flybits', url:''},
                {answer: 'Rumie', url:''}
            ]

        },
        {
            url:'http://www.digitaljournal.com/img/6/8/1/5/3/0/i/1/1/6/o/SheldonLevyPage26big.jpg',
            price:'1',
            question:'Sheldon Levy is the Ryerson president that helped launch DMZ? <p>- Yes</p> <p>- No</p>',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://pbs.twimg.com/media/C_JMKWvV0AAy5YU.jpg:small',
            price:'2',
            question:'Who is the Startup Services Lead at DMZ?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'5',
            options: [
                {answer: 'Ahmed', url:'https://dmz.ryerson.ca/wp-content/uploads/2017/01/DMZ-Ryerson-Paul-Steward-Photography-1605-e1486574518694.jpg'},
                {answer: 'Calypso', url:'https://dmz.ryerson.ca/wp-content/uploads/2017/01/DMZ-Ryerson-Paul-Steward-Photography-1785-e1486573711279.jpg'},
                {answer: 'Shane', url:'https://talent2tconference.com/wp-content/uploads/2017/09/Shane.png'},
                {answer: 'Hussaam', url:'https://dmz.ryerson.ca/wp-content/uploads/2017/01/DMZ-Ryerson-Paul-Steward-Photography-1-5-e1485046459651.png'}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/18012099_1390680900975189_404795968953778176_n.jpg',
            price:'312',
            question:'How many startups have incubated and accelerated in DMZ since inception?',
            min:'100',
            max:'600',
            context:'',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/14583300_1313365472057447_5115198945936539648_n.jpg',
            price:'61',
            question:'How many startup members does DMZ currently have?',
            min:'20',
            max:'200',
            context:'',
            subcategory:'',
            p_id:'7'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c136.0.808.808/13167230_1720280664926144_1775319026_n.jpg',
            price:'391',
            question:'How much investment has been raised by DMZ startups?',
            min:'60',
            max:'500',
            context:'million',
            subcategory:'',
            p_id:'8'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.134.1080.1080/18443672_1638498986164746_5569293880953667584_n.jpg',
            price:'3',
            question:'Which DMZ startup is building an in-space telecommunication network for space-borne assets?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'9',
            options: [
                {answer: 'Fortuna', url:''},
                {answer: 'Hubbli', url:''},
                {answer: 'Komodo', url:''},
                {answer: 'Kepler', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/21294394_508033522874860_3400474622133534720_n.jpg',
            price:'2962',
            question:'How many jobs have been created through DMZ?',
            min:'500',
            max:'5000',
            context:'jobs',
            subcategory:'',
            p_id:'10'
        },
    ];
    
    
    $scope.data = [];
    angular.copy($scope.dmz_data,$scope.data);
    $scope.dmz = true;
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
    mocha.dmz = true;
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if($scope.safe($scope.game.options)){
            if(mocha.safe($scope.game.options[$scope.test.price].url)){
                $scope.game.url = $scope.game.options[$scope.test.price].url;
            }
            $scope.game.context =  $scope.game.options[$scope.test.price].answer;
            if($scope.test.price !==  $scope.game.price){
                //this will make sure that the player gets zero if they choose the wrong option
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
    
    $scope.dmzSubmit = function(){mocha.submitPrediction($scope)};
    $scope.dmzNextProduct = function(){
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
    $scope.startDmz = function(){
        $state.go('/dmzgame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/dmzcontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no'
    };
    
});

myapp.controller('dmz.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/dmzdash');
        },3000);
    }
    
});

myapp.controller('dmz.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
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
                $state.go('/dmzleaderboard');
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});