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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/d7a761bd563d58cf346ec8ecad2b2ced/5ADF6097/t51.2885-15/e35/26333738_157137628252127_3034955948713050112_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/852228c96f888dd66a474d1ebbd16c4a/5AF71AB7/t51.2885-15/e35/26267627_200044620572350_841489895510769664_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/8de78e3c94d7d4b6c6d3dec5d5cd59ae/5ADAAE01/t51.2885-15/e35/25019161_2021905281387262_2531557653881028608_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/e82ffc1a0a942d26358be102511a5d56/5ADE36C5/t51.2885-15/e35/25024714_1583528291728535_7295001359550513152_n.jpg',
            price:'1',
            question:' How many people are there in Above and beyond?',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/07fcba6c5d7c53c41ffa6953a2eb77d8/5AE87E3F/t51.2885-15/e35/23098716_126619421369388_7340628824360484864_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/ca4ec8441ef3863558d083a7698914f2/5AE55398/t51.2885-15/e35/22344177_127022191338397_6753242233601785856_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/44fe4a37f07c9d5a2ce4b0e66f902e47/5AE8F132/t51.2885-15/e35/18094899_1153108111467956_8164066899311722496_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/d263bb0d5021423a58ae233ebce38539/5ADF4F7B/t51.2885-15/e35/18094862_1377814435628951_4125549854287986688_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/f3528351196312e9a6b054d7c98091aa/5AE276B2/t51.2885-15/e35/17881140_208217066346776_2630688045988315136_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/3ee0d96a8c51f10e7879f883d2e3a2c5/5AE8FF4A/t51.2885-15/s1080x1080/e35/18094703_833119983531158_7881689601511784448_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/9677b1bb9290e78403303a53c6c5b7bf/5AF3D532/t51.2885-15/e35/18094646_1934428426791672_7189601088285179904_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/f5fb602f4670bde5e44d75a2b6de05ed/5AF53F8C/t51.2885-15/e35/18013973_1928285407404446_6087253240200560640_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/99110a8c0b8e32e943a7fc4bf80be84c/5AE25B62/t51.2885-15/e35/18094529_1319501248127200_4504383020815351808_n.jpg',
            price:'survey',
            question:' What music festival would you consider going to in the next year?',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/982dff6b8e99caa7c648e832dc28bb50/5ADC2DE0/t51.2885-15/e35/18013913_803013549874616_8718980771353722880_n.jpg',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/865b51b3aa6167ba084203333488737e/5AF6C6EC/t51.2885-15/e35/17934541_799299920222797_134993012546600960_n.jpg',
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
    mocha.inlighten = true;
    mocha.appName = 'mocha_'+'inlighten';
    mocha.inlighten_data = $scope.inlighten_data;
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
    
    $scope.inlightenSubmit = function(){mocha.submitPrediction($scope)};
    $scope.inlightenNextProduct = function(){
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
myapp.controller('inlighten.prize.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.prize = [
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Improvision_Light_Up_3_600x600.jpg?v=1515006458',
        name: 'Revival Hoodie'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Mens-Feature-1_35a47cf3-c172-497b-968f-cbb4e150c528_600x600.jpg?v=1515002931',
        name: 'Divinity Mask'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/front-yellow_600x600.jpg?v=1515006221',
        name: 'Prophecy Bomber'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Womens-Bra-Feature-1_600x600.jpg?v=1515003037',
        name: 'Firefly Bra'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Womens-Feature-1_600x600.jpg?v=1515005976',
        name: 'Promises Hoodie'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Jacket_5_600x600.jpg?v=1515006115',
        name: 'Prophecy Bomber'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Mens-Feature-1_35a47cf3-c172-497b-968f-cbb4e150c528_600x600.jpg?v=1515002931',
        name: 'Divinity Mask'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Tie-Feature_600x600.JPG?v=1515002851',
        name: 'Momentum Tie'
        },
        {
        img:'https://cdn.shopify.com/s/files/1/1773/4523/products/Accessories-Feature_600x600.JPG?v=1515006349',
        name: 'Purity Clutch'
        }
    ]
    
});