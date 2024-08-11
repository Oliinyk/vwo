jQuery( document ).ready( function( $ ) {
    console.log('Link test is ready');

    var carousel = $('#carousel'),
        threshold = 150,
        slideWidth = 300,
        dragStart, 
        dragEnd;

    jQuery(document).on("click","#next",function() {
        console.log('Test-link-111');
        jQuery(this).toggleClass('111');
        shiftSlide(-1) 
    })
    jQuery(document).on("click","#prev",function() {
        console.log('Test-link-222');
        shiftSlide(1) 
    })

    carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
        dragEnd = event.pageX;
        $(this).css('transform','translateX('+ dragPos() +'px)')
    })
    $(document).on('mouseup', function(){
        if (dragPos() > threshold) { return shiftSlide(1) }
        if (dragPos() < -threshold) { return shiftSlide(-1) }
        shiftSlide(0);
    })
    });

    function dragPos() {
    return dragEnd - dragStart;
    }

    function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
        if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
        } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
        }
        carousel.removeClass('transition')
        carousel.css('transform','translateX(0px)'); 
    },700)
    }

});