document.addEventListener('DOMContentLoaded', () => {
    // 1. 모바일 메뉴 토글 기능
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // 메뉴 열기
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // 메뉴 열렸을 때 스크롤 방지
    });

    // 메뉴 닫기
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // 메뉴 링크 클릭 시 자동으로 닫기
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 2. 부드러운 스크롤 (Smooth Scroll)
    // 2. 스크롤 속도 조절을 위한 커스텀 스크롤 함수
    const smoothScrollTo = (targetPosition, duration) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;

            // Easing 함수 (easeInOutQuad): 부드럽게 시작하고 끝남
            const ease = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };

            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // href="#" 인 경우 무시

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // 헤더 높이만큼 빼고 스크롤
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                // 1500ms (1.5초) 동안 스크롤 이동 (숫자를 늘리면 더 천천히 이동)
                smoothScrollTo(offsetPosition, 900);
            }
        });
    });

    // 3. 스크롤 애니메이션 (Intersection Observer)
    // 화면에 요소가 나타날 때 fade-in 효과 적용
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15, // 요소가 15% 보일 때 실행
        rootMargin: "0px 0px -50px 0px" // 약간 미리 실행
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.animation = `fadeIn 0.8s ease forwards ${entry.target.classList.contains('delay-1') ? '0.2s' : entry.target.classList.contains('delay-2') ? '0.4s' : ''}`;
                appearOnScroll.unobserve(entry.target); // 한 번만 실행
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
});

    // 4. 스크롤 위치에 따라 "맨 위로" 버튼 표시
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

