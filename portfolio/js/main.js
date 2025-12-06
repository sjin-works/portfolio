$(document).ready(function (){
    const header = document.querySelector('header');
    const target = document.querySelector('.change-section');

    if (target) { // target이 있을 때만 실행
        window.addEventListener('scroll', () => {
            let scrollY = window.scrollY;
            let sectionTop = target.offsetTop;
            let sectionHeight = target.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                header.classList.add('dark');
            } else {
                header.classList.remove('dark');
            }
        });
    }
    
    $('.contents .ctn_project01 .top').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500)
    })
    $('.contents .ctn_project02 .top').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500)
    })

    // AOS가 페이지에 있을 때만 실행
    if (window.AOS) {
        AOS.init({
            offset: 150,
            duration: 800,
            easing: 'ease',
        });

        $(window).on('scroll', function () {
            AOS.refresh();
        });
    }
})//ready