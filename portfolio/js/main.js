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
    $('header .gnb .gnb_wrap ul li').on('mouseenter focusin', function () {
        $('header').addClass('menu_pc');
    });
    $('header').on('mouseleave', function () {
        $(this).removeClass('menu_pc')
    })
    //스크롤 내리면 header에 fixed 클래스
    let scrolling = $(window).scrollTop()//현재 스크롤 된 값
    let prev_scroll //이전에 스크롤 된 값
    let diff_scroll //차이값 
    function scroll_chk() {
        prev_scroll = scrolling
        scrolling = $(window).scrollTop()
        diff_scroll = prev_scroll - scrolling
        // console.log(diff_scroll)
        if ((diff_scroll < 0) && (scrolling > 0)) { //스크롤업(위로)
            $('header').addClass('up')
            // console.log('if?')
        } else {//스크롤다운(아래로)
            $('header').removeClass('up')
            // console.log('else?')
        }
        if (scrolling > 0) {
            $('header').addClass('fixed')
        } else {
            $('header').removeClass('fixed')
        }
    }
    scroll_chk() //문서가 로딩 되었을 때 1번 실행
    $(window).scroll(function () { //스크롤 할 때마다 1번씩 실행
        scroll_chk()
    })

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

    let menuName = $('header')  // 상단에 고정할 메뉴 영역 선택자
    let menuItem = $('header .gnb .gnb_wrap ul li') // data-link 값을 준 클릭할 요소의 선택자
    let sectionName
    let moveTop
    let areaTop
    let areaH
    let areaName
    let scrollTop
    menuItem.on('click', function () {
        sectionName = $(this).attr('data-link')
        moveTop = $('*[data-menu="' + sectionName + '"]').offset().top - menuName.height()
        $('html, body').animate({
            scrollTop: moveTop
        }, 500)
    })
    menuChk()
    $(window).scroll(function () {
        menuChk()
    })
    function menuChk() {
        scrollTop = $(window).scrollTop()
        $.each($('*[data-menu]'), function (idx, item) {
            areaTop = $('*[data-menu]').eq(idx).offset().top
            areaH = $('*[data-menu]').eq(idx).height()
            areaName = $('*[data-menu]').eq(idx).attr('data-menu')
            if ((scrollTop >= areaTop - menuName.height()) && (scrollTop < areaTop + areaH - menuName.height())) {
                menuItem.removeClass('active')
                menuItem.siblings('[data-link="' + areaName + '"]').addClass('active')
            } else if (scrollTop < $('*[data-menu]').first().offset().top) {
                menuItem.removeClass('active')
            } else if (scrollTop > $('*[data-menu]').last().offset().top + $('*[data-menu]').last().height()) {
                menuItem.removeClass('active')
            }
        });
    }

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