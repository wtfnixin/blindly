document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Scroll Animations
    // Inspired by grail-app.com and joinswsh.com motion guidelines
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            } else {
                // Remove to allow re-animation on scroll up (optional based on preference)
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Select all elements that need animation
    const animatedElements = document.querySelectorAll(
        '.slide-up-element, .bounce-enter-element, .slide-left-element, .slide-right-element'
    );

    animatedElements.forEach(el => observer.observe(el));
    
    // Add audio waveform simulation
    const playBtn = document.querySelector('.play-btn');
    if(playBtn) {
        playBtn.addEventListener('click', function() {
            if (this.textContent === '▶') {
                this.textContent = '⏸';
                // Add simple animation to waveform bars
                const bars = document.querySelectorAll('.waveform .bar');
                bars.forEach(bar => {
                    bar.style.animation = `sound ${Math.random() * 0.5 + 0.5}s infinite alternate`;
                });
            } else {
                this.textContent = '▶';
                const bars = document.querySelectorAll('.waveform .bar');
                bars.forEach(bar => {
                    bar.style.animation = 'none';
                });
            }
        });
    }

});

// Add keyframes for sound waveform via JS to keep it clean
const style = document.createElement('style');
style.innerHTML = `
    .waveform { display: flex; gap: 4px; align-items: center; height: 30px; }
    .waveform .bar { width: 4px; background: white; border-radius: 2px; height: 4px; transition: height 0.2s; }
    @keyframes sound {
        0% { height: 4px; }
        100% { height: 24px; }
    }
`;
document.head.appendChild(style);
