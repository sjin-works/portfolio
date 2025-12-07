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

    if ($('footer .top').length) {
        $('footer .top').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        });
    }

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

    $(function () {
        const subVisual = document.querySelector('.sub_visual');
        const project = document.querySelector('.ctn_project');
        const footer = document.querySelector('footer');

        // 서브페이지가 아닐 수도 있으니 가드
        if (!subVisual || !project || !footer || !('IntersectionObserver' in window)) {
            return;
        }

        let currentScene = null; // 'intro' | 'project' | 'footer'
        let introVisible = false;
        let projectVisible = false;
        let footerVisible = false;

        function setScene(next) {
            if (next === currentScene) return;
            currentScene = next;

            const $body = $('body');
            const $sub = $('.sub_visual');
            const $proj = $('.ctn_project');
            const $footer = $('footer');

            if (next === 'intro') {
                // sub_visual 구간
                $body.removeClass('is-light is-dark');
                $sub.removeClass('hide');
                $proj.removeClass('show');
                $footer.removeClass('show');

            } else if (next === 'project') {
                // ctn_project 구간
                $body.addClass('is-light').removeClass('is-dark');
                $sub.addClass('hide');
                $proj.addClass('show');
                $footer.removeClass('show');

            } else if (next === 'footer') {
                // footer 구간
                $body.addClass('is-dark').removeClass('is-light');
                $sub.addClass('hide');
                $proj.removeClass('show'); // footer에서 project 숨김
                $footer.addClass('show');
            }
        }
        function updateScene() {
            // 우선순위: footer > project > intro
            if (footerVisible) {
                setScene('footer');
            } else if (projectVisible) {
                setScene('project');
            } else if (introVisible) {
                setScene('intro');
            } else {
                setScene('intro');
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target === subVisual) {
                    introVisible = entry.isIntersecting;
                } else if (entry.target === project) {
                    projectVisible = entry.isIntersecting;
                } else if (entry.target === footer) {
                    footerVisible = entry.isIntersecting;
                }
            });

            updateScene();
        }, {
            threshold: 0.1,   // 살짝만 보여도 감지되게 낮게
        });

        observer.observe(subVisual);
        observer.observe(project);
        observer.observe(footer);

        // 첫 진입 시 한 번 맞춰두기
        updateScene();
    });
})//ready