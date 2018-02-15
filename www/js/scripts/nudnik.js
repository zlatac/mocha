//nudnik DIRECTIVES
myapp.directive('nudnikMenuHeader', function() {
    return {
      templateUrl: 'views/nudnik/nudnik.menu-header.html'
    };
});

myapp.directive('nudnikResultModal', function() {
    return {
      templateUrl: 'views/nudnik/nudnik.result.html'          
    };
});

//nudnik CONTROLLERS BELOW
myapp.controller('nudnik.dash.controller', function($scope,$location,$rootScope,$state,$stateParams,$http,$window,$timeout,mocha){
    angular.element(document.querySelector('body'))[0].style.borderTopColor='#f0595d';
    //angular.element(document.querySelector('a.btn-menu.main-color'))[0].className = 'btn-menu nudnik-color';
 
    
    // $scope.data = [];
    // angular.copy($scope.nudnik_data,$scope.data);
    $scope.nudnik = true;
    $scope.prizeStartDate = moment('2017/02/01','YYYY/MM/DD');
    $scope.prizeEndDate = moment('2017/02/14 18:00','YYYY/MM/DD kk:mm');
    //$scope.game = $scope.data[0];
    $scope.index = 0;
    // $scope.game = $scope.data[$scope.index];
    
    // $scope.test.price = $scope.test.second_price = Number($scope.game.max);
    // mocha.startTime($scope);
    $scope.mocha = mocha; // expose service to the view
    // $scope.hide_question = false;
    // $scope.show_radio = false;
    mocha.nudnik = true;
    mocha.appName = 'mocha_'+'nudnik';
    // mocha.nudnik_data = $scope.nudnik_data;
    mocha.prizeEndDate = $scope.prizeEndDate;
    //console.log($scope.data);

    
    
    
   
    
    $scope.nudnikSubmit = function(){mocha.submitPrediction($scope)};
    $scope.nudnikNextProduct = function(){
        mocha.nextProduct($scope);
        $scope.switchUp();
        $scope.test.select = '';
        $scope.test.price = '';
    };
    $scope.resetGame = function(){mocha.resetGame($scope)};
    $scope.inputShow = function(){mocha.inputShow($scope)};
    $scope.menuHide = function(){mocha.menuHide($scope)};
   
    $scope.startNudnik = function(){
        $state.go('/nudnikgame');
    };
    
    
    
});

