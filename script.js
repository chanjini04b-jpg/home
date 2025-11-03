// 부동산 매물 사이트 JavaScript 기능들
document.addEventListener('DOMContentLoaded', function() {
    console.log('제주 곶자왈아이파크 매물 사이트가 로드되었습니다.');
    
    // 페이지 로딩 애니메이션
    initPageAnimations();
    
    // 스크롤 효과 초기화
    initScrollEffects();
    
    // 전화번호 클릭 추적
    initContactTracking();
    
    // 이미지 최적화 기능 초기화
    optimizeImages();
    
    // 이미지 사전 로딩 (지연 로딩 최적화)
    if ('IntersectionObserver' in window) {
        preloadImages();
    }
    
    // 이미지 품질 체크
    checkImageQuality();
    
    // 동영상 기능 초기화
    initVideoFeatures();
    
    console.log('📸 총 ' + document.querySelectorAll('#imageSlider img').length + '장의 매물 사진이 준비되었습니다.');
    console.log('🎬 동영상 투어가 준비되었습니다.');
});

// 페이지 애니메이션 초기화
function initPageAnimations() {
    // 섹션들을 순차적으로 나타나게 하는 애니메이션
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.8s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
}

// 스크롤 효과 초기화
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(17, 24, 39, 0.95)'; // 반투명 효과
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '';
            header.style.backdropFilter = '';
        }
        
        // 스크롤에 따른 요소 등장 효과
        revealOnScroll();
    });
}

// 스크롤 시 요소 등장 효과
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// 연락처 추적 기능
function initContactTracking() {
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', function() {
            console.log('전화 문의 클릭됨');
            // 여기에 구글 애널리틱스나 기타 추적 코드를 추가할 수 있습니다
        });
    }
    
    // CTA 버튼 클릭 추적
    const ctaButtons = document.querySelectorAll('a[href="#contact"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('상담 신청 버튼 클릭됨');
            // 부드러운 스크롤 효과
            e.preventDefault();
            const target = document.querySelector('#contact');
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// 이미지 슬라이더 기능 (HTML에 포함된 것과 동일)
let slideIndex = 0;
const slider = document.getElementById('imageSlider');
const slides = slider ? slider.getElementsByTagName('img') : [];

// 슬라이더가 있을 때만 초기화
if (slider) {
    updateSlider();
    // 4초마다 자동 슬라이드 (더 많은 이미지를 위해 간격 단축)
    setInterval(nextSlide, 4000); 
}

function updateSlider() {
    if (slides.length > 0) {
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        
        // 이미지 카운터 업데이트
        const counter = document.getElementById('imageCounter');
        if (counter) {
            counter.textContent = `${slideIndex + 1} / ${slides.length}`;
        }
    }
}

function nextSlide() {
    slideIndex++;
    updateSlider();
}

function prevSlide() {
    slideIndex--;
    updateSlider();
}

// 유틸리티 함수들
const Utils = {
    // 요소 선택 헬퍼
    $(selector) {
        return document.querySelector(selector);
    },
    
    $$(selector) {
        return document.querySelectorAll(selector);
    },
    
    // 로컬 스토리지 헬퍼
    setStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    getStorage(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    
    // 날짜 포맷팅
    formatDate(date) {
        return new Intl.DateTimeFormat('ko-KR').format(date);
    },
    
    // 모바일 감지
    isMobile() {
        return window.innerWidth <= 768;
    }
};

// 이미지 최적화 및 로딩 관리
function optimizeImages() {
    const images = document.querySelectorAll('#imageSlider img');
    let loadedCount = 0;
    
    // 로딩 상태 표시를 위한 요소 생성
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = '📸 매물 사진을 로딩중입니다...';
    loadingIndicator.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 100;
        display: none;
    `;
    
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.appendChild(loadingIndicator);
    }
    
    images.forEach((img, index) => {
        // 이미지 로드 이벤트
        img.addEventListener('load', function() {
            loadedCount++;
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s ease';
            
            // 모든 이미지 로드 완료 시
            if (loadedCount === images.length) {
                loadingIndicator.style.display = 'none';
                console.log('모든 매물 사진이 로드되었습니다.');
            }
        });
        
        // 이미지 로드 실패 시 플레이스홀더
        img.addEventListener('error', function() {
            console.warn(`이미지 로드 실패: ${this.src}`);
            this.src = `https://via.placeholder.com/800x600/10b981/ffffff?text=매물+사진+${index + 1}`;
            this.alt = `매물 사진 ${index + 1} (플레이스홀더)`;
        });
        
        // 초기 투명도 설정
        img.style.opacity = '0';
    });
    
    // 첫 번째 이미지는 즉시 표시
    if (images.length > 0) {
        images[0].style.opacity = '1';
    }
}

// 이미지 사전 로딩 (성능 최적화)
function preloadImages() {
    const images = document.querySelectorAll('#imageSlider img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.loading = 'eager';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 이미지 품질 감지 및 알림
function checkImageQuality() {
    const images = document.querySelectorAll('#imageSlider img');
    let highQualityCount = 0;
    let optimizedCount = 0;
    
    images.forEach((img, index) => {
        img.addEventListener('load', function() {
            // 파일 크기 추정 (완벽하지 않지만 대략적인 판단)
            const isOptimized = this.src.includes('amenities') || 
                               this.src.includes('kitchen1') || 
                               this.src.includes('kitchen2') || 
                               this.src.includes('kitchen3') ||
                               this.src.includes('layout') ||
                               this.src.includes('livingroom1') ||
                               this.src.includes('veranda') ||
                               this.src.includes('parking');
            
            if (isOptimized) {
                optimizedCount++;
                // 최적화된 이미지에 표시
                this.title = '✅ 최적화된 이미지 (빠른 로딩)';
            } else {
                highQualityCount++;
                this.title = '🔍 고화질 원본 이미지';
            }
        });
    });
}

// 동영상 기능 초기화
function initVideoFeatures() {
    const video = document.querySelector('#video-tour video');
    if (!video) return;
    
    // 동영상 로딩 상태 추적
    video.addEventListener('loadstart', function() {
        console.log('동영상 로딩 시작...');
    });
    
    video.addEventListener('canplay', function() {
        console.log('동영상 재생 준비 완료');
        this.style.opacity = '1';
        this.style.transition = 'opacity 0.5s ease';
    });
    
    video.addEventListener('error', function(e) {
        console.error('동영상 로드 오류:', e);
        this.parentElement.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gray-100 text-gray-600">
                <div class="text-center">
                    <p class="text-lg mb-2">🎥 동영상을 불러올 수 없습니다</p>
                    <p class="text-sm">브라우저를 새로고침하거나 다른 브라우저를 사용해보세요.</p>
                </div>
            </div>
        `;
    });
    
    // 동영상 재생 추적
    video.addEventListener('play', function() {
        console.log('동영상 재생 시작');
    });
    
    video.addEventListener('pause', function() {
        console.log('동영상 일시정지');
    });
    
    // 풀스크린 기능 개선
    video.addEventListener('dblclick', function() {
        if (this.requestFullscreen) {
            this.requestFullscreen();
        } else if (this.webkitRequestFullscreen) {
            this.webkitRequestFullscreen();
        } else if (this.msRequestFullscreen) {
            this.msRequestFullscreen();
        }
    });
    
    // 초기 투명도 설정
    video.style.opacity = '0';
}