$(document).ready(function () {

    const navBar = {
        isFixed: false,
        isOpen: false,

        fix() {
            $('nav').css('top', -100)
            $('nav').animate({
                top: 0
            }, 'fast')
            $('nav').addClass('nav_fixed')
            this.isFixed = true
        },

        unfix() {
            $('nav').removeClass('nav_fixed')
            this.isFixed = false
        },

        show() {
            $('.nav__logo').animate({
                marginTop: -250
            }, 'fast')
            $('.nav__menu').animate({
                right: 0
            }, 'fast')

            this.isOpen = true
        },

        hide() {
            $('.nav__menu').animate({
                right: -270
            }, 'fast')
            $('.nav__logo').animate({
                marginTop: 0
            }, 'fast')

            this.isOpen = false
        }
    }

    $('.nav__menu a').click(function (e) {
        e.preventDefault()
        $('html,body').animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 'slow')
    })

    $(window).scroll(function () {
        var winScrollTop = $(this).scrollTop();

        function checkRange(section) {
            if ($('#' + section).offset().top - 100 <= winScrollTop &&
                $('#' + section).offset().top + 100 >= winScrollTop) {
                return true
            }
        }

        function selectLink(link) {
            const links = $('.nav__menu').children()

            for (let i = 0; i < links.length; i++) {
                const element = $(links[i]);
                element.find('a').removeClass('nav__link_active')
            }

            $(`.nav__link[href="#${link}"]`).addClass('nav__link_active')
        }

        // console.log(winScrollTop, "  ",  $('#scroll-down').offset().top, navBar.isFixed)
        if (winScrollTop > $('#scroll-down').offset().top && !navBar.isFixed && window.innerWidth > 767) {
            navBar.fix()
            console.log(window.innerWidth)
        } else if (winScrollTop < $('#scroll-down').offset().top && navBar.isFixed) {
            navBar.unfix()
        }

        if (checkRange('header')) {
            selectLink('header')
        } else if (checkRange('section-features')) {
            selectLink('section-features')
        } else if (checkRange('pricing')) {
            selectLink('pricing')
        } else if (checkRange('news')) {
            selectLink('news')
        }
    });

    $('#scroll-down').click(function () {
        $('html, body').animate({
            scrollTop: $("#section-features").offset().top
        }, 'slow');
    })

    $('.carousel__page').click(function () {
        let page = $(this).data('for')
        let len = page * 430 - 300

        if (window.innerWidth < 1030) {
            len = page * 390 - 130
        } 

        if (window.innerWidth < 780) {
            len = page * 390
        } 

        if (window.innerWidth < 425) {
            len = page * 330
        }

        let items = $('#carousel').children()
        let pages = $('.carousel__pages').children()

        for (let i = 0; i < items.length; i++) {
            const element = $(items[i]);
            element.removeClass('carousel__item_selected')
        }

        for (let i = 0; i < pages.length; i++) {
            const element = $(pages[i]);
            element.removeClass('carousel__page_active')
        }

        $(`.carousel__item[data-item-id=${page}]`).addClass('carousel__item_selected')
        $(this).addClass('carousel__page_active')

        $(items[0]).animate({
            marginLeft: -len
        })
    })

    $('.nav__menu li').click(function () {
        if (window.innerWidth < 768) {
            navBar.hide()
        }
    })

    $('.hamburger').click(function () {
        if (navBar.isOpen) {
            navBar.hide()
        } else {
            navBar.show()
        }
    })

    $('.nav__logo').click(function () {
        $('html, body').animate({
            scrollTop: $("header").offset().top
        }, 'slow');
    })

})