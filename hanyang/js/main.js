$(document).ready(function (){
    let tab_name;

    $('.schedule .notice .notice_head .tab_list ul li').on('click', function () {
        // 1. 탭 active 이동
        $('.schedule .notice .notice_head .tab_list ul li').removeClass('active');
        $(this).addClass('active');

        // 2. 선택된 tab 값 가져오기 (단서)
        tab_name = $(this).attr('data-tab');
        // console.log(tab_name);

        // 3. 모든 콘텐츠 닫고
        $('.schedule .notice .notice_contents .tab_cont').removeClass('active').hide();

        // 4. 단서와 동일한 콘텐츠만 열기
        $('.schedule .notice .notice_contents')
            .find('.tab_cont[data-tab="' + tab_name + '"]')
            .addClass('active')
            .show();
    });

    // 1) 날짜 버튼 눌렀을 때, 월 리스트 열고 닫기
    $('.schedule .calendar .calender_head .date_select .date_btn').on('click', function () {
        const $list = $('#month_list');
        const isOpen = $list.hasClass('is-open');

        $list
        .toggleClass('is-open')
        .attr('aria-hidden', isOpen);

        $(this).attr('aria-expanded', !isOpen);
    });

    // 2) 월 선택했을 때
    $('#month_list button').on('click', function () {
        const monthValue = $(this).data('month');   // "12"
        const monthText  = $(this).text();          // "2025년 12월"

        // (1) 버튼 텍스트 바꾸기
        $('.schedule .calendar .calender_head .date_select .date_btn span').text(monthText);

        // (2) 리스트 닫기
        $('#month_list')
        .removeClass('is-open')
        .attr('aria-hidden', true);
        $('.schedule .calendar .calender_head .date_select .date_btn').attr('aria-expanded', false);

        // (3) month_list 안의 선택 상태 표시
        $('#month_list button').removeClass('is-active');
        $(this).addClass('is-active');

        // (4) 월별 detail 패널 전환
        $('.schedule .calendar .calendar_contents .month_panel')
        .removeClass('active')
        .hide();
        $('.schedule .calendar .calendar_contents .month_panel[data-month="' + monthValue + '"]')
        .addClass('active')
        .show();
    });

    // 3) 초기 상태: 12월 패널만 보이게
    $('.schedule .calendar .calendar_contents .month_panel').hide();
    $('.schedule .calendar .calendar_contents .month_panel.active').show();

    const service_swiper = new Swiper('.service .swiper', {
        slidesPerView: 3,
        breakpoints: {
            550: {
                slidesPerView: 4,
            },
            769: {
                slidesPerView: 6,
            },
            1024: {
                slidesPerView: 7,
            },
            1160: {
                slidesPerView: 8,
            },
            1340: {
                slidesPerView: 9,
            },
        },
        loop: true,
        
        navigation: {
            nextEl: '.service .btn_next',
            prevEl: '.service .btn_prev',
        },
        simulateTouch: true,   // 데스크탑에서도 터치처럼 드래그 가능
        grabCursor: true,      // 커서가 ‘잡는 손’ 모양으로 바뀜
        touchRatio: 0.8,       // 드래그 민감도 (연세대 느낌과 가장 비슷)
        threshold: 5,
    });
})//ready