myapp.controller('nudnik.game.controller', function($scope,$location,$compile,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.test = {start_time:null,end_time:null,time_result:null,menuhide:0,hideModal:true};
    $scope.waste = [];
    $scope.correct = [];
    $scope.dw,$scope.dh,$scope.draw;
    $scope.sw,$scope.sh;
    $scope.shuffle = [];
    $scope.basket =[];
    $scope.output = '';
    $scope.prog = 0;
    $scope.picColumn = 2;
    $scope.picRow = 2;
    $scope.puzzLevel = 1;
    $scope.drawCanvas =function(fWidth, fHeight){
        return new Promise(function(resolve,reject){
            canvas = angular.element(document.getElementById('canvas'))[0];
            
            ctx = canvas.getContext('2d');
            //console.log(ctx)
            
            im = new Image()
            im.crossOrigin = 'Anonymous';
            //perfect on mobile for any image dimensions (square, 3:4 ratio and 4:3 ratio)
            //good on desktop for only square and 4:3 ratio image dimensions
            im.srcdefault = 'https://scontent-yyz1-1.cdninstagram.com/vp/a0f1f9b8a2924eb3869b5d71b3bb4fb9/5B184CB1/t51.2885-15/e35/26863250_2004244896455821_3703496126918295552_n.jpg';
            //only use instagram image links in url query
            im.src = location.hash.includes('q=') ? location.hash.split('=')[1].replace(/%2F/gi,'/') : im.srcdefault;
            
            //sw and sh are the wi$scope.dh and height of the image piece to be cut from the raw image
            im.onload = ()=>{
                
                if(im.height > im.width && window.innerWidth > 768){
                    //this turns the image into a square (1:1) dimension only on desktop
                    //to then be used as an image for the puzzle
                    let width = im.width;
                    let height = im.height;
                    canvas.setAttribute('width',width);
                    canvas.setAttribute('height',width);
                    ctx.imageSmoothingQuality = "high";
                    ctx.drawImage(im,0,0,width,width,0,0,width,width);
                    im.src = canvas.toDataURL('image/png', 1); //this triggers the image onload() method

                }else{
                    //this continues the task normally either after square transformation or when the if block requirement isn't met
                    var space = 2;
                    var sw = Math.round((im.width - space * $scope.picColumn)/$scope.picColumn);
                    var sh = Math.round((im.height - space* $scope.picRow)/$scope.picRow);
                    
                    //$scope.dw and $scope.dh are the height and width to be drawn on the canvas based on the aspect ratio of the raw image
                    $scope.dw = Math.round((fWidth - space * $scope.picColumn)/ $scope.picColumn);
                    $scope.dh = Math.round((fHeight - space * $scope.picRow)/$scope.picRow);

                    canvas.setAttribute('width',sw);
                    canvas.setAttribute('height',sh);
                    $scope.sw = sw;
                    $scope.sh = sh;
                    ctx.imageSmoothingQuality = "high";


                    //ctx.$scope.drawImage(im,0,0,sw,sh,0,0,$scope.dw,$scope.dh)
                    //by default i want 30 pieces of any image i.e 5 columns and 6 rows for mobile devices.
                    for(let i = 0; i < $scope.picColumn; i++){
                        for(let j = 0; j < $scope.picRow; j++){
                            //ctx.$scope.drawImage(im,i*(sw + 1),j*(sh + 1),sw,sh,i*($scope.dw + 5),j*($scope.dh + 5),$scope.dw,$scope.dh);
                            ctx.drawImage(im,i*(sw + 1),j*(sh + 1),sw,sh,0,0,sw,sh);
                            drawdata = {};  
                            drawdata.img = canvas.toDataURL('image/png', 1);
                            drawdata.x = i*($scope.dw + space);
                            drawdata.y = j*(Math.round(($scope.sh*$scope.dw)/$scope.sw) + space);
                            $scope.basket.push(drawdata);
                            //ctx.clearRect(0,0,sw,sh);
                        }
                    }
                    
                    //console.log($scope.basket);
                    $scope.shuffle = $scope.basket.map((item)=>{return {x:item.x,y:item.y}})
                    $scope.shuffle = mocha.randomize($scope.shuffle)
                    resolve($scope.shuffle);

                }               
                
            }
            
            im.onerror = ()=>{
                im.src = im.srcdefault;
            }
        });    
        
        
    }
    $scope.setUp = function(w,h){
        $scope.loader = true;
        $scope.picBoxes = $scope.picColumn * $scope.picRow;
        $scope.footnote_hide = false;
        $scope.footnote = true;
        $scope.footnote_msg = $scope.puzzLevel < 2 ? 'Round ' + $scope.puzzLevel : 'Final Round';
        $scope.drawCanvas(w,h)
        .then((data)=>{
            //console.log('yeaaaaaaaaaah', $scope.basket);
            if(!mocha.safe($scope.draw)){
                $scope.svg = angular.element(document.getElementById('svg'))[0];
                $scope.draw = SVG($scope.svg).size(w, h);
            }
            
            //console.log($scope.basket);
            let z = 0;
            $scope.basket.forEach((item)=>{
                //let elem = $scope.draw.image(item.img,$scope.dw,$scope.dh);
                let elem = $scope.draw.image(item.img,$scope.dw,Math.round(($scope.sh*$scope.dw)/$scope.sw));
                elem.x($scope.shuffle[z].x);
                elem.y($scope.shuffle[z].y);
                elem.truth = {x:item.x,y:item.y};
                elem.attr('ng-buzz','yes');
                
                elem.loaded (()=>{
                    //on initialization check if element is in the right position
                    let pos = {x:elem.node.x.baseVal.value,
                                    y:elem.node.y.baseVal.value
                                }
                    if(pos.x === elem.truth.x && pos.y === elem.truth.y){
                        $scope.correct.push(elem.truth.x+':'+elem.truth.y);
                    }
                    $scope.progressFunc();
                    $scope.isLevelCompleted();//sometimes the randomized data can be exactly solved on the first round
                });
                
                z++;
                //elem.mouseout(()=>{elem.animate(100).width(50);});
            });
            $compile($scope.draw.node)($scope); //this is important for the new elements added to the DOM to be compiled by angular
            $scope.loader = false;
            $scope.$apply();
        });
        
    };
    
    $scope.svgSpace = angular.element(document.getElementById('svg'))[0]
    $scope.setUp($scope.svgSpace.clientWidth,$scope.svgSpace.clientHeight);
    
    

    $scope.checker = function(d,e){
			
        if(e.x === d.truth.x && e.y === d.truth.y){
            //Player is right
            if(!$scope.correct.includes(d.truth.x+':'+d.truth.y)){
                $scope.correct.push(d.truth.x+':'+d.truth.y);
                //console.log('right boy')
            }
        }else{
            //player is wrong
            if($scope.correct.includes(d.truth.x+':'+d.truth.y)){
                let pos = $scope.correct.indexOf(d.truth.x+':'+d.truth.y)
                $scope.correct.splice(pos,1);
            }
            //console.log('wrong boy')
        }

        $scope.isLevelCompleted();
        
        
    }

    $scope.isLevelCompleted = function(){
        if($scope.correct.length === $scope.picBoxes){
            //$scope.draw.text('you win').move(50,50);
            $scope.output = 'Completed'
            $scope.test.time_result = mocha.gameTimePlayed($scope).split(':');
            $scope.mocha.tones('f',5,500);
            //$scope.mocha.vibrate(2000);
            $timeout(()=>{
                $scope.levelUp();
            },2000)
            //console.log('THE END FAM')
        }
    };

    $scope.progressFunc = function(){
        $scope.prog = (($scope.correct.length)/$scope.picBoxes)*100;
    };

    $scope.isStarted = function(){
        if($scope.test.start_time === null){
            $scope.test.start_time = moment();
        }
    };

    $scope.levelUp = function(){
        if($scope.puzzLevel < 2){
            $scope.draw.clear();
            $scope.waste = [];
            $scope.correct = [];
            $scope.dw,$scope.dh,$scope.draw;
            $scope.sw,$scope.sh;
            $scope.shuffle = [];
            $scope.basket =[];
            $scope.prog = 0;
            $scope.picColumn = 6;
            $scope.picRow = 6;
            $scope.puzzLevel += 1;
            $scope.setUp($scope.svgSpace.clientWidth,$scope.svgSpace.clientHeight);
        }else{
            // game is finished and time to move on
            $scope.test.hideModal = false;
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
        $state.go('/nudnikcontest');
    };
    
});

myapp.controller('nudnik.login.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.screen_big = false;
    //if($scope.screen_big !== true){
        //This mimics a real life game loading thing. this can definitely be optimized later.
        $timeout(function(){
            $state.go('/nudnikdash');
        },3000);
    //}
    
});

myapp.controller('nudnik.contest.controller', function($scope,$location,$state,$stateParams,$http,$window,$timeout,mocha){
    $scope.loader = false;
    $scope.mocha = mocha;
    $scope.mocha.contest.signup =true;
    $scope.contestSubmit = function(form){
        if(form.$valid){
            $scope.loader = true;
            $scope.contest = {};
            $scope.contest.timestamp = moment().toISOString();
            $scope.contest.points = -100;
            $scope.contest.playtime = $scope.mocha.test.timePlayed;
            $scope.contest.played_data = JSON.stringify({});
            //$scope.contest.signup = ($scope.mocha.contest.signup == true)? 1 : 0;
            $scope.contest.signup = 0;
            $http.get('https://styleminions.co/api/nudnikcontest?name='+$scope.mocha.contest.name+"&email="+
            $scope.mocha.contest.email+"&timestamp="+$scope.contest.timestamp+"&points="+$scope.contest.points
            +"&playtime="+$scope.contest.playtime+"&played_data="+$scope.contest.played_data+"&signup="+$scope.contest.signup)
            .then(function(res){
                localStorage.name = $scope.mocha.contest.name;
                localStorage.email = $scope.mocha.contest.email;
                localStorage[mocha.appName+'_points'] = $scope.contest.points;
                localStorage[mocha.appName+'_playtime'] = $scope.contest.playtime;
                //This allows a player to play games from different clients on MochaX without any clash
                localStorage[mocha.appName] = JSON.stringify({'prizeplaydate':moment().toISOString()});
                //$scope.thankyou = true;
                //$scope.resetGame('dash');
                $state.go('/nudnikleaderboard');
                $scope.loader = false;
            });
        }else{
            console.log('fuck no form not valid');
            //console.log(form);
        }
    };

    
});

