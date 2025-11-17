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

    // 전체 슬라이드 개수 (loop 상태에서도 실제 슬라이드 개수만)
    const totalSlides = $('.visual .swiper .swiper-slide').not('.swiper-slide-duplicate').length;
    $('.visual .paging .total span').text(totalSlides); // 총 개수 표시

    // 현재 슬라이드 번호 표시 함수
    function updateCurrent(){
        let realIndex = visual_swiper.realIndex + 1; // 실제 인덱스 (0부터 시작하므로 +1)
        $('.visual .paging .current').text(realIndex);
        
        let bar = $('.visual .ctrl_wrap .paging .bar span');

        bar.stop(true, true);
        bar.css({ width: 0 });

        if (visual_swiper.autoplay.running){
            bar.animate({
                width: '100%'
            }, visual_time);
        }
    }

    // 처음 로드 시 한번 실행
    updateCurrent();

    // 슬라이드 변경될 때마다 실행
    visual_swiper.on('slideChange', function(){
        updateCurrent();
    });

    $('.visual .ctrl_wrap .btn_stop').on('click', function(){
        visual_swiper.autoplay.stop();
        $(this).hide();
        $('.visual .ctrl_wrap .btn_play').css('display', 'flex');
        let bar = $('.visual .ctrl_wrap .paging .bar span');

        let nowWidth = bar.width(); 
        bar.stop(true, false);
        bar.width(nowWidth);
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
    let initRndAccordion = function(){

        // 기존 모든 ScrollTrigger 제거 (중복 방지)
        ScrollTrigger.getAll().forEach(function(st){
            st.kill();
        });

        // 501px 이하에서는 기능 꺼짐
        if ($(window).width() <= 500){
            return; // 여기서 끝
        }

        // 공통 변수
        let poStart = 100;
        let poGap = 50;
        let poObj = '.accordion_wrap .accordion';
        let poObjCont = '.conts';

        $(poObj).each(function (i, e) {

            // 각 카드 위치 보정
            gsap.set(e, {
                y: i * poGap
            });

            // 핀
            ScrollTrigger.create({
                trigger: e,
                start: 'top +=' + (poStart + i * poGap),
                endTrigger: poObj + '.last',
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
                    start: 'top +=' + (poStart + i * poGap),
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
                    start: 'top +=' + (poStart + i * poGap),
                    end: 'top -=700%',
                    scrub: 1,
                },
            });
        });
    };

    // 최초 1번 실행
    initRndAccordion();

    // resize 시 재실행
    $(window).resize(function(){
        initRndAccordion();
    });
    /************************* rnd 아코디언 (반응형 포함) 끝 ************************/

    
    /************************* product_swiper 시작 ************************/
    function createProductSwiper(selector, navPrev, navNext, paging){
        return new Swiper(selector, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            breakpoints: {
                768: { spaceBetween: 30 }
            },
            loop: true,
            centeredSlides: true,

            navigation: {
                prevEl: navPrev,
                nextEl: navNext
            },

            pagination: {
                el: paging,
                clickable: true,
                type: 'fraction'
            },

            on: {
                transitionEnd: function(){
                    this.update();
                }
            }
        });
    }

    let product01_swiper = null;
    let product02_swiper = null;

    function initProduct01(){
        if (!product01_swiper){
            product01_swiper = createProductSwiper(
                '.product .tab_item.item01 .swiper',
                '.product .ctrl_btn.item01 .prev',
                '.product .ctrl_btn.item01 .next',
                '.product .ctrl_btn.item01 .paging'
            );
        }
    }

    function initProduct02(){
        if (!product02_swiper){
            product02_swiper = createProductSwiper(
                '.product .tab_item.item02 .swiper',
                '.product .ctrl_btn.item02 .prev',
                '.product .ctrl_btn.item02 .next',
                '.product .ctrl_btn.item02 .paging'
            );
        }
    }

    // 처음 로드시 Film 탭, Film Swiper만 활성화
    initProduct01();
    $('.product .tab_content .tab_item').removeClass('active').attr('title', '');
    $('.product .tab_content .tab_item.item01').addClass('active').attr('title', '선택됨');

    $('.product .tab_list ul li').on('click', function(){

        const tab = $(this).attr('data-tab'); // item01 / item02

        // 탭 비주얼 상태 변경
        $('.product .tab_list ul li').removeClass('active');
        $(this).addClass('active');

        $('.product .tab_list ul li button span').text('');
        $(this).find('button span').text('선택됨');

        // 컨텐츠 활성화 변경
        $('.product .tab_content .tab_item').removeClass('active').attr('title', '');
        $('.product .tab_content .tab_item.' + tab).addClass('active').attr('title', '선택됨');

        // Film 탭
        if (tab === 'item01'){
            if (product02_swiper){
                product02_swiper.destroy(true, true);
                product02_swiper = null;
            }
            initProduct01();
            product01_swiper.update();
        }

        // Tape 탭
        if (tab === 'item02'){
            if (product01_swiper){
                product01_swiper.destroy(true, true);
                product01_swiper = null;
            }
            initProduct02();
            product02_swiper.update();
        }
    });
    /************************* product_swiper 끝 ************************/
    

    /************************* news_swiper 시작 ************************/
    const news_swiper = new Swiper('.news .swiper', { 
        slidesPerView: 'auto',
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {

            901: {    
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1321: {    
                slidesPerView: 4,
                spaceBetween: 24,
            },
        },
        loop: false,

        scrollbar: {
            el: ".news .scrollbar",
            hide: false,
            draggable: true, //스크롤바 드래그 가능
            //dragSize: 500, //스크롤바 사이즈 조정
        },
    });
    /************************* news_swiper 끝 ************************/

    
    /************************* recruit 스크롤 시작 ************************/
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: ".recruit",
        start: "top 90%",
        onEnter: () => {
            gsap.set(".recruit .photo img", { scale: 1.3 });   // 초기값 세팅 (튀지 않음)
            gsap.to(".recruit .photo img", {
                scale: 1,
                duration: 1.6,
                ease: "power3.out"
            });
        },
        once: false
    });
    /************************* recruit 스크롤 끝 ************************/


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