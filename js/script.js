/*-----------  nav bar --------------- */
$(window).scroll(function(){
    $('nav').toggleClass('scrolled', $(this).scrollTop ()> 520);
    $('a').toggleClass('scrolled', $(this).scrollTop ()> 100);
    });

/*------------------ aos ----------------*/  


