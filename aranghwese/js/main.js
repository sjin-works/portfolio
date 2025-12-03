$(document).ready(function (){

    /************************ cursor ************************/
    $(window).on('pointermove mousemove touchmove', function(e){
        if (!$('.cursor').hasClass('on')) return; // on 아닐 땐 움직이지 않음
    
        $('.cursor').css({
            left: e.pageX + 'px',
            top: e.pageY + 'px'
        });
    });
    $('.calm .list .swiper').hover(function(){ /* 특정한 요소에 마우스를 올렸을때만 on 클래스 주기 */
        $('.cursor').toggleClass('on');
    });
    /************************ cursor ************************/

    
    /************************ visual swiper ************************/
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },
    
        effect: "fade", /* fade 효과 */
    
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    
        pagination: {
            el: '.visual .paging',
            clickable: true,
            renderBullet: function (i, className) {
            return '<button class="' + className + '"><svg viewBox="0 0 73 73" xmlns="http://www.w3.org/2000/svg"><circle cx="36.5" cy="36.5" r="35.5" class="circle"></circle></svg></button>';
            }
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
    let mobile_size = 500; // 모바일 기준 사이즈
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
                if (calmSwiper && calmSwiper.destroy) {
                    calmSwiper.destroy(true, true);
                }
                initCalmSwiper();
            }
        }, 200);
    });
    /************************ calm swiper ************************/


    /************************ comfort scroll ************************/
    window.addEventListener("load", function () {
        const track = document.querySelector(".comfort .scroll .track");

        // 서브페이지에서는 track이 없으므로 return
        if (!track) return;
        const items = gsap.utils.toArray(".comfort .scroll .item");

        let totalWidth = 0;
        items.forEach(item => {
            totalWidth += item.offsetWidth + 24;
        });

        gsap.to(track, {
            x: -totalWidth / 2,
            duration: 40,
            ease: "none",
            repeat: -1
        });

        track.addEventListener("mouseenter", () => gsap.globalTimeline.pause());
        track.addEventListener("mouseleave", () => gsap.globalTimeline.resume());
    });
    /************************ comfort scroll ************************/


    /************************ top ************************/
    $('aside.quick .top').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500)
   })
   /************************ top ************************/

   
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