$(document).ready(function () {
    $('.carousel__inner').slick({
        adaptiveHeight: false,
        speed: 1000,
        autoplay: false,
        autoplaySpeed: 5500,
        prevArrow: '<button type="button" class="slick-prev"><img alt="prev" src="/icons/left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img alt="next" src="/icons/right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                }
            },
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_non-active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link')
    toggleSlide('.catalog-item__link-active')

    $('#contacts, #hidden').on('click', function () {
        $('.footer__info')
            .toggleClass('footer__info-hidden');
    });

    //Modal

    $('[data-modal="consultation"]').on('click', function () {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

    $('.button_mini').on('click', function () {
        $('.overlay, #order').fadeIn();
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        })
    })

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите как минимум 2 символа!"),
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Правильный формат почты: name@domain.com"
                }
            }
        })
    }
    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');


    $('input[name=phone]').mask("+38 (999) 999-9999")


    //PageUP
    $(window).scroll(function () {
        if ($(this).scrollTop() > 2000) {
            $('.page_up').fadeIn();
        } else {
            $('.page_up').fadeOut();
        }
    })

    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        };
        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        });

    });

    new WOW().init();

});
