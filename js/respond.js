jQuery.noConflict();

(function( $ ) {


/****************** CONTROLS *******************/    
    
// LOCAL STORAGE
    $('#btn-control').attr('class', localStorage.icon);
    $('#app-size').attr('class', localStorage.iconAppStar);
    $('#app-sound').attr('class', localStorage.iconAppSound);
    $('#tempo-sound').attr('class', localStorage.iconAppTempoSound);
    
    $('.stopwatch').css('width', localStorage.appWidth);
    $('.stopwatch').css('height', localStorage.appHeight);

    
// SHOW CONTROLS
    $('#controls').on('click', function() {
        $('.control-back').fadeIn();
    });
    
    
// HIDE CONTROLS
    $('#hide').on('click', function() {
        $('.control-back').fadeOut();
    });
    
    
// BUTTON CONTROL ON-OFF
    var onBtn = $('.fa .fa-toggle-on');
    var icon = $('.control-btn i');
    
    $('#btn-control').on('click', function(){
        var $this = $(this);
        
   // BUTTON CONTROL ON-OFF
        $this.toggleClass('fa fa-toggle-on').toggleClass('fa fa-toggle-off');
        
   // SAVE BUTTON - LOCAL STORAGE
        var icon = $this.attr('class');
            localStorage.icon = icon;
    });


// SOUND CONTROL    
    $('#app-sound').on('click', function(){
        var $this = $(this);
        
        // BUTTON CONTROL ON-OFF
        $this.toggleClass('fa fa-toggle-on').toggleClass('fa fa-toggle-off');
        
        // SAVE BUTTON - LOCAL STORAGE
        var soundIcon = $this.attr('class');
            localStorage.iconAppSound = soundIcon;
        
        // SOUND ON - OFF
        if ($this.hasClass('fa-toggle-off')) {
            $('#beep-sound-07').prop('muted', false);
        }
    });
    
// TEMPO CONTROL    
    $('#tempo-sound').on('click', function(){
        var $this = $(this);
        
        // BUTTON CONTROL ON-OFF
        $this.toggleClass('fa fa-toggle-on').toggleClass('fa fa-toggle-off');
        
        // SAVE BUTTON - LOCAL STORAGE
        var soundIcon = $this.attr('class');
            localStorage.iconAppTempoSound = soundIcon;
        
        // SOUND ON - OFF
        if ($this.hasClass('fa-toggle-off')) {
            $('#tempo-s').prop('muted', false);
        }
    });
    

    
// CHANGE APP SIZE
    
    var $app =  $('.stopwatch');
    var $width = $(window).width();
    
    $('#app-size').on('click', function() {
        var $this = $(this);
        var icon = $('.control-btn i');
                
     // BUTTON CONTROL ON-OFF
        $this.toggleClass('fa fa-toggle-on').toggleClass('fa fa-toggle-off');
        
     // SAVE BUTTON - LOCAL STORAGE
        var icon = $this.attr('class');
            localStorage.iconAppStar = icon;
        
        
     // CHECK FOR CLASS
        if($this.hasClass('fa fa-toggle-off')) {
            
            $app.css({
                'width': '100%',
                'height': '100%'
            });
            
        } else {
            
            if($width < 1000) {
                $app.css({                
                    'width': '100%',
                    'height': '350px'
                    });
            }else {
                localStorage.clear();
                $app.css({                
                    'width': '970px',
                    'height': '350px'
                    });
                setTimeout(function(){
                    localStorage.clear();
                }, 1200);
                }
            
            }
            setTimeout(function(){
                var appWidth = $app.css('width');
                var appHeight = $app.css('height');
                localStorage.appWidth = appWidth;
                localStorage.appHeight = appHeight;
            }, 1000);
        });
    
      
        

    
    

    
    

    
    
    

}) ( jQuery );