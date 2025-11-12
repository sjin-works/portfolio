$(document).ready(function (){

    /************************* visual_swiper 시작 ************************/
    let visual_time = 5000
    const visual_swiper = new Swiper('.visual .swiper', {
        autoplay: {  /* 팝업 자동 실행 */
            delay: visual_time,
            disableOnInteraction: false,
        },
        loop: true,
        
        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .ctrl_btn .btn_next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .ctrl_btn .btn_prev',  
        },
    
    });
    visual_swiper.autoplay.stop();  /* 일시정지 기능 */
    visual_swiper.autoplay.start();  /* 재생 기능 */

    // 전체 슬라이드 개수 (loop 상태에서도 실제 슬라이드 개수만)
    const totalSlides = $('.visual .swiper .swiper-slide').not('.swiper-slide-duplicate').length;
    $('.visual .paging .total span').text(totalSlides); // 총 개수 표시

    // 현재 슬라이드 번호 표시 함수
    function updateCurrent() {
        let realIndex = visual_swiper.realIndex + 1; // 실제 인덱스 (0부터 시작하므로 +1)
        $('.visual .paging .current').text(realIndex);
        //슬라이드가 교체되면 넓이를 0으로 초기화
        $('.visual .ctrl_wrap .paging .bar span').stop() //animate 종료
        $('.visual .ctrl_wrap .paging .bar span').width(0)
        $('.visual .ctrl_wrap .paging .bar span').animate({
            width : '100%'
        }, visual_time);
    }

    // 처음 로드 시 한번 실행
    updateCurrent();

    // 슬라이드 변경될 때마다 실행
    visual_swiper.on('slideChange', function () {
        updateCurrent();
    });

    $('.visual .ctrl_wrap .btn_stop').on('click', function(){
        visual_swiper.autoplay.stop();
        $(this).hide();
        $('.visual .ctrl_wrap .btn_play').css('display', 'flex');
        $('.visual .ctrl_wrap .paging .bar span').stop();
      });
      
      $('.visual .ctrl_wrap .btn_play').on('click', function(){
        visual_swiper.autoplay.start();
        $(this).hide();
        $('.visual .ctrl_wrap .btn_stop').css('display', 'flex');
        updateCurrent();
      });
    /************************* visual_swiper 끝 ************************/

    AOS.init({
        offset: 100, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 500, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
        });
    $(window).scroll(function(){
        AOS.init({
        offset: 100, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 500, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
        });
        });
})//ready