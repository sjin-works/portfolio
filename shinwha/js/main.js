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
    function updateCurrent() {
        let realIndex = visual_swiper.realIndex + 1; // 실제 인덱스 (0부터 시작하므로 +1)
        $('.visual .paging .current').text(realIndex);
        
        let bar = $('.visual .ctrl_wrap .paging .bar span');

        bar.stop(true, true);
        bar.css({ width: 0 });

        if (visual_swiper.autoplay.running) {
            bar.animate({
                width: '100%'
            }, visual_time);
        }
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
    let initRndAccordion = function () {

        // 기존 모든 ScrollTrigger 제거 (중복 방지)
        ScrollTrigger.getAll().forEach(function (st) {
            st.kill();
        });

        // 501px 이하에서는 기능 꺼짐
        if ($(window).width() <= 500) {
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
    $(window).resize(function () {
        initRndAccordion();
    });
    /************************* rnd 아코디언 (반응형 포함) 끝 ************************/

    
    /************************* product_swiper 시작 ************************/

    /* ================== 공통 중앙정렬 함수 ================== */
    function setCenter(swiper) {
        const active = swiper.slides[swiper.activeIndex];
        if (!active) return;
    
        const slideRect = active.getBoundingClientRect();
        // 화면 전체 width 기준
        const windowCenter = window.innerWidth / 2;
        // 현재 슬라이드 중심
        const slideCenter = slideRect.left + slideRect.width / 2;
        // 차이값
        const diff = slideCenter - windowCenter;
    
        swiper.setTranslate(swiper.getTranslate() - diff);
    }

    /* ================== Film Swiper ================== */
    const swiperFilm = new Swiper('.product .item01 .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        breakpoints: {
            769: {spaceBetween: 20},
            1025: {spaceBetween: 35}
        },
        centeredSlides: true,
        loop: true,
        watchSlidesProgress: true,
        loopAdditionalSlides: 1,
        speed: 600,

        navigation: {
            nextEl: '.product .item01 .ctrl_btn .next',
            prevEl: '.product .item01 .ctrl_btn .prev',
        },
        pagination: {
            el: '.product .item01 .ctrl_btn .paging',
            clickable: true,
            type: 'fraction',
        },

        on: {
            init() {
                const swiper = this
                setTimeout(() => {
                    swiper.updateSlides()
                    swiper.updateSlidesClasses()
                    setCenter(swiper)
                }, 50)
            },
        
            slideChangeTransitionStart() {
                this.updateSlides()
                this.updateSlidesClasses()
            },

            realIndexChange() {
                const swiper = this
                setTimeout(() => {
                    swiper.updateSlides()
                    swiper.updateSlidesClasses()
                    setCenter(swiper)
                }, 10)
            }
        }
    });

    /* ================== Tape Swiper ================== */
    const swiperTape = new Swiper('.product .item02 .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        breakpoints: {
            769: {spaceBetween: 20},
            1025: {spaceBetween: 35}
        },
        centeredSlides: true,
        loop: true,
        watchSlidesProgress: true,
        loopAdditionalSlides: 1,
        speed: 600,

        navigation: {
            nextEl: '.product .item02 .ctrl_btn .next',
            prevEl: '.product .item02 .ctrl_btn .prev',
        },
        pagination: {
            el: '.product .item02 .ctrl_btn .paging',
            clickable: true,
            type: 'fraction',
        },

        on: {
            init() {
                const swiper = this
                setTimeout(() => {
                    swiper.updateSlides()
                    swiper.updateSlidesClasses()
                    setCenter(swiper)
                }, 50)
            },
        
            slideChangeTransitionStart() {
                this.updateSlides()
                this.updateSlidesClasses()
            },
        
            realIndexChange() {
                const swiper = this
                setTimeout(() => {
                    swiper.updateSlides()
                    swiper.updateSlidesClasses()
                    setCenter(swiper)
                }, 10)
            }
        }
    });

    /* ================== 탭 전환 시 중앙 정렬 ================== */
    $('.product .tab_list ul li').on('click', function(){
        let tab = $(this).attr('data-tab')
    
        // 탭 active 처리
        $('.product .tab_list ul li').removeClass('active')
        $(this).addClass('active')
        $('.product .tab_content .tab_item').removeClass('active')
        $('.product .tab_content .tab_item.' + tab).addClass('active')
    
        let swiper = (tab === 'item01') ? swiperFilm : swiperTape
    
        swiper.slideToLoop(0, 0)
    
        // 레이아웃 안정화 후 중앙 이동 (덜그럭 방지)
        requestAnimationFrame(()=>{
            requestAnimationFrame(()=>{
                swiper.updateSlides()
                swiper.updateSlidesClasses()
                setCenter(swiper)
            })
        })
    })

    /* ================== 화면 사이즈 변경 → 자동 중앙 재정렬 ================== */
    let resizeTimer
    $(window).on('resize', function(){
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function(){
            // Film 열려있을 때만 실행
            if($('.product .item01').hasClass('active')){
                setCenter(swiperFilm)
            }
            if($('.product .item02').hasClass('active')){
                setCenter(swiperTape)
            }
        }, 200)
    })
    /************************* product_swiper 끝 ************************/
    

    /************************* news_swiper 시작 ************************/
    const news_swiper = new Swiper('.news .swiper', { 
        slidesPerView: 'auto',
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    
                slidesPerView: 2,
                spaceBetween: 16,
            },
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

    gsap.fromTo(".recruit .photo img",
        { scale: 1.3 },  // 시작 크기
        {
            scale: 1,    // 최종 크기
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".recruit",
                start: "top 50%",   // recruit가 브라우저 50% 지점 닿으면 실행
                toggleActions: "play none none none"
                // play → 1번만 실행하고 끝 (reverse 없음)
            }
        }
    );
    /************************* recruit 스크롤 끝 ************************/


    /************************* footer ************************/

    /* ================== family_site open 클래스 추가 ================== */
    $('footer .f_util .family_site .faily_open').on('click', function(){
        $('footer .f_util .family_site').addClass('open');
        $('footer .f_util .family_site .faily_wrap').slideDown()
    })

    $('footer .f_util .family_site .faily_close').on('click', function(){
        $('footer .f_util .family_site').removeClass('open')
        $('footer .f_util .family_site .faily_wrap').slideUp()
    })
    
    $('footer .f_util .top').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        },500)
    })


    /************************* footer family_site에 open 추가 ************************/


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