//NEXT LEVEL STARTUPS DIRECTIVES
myapp.directive('nlsMenuHeader', function() {
    return {
      templateUrl: 'views/nls/nls.menu-header.html'
    };
});

myapp.directive('nlsResultModal', function() {
    return {
      templateUrl: 'views/nls/nls.result.html'          
    };
});

//nls CONTROLLERS BELOW
myapp.controller('nls.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#5C96CE';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu nls-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    // $scope.nls_data = [
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20686715_141651436334024_7875736373112602624_n.jpg',
    //         price:'1',
    //         question:'What\'s Canada\'s most popular food?',
    //         min:'0',
    //         max:'3',
    //         context:'',
    //         subcategory:'',
    //         p_id:'1',
    //         options: [
    //             {answer: 'Burger', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21435368_495444827474387_8279421719358210048_n.jpg'},
    //             {answer: 'Poutine', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/23421740_542027096136543_6088780208448471040_n.jpg'},
    //             {answer: 'Pizza', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/23507133_156576184953361_289457645876674560_n.jpg'},
    //             {answer: 'Burrito', url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20686715_141651436334024_7875736373112602624_n.jpg'}
    //         ]
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/19120414_271228573283019_1335674875607515136_n.jpg',
    //         price:'150',
    //         question:'For how long has Canada been an independent country?',
    //         min:'50',
    //         max:'300',
    //         context:'years',
    //         subcategory:'',
    //         p_id:'2'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18581342_1331186293603166_2850323134383390720_n.jpg',
    //         price:'3',
    //         question:'How do Canadians typically end a phrase? ',
    //         min:'0',
    //         max:'3',
    //         context:'',
    //         subcategory:'',
    //         p_id:'3',
    //         options: [
    //             {answer: 'ok', url:''},
    //             {answer: 'neh', url:''},
    //             {answer: 'alrighty', url:''},
    //             {answer: 'eh', url:''}
    //         ]
    //     },
    //     {
    //         url:'https://pbs.twimg.com/media/DO8-IBaWsAAG7sJ.jpg',
    //         price:'1',
    //         question:'In Manitoba, Canada, you have to leave your car doors unlocked in case of a bear attack',
    //         min:'0',
    //         max:'1',
    //         context:'',
    //         subcategory:'',
    //         p_id:'4'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20902290_732602140257917_9177391336754511872_n.jpg',
    //         price:'1.42',
    //         question:'How long is a flight from Toronto to New York?',
    //         min:'0.42',
    //         max:'5.42',
    //         context:'hours',
    //         subcategory:'',
    //         p_id:'5'                
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/19985613_292352497904223_2565680700896313344_n.jpg',
    //         price:'50',
    //         question:'How many immigration programs does Canada offer to potential immigrants?',
    //         min:'20',
    //         max:'100',
    //         context:'',
    //         subcategory:'',
    //         p_id:'6'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18299308_312981482454284_7852578553697665024_n.jpg',
    //         price:'6',
    //         question:'How long can Brazilians stay in Canada as a tourist?',
    //         min:'2',
    //         max:'12',
    //         context:'months',
    //         subcategory:'',
    //         p_id:'7'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18161024_206946959811816_861075835438759936_n.jpg',
    //         price:'26',
    //         question:'How many startup incubators and accelerators are accredited by the startup visa program?',
    //         min:'5',
    //         max:'50',
    //         context:'',
    //         subcategory:'',
    //         p_id:'8'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18251596_423583818007092_6429849582967980032_n.jpg',
    //         price:'1',
    //         question:'Can you get a visa to develop your own business in Canada?',
    //         min:'0',
    //         max:'1',
    //         context:'',
    //         subcategory:'',
    //         p_id:'9'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21688987_796701347168151_7615492347459010560_n.jpg',
    //         price:'200',
    //         question:'How many IT talents do Canadian companies plan to hire by 2019?',
    //         min:'20',
    //         max:'500',
    //         context:'thousand',
    //         subcategory:'',
    //         p_id:'10'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21690325_275768359592351_7888265419780259840_n.jpg',
    //         price:'14',
    //         question:'How long does it usually take for a Canadian company to bring a Brazilian IT professional to Canada',
    //         min:'5',
    //         max:'30',
    //         context:'days',
    //         subcategory:'',
    //         p_id:'11'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/17933857_1093543380751227_8388722233245171712_n.jpg',
    //         price:'51',
    //         question:'What percentage of Toronto\'s population isn\'t born in Toronto?',
    //         min:'5',
    //         max:'100',
    //         context:'%',
    //         subcategory:'',
    //         p_id:'12'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18095984_659848654219908_4977467299033251840_n.jpg',
    //         price:'60',
    //         question:'How much is it to open your own business a sole proprietor in Ontario?',
    //         min:'10',
    //         max:'150',
    //         context:'$',
    //         subcategory:'',
    //         p_id:'13'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21576705_1938832166333282_8519165385071656960_n.jpg',
    //         price:'1',
    //         question:'You don\'t need a special type of visa to open your business in Ontario?',
    //         min:'0',
    //         max:'1',
    //         context:'',
    //         subcategory:'',
    //         p_id:'14'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18160360_215201732304368_7562590307561242624_n.jpg',
    //         price:'survey',
    //         question:'Would you come to Toronto to explore the innovation ecosystem and opportunities for your startup, company or IT career?',
    //         min:'0',
    //         max:'1',
    //         context:'',
    //         subcategory:'',
    //         p_id:'15'
    //     },
    //     {
    //         url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21689961_276224896210936_4024863915220402176_n.jpg',
    //         price:'survey',
    //         question:'How much would you invest in a program that takes you to explore candian startups and accelerators?',
    //         min:'5000',
    //         max:'10000',
    //         context:'R$',
    //         subcategory:'',
    //         p_id:'16'
    //     },
        
    // ];

    //Salmans book launch event questions
    $scope.nls_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20686715_141651436334024_7875736373112602624_n.jpg',
            price:'1',
            question:`What's the capital of Brazil?`,
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'1',
            options: [
                {answer: 'São Paulo', url:''},
                {answer: 'Brasília', url:''},
                {answer: 'Rio de Janeiro', url:''},
                {answer: 'Buenos Aires', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/19120414_271228573283019_1335674875607515136_n.jpg',
            price:'3',
            question:`What's the largest city in the Americas?`,
            min:'0',
            max:'3',
            context:'years',
            subcategory:'',
            p_id:'2',
            options: [
                {answer: 'Toronto', url:''},
                {answer: 'Mexico City', url:''},
                {answer: 'New York', url:''},
                {answer: 'São Paulo', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18581342_1331186293603166_2850323134383390720_n.jpg',
            price:'2',
            question:'What language do Brazilians speak?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                {answer: 'Brazilian', url:''},
                {answer: 'Spanish', url:''},
                {answer: 'Portuguese', url:''},
                {answer: 'Tupi-guarani', url:''}
            ]
        },
        {
            url:'https://pbs.twimg.com/media/DO8-IBaWsAAG7sJ.jpg',
            price:'2.56',
            question:'$1.00 CAD is equal to how many Brazilian Real (R$)?',
            min:'0.56',
            max:'10.56',
            context:'R$',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/20902290_732602140257917_9177391336754511872_n.jpg',
            price:'3',
            question:'What city is Latin America\'s HQ of 65% of Fortune 500 companies?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'5',
            options: [
                {answer: 'Buenos Aires', url:''},
                {answer: 'Mexico City', url:''},
                {answer: 'Santiago', url:''},
                {answer: 'São Paulo', url:''}
            ]               
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/19985613_292352497904223_2565680700896313344_n.jpg',
            price:'1',
            question:`What's the leading city for FDI (Foreign Direct Investment) in Latin America?`,
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'6',
            options: [
                {answer: 'Buenos Aires', url:''},
                {answer: 'São Paulo', url:''},
                {answer: 'Fortaleza', url:''},
                {answer: 'Monterrey', url:''}
            ] 
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/s1080x1080/e35/18299308_312981482454284_7852578553697665024_n.jpg',
            price:'1',
            question:'In 2018, Canadians won\'t need a visa to travel to Brazil? ',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'7'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18161024_206946959811816_861075835438759936_n.jpg',
            price:'170',
            question:'How many fintechs are in Brazil?',
            min:'5',
            max:'500',
            context:'',
            subcategory:'',
            p_id:'8'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/18251596_423583818007092_6429849582967980032_n.jpg',
            price:'1',
            question:'Brazil is home to 50% of Latin America\'s startups',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'9'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21688987_796701347168151_7615492347459010560_n.jpg',
            price:'survey',
            question:'Would you explore Brazilian innovation and tech ecosystem and main touristic points during Canadian winter?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'10'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/21689961_276224896210936_4024863915220402176_n.jpg',
            price:'3',
            question:'Which company can connect your business to the main Brazilian tech players?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'11',
            options: [
                {answer: 'Hatchery', url:''},
                {answer: 'LatAm Startups', url:''},
                {answer: 'PanAm Mexico', url:''},
                {answer: 'Next level startups', url:''}
            ] 
        }
        
    ];
    
    
    $scope.data = [];
    angular.copy($scope.nls_data,$scope.data);
    $scope.nls = true;
    $scope.prizeStartDate = moment('2017/11/28','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/11/28 19:30','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/11/28 19:00','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.nls = true;
    mocha.nls_data = $scope.nls_data;
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
    
    $scope.nlsSubmit = function(){mocha.submitPrediction($scope)};
    $scope.nlsNextProduct = function(){
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
    $scope.startNls = function(){
        $state.go('/nlsgame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/nlscontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('nls.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/nlsdash');
        },3000);
    }
    
});

myapp.controller('nls.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
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
            $http.get('https://styleminions.co/api/nlscontest?name='+$scope.mocha.contest.name+"&phone="+
            $scope.mocha.contest.phone+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.phone = $scope.mocha.contest.phone;
                localStorage.prizeplaydate = moment().toISOString();
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/nlsleaderboard');
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});

myapp.controller('nls.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
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