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

myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("/sewgame", {
        url: "/sewgame",
        templateUrl : "views/sew/sew.game.html",
        controller: "sew.dash.controller",
        cache: false
      })
      .state("/sewlogin", {
        url: "/sewlogin",
        templateUrl : "views/sew/sew.login.html",
        controller: "sew.login.controller",
        cache: false
      })
      .state("/sewcontrol", {
        url: "/sewcontrol",
        templateUrl : "views/sew/sew.control.html",
        controller: "sew.control.controller",
        cache: false
      });
});

//sew CONTROLLERS BELOW
myapp.controller('sew.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#1F304F';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu sew-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.sew_data = [
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/112902388a70330909948c7b3fc394be/5B51E6D4/t51.2885-15/e35/26157494_1158900284244745_486437155447504896_n.jpg',
            price:'10',
            question:'How many bathtubs of water do you save not taking a shower for 12 weeks?',
            min:'3',
            max:'20',
            context:'',
            subcategory:'',
            p_id:'1'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/62386d52d2fbedccc23491b814de4756/5B6EF816/t51.2885-15/e35/26869673_173512470086835_7366131786113351680_n.jpg',
            price:'1',
            question:'Will AI replace humans completely in the workforce',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/98e23d628a1819234b38fd74d3910ebb/5B511071/t51.2885-15/e35/27880352_863303720535601_7696369824342999040_n.jpg',
            price:'1',
            question:'Where in canada are dinousar remains mostly found?',
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
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/088608f2bf57dd86a375e1946906bb35/5B5D0CE6/t51.2885-15/e35/28154665_1504332979680515_5085929284980178944_n.jpg',
            price:'1',
            question:'Will your heart explode if you dive 2000ft below see level?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/vp/544cda0e685cf02619018b46824e6025/5B5F0A09/t51.2885-15/e35/28763711_1944985042498099_1337264846730690560_n.jpg',
            price:'35',
            question:'what\'s the age of elon Musk',
            min:'20',
            max:'45',
            context:'',
            subcategory:'',
            p_id:'5'
        }            
    ];    
    
    $scope.data = [];
    $scope.metrics = [];
    $scope.socketLoader = true;
    $scope.isConnected = false
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
    $scope.showMetrics = false;
    $scope.mocha.comment = '';
    $scope.commentDisplay = false;
    mocha.sew = true;
    mocha.appName = 'mocha_'+'sew';
    if(mocha.isAppNameSet(['io','tones'])){
        mocha.sew_data = $scope.sew_data;
        mocha.prizeEndDate = $scope.prizeEndDate;
        $scope.socket = mocha.webSocket();
        //mocha.livesocket = $scope.socket;
        $scope.socket.on('connect', function(data) {
            $scope.isConnected = true;
            $scope.socket.emit('join',{appName:mocha.appName});
            //console.log(data, 'connected my nigga');
        });
        //$scope.socket.emit('join','we in this bitch son');
        $scope.socket.on('question', function(data){
            mocha.log(data)
            if(data.appName === mocha.appName){
                if('task' in data && data.task === 'question'){
                    //$scope.game = $scope.data[data.p_id];
                    $scope.index = data.p_id - 1;
                    $scope.sewNextProduct();
                    $scope.socketLoader = false;
                    $scope.showMetrics = false;
                    mocha.tones('f',5,500);
                    mocha.vibrate();
                    
                }
                if('task' in data && data.task === 'comment'){
                    $scope.commentDisplay = data.comment;
                    mocha.tones('f',5,500);
                    mocha.vibrate();
                }
                $scope.$apply();                
            }
        });
        $scope.socket.on('sendMetrics',function(data){
            mocha.log(data,'metric data');
            if(data.appName === mocha.appName){
                $scope.metrics = data;
                $scope.showMetrics = true;
                $scope.$apply();
            }
        });
    }else{
        $state.go('/sewlogin');
    }
    
    
    
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
    $scope.goToControl = function(){
        delete $scope.socket;
        $state.go('/sewcontrol')
    }
    $scope.sendComment = function(){
        mocha.log($scope.mocha.comment)
        if($scope.mocha.comment !== ''){
            let post = {post:$scope.mocha.comment};
            $scope.socket.emit('audience',{appName:mocha.appName,task:'comment',comment:post});
            $scope.mocha.comment = '';
        }
        
    }
    
});

myapp.controller('sew.login.controller', function($scope,$ionicHistory,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    mocha.addScripts(['lib/socket.io.js','lib/tone.js'])
    .catch((err)=>{throw new Error(err)})
    .then((data)=>{
        //console.log('yay',data);
        if($scope.screen_big !== true){
            //This mimics a real life game loading thing. this can definitely be optimized later.
            $timeout(function(){
                $state.go('/sewgame');
            },3000);
        }
    })
    
    
});

myapp.controller('sew.control.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    if(mocha.isAppNameSet(['io','tones'])){
        $scope.mocha = mocha;
        $scope.showanswer = true;
        $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
        $scope.controlSocket = mocha.webSocket();
        $scope.validate = true;
        $scope.message = false;
        $scope.toggle = false;
        $scope.toggleCounter = 1;
        $scope.commentData = [];
        $scope.comment = 1;
        $scope.pushQuestion = function(index){
            if($scope.comment % 2 === 0){
                //close comments when new questions are served
                $scope.allowComments();  
            }
            $scope.controlSocket.emit('remoteControl',{appName:mocha.appName,p_id:index,task:'question'});
            //$scope.mocha.sew_data[index].disable = true;
        };
        $scope.controlSocket.on('answer',function(data){
            if(data.appName === mocha.appName){
                if('task' in data && data.task === 'question'){
                    var realIndex = data.p_id;
                    var num = Number(data.raw_answer);
                    if(!('raw_answer' in $scope.mocha.sew_data[realIndex])){
                        $scope.mocha.sew_data[realIndex].raw_answer = [];
                        $scope.mocha.sew_data[realIndex].raw_answer.push(num);
                    }else{
                        $scope.mocha.sew_data[realIndex].raw_answer.push(num);
                    }
                    $scope.metricAnalysis(realIndex);
                }
                if('task' in data && data.task === 'comment'){
                    $scope.commentData.push(data.comment);
                    mocha.tones('f',5,500);
                    mocha.vibrate()
                }
                
                $scope.$apply();
            }
            
        });
    }else{
        $state.go('/sewlogin');  
    }
    
    $scope.showResult = function(index){
        mocha.log($scope.mocha.sew_data[index]);
    }
    $scope.authorize = function(){mocha.authorize($scope);}
    $scope.metricAnalysis = function(index){
        var question = $scope.mocha.sew_data[index];
        var total = question.raw_answer.length;
        if('options' in question){
            //this is for question with options
            let obj = question.options.keys();
            question.metrics = [];
            for(let i of obj){
                let container = {};
                container.name = question.options[i].answer;
                container.val = Math.round((question.raw_answer.filter(word=>word === i).length/total)*100);
                question.metrics.push(container);
            }
            
        }
        if(!('options' in question) && question.min==='0' && question.max==='1'){
            //question with yes or no
            let obj = {};
            obj.yes = Math.round((question.raw_answer.filter(word=>word === 1).length/total)*100);
            obj.no = Math.round((question.raw_answer.filter(word=>word === 0).length/total)*100);
            question.metrics = [{name:'yes',val:obj.yes},{name:'no',val:obj.no}];
        }
        if(!('options' in question) && question.min >='0' && question.max !=='1'){
            //question with predictions (numbers only)
            let low = Number(question.min);
            let high = Number(question.max);
            let quarter = Math.round((low + high)/5);
            let qlow = low + quarter;
            let qmid = qlow + quarter;
            let qhigh = qmid + quarter;
            let a_low = Math.round((question.raw_answer.filter(word=> low<=word && word<qlow).length/total)*100);
            let a_qlow = Math.round((question.raw_answer.filter(word=> qlow<=word && word<qmid).length/total)*100);
            let a_qmid = Math.round((question.raw_answer.filter(word=> qmid<=word && word<qhigh).length/total)*100);
            let a_high = Math.round((question.raw_answer.filter(word=> qhigh<=word && word<=high).length/total)*100);
            question.metrics = [
                {name:`${low} - ${qlow - 1}`,val:a_low},
                {name:`${qlow} - ${qmid - 1}`,val:a_qlow},
                {name:`${qmid} - ${qhigh - 1}`,val:a_qmid},
                {name:`${qhigh} - ${high}`,val:a_high}            
            ];
        }
        $scope.controlSocket.emit('analytics',{appName:mocha.appName,p_id:index,metrics:question.metrics});
        mocha.log(question);
        return question.metrics;
    };
    $scope.toggleFab = function(){
        $scope.toggleCounter++;
        if($scope.toggleCounter % 2 === 0){
            $scope.toggle = true;
        }else{
            $scope.toggle = false;
        }
    };
    $scope.allowComments = function(){
        $scope.comment++;
        if($scope.comment % 2 === 0){
            $scope.controlSocket.emit('remoteControl',{appName:mocha.appName,task:'comment',comment:true})
        }else{
            $scope.controlSocket.emit('remoteControl',{appName:mocha.appName,task:'comment',comment:false})
        }
    }
    
});

