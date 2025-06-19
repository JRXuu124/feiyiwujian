document.addEventListener('DOMContentLoaded', function() {
    // 移动菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 如果是移动菜单，点击后关闭菜单
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // 滚动时头部样式变化
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // 动画效果 - 滚动时显示元素
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-item, .news-item, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 设置初始状态
    document.querySelectorAll('.feature-item, .news-item, .team-member').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初始加载时也执行一次
    
    // 轮播图初始化
    function initSlideshow() {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        const slideInterval = 5000; // 5秒切换一次
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // 启动轮播
        let slideTimer = setInterval(nextSlide, slideInterval);
        
        // 鼠标悬停时暂停轮播
        const slideshow = document.querySelector('.slideshow');
        slideshow.addEventListener('mouseenter', () => {
            clearInterval(slideTimer);
        });
        
        // 鼠标离开时恢复轮播
        slideshow.addEventListener('mouseleave', () => {
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    }
    
    // 调用轮播图初始化函数
    initSlideshow();
});