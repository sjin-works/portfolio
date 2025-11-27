$(document).ready(function(){
    /************************* device check ************************/
    let mobile_size = 1024 //모바일 메뉴 시작 사이즈
    let window_w //브라우저 넓이
    let device_status //현재 pc인지 mobile인지 구분하는 값

    function device_chk() {
        window_w = $(window).width()
        if (window_w > mobile_size) {
            device_status = 'pc'
        } else {
            device_status = 'mobile'
        }
        // console.log(device_status)
    }
    device_chk() //문서가 로딩 되었을 때 1번 실행
    $(window).resize(function () { //브라우저가 리사이즈 될때마다 1번씩 실행
        device_chk()
    })
    /************************* device check ************************/

    /************************* header ************************/
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function () {
        if (device_status == 'pc') {
            // header 배경 + 전체 메뉴 열림 상태
            $('header').addClass('menu_pc');
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
            $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').hide()
            $(this).addClass('over')
            $(this).find('.depth2').show() //2차메뉴 열기
        }
    });
    $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').on('focusin', function () {
        if (device_status == 'pc') {
            $('header').addClass('menu_pc');
        }
    });

    $('header').on('mouseleave', function () {
        $(this).removeClass('menu_pc')
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        $(this).find('.depth2').hide()
    })
    $('.visual .btn_prev').on('focusin', function () {
        if (device_status == 'pc') {
            $('header').removeClass('menu_pc');
        }
    });

    let gnb_open
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function (e) {
        if (device_status == 'mobile') {
            e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
            gnb_open = $(this).parent().hasClass('open')
            // console.log(gnb_open)
            if (gnb_open == true) { //만약, 열려있다면
                $(this).parent().removeClass('open')
                $(this).next().slideUp()
            } else {
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp()
                $(this).parent().addClass('open')
                $(this).next().slideDown()
            }
        }
    });

    $('header .gnb .gnb_open').on('click', function () {
        $('header').removeClass('white')
        $('header').addClass('menu_mo')
    })
    $('header .gnb .gnb_wrap .gnb_close, header .gnb .gnb_bg').on('click', function () {
        $('header').removeClass('menu_mo')
    })

    //스크롤 내리면 header에 fixed 클래스
    let scrolling = $(window).scrollTop()//현재 스크롤 된 값
    let prev_scroll //이전에 스크롤 된 값
    let diff_scroll //차이값 
    function scroll_chk() {
        prev_scroll = scrolling
        scrolling = $(window).scrollTop()
        diff_scroll = prev_scroll - scrolling
        if ((diff_scroll < 0) && (scrolling > 0)) { //스크롤업(위로)
            $('header').addClass('up')
        } else {//스크롤다운(아래로)
            $('header').removeClass('up')
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
    /************************* header ************************/


    /************************* aside ************************/
    $(window).on('scroll resize', function () {
        let scrollTop = $(window).scrollTop();
    
        // calm 섹션이 시작하는 지점
        let calmTop = $('.calm').offset().top;
    
        // calm 섹션이 화면에 닿았는지 체크
        if (scrollTop + $(window).height() > calmTop) {
            $('aside.quick').removeClass('hide');
        } else {
            $('aside.quick').addClass('hide');
        }
    });
    /************************* aside ************************/
})