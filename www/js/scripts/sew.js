//SEW science every where DIRECTIVES
myapp.directive('sewMenuHeader', function() {
    return {
      templateUrl: 'views/sew/sew.menu-header.html'
    };
});

myapp.directive('sewResultModal', function() {
    return {
      templateUrl: 'views/sew/sew.result.html'          
    };
});

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("/sewdash", {
        url: "/sewdash",
        templateUrl : "views/sew/sew.dash.html",
	  	controller: "sew.dash.controller"
      })
      .state("/sewgame", {
        url: "/sewgame",
        templateUrl : "views/sew/sew.game.html",
        controller: "sew.dash.controller"
      })
      .state("/sewlogin", {
        url: "/sewlogin",
        templateUrl : "views/sew/sew.login.html",
        controller: "sew.login.controller"
      })
      .state("/sewcontrol", {
        url: "/sewcontrol",
        templateUrl : "views/sew/sew.control.html",
        controller: "sew.control.controller"
      })
      .state("/sewanalytics", {
        url: "/sewanalytics",
        templateUrl : "views/analytics.html",
        controller: "analytics.controller",
        params: {mode: 'sew'},
        cache: false
      });
});

//sew CONTROLLERS BELOW
myapp.controller('sew.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#ff0000';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu sew-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.sew_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/4bcf71f3817127950f4637d7161dcc71/5B3B1548/t51.2885-15/e35/28765565_585431385134477_1793436321126023168_n.jpg',
            price:'10',
            question:'How many bathtubs of water do you save by buying a sew product?',
            min:'3',
            max:'20',
            context:'',
            subcategory:'',
            p_id:'1'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/24cd2e35f1f74daaf1b74b964358398a/5B29BD6C/t51.2885-15/e35/22582015_925336977617693_3032400443171930112_n.jpg',
            price:'1',
            question:'Are sew products Unisex??',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/88fba2b9d8672b650af446c0f3b34a1b/5B326AB9/t51.2885-15/e35/18579951_431880163847441_4296984612074160128_n.jpg',
            price:'1',
            question:'Where in Canada are sew products designed and produced?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                
                {answer: 'montreal', url:''},
                {answer: 'toronto', url:''},
                {answer: 'ottawa', url:''},
                {answer: 'vancouver', url:''}
            ]
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/e993cd6e23b645e058690cbc58de18eb/5B3CBC46/t51.2885-15/e35/20837023_1927461270803288_6129871590793412608_n.jpg',
            price:'1',
            question:'sew products are designed using leading child development research data?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://cdn.shopify.com/s/files/1/2098/6327/products/IMG_4486_1050x.progressive.jpg?v=1505701849',
            price:'35',
            question:'Predict the price of this sew product',
            min:'20',
            max:'45',
            context:'',
            subcategory:'',
            p_id:'5'
        }            
    ];    
    
    $scope.data = [];
    $scope.socketLoader = true;
    angular.copy($scope.sew_data,$scope.data);
    $scope.sew = true;
    $scope.gameType = 'pdx';
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
    mocha.sew = true;
    mocha.appName = 'mocha_'+'sew';
    mocha.sew_data = $scope.sew_data;
    mocha.prizeEndDate = $scope.prizeEndDate;
    $scope.socket = mocha.webSocket();
    $scope.socket.emit('join','we in this bitch son');
    $scope.socket.on('question', function(data){
        console.log(data)
        if(data.appName === mocha.appName){
            //$scope.game = $scope.data[data.p_id];
            $scope.index = data.p_id - 1;
            $scope.sewNextProduct();
            $scope.socketLoader = false;
            $scope.$apply();
        }
    })
    
    
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

        if($scope.game.min === '0' && $scope.game.max === '1'){
            //this fixes the bug that pre selects a yes or no option with the illusion that the value will be passed into the ngModel
            $scope.test.price_radio = null;
            $scope.show_radio = true;
        }else{
            $scope.show_radio = false;
        }
    };
    
    $scope.sewSubmit = function(){
        $scope.socketLoader = true;
        mocha.submitPdx($scope);
    };
    $scope.sewNextProduct = function(){
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
    $scope.startSew = function(){
        $state.go('/sewgame');
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/sewcontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    
});

myapp.controller('sew.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    mocha.addScripts(['lib/socket.io.js']);
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/sewgame');
        },3000);
    }
    
});

myapp.directive('pdxLoader', function() {
    return {
        templateUrl: 'views/sew/sew.loader.html'
        
    };
});
myapp.directive('sewAnalytics', function() {
    return {
        templateUrl: 'views/sew/sew.analytics.html'
        
    };
});

myapp.controller('sew.control.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.showanswer = true;
    $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
    $scope.controlSocket = mocha.webSocket();
    $scope.pushQuestion = function(index){
        $scope.controlSocket.emit('remoteControl',{appName:mocha.appName,p_id:index});
    };
    $scope.controlSocket.on('answer',function(data){
        var realIndex = data.p_id;
        if(!('raw_answer' in $scope.mocha.sew_data[realIndex])){
            $scope.mocha.sew_data[realIndex].raw_answer = [];
            $scope.mocha.sew_data[realIndex].raw_answer.push(data.raw_answer);
        }else{
            $scope.mocha.sew_data[realIndex].raw_answer.push(data.raw_answer);
        }
        $scope.$apply();
        
    });
    $scope.showResult = function(index){
        mocha.log($scope.mocha.sew_data[index]);
    }
    //var prizeEndDate = moment('2017/11/27 18:56','YYYY/MM/DD kk:mm');
    // var check = $interval(function(){
    //     let now = moment();
    //     if(mocha.prizeEndDate.isBefore(now)){
    //         console.log('see the answers');
    //         $interval.cancel(check);
    //         $scope.showanswer = true;
    //     }else{
    //         console.log('wait for a while');
    //         $scope.showanswer = false;
    //     }
    // }, 1000, 6000);
    
});

