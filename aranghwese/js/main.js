$(document).ready(function (){

    /************************ visual swiper ************************/
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },
    
        effect: "fade", /* fade 효과 */
    
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    
        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
        },
        
        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .btn_next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .btn_prev',  
        },
    });

    $('.visual .ctrl_wrap .btn_stop').on('click', function(){
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.visual .ctrl_wrap .btn_play').show()
    })
    $('.visual .ctrl_wrap .btn_play').on('click', function(){
        visual_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()
        $('.visual .ctrl_wrap .btn_stop').show()
    })
    /************************ visual swiper ************************/


    /************************ calm swiper ************************/
    let mobile_size = 768; // 모바일 기준 사이즈
    let window_w;           // 현재 브라우저 넓이
    let device_status;      // 'pc' or 'mobile'
    let calmSwiper;         // swiper 인스턴스

    // 현재 디바이스 상태 체크
    function device_chk() {
        window_w = $(window).width();
        device_status = (window_w > mobile_size) ? 'pc' : 'mobile';
    }

    // swiper 초기화
    function initCalmSwiper() {
        // PC인 경우
        if (device_status === 'pc') {
            calmSwiper = new Swiper(".calm .swiper", {
                grabCursor: true,
                centeredSlides: true,
                loop: true,
                slidesPerView: 'auto',
                effect: "coverflow",
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }
            });
        }
        // 모바일인 경우
        else {
            calmSwiper = new Swiper(".calm .swiper", {
                grabCursor: true,
                centeredSlides: true,
                loop: true,
                slidesPerView: 'auto',
                spaceBetween: 16,
                effect: "slide"
            });
        }
    }

    // 최초 실행
    device_chk();
    initCalmSwiper();

    // resize 시 디바이스 상태 바뀌면 swiper 재생성
    let resizeTimer;
    $(window).resize(function () {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
            let prev_status = device_status;

            // 상태 다시 체크
            device_chk();

            // pc → mobile 또는 mobile → pc로 변경되었을 때만 재생성
            if (prev_status !== device_status) {
                if (calmSwiper) calmSwiper.destroy(true, true);
                initCalmSwiper();
            }
        }, 200);
    });
    /************************ room swiper ************************/
    const room_swiper = new Swiper('.room .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            1441: {    
                slidesPerView: 'auto',
                spaceBetween: 24,
            },
        },
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        navigation: {
            nextEl: '.room .ctrl_wrap .btn_next',
            prevEl: '.room .ctrl_wrap .btn_prev',
        },
    });
    /************************ room swiper ************************/


    /************************ AOS ************************/
    AOS.init({
        offset: 150, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
        duration: 800, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
    });
    $(window).scroll(function(){
        AOS.init({
            offset: 150, // 해당 콘텐츠가 하단에서 몇 px 위로 올라와에 나타나는 효과가 나타날지 셋팅하는 값
            duration: 800, // 애니메이션 효과가 작동되는 시간
            easing: 'ease', // 가속도
    
        });
    });
    /************************ AOS ************************/
})//ready