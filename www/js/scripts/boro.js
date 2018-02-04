//BORO DIRECTIVES
myapp.directive('boroMenuHeader', function() {
    return {
      templateUrl: 'views/boro/boro.menu-header.html'
    };
});

myapp.directive('boroResultModal', function() {
    return {
      templateUrl: 'views/boro/boro.result.html'          
    };
});

myapp.directive('tapTap', function() {
    return {
      link: function($scope,element,attrs){
        element.bind('touchstart',function(e){
            //console.log(e,'wow',e.target);
            e.target.innerHTML = 'lens';
            //e.target.parentNode.children[1].className.replace('dark','');
        });
        
        element.bind('touchend',function(e){
            //console.log(e,'wow',e.target);
            e.target.innerHTML = 'panorama_fish_eye';
            //e.target.parentNode.children[1].className.replace('dark','');
        });
      }       
    };
});



//BORO CONTROLLERS BELOW
myapp.controller('boro.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    if(mocha.inStore == true){
        //in store color
        angular.element(document.querySelector('body'))[0].style.borderTopColor='#101010e6';
    }else{
        //default color
        angular.element(document.querySelector('body'))[0].style.borderTopColor='#008489';
    }
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu boro-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }
    
    $scope.boro_data = [
        {
            url:'https://i2.wp.com/boroit.ca/wp-content/uploads/Nude-Lace-Gown-Front.jpg?fit=862%2C1024&ssl=1',
            price:'3',
            question:'What\'s the brand name of this dress?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'1',
            options: [
                {answer: 'Ted Baker', url:''},
                {answer: 'Vera Wang', url:''},
                {answer: 'BCBG', url:''},
                {answer: 'None of the above', url:''}
            ]
        },
        {
            url:'https://i0.wp.com/boroit.ca/wp-content/uploads/terani-silver-gown-1.jpg?fit=862%2C1024&ssl=1',
            price:'94',
            question:'Predict the rental price of this dress?',
            min:'50',
            max:'110',
            context:'$',
            subcategory:'dress',
            p_id:'2'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/25007210_148212529158646_8907124790167339008_n.jpg',
            price:'survey',
            question:'What type of event can you rent for?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'3',
            options: [
                {answer: 'Dinner', url:''},
                {answer: 'gala', url:''},
                {answer: 'wedding', url:''},
                {answer: 'All of the Above', url:''}
            ]
        },
        {
            url:'https://i2.wp.com/boroit.ca/wp-content/uploads/self-portrait-lace-yellow.jpg?fit=862%2C1024&ssl=1',
            price:'1',
            question:'Was this dress the most rented item of the Summer in 2017?',
            min:'0',
            max:'1',
            context:'',
            subcategory:'',
            p_id:'4'
        },
        {
            url:'https://i2.wp.com/boroit.ca/wp-content/uploads/black-sheep-green-front.jpg?fit=862%2C1024&ssl=1',
            price:'1',
            question:'What was the most rented dress of the Fall?',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'5',
            options: [
                {answer: 'A', url:'https://i0.wp.com/boroit.ca/wp-content/uploads/bluesparkle-front.jpg?fit=862%2C1024&ssl=1'},
                {answer: 'B', url:'https://i0.wp.com/boroit.ca/wp-content/uploads/keepsake-navy-lace-e1508767115758.jpg?fit=600%2C713&ssl=1'},
                {answer: 'C', url:'https://i1.wp.com/boroit.ca/wp-content/uploads/keepsake-2-piece.f.jpg?fit=862%2C1024&ssl=1'},
                {answer: 'D', url:'https://i2.wp.com/boroit.ca/wp-content/uploads/black-sheep-green-front.jpg?fit=862%2C1024&ssl=1'}
            ]                
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/23734241_132513780784119_7008778111810535424_n.jpg',
            price:'3',
            question:'How much water do you save each time you use Boro instead of buying new?',
            min:'2',
            max:'7',
            context:'bathtubs',
            subcategory:'',
            p_id:'6'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24175221_414973372250811_7636663641420333056_n.jpg',
            price:'3500',
            question:'if you use Boro once per month for a year, this leads to a savings of ?',
            min:'2500',
            max:'5000',
            context:'$',
            subcategory:'',
            p_id:'7'
        },
        {
            url:'https://scontent-yyz1-1.cdninstagram.com/t51.2885-15/e35/24178022_130806320921631_23203702550560768_n.jpg',
            price:'survey',
            question:'How does Boro deliver to its customers? ',
            min:'0',
            max:'3',
            context:'',
            subcategory:'',
            p_id:'8',
            options: [
                {answer: 'hand-delivery', url:''},
                {answer: 'mail', url:''},
                {answer: 'pickup', url:''},
                {answer: 'Any of the above', url:''}
            ]
        },
        {
            url:'https://i2.wp.com/boroit.ca/wp-content/uploads/ted-baker-front.jpg?fit=600%2C713&ssl=1',
            price:'550',
            question:'Predict the retail price of this dress?',
            min:'400',
            max:'870',
            context:'',
            subcategory:'dress',
            p_id:'9'
        }
    ];
    
    $scope.data = [];
    angular.copy($scope.boro_data,$scope.data);
    $scope.boro = true;
    $scope.prizeStartDate = moment('2017/12/14','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/12/29 23:59','YYYY/MM/DD kk:mm');
    $scope.gameEndTime = moment('2017/12/29 23:59','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    $scope.game = $scope.data[$scope.index];
    $scope.test = {start_time:null,end_time:null,menuhide:0,hideModal:true};
    $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    $scope.hide_question = false;
    $scope.show_radio = false;
    mocha.boro = true;
    mocha.appName = 'mocha_'+'boro';
    mocha.boro_data = $scope.boro_data;
    mocha.prizeEndDate = $scope.prizeEndDate;
    $scope.storeMode = 0;
    //console.log($scope.data);
    
    
    $scope.switchUp = function(){
        //console.log(game);
        if(mocha.safe($scope.game.options)){
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
    $scope.switchUp();
    
    $scope.boroSubmit = function(){
        mocha.submitPrediction($scope);
    };
    $scope.boroNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
    };
    $scope.resetGame = function(){
        angular.copy($scope.boro_data,$scope.data);
        mocha.resetGame($scope);
    };
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
    $scope.startBoro = function(){
        if(mocha.inStore === true){
            $state.go('/borostore');
        }else{
            $state.go('/borogame');
        }
    };
    $scope.goContest = function(){
        $scope.test.hideModal = true;
        mocha.test = $scope.test;
        if(mocha.safe(localStorage.name)){
            //Pull saved user data if it exists
            mocha.contest.name = localStorage.name;
            mocha.contest.phone = Number(localStorage.phone);
        }
        $state.go('/borocontest');
    };
    $scope.radioFunc = function(){
        $scope.test.price = $scope.test.price_radio;
        $scope.game.context = ($scope.test.price_radio === '1')? 'yes' : 'no';
    };
    $scope.inStore = function(){
        $scope.storeMode++;
        if($scope.storeMode >= 2){
            angular.element(document.querySelector('body'))[0].style.borderTopColor='#101010e6';
            $scope.footnote_msg = 'Store Mode Activated';
            mocha.inStore = true;
            $scope.footnote = true;
        }      
    };
    
});

