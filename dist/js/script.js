$(document).ready(function () {

    const hamburger = document.querySelector('.promo__hamburger'),
        menu = document.querySelector('.menu'),
        close = document.querySelector('.menu__close'),
        menu__overlay = document.querySelector('.menu__overlay');
        close_menu = document.querySelector('.menu__list')

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    })

    close.addEventListener('click', () => {
        menu.classList.remove('active');
    })

    menu__overlay.addEventListener('click', () => {
        menu.classList.remove('active');
    });
    
    close_menu.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    const counters = document.querySelectorAll('.progress__numb')
    lines = document.querySelectorAll('.progress__line--2')

    counters.forEach((item, i) => {
        lines[i].style.width = item.innerHTML
    });



    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: jQuery.validator.format("Please enter at least 2 characters!"),
                },
                email: {
                    required: "Please enter your email",
                    email: "The email is not correct"
                }
            },
            errorPlacement: function (error, element) {
                error.addClass('custom-error');
                error.insertAfter(element);
            }
        })
    }
    validateForms('#form');



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
});
