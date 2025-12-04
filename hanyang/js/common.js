$(document).ready(function () {
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

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function () {
        if (device_status == 'pc') { //pc일때만 동작
            $('header').addClass('menu_pc')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
            $(this).addClass('over')
            $('.header_bg').addClass('on')
        }
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function () {
        if (device_status == 'pc') { //pc일때만 동작
            $(this).removeClass('over')
        }
    })
    $('.header_bg').on('mouseenter', function () {
        $('header').removeClass('menu_pc')
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        $(this).removeClass('on')
    })
    $('header .util .lang').on('focusin', function () {
        $('header').removeClass('menu_pc')
    })

    

    let gnb_open
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
		if(device_status == 'mobile'){
            e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
            gnb_open = $(this).parent().hasClass('active')
            // console.log(gnb_open)
            if(gnb_open == true){ //만약, 열려있다면
                $(this).parent().removeClass('active')
            }else{
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('active')
                $(this).parent().addClass('active')
            }
        }
	});

    // 두 번째 메뉴 클릭 이벤트 (depth2 > a 클릭 시)
    $('header .gnb .gnb_wrap ul.depth1 > li > .menu_box .depth2 > li > a').on('click', function (e) {
        if (device_status == 'mobile') {
            e.preventDefault(); // a 태그의 href를 작동 시키지 않음
            var sub_menu_open = $(this).parent().hasClass('active');

            if (sub_menu_open == true) { // 이미 열려있으면
                $(this).parent().removeClass('active');
                $(this).next().slideUp();
            } else {
                // 다른 depth3 메뉴는 모두 닫기
                $('header .gnb .gnb_wrap ul.depth1 > li > .menu_box .depth2 > li').removeClass('active');
                $('header .gnb .gnb_wrap ul.depth1 > li > .menu_box .depth2 > li > ul.depth3').slideUp();
                // 현재 클릭된 메뉴 열기
                $(this).parent().addClass('active');
                $(this).next().slideDown(); // 해당 depth3 메뉴 열기
            }
        }
    });

    $('header .util .menu_wrap .gnb_open').on('click', function () {
        $('header').addClass('menu_mo')
        $('.header_bg').addClass('on')
    })
    $('header .util .menu_wrap .gnb_close, header .gnb .gnb_bg').on('click', function () {
        $('header').removeClass('menu_mo')
        $('.header_bg').removeClass('on')
    })
})//ready