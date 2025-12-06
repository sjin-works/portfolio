$(document).ready(function (){
    const header = document.querySelector('header');
    const target = document.querySelector('.change-section');

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

    AOS.init({
        offset: 150, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 800, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
    });
    $(window).scroll(function () {
        AOS.init({
            offset: 150, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
            duration: 800, // 애니메이션 효과가 작동되는 시간
            easing: 'ease', // 가속도

        });
    });
})//ready