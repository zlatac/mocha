/*

Style   : MobApp Script JS
Version : 1.0
Author  : Surjith S M
URI     : https://surjithctly.in/

Copyright © All rights Reserved 

*/

$(function() {
    "use strict";

    /*-----------------------------------
     * FIXED  MENU - HEADER
     *-----------------------------------*/
    function menuscroll() {
        var $navmenu = $('.nav-menu');
        if ($(window).scrollTop() > 50) {
            $navmenu.addClass('is-scrolling');
        } else {
            $navmenu.removeClass("is-scrolling");
        }
    }
    menuscroll();
    $(window).on('scroll', function() {
        menuscroll();
    });
    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });
    /* 
     * NAVBAR TOGGLE BG
     *-----------------*/
    var siteNav = $('#navbar');
    siteNav.on('show.bs.collapse', function(e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    })
    siteNav.on('hide.bs.collapse', function(e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    })

    /*-----------------------------------
     * ONE PAGE SCROLLING
     *-----------------------------------*/
    // Select all links with hashes
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').on('click', function(event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
    /*-----------------------------------
     * OWL CAROUSEL
     *-----------------------------------*/
    var $testimonialsDiv = $('.testimonials');
    if ($testimonialsDiv.length && $.fn.owlCarousel) {
        $testimonialsDiv.owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
        });
    }

    var $galleryDiv = $('.img-gallery');
    if ($galleryDiv.length && $.fn.owlCarousel) {
        $galleryDiv.owlCarousel({
            nav: false,
            center: true,
            loop: true,
            autoplay: true,
            dots: true,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });
    }

    function safe(a){
        if(a === undefined || a === null || a === ''){
            return false;
        }
        return true;
    }

    var submitButton = $('#call');
    var nameForm = $('#nf');
    var emailForm = $('#ef');
    var msgForm = $('#mf');
    var formArray = [];
    formArray.push(nameForm,emailForm,msgForm);
    submitButton.on('click', (e)=>{
        e.preventDefault();
        switchButton('sending');
        var nf = nameForm[0].value;
        var ef = emailForm[0].value
        var mf = msgForm[0].value
        if(safe(nf) && safe(ef) && safe(mf)){
            console.log('yess safe as fuck');
            $.ajax({
                url: "https://styleminions.co/api/mail",
                type: 'POST',
                data: {
                  name: nf,
                  email: ef,
                  message: mf
                },
                success: function( result ) {
                  console.log(result);
                  switchButton('sent');
                  setTimeout(()=>{
                    formArray.forEach((e)=>{
                        e.val('');
                    });
                    switchButton('call');
                  }, 5000);
                },
                error: function(result){
                    console.log(result)
                }
            });
        }else{
            verify();
            switchButton('call');
            console.error('ruuun bitch0');
        }
    });

    function switchButton(x){
        var buttons = $('form button');
        //remjove all buttons first       
        buttons[0].style.display = 'none';
        buttons[1].style.display = 'none';
        buttons[2].style.display = 'none';
        //display the actual button necessary
        $('#'+ x)[0].style.display = 'block';
    }

    function verify(){
        formArray.forEach((e)=>{
            if(!safe(e.val())){
                e.addClass('inputError');
            }
        });
    }

}); /* End Fn */