myapp.controller('boro.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = mocha.checkWindow();
    if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/borodash');
        },3000);
    }
    
});

myapp.controller('boro.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
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
            $scope.contest.signup = (mocha.inStore == true)? 1 : 0;//signup means the player played in the store
            //$scope.contest.signup = 0;
            $scope.contest.size = $scope.mocha.contest.dress_size;
            $http.get('https://styleminions.co/api/borocontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup
            +"&dress_size="+$scope.contest.size)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                localStorage[mocha.appName+'_points'] = $scope.contest.points;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/boroleaderboard');
                $scope.loader = false;
            });
            console.log($scope.contest);
        }else{
            console.log('fuck no form not valid');
            //navigator.vibrate(1000);
            //console.log(form);
        }
    };

    
});

myapp.controller('boro.answer.controller', function($scope,$location,$state,$stateParams,$http,$window,$interval,mocha){
    $scope.mocha = mocha;
    $scope.showanswer = null;
    $scope.showEndDate = mocha.prizeEndDate.format('hh:mm a, DD/MM/YYYY');
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

myapp.controller('boro.test.controller', function($scope,$location,$state,$stateParams,$http,$timeout,$interval,mocha){
    if(mocha.inStore == true){
        //in store color
        angular.element(document.querySelector('body'))[0].style.borderTopColor='#101010e6';
    }else{
        //default color
        //angular.element(document.querySelector('body'))[0].style.borderTopColor='#008489';
        angular.element(document.querySelector('body'))[0].style.borderTopColor='#ff855b';
        $scope.playcolor = '#ff855b';
    }
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu boro-color';
    if(mocha.checkWindow() === true){
        $state.go('/');
    }

    $scope.button = [];
    $scope.$scope.basket = [];
    $scope.num = 2;
    $scope.autoplay = false;
    $scope.play = false;
    for(var x = 0; x<6; x++){
        $scope.button[x] = "panorama_fish_eye";
    }
    $scope.mindTracker = function (num){
        $scope.$scope.basket = [];
        $scope.collect$scope.Basket = [];
        $scope.news = null;
        $scope.level = num - 1;
        $scope.autoplay = true;
        $scope.play = true;
        $scope.status = [];
        $scope.color = null;
        for(var x=0; x < num; x++){
            loop(x);
            $scope.status.push('panorama_fish_eye');
        }
        function loop(item){
            let randomIndex = Math.floor(Math.random()*(5));
        
            if((x > 0 && randomIndex !== $scope.$scope.basket[item - 1]) || x === 0){
                $scope.$scope.basket.push(randomIndex);
            }else{
                loop(item);
            }
        }
        console.log($scope.$scope.basket);
        var index = 0;
        var previousIndex = 0;
        var milseconds = 700;
        var showNumber = $interval(function(){
            //console.log($scope.$scope.basket[index]);
            $scope.button[previousIndex] = 'panorama_fish_eye';
            $scope.button[$scope.$scope.basket[index]] = "lens";
            previousIndex = $scope.$scope.basket[index];
            index++;
            // if(num == index){
            //     clearInterval(showNumber);
            // }
        },milseconds,num)
        .then(function(){
            $timeout(function(){
                //console.log('heyyyyyyyyyyyyyy',previousIndex);
                $scope.button[previousIndex] = 'panorama_fish_eye';
                $scope.autoplay = false;

            },milseconds);
        });
    };

    $scope.collect = function(d){
        //console.log(d);
        if($scope.autoplay === false && $scope.play === true){
            $scope.collect$scope.Basket.push(d);
            if(d === $scope.$scope.basket[$scope.collect$scope.Basket.length - 1]){
                $scope.news = 'Right';
                $scope.color = 'green';
                $scope.status[$scope.collect$scope.Basket.length - 1] = 'check_circle';
                //console.log('right');
                if($scope.$scope.basket.length == $scope.collect$scope.Basket.length){
                    $scope.num++;
                    $scope.mindTracker($scope.num);
                }
            }else{
                $scope.news = 'Wrong - Play again';
                $scope.color = 'red';
                $scope.status[$scope.collect$scope.Basket.length - 1] = 'highlight_off';
                //safari will crash if you dont check for vibration capability which it does not have
                (navigator.__proto__.hasOwnProperty('vibrate')) ? navigator.vibrate(1000) : null;
                //console.log('wrong');
                reset();
                $scope.play = false;
            }
        }

    }

    function reset(){
        $scope.num = 2;
    }    

});

myapp.controller('boro.puzzle.controller', function($scope,$location,$state,$stateParams,$http,$timeout,$compile,mocha){

    $scope.waste = [];
    $scope.correct = [];
    $scope.dw,$scope.dh,$scope.draw;
    $scope.sw,$scope.sh;
    $scope.shuffle = [];
    $scope.basket =[];
    $scope.output = '';
    $scope.prog = 0;
    $scope.test= {end_time:null, start_time:null,time_result:null};
    $scope.mocha = mocha;
    $scope.drawCanvas =function(fWidth, fHeight){
        return new Promise(function(resolve,reject){
            canvas = angular.element(document.getElementById('canvas'))[0];
            
            ctx = canvas.getContext('2d');
            console.log(ctx)
            
            im = new Image()
            im.crossOrigin = 'Anonymous';
            im.src = 'https://scontent-yyz1-1.cdninstagram.com/vp/910f8924c3e593562c588e94a5aa94ab/5B1A5EC2/t51.2885-15/e35/26068716_209598079600867_1660830996863385600_n.jpg';
            //im.src = 'https://scontent-yyz1-1.cdninstagram.com/vp/192110115a0379f7200f2aabeac9a7e5/5B094E85/t51.2885-15/e35/11849357_536498379834099_188237789_n.jpg';
            //sw and sh are the wi$scope.dh and height of the image piece to be cut from the raw image
            im.onload = ()=>{
                var space = 2;
                var sw = Math.round((im.width - space*5)/5);
                var sh = Math.round((im.height - space*6)/6);
                
                //$scope.dw and $scope.dh are the height and width to be drawn on the canvas based on the aspect ratio of the raw image
                $scope.dw = Math.round((fWidth - space*5)/5);
                $scope.dh = Math.round((fHeight - space*6)/6);

                canvas.setAttribute('width',sw);
                canvas.setAttribute('height',sh);
                $scope.sw = sw;
                $scope.sh = sh;
                ctx.imageSmoothingQuality = "high";


                //ctx.$scope.drawImage(im,0,0,sw,sh,0,0,$scope.dw,$scope.dh)
                //by default i want 30 pieces of any image i.e 5 columns and 6 rows for mobile devices.
                for(let i = 0; i < 5; i++){
                    for(let j = 0; j < 6; j++){
                        //ctx.$scope.drawImage(im,i*(sw + 1),j*(sh + 1),sw,sh,i*($scope.dw + 5),j*($scope.dh + 5),$scope.dw,$scope.dh);
                        ctx.drawImage(im,i*(sw + 1),j*(sh + 1),sw,sh,0,0,sw,sh);
                        drawdata = {};  
                        drawdata.img = canvas.toDataURL('image/png', 1);
                        drawdata.x = i*($scope.dw + space);
                        drawdata.y = j*(Math.round(($scope.sh*$scope.dw)/$scope.sw) + space);
                        $scope.basket.push(drawdata);
                        ctx.clearRect(0,0,sw,sh);
                    }
                }
                
                //console.log($scope.basket);
                $scope.shuffle = $scope.basket.map((item)=>{return {x:item.x,y:item.y}})
                $scope.shuffle = mocha.randomize($scope.shuffle)
                resolve($scope.shuffle);
            }
        });    
        
        
    }
    $scope.setUp = function(w,h){
        
        $scope.drawCanvas(w,h)
        .then((data)=>{
            console.log('yeaaaaaaaaaah', $scope.basket);
            $scope.svg = angular.element(document.getElementById('svg'))[0];
            $scope.draw = SVG($scope.svg).size(w, h);
            //console.log($scope.basket);
            let z = 0;
            $scope.basket.forEach((item)=>{
                let elem = $scope.draw.image(item.img,$scope.dw,Math.round(($scope.sh*$scope.dw)/$scope.sw));
                elem.x($scope.shuffle[z].x);
                elem.y($scope.shuffle[z].y);
                elem.truth = {x:item.x,y:item.y};
                elem.attr('ng-buzz','yes');
                // elem.click(()=>{
                //     elem.animate(100).width($scope.dw - $scope.dw*0.3);
                //     if($scope.waste.length < 2){
                //         $scope.waste.push(elem);
                //     }
                //     if($scope.waste.length === 2 && $scope.waste[0].node.id !== $scope.waste[1].node.id ){
                //         let a = {x:$scope.waste[0].node.x.baseVal.value,
                //                     y:$scope.waste[0].node.y.baseVal.value,
                //                     truth: $scope.waste[0].truth
                //                 }
                //         let b = {x:$scope.waste[1].node.x.baseVal.value,
                //                     y:$scope.waste[1].node.y.baseVal.value,
                //                     truth: $scope.waste[1].truth
                //                 }
                //         SVG.get($scope.waste[0].node.id).animate(500).move(b.x,b.y).animate(100).width($scope.dw);
                //         SVG.get($scope.waste[1].node.id).animate(500).move(a.x,a.y).animate(100).width($scope.dw);
                //         $scope.checker(a,b);
                //         $scope.checker(b,a);
                //         $scope.waste = [];
                        
                //         //console.log(a,b)
                //     }else if($scope.waste.length === 2 && $scope.waste[0].node.id == $scope.waste[1].node.id){
                //         //this is the situation where the same box is touched
                //         elem.animate(100).width($scope.dw);
                //         $scope.waste = [];
                //     }
                //     //console.log(elem);
                // });
                
                elem.loaded (()=>{
                    //on initialization check if element is in the right position
                    let pos = {x:elem.node.x.baseVal.value,
                                    y:elem.node.y.baseVal.value
                                }
                    if(pos.x === elem.truth.x && pos.y === elem.truth.y){
                        $scope.correct.push(elem.truth.x+':'+elem.truth.y);
                    }
                    $scope.progressFunc();
                });
                
                z++;
                //elem.mouseout(()=>{elem.animate(100).width(50);});
            });
            $compile($scope.draw.node)($scope);
        });
        
    };
    
    var f = angular.element(document.getElementById('svg'))[0]
    $scope.setUp(f.clientWidth,f.clientHeight);

    $scope.checker = function(d,e){
			
        if(e.x === d.truth.x && e.y === d.truth.y){
            //Player is right
            if(!$scope.correct.includes(d.truth.x+':'+d.truth.y)){
                $scope.correct.push(d.truth.x+':'+d.truth.y);
                console.log('right boy')
            }
        }else{
            //player is wrong
            if($scope.correct.includes(d.truth.x+':'+d.truth.y)){
                let pos = $scope.correct.indexOf(d.truth.x+':'+d.truth.y)
                $scope.correct.splice(pos,1);
            }
            console.log('wrong boy')
        }
        
        if($scope.correct.length === 30){
            //$scope.draw.text('you win').move(50,50);
            $scope.output = 'Completed'
            $scope.test.time_result = mocha.gameTimePlayed($scope).split(':');
            console.log('THE END FAM')
        }
    }

    $scope.progressFunc = function(){
        $scope.prog = (($scope.correct.length)/30)*100;
    };

    $scope.isStarted = function(){
        if($scope.test.start_time === null){
            $scope.test.start_time = moment();
        }
    };

});

myapp.directive('ngBuzz', function() {
    return{
        link: function($scope,elem,attrs){       
            
            elem.bind('touchstart', function() {
                $scope.isStarted();
                elem[0].instance.animate(100).width($scope.dw - $scope.dw*0.3);
                if($scope.waste.length < 2){
                    $scope.waste.push(elem[0].instance);
                }
                //$scope.waste[0].animate(500).move(0,0).animate(100).width($scope.dw);
                if($scope.waste.length === 2 && $scope.waste[0].node.id !== $scope.waste[1].node.id ){
                    var a = {x:$scope.waste[0].node.x.baseVal.value,
                                y:$scope.waste[0].node.y.baseVal.value,
                                truth: $scope.waste[0].truth
                            }
                    var b = {x:$scope.waste[1].node.x.baseVal.value,
                                y:$scope.waste[1].node.y.baseVal.value,
                                truth: $scope.waste[1].truth
                            }
                    $scope.waste[0].animate(500).move(b.x,b.y).animate(100).width($scope.dw);
                    
                    $scope.waste[1].animate(500).move(a.x,a.y).animate(100).width($scope.dw);
                    
                    $scope.checker(a,b);
                    $scope.checker(b,a);
                    $scope.progressFunc();
                    $scope.waste = [];
                    
                }else if($scope.waste.length === 2 && $scope.waste[0].node.id == $scope.waste[1].node.id){
                    //this is the situation where the same box is touched
                    elem[0].instance.animate(100).width($scope.dw);
                    $scope.waste = [];
                    console.log('i failed in life');
                }
               console.log('am alive bitch',elem[0].instance);
               $scope.$apply();
            });
        }
    }
});