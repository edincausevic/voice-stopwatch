

$(document).ready(function() {

    (function($){
    

/****************** STOPWATCH *******************/
        
        $.extend({
            
            APP : {                
                
                formatTimer : function(a) {
                    if (a < 10) {
                        a = '0' + a;
                    }                              
                    return a;
                },    
                
                startTimer : function(dir) {
                    
                    var a;
                    
                    // save type
                    $.APP.dir = dir;
                    
                    // get current date
                    $.APP.d1 = new Date();
                    
                    switch($.APP.state) {
                            
                        case 'pause' :
                            
                            // resume timer
                            // get current timestamp (for calculations) and
                            // substract time difference between pause and now
                            $.APP.t1 = $.APP.d1.getTime() - $.APP.td;                            
                            
                        break;
                            
                        default :
                            
                            // get current timestamp (for calculations)
                            $.APP.t1 = $.APP.d1.getTime(); 
                            
                            // if countdown add ms based on seconds in textfield
                            if ($.APP.dir === 'cd') {
                                $.APP.t1 += parseInt($('#cd_seconds').val())*1000;
                            }    
                        
                        break;
                            
                    }                                   
                    
                    // reset state
                    $.APP.state = 'alive';   
                    $('#' + $.APP.dir + '_status').html('Running');
                    
                    // start loop
                    $.APP.loopTimer();
                    
                },
                
                pauseTimer : function() {
                    
                    // save timestamp of pause
                    $.APP.dp = new Date();
                    $.APP.tp = $.APP.dp.getTime();
                    
                    // save elapsed time (until pause)
                    $.APP.td = $.APP.tp - $.APP.t1;
                    
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Resume');
                    
                    // set state
                    $.APP.state = 'pause';
                    $('#' + $.APP.dir + '_status').html('Paused');
                    
                },
                
                stopTimer : function() {
                    
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Restart');                    
                    
                    // set state
                    $.APP.state = 'stop';
                    $('#' + $.APP.dir + '_status').html('Stopped');
                    
                },
                
                resetTimer : function() {

                    // reset display
                    $('#' + $.APP.dir + '_ms,#' + $.APP.dir + '_s,#' + $.APP.dir + '_m,#' + $.APP.dir + '_h').html('00');                 
                    
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Start');                    
                    
                    // set state
                    $.APP.state = 'reset';  
                    $('#' + $.APP.dir + '_status').html('Reset & Idle again');
                    
                },
                
                endTimer : function(callback) {
                   
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Restart');
                    
                    // set state
                    $.APP.state = 'end';
                    
                    // invoke callback
                    if (typeof callback === 'function') {
                        callback();
                    }    
                    
                },    
                
                loopTimer : function() {
                    
                    var td;
                    var d2,t2;
                    
                    var ms = 0;
                    var s  = 0;
                    var m  = 0;
                    var h  = 0;
                    
                    if ($.APP.state === 'alive') {
                                
                        // get current date and convert it into 
                        // timestamp for calculations
                        d2 = new Date();
                        t2 = d2.getTime();   
                        
                        // calculate time difference between
                        // initial and current timestamp
                        if ($.APP.dir === 'sw') {
                            td = t2 - $.APP.t1;
                        // reversed if countdown
                        } else {
                            td = $.APP.t1 - t2;
                            if (td <= 0) {
                                // if time difference is 0 end countdown
                                $.APP.endTimer(function(){
                                    $.APP.resetTimer();
                                    $('#' + $.APP.dir + '_status').html('Ended & Reset');
                                });
                            }    
                        }    
                        
                        // calculate milliseconds
                        ms = td%1000;
                        if (ms < 1) {
                            ms = 0;
                        } else {    
                            // calculate seconds
                            s = (td-ms)/1000;
                            if (s < 1) {
                                s = 0;
                            } else {
                                // calculate minutes   
                                var m = (s-(s%60))/60;
                                if (m < 1) {
                                    m = 0;
                                } else {
                                    // calculate hours
                                    var h = (m-(m%60))/60;
                                    if (h < 1) {
                                        h = 0;
                                    }                             
                                }    
                            }
                        }
                      
                        // substract elapsed minutes & hours
                        ms = Math.round(ms/100);
                        s  = s-(m*60);
                        m  = m-(h*60);                                
                        
                        // update display
                        $('#' + $.APP.dir + '_ms').html($.APP.formatTimer(ms));
                        $('#' + $.APP.dir + '_s').html($.APP.formatTimer(s));
                        $('#' + $.APP.dir + '_m').html($.APP.formatTimer(m));
                        $('#' + $.APP.dir + '_h').html($.APP.formatTimer(h));
                        
                        // loop
                        $.APP.t = setTimeout($.APP.loopTimer,1);
                    
                    } else {
                    
                        // kill loop
                        clearTimeout($.APP.t);
                        return true;
                    
                    }  
                    
                }
                    
            }    
        
        });
        
// SELECTING BUTTONS AND SOUNDS
        
        var $sayHtml = $(".menu-container .say");
        var $btnHtml = $(".btn");
        var $buttonCheck = $('#btn-control').hasClass('fa fa-toggle-off');

// BUTTON EFFECT 
        function buttonClickEffect() {
            $sayHtml.show();
            $btnHtml.removeClass("play-btn-js");
        }
        
        function buttonClickStart() {
            $sayHtml.first().hide();
            $btnHtml.first().addClass("play-btn-js");
        }
        
        function buttonClickStop() {
            $sayHtml.eq(1).hide();
            $btnHtml.eq(1).addClass("play-btn-js");
        } 
        
        function buttonClickReset() {
            $btnHtml.eq(2).addClass("play-btn-js");
            setTimeout(function(){
                $btnHtml.eq(2).removeClass("play-btn-js");
            }, 200);
        }
        
        
// BUTTON SOUND 
        function buttonSound(e) {
            if ($('#app-sound').hasClass('fa-toggle-off')) {
                    e.preventDefault();
                }else {
                    $("#beep-sound").trigger('play');
                }
        }
        
        
// TEMPO SOUND
            function tempoSound(e) {
                if ($('#tempo-sound').hasClass('fa-toggle-off')) {
                    e.preventDefault();
                }else {
                    $("#tempo").trigger('play');
                }
            }
        
        function pauseTempo() {
            $("#tempo").trigger('pause');
        }

        function stopTempo() {
            $("#tempo").trigger('pause');
            $("#tempo").prop("currentTime",0);
        }
    
//START BUTTON      
        $('#sw_start').on('click', function(e) {
            if($('#btn-control').hasClass('fa fa-toggle-off')) {
                e.preventDefault();
                $(document).off('keypress');
            } else {
                $.APP.startTimer('sw');
                buttonClickEffect();
                buttonClickStart();
                buttonSound();
                tempoSound();
            }
        });    

        $('#cd_start').on('click', function() {
            $.APP.startTimer('cd');
        });           
        
//STOP BUTTON
        $('#sw_stop').on('click', function(e) {
            var s = $('#sw_s').text();
            var ms = $('#sw_ms').text();
            
            if($('#btn-control').hasClass('fa fa-toggle-off') || (s == 0 && ms == 0)) {
                buttonSound();
                e.preventDefault();
            } else {
                //$.APP.stopTimer();
                $.APP.pauseTimer();
                buttonClickEffect();
                buttonClickStop();
                buttonSound();
                pauseTempo();
            }
        });
//RESET BUTTON        
        $('#sw_reset,#cd_reset').on('click', function(e) {
            if($('#btn-control').hasClass('fa fa-toggle-off')) {
                e.preventDefault();
            } else {
                $.APP.resetTimer();
                buttonClickEffect();
                buttonClickReset();
                buttonSound();
                stopTempo();
            }
            
        });  
        
        $('#sw_pause,#cd_pause').on('click', function() {
            $.APP.pauseTimer();
        });     
        
// KEYBOARD STOPWATCH CONTROL
        var clickSwitch = true;

        $(document).on('keypress', function(e){
            var s = $('#sw_s').text();
            var ms = $('#sw_ms').text();
            
          if (e.which == 32){
            if(clickSwitch) {
              $.APP.startTimer('sw');  
              clickSwitch = false;
              buttonClickEffect();
              buttonClickStart();  
              buttonSound();    
            }else {
                  $.APP.pauseTimer();
                  clickSwitch = true;
                  buttonClickEffect();    
                  buttonClickStop();   
                  buttonSound();   
            }  
          }
        });
        
        $(document).on('keypress', function(e){
            if (e.which == 13) {
                $.APP.stopTimer();
                $.APP.resetTimer();
                buttonClickEffect();
                buttonClickReset();
                buttonSound();
            }
        });


        
        
/**************** VOICE CONTROLE ********************/
        
        
        
        if (annyang) {
          // Let's define our first command. First the text we expect, and then the function it should call
          var commands = {
            'fitness start': function() {
                $.APP.startTimer('sw');
                $sayHtml.show();
                $sayHtml.first().hide();
                $btnHtml.removeClass("play-btn-js");
                $btnHtml.first().addClass("play-btn-js");
                $("#beep-sound").trigger('play');
            },
              
            'fitness stop': function() {
                //$.APP.stopTimer();
                $.APP.pauseTimer();
                $sayHtml.show();
                $sayHtml.eq(1).hide();
                $btnHtml.removeClass("play-btn-js");
                $btnHtml.eq(1).addClass("play-btn-js");
                $("#beep-sound").trigger('play');
            },
              
            'fitness reset': function() {
                $.APP.resetTimer();
                $sayHtml.show();
                $btnHtml.removeClass("play-btn-js");
                $btnHtml.eq(2).addClass("play-btn-js");
                setTimeout(function(){
                    $btnHtml.eq(2).removeClass("play-btn-js");
                }, 200);
                $("#beep-sound").trigger('play');
            }
          };

          // Add our commands to annyang
          annyang.addCommands(commands);

          // Start listening. You can call this here, or attach this call to an event, button, etc.
          annyang.start();
        }
        
        
        
               
    })(jQuery);
        
});





