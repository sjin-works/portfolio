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


    /************************* rnd 아코디언 (반응형 포함) 시작 ************************/
    gsap.registerPlugin(ScrollTrigger); //scrolltrigger를 호출 (js파일 내에서 1번만 부르면됨)

    let poStart = 100; // 상단에 고정할때의 위치
    let poGap = 50; // 첫번째와 두번째의 여백
    let poObj = '.accordion_wrap .accordion' // 고정요소
    let poObjCont = '.conts' // 고정요소 내부의 내용

    // 기존 모든 ScrollTrigger 제거 (중복 방지)
    ScrollTrigger.getAll().forEach(function(st){
        st.kill();
    });

    // 501px 이상일 때만 아코디언 작동
    if($(window).width() > 500){

        $(poObj).each(function(i, e) {

            // 각 카드 위치 보정 (스크롤 시 가로 스크롤 방지)
            gsap.set(e, {
                y: i * poGap
            });

            // 핀
            ScrollTrigger.create({
                trigger: e,
                start: 'top +='+(poStart + i * poGap),
                endTrigger: poObj+'.last',
                end: 'top +=80',
                pin: true,
                pinSpacing: false,
                markers: false,
                anticipatePin: 1,
            });

            // 회전
            gsap.to($(e).find(poObjCont), {
                rotateX: -6,
                ease: 'none',
                scrollTrigger: {
                    trigger: e,
                    start: 'top +='+(poStart + i * poGap),
                    end: 'top -=30%',
                    scrub: 1,
                },
            });

            // 스케일 + top 이동
            gsap.to($(e).find(poObjCont), {
                scale: 0.01,
                top: -200,
                ease: 'none',
                scrollTrigger: {
                    trigger: e,
                    start: 'top +='+(poStart + i * poGap),
                    end: 'top -=700%',
                    scrub: 1,
                },
            });
        });
    }

    // 최초 실행
    initRndAccordion();

    // resize 시 재실행
    $(window).resize(function(){
        initRndAccordion();
    });
    /************************* rnd 아코디언 (반응형 포함) 끝 ************************/


    /************************* product_swiper 시작 ************************/
    const product1_swiper = new Swiper('.product .item01 .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 2, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            640: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 20,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 2500,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
        },
    });
    
    const product2_swiper = new Swiper('.product .item02 .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 2, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            640: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 20,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 2500,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
        },
    });
    /************************* product_swiper 끝 ************************/


    /************************* aos ************************/
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
    /************************* aos ************************/

})//ready