/**
 * A group of pathes where people earn points for sharing
 * @param Array
 **/
var gamifiedPaths = ['/training/faith-and-tech'];
/*-----------------------------------------------------------------------------------*/
/*	OWL CAROUSEL
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    
     $(".owlcarousel").owlCarousel({
        navigation: true,
        navigationText : ['<i class="icon-left-open"></i>','<i class="icon-right-open"></i>'],
        pagination: false,
        rewindNav: false,
        items: 3,
        mouseDrag: true,
        itemsDesktop: [1200, 3],
        itemsDesktopSmall: [1024, 3],
        itemsTablet: [970, 2],
        itemsMobile: [767, 1]
    });
    
    $(".owl-clients").owlCarousel({

        autoPlay: 9000,
        rewindNav: false,
        items: 6,
        itemsDesktop: [1200, 6],
        itemsDesktopSmall: [1024, 4],
        itemsTablet: [768, 3],
        itemsMobile: [480, 2],
        navigation: false,
        pagination: false

    });
    
    var owl = $(".owl-portfolio-slider");

    owl.owlCarousel({
        navigation: false,
        autoHeight: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });

    // Custom Navigation Events
    $(".slider-next").click(function () {
        owl.trigger('owl.next');
    })
    $(".slider-prev").click(function () {
        owl.trigger('owl.prev');
    });

    $('ul#social-share-nav li a').hover(function() {
        $(this).css('margin-left', '0px');
    }, function() {
        $(this).css('margin-left', '-20px');
    });

    /**
     * Handle the clicking of share links
     **/
    $('ul#social-share-nav li.facebook a').click(
        function(event) {
            FB.ui({
              method: 'share',
              href: document.URL,
            }, function(response) {
                if ($.inArray(location.pathname, gamifiedPaths)!== -1) {
                    gamifyIncreasePoints();
                };
            });
            return false;
        }
    );
});
/*-----------------------------------------------------------------------------------*/
/*	FANCYBOX
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    $(".fancybox-media").fancybox({
        arrows: true,
        padding: 0,
        closeBtn: true,
        openEffect: 'fade',
        closeEffect: 'fade',
        prevEffect: 'fade',
        nextEffect: 'fade',
        helpers: {
            media: {},
            overlay: {
                locked: false
            },
            buttons: false,
            thumbs: {
                width: 50,
                height: 50
            },
            title: {
                type: 'inside'
            }
        },
        beforeLoad: function () {
            var el, id = $(this.element).data('title-id');
            if (id) {
                el = $('#' + id);
                if (el.length) {
                    this.title = el.html();
                }
            }
        }
    });
});
/*-----------------------------------------------------------------------------------*/
/*	TABS
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    $('.tabs.services').easytabs({
        animationSpeed: 300,
        updateHash: false,
        cycle: 5000
    });
});
$(document).ready(function () {
    $('.tabs.tabs-top, .tabs.tabs-side').easytabs({
        animationSpeed: 300,
        updateHash: false
    });
});

/*-----------------------------------------------------------------------------------*/
/*	TESTIMONIALS
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    $('#testimonials').easytabs({
        animationSpeed: 500,
        updateHash: false,
        cycle: 5000
    });

});
/*-----------------------------------------------------------------------------------*/
/*  CORE VALUES
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    $('#core-values').easytabs({
        animationSpeed: 500,
        updateHash: false,
        cycle: 12000
    });

});
/*-----------------------------------------------------------------------------------*/
/*	GO TO TOP
/*-----------------------------------------------------------------------------------*/
! function (a, b, c) {
    a.fn.scrollUp = function (b) {
        a.data(c.body, "scrollUp") || (a.data(c.body, "scrollUp", !0), a.fn.scrollUp.init(b))
    }, a.fn.scrollUp.init = function (d) {
        var e = a.fn.scrollUp.settings = a.extend({}, a.fn.scrollUp.defaults, d),
            f = e.scrollTitle ? e.scrollTitle : e.scrollText,
            g = a("<a/>", {
                id: e.scrollName,
                href: "#top",
                title: f
            }).appendTo("body");
        e.scrollImg || g.html(e.scrollText), g.css({
            display: "none",
            position: "fixed",
            zIndex: e.zIndex
        }), e.activeOverlay && a("<div/>", {
            id: e.scrollName + "-active"
        }).css({
            position: "absolute",
            top: e.scrollDistance + "px",
            width: "100%",
            borderTop: "1px dotted" + e.activeOverlay,
            zIndex: e.zIndex
        }).appendTo("body"), scrollEvent = a(b).scroll(function () {
            switch (scrollDis = "top" === e.scrollFrom ? e.scrollDistance : a(c).height() - a(b).height() - e.scrollDistance, e.animation) {
            case "fade":
                a(a(b).scrollTop() > scrollDis ? g.fadeIn(e.animationInSpeed) : g.fadeOut(e.animationOutSpeed));
                break;
            case "slide":
                a(a(b).scrollTop() > scrollDis ? g.slideDown(e.animationInSpeed) : g.slideUp(e.animationOutSpeed));
                break;
            default:
                a(a(b).scrollTop() > scrollDis ? g.show(0) : g.hide(0))
            }
        }), g.click(function (b) {
            b.preventDefault(), a("html, body").animate({
                scrollTop: 0
            }, e.topSpeed, e.easingType)
        })
    }, a.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "linear",
        animation: "fade",
        animationInSpeed: 200,
        animationOutSpeed: 200,
        scrollText: "Scroll to top",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647
    }, a.fn.scrollUp.destroy = function (d) {
        a.removeData(c.body, "scrollUp"), a("#" + a.fn.scrollUp.settings.scrollName).remove(), a("#" + a.fn.scrollUp.settings.scrollName + "-active").remove(), a.fn.jquery.split(".")[1] >= 7 ? a(b).off("scroll", d) : a(b).unbind("scroll", d)
    }, a.scrollUp = a.fn.scrollUp
}(jQuery, window, document);

$(document).ready(function () {
    $.scrollUp({
        scrollName: 'scrollUp', // Element ID
        scrollDistance: 300, // Distance from top/bottom before showing element (px)
        scrollFrom: 'top', // 'top' or 'bottom'
        scrollSpeed: 300, // Speed back to top (ms)
        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
        animation: 'fade', // Fade, slide, none
        animationInSpeed: 200, // Animation in speed (ms)
        animationOutSpeed: 200, // Animation out speed (ms)
        scrollText: '<i class="icon-up-open"></i>', // Text for element, can contain HTML
        scrollTitle: false, // Set a custom <a> title if required. Defaults to scrollText
        scrollImg: false, // Set true to use image
        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        zIndex: 1001 // Z-Index for the overlay
    });
});
/*-----------------------------------------------------------------------------------*/
/*	MENU
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    $('.js-activated').dropdownHover({
        instantlyCloseOthers: false,
        delay: 0
    }).dropdown();


    $('.dropdown-menu a, .social .dropdown-menu, .social .dropdown-menu input').click(function (e) {
        e.stopPropagation();
    });

});
/*-----------------------------------------------------------------------------------*/
/*	ISOTOPE PORTFOLIO
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    var $container = $('.items');
    $container.imagesLoaded(function () {
        $container.isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });
    });

    $('.portfolio .filter li a').click(function () {

        $('.portfolio .filter li a').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        });

        return false;
    });
});
/*-----------------------------------------------------------------------------------*/
/*	ISOTOPE GRID BLOG
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    var $container = $('.grid-blog');
    $container.imagesLoaded(function () {
        $container.isotope({
            itemSelector: '.post'
        });
    });

    $(window).on('resize', function () {
        $('.grid-blog').isotope('reLayout')
    });
});
/*-----------------------------------------------------------------------------------*/
/*	ISOTOPE LATEST BLOG
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    var $container = $('.latest-blog');
    $container.imagesLoaded(function () {
        $container.isotope({
            itemSelector: '.post',
            layoutMode: 'fitRows'
        });
    });

    $(window).on('resize', function () {
        $('.latest-blog').isotope('reLayout')
    });
});
/*-----------------------------------------------------------------------------------*/
/*	IMAGE HOVER
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    $('.icon-overlay a').prepend('<span class="icn-more"></span>');
});
/*-----------------------------------------------------------------------------------*/
/*	HOME SLIDER
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    var revapi;
    jQuery(document).ready(function () {

        revapi = jQuery('.fullwidthbanner').revolution({
            delay: 9000,
            startwidth: 1170,
            startheight: 600,
            hideThumbs: 200,
            fullWidth: "on"
        });

    });
});
/*-----------------------------------------------------------------------------------*/
/*	PRETTIFY
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function () {
    window.prettyPrint && prettyPrint()
});
/*-----------------------------------------------------------------------------------*/
/*	DATA REL
/*-----------------------------------------------------------------------------------*/
$('a[data-rel]').each(function () {
    $(this).attr('rel', $(this).data('rel'));
});
/*-----------------------------------------------------------------------------------*/
/*	VIDEO
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function () {
    jQuery('.player').fitVids();
});



/*-----------------------------------------------------------------------------------*/
/*	FORM
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function ($) {
    $('.forms').dcSlickForms();
});
$(document).ready(function () {
    $('.comment-form input[title], .comment-form textarea').each(function () {
        if ($(this).val() === '') {
            $(this).val($(this).attr('title'));
        }

        $(this).focus(function () {
            if ($(this).val() == $(this).attr('title')) {
                $(this).val('').addClass('focused');
            }
        });
        $(this).blur(function () {
            if ($(this).val() === '') {
                $(this).val($(this).attr('title')).removeClass('focused');
            }
        });
    });
});
/*-----------------------------------------------------------------------------------*/
/*	PARALLAX MOBILE
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i)) {
        $('.parallax').addClass('mobile');
    }
});
/*-----------------------------------------------------------------------------------*/
/*	TOOLTIP
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
});
/*-----------------------------------------------------------------------------------*/
/*	STICKY NAVIGATION
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {

    var menu = $('.navbar'),
        pos = menu.offset();

    $(window).scroll(function () {
        if ($(this).scrollTop() > pos.top + menu.height() && menu.hasClass('default') && $(this).scrollTop() > 150) {
            menu.fadeOut('fast', function () {
                $(this).removeClass('default').addClass('fixed').fadeIn('fast');
            });
        } else if ($(this).scrollTop() <= pos.top + 150 && menu.hasClass('fixed')) {
            menu.fadeOut(0, function () {
                $(this).removeClass('fixed').addClass('default').fadeIn(0);
            });
        }
    });

});
$(document).ready(function() {
	$('.offset').css('padding-top', $('.navbar').height() + 'px');
       
}); 
$(window).resize(function() {
	$('.offset').css('padding-top', $('.navbar').height() + 'px');        
}); 
/*-----------------------------------------------------------------------------------*/
/*	ONEPAGE ANCHOR SCROLL
/*-----------------------------------------------------------------------------------*/
/**
* jQuery.LocalScroll - Animated scrolling navigation, using anchors.
* Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
* Dual licensed under MIT and GPL.
* Date: 3/11/2009
* @author Ariel Flesler
* @version 1.2.7
**/
(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);
/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.5 BETA
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
$(document).ready(function(){ 
    $('.onepage .scroll,.onepage .navbar .nav').localScroll({
	    offset: {top:-58, left:0}
    });
	$('.onepage .nav li a').on('click',function(){
	    $('.onepage .navbar-collapse.in').collapse('hide');
	})
  });
/*-----------------------------------------------------------------------------------*/
/*	SCROLL NAV
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
    if ($('body').hasClass('onepage')) {
        headerWrapper       = parseInt($('.navbar').height());
        offsetTolerance = -42;
        
        //Detecting user's scroll
        $(window).scroll(function() {
        
            //Check scroll position
            scrollPosition  = parseInt($(this).scrollTop());
            
            //Move trough each menu and check its position with scroll position then add current class
            $('.navbar ul a').each(function() {

                thisHref                = $(this).attr('href');
                thisTruePosition    = parseInt($(thisHref).offset().top);
                thisPosition        = thisTruePosition - headerWrapper - offsetTolerance;
                
                if(scrollPosition >= thisPosition) {
                    
                    $('.current').removeClass('current');
                    $('.navbar ul a[href='+ thisHref +']').parent('li').addClass('current');
                    
                }
            });
            
            
            //If we're at the bottom of the page, move pointer to the last section
            bottomPage  = parseInt($(document).height()) - parseInt($(window).height());
            
            if(scrollPosition == bottomPage || scrollPosition >= bottomPage) {
            
                $('.current').removeClass('current');
                $('.navbar ul a:last').parent('li').addClass('current');
            }
        });
    };
});
/*-----------------------------------------------------------------------------------*/
/*  UPCOMING CLASSES
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
    if ($('p.simpleform-message').length != 0) {
        $('div.section-title').after($('p.simpleform-message'));
    };
});
/**
 * Setup the registration form
 * @param String eventInputValue the value to set in the class field
 * @retun void
 */
function UCSetupFTRegistrationForm(eventInputValue, classId) {
    $('#register_for_faith_and_tech_class, #register_for_digerati_101_class').val(eventInputValue);
    $('#register_for_faith_and_tech_class_id, #register_for_digerati_101_class_id').val(classId);
    $('#register_for_faith_and_tech_spouse_name, #register_for_faith_and_tech_spouse_experience_computers, #register_for_faith_and_tech_spouse_experience_smart_phones').parent('div').hide();
    $('#register_for_faith_and_tech_spouse').change(function(event) {
      var val = $(this).find(':selected').val();
      if (val == 'Yes') {
        $('#register_for_faith_and_tech_spouse_name, #register_for_faith_and_tech_spouse_experience_computers, #register_for_faith_and_tech_spouse_experience_smart_phones').parent('div').show();
      } else {
        $('#register_for_faith_and_tech_spouse_name, #register_for_faith_and_tech_spouse_experience_computers, #register_for_faith_and_tech_spouse_experience_smart_phones').parent('div').hide();
      };
    });
};
/**
 * Lockout the user, and ask for the access key.
 * @param String hashKey the md5 key to check/store in cookie once approved
 * @retun void
 */
function UCLockOut(hashKey) {
    if (!hasAccessToClass(hashKey)) {
        $.fancybox.open({href: '#access_key_required', title: 'Access Key Required'},
          {
            closeClick: false,
            closeBtn: false,
            openEffect: 'none',
            closeEffect:  'none',
            helpers: { 
                overlay: {
                    closeClick: false
                }
            }
        });
    };
    /**
     * Add a hidden loader
     */
    $("form#private_content_authorize_form fieldset").append('<div id="authorize_loader" class="pull-right form-loading"></div>');
    $("form#private_content_authorize_form").submit(function(event) {
        var url = $(this).attr('action');
        var data = $(this).serialize();
        $(this).find('.btn-submit').attr('disabled', true);
        $('#authorize_loader').show();
        $.post(url, data, function(data, textStatus, xhr) {
            var form = $("form#private_content_authorize_form");
            $('#authorize_loader').hide();
            if (data['authorized']) {
                form.find('div.alert').remove();
                $.fancybox.close();
                addAccessToClass(hashKey);
            } else {
                var alerts = form.find('div.alert');
                if (alerts.length > 0) {
                    alerts.fadeOut('slow', function() {
                        $("form#private_content_authorize_form").prepend('<div class="alert alert-danger"> <strong>Sorry</strong> the access key failed.</div>');
                        $(this).remove();
                    });
                } else {
                   form.prepend('<div class="alert alert-danger"> <strong>Sorry</strong> the access key failed.</div>'); 
                };
                form.find('.btn-submit').attr('disabled', false);
            };
        });
        return false;
    });
};
/**
 * Checks if the user has access to the class.  Have they given us the access key before?
 *
 * @param String hashKey the md5 key to check/store in cookie once approved
 * @return Boolean Has access?
 **/
function hasAccessToClass(hashKey) {
    var accessibleClasses = $.cookie('accessible_classes');
    if (accessibleClasses) {
        accessibleClassesArray = accessibleClasses.split('|');
        if ($.inArray(hashKey, accessibleClassesArray)!== -1) {
            return true;
        } else {
            return false;
        };
    } else {
        return false;
    };
};
/**
 * Adds the hashKey to the accessble classes cookie for future access
 *
 * @param String hashKey the md5 key to check/store in cookie once approved
 * @return void
 **/
function addAccessToClass(hashKey) {
    var accessibleClasses = $.cookie('accessible_classes');
    if (accessibleClasses) {
        accessibleClassesArray = accessibleClasses.split('|');
        accessibleClassesArray.push(hashKey);
        $.cookie('accessible_classes', accessibleClassesArray.join('|'));
    } else {
        $.cookie('accessible_classes', hashKey);
    };
};
/*-----------------------------------------------------------------------------------*/
/*  GAMIFY
/*-----------------------------------------------------------------------------------*/
/**
 * Sets up gamification feature
 *
 * @return void
 **/
 var currentOrganization = {};
function mdGamify() {
    // addthis.addEventListener('addthis.menu.share', shareEventHandler);
    $(".gamify_fancybox").fancybox();
    $("form#gamify_org_selector_form").append('<div id="authorize_loader" class="pull-right form-loading"></div>');
    $("form#gamify_org_selector_form").submit(function(event) {
        var url = $(this).attr('action');
        var data = $(this).serialize();
        $(this).find('.btn-submit').attr('disabled', true);
        $('#authorize_loader').show();
        $.post(url, data, function(data, textStatus, xhr) {
            var form = $("form#gamify_org_selector_form");
            $('#authorize_loader').hide();
            if (data.success === true) {
                setBenefitingChurch(data.organization, true);
            } else {
                var form = $("form#gamify_org_selector_form");
                var alerts = form.find('div.alert');
                if (alerts.length > 0) {
                    alerts.fadeOut('slow', function() {
                        form.prepend('<div class="alert alert-danger"> <strong>Sorry</strong> you need to select a valid organization.</div>');
                        $(this).remove();
                    });
                } else {
                   form.prepend('<div class="alert alert-danger"> <strong>Sorry</strong> you need to select a valid organization.</div>'); 
                };
            };
        });
        return false;
    });
    checkHasBenefitingChurch();
};
/**
 * Checks if they have a benefiting church set in their cookies or share_code in url, and sets it
 *
 * @return void
 **/
function checkHasBenefitingChurch() {
    var supportingChurch = $.cookie('supporting_church');
    if (supportingChurch) {
        var org = $.parseJSON(supportingChurch);
        if (typeof org === 'object') {
            /**
             * Update the org settings
             *
             **/
            $.getJSON('/gamify_classes/organization.json', {gamify_token: org.gamify_token}, function(data, textStatus) {
                if (data.success === true) {
                    setBenefitingChurch(data.organization, false);
                } else {
                    console.log('No org returned.');
                };
            });
            setBenefitingChurch(org, false);
        } else {
            /**
             * It is a broken object so erase it
             **/
            $.cookie('supporting_church', '');
        };
        return;
    };
    var gamifyToken = $.QueryString["gamify_token"];
    if (gamifyToken != undefined) {
        $.getJSON('/gamify_classes/organization.json', {gamify_token: gamifyToken}, function(data, textStatus) {
            if (data.success === true) {
                setBenefitingChurch(data.organization, false);
            } else {
                console.log('No org returned.');
            };
        });
    };
};
/**
 * Set the church that will benefit from the sharing.
 *
 * @param Hash org The org data provided by the backend
 * @param Boolean closeFancybox do you want to close fancybox
 * @return void
 **/
function setBenefitingChurch(org, closeFancybox) {
    $.cookie('supporting_church', JSON.stringify(org));
    currentOrganization = org;
    shareURL = location.protocol + '//' + location.host + location.pathname + '?gamify_token=' + org.gamify_token;
    // addthis_share = { 
    //     url: shareURL,
    //     title: 'Free Faith and Tech Training for Your Church',
    //     description: 'Faith and Tech is a training course consisting of guided instruction and hands-on activities to equip believers to use current technology as a crucial ministry tool.'
    // };
    $('p.needs_church').fadeOut('slow', function() {
        $('p.has_church a.church_link').text(org.name).attr('data-original-title', 'Everytime you share this web page with your friends, '+org.name+' will earn points towards new classes they can host at their church.  Start sharing today!');
        $('p.has_church span.total_points').html(org.game_points_earned+' <i class="icon-picons-winner"></i>');
        $('p.has_church').fadeIn('slow', function() {
            if (closeFancybox === true) {
                $.fancybox.close();
            } else {
                $("select#form_organization").val(org.id);
            }; 
        });
    });
};
/**
 * The org has earned points for sharing, so add it up
 *
 * @return void
 **/
function gamifyIncreasePoints() {
    var pointEarnedURL = '/gamify_classes/organization/' + currentOrganization.id + '/shared.json';
    var supportingChurch = $.cookie('supporting_church');
    if (supportingChurch) {
        var org = $.parseJSON(supportingChurch);
        $.post(pointEarnedURL, {}, function(data, textStatus, xhr) {
            if (data.success === true) {
                org.game_points_earned = data.current_points;
                $.cookie('supporting_church', JSON.stringify(org));
                $('p.has_church span.total_points').html(org.game_points_earned+' <i class="icon-picons-winner"></i>');
            };
        });
    };
};
/*-----------------------------------------------------------------------------------*/
/*  Utilities
/*-----------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------*/
/*  EXTENSIONS
/*-----------------------------------------------------------------------------------*/
/**
 * Extends JQuery in order to get the named parameter from the Query String
 *
 * @link http://stackoverflow.com/a/901144
 * @return void
 **/
(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);