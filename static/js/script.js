/**
 * BlogCraft AI — Premium Frontend JavaScript
 * Handles loading screen, form validation, animations, and copy functionality
 */

/* =========================================
   PARTICLES ANIMATION
   ========================================= */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = 28;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const x = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 6 + Math.random() * 8;
        const size = 1 + Math.random() * 2.5;

        particle.style.cssText = `
            left: ${x}%;
            bottom: ${Math.random() * 30}%;
            width: ${size}px;
            height: ${size}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        container.appendChild(particle);
    }
}

/* =========================================
   LOADING OVERLAY & STEPS ANIMATION
   ========================================= */
const LOADING_STEPS = [
    { id: 'step1', label: '✦ Understanding your topic', delay: 0 },
    { id: 'step2', label: '✦ Researching insights',     delay: 2500 },
    { id: 'step3', label: '✦ Writing your blog',        delay: 5000 },
    { id: 'step4', label: '✦ Finalizing content',       delay: 8000 },
];

let stepTimers = [];

function startLoadingSteps() {
    // Reset all steps
    LOADING_STEPS.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) el.classList.remove('active');
    });

    // Activate each step in sequence
    LOADING_STEPS.forEach((step, idx) => {
        const timer = setTimeout(() => {
            // Deactivate previous
            if (idx > 0) {
                const prev = document.getElementById(LOADING_STEPS[idx - 1].id);
                if (prev) prev.classList.remove('active');
            }
            const el = document.getElementById(step.id);
            if (el) el.classList.add('active');
        }, step.delay);
        stepTimers.push(timer);
    });
}

function clearStepTimers() {
    stepTimers.forEach(t => clearTimeout(t));
    stepTimers = [];
}

function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('active');
        startLoadingSteps();
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        clearStepTimers();
    }
}

/* =========================================
   FORM HANDLING
   ========================================= */
function initForm() {
    const form = document.getElementById('blogForm');
    const btn = document.getElementById('generateBtn');
    if (!form || !btn) return;

    form.addEventListener('submit', function (e) {
        const topic = document.getElementById('topic')?.value.trim();
        const audience = document.getElementById('audience')?.value.trim();

        if (!topic || !audience) {
            e.preventDefault();
            highlightEmptyFields();
            return;
        }

        // Show loading and disable button
        btn.disabled = true;
        btn.querySelector('.btn-text').textContent = 'Generating...';
        btn.querySelector('.btn-icon').textContent = '⏳';
        showLoading();
    });

    // Real-time input feedback
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }
        });
    });
}

function highlightEmptyFields() {
    const requiredIds = ['topic', 'audience'];
    requiredIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.value.trim()) {
            el.style.borderColor = 'rgba(239, 68, 68, 0.6)';
            el.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
            el.addEventListener('input', function cleanup() {
                el.style.borderColor = '';
                el.style.boxShadow = '';
                el.removeEventListener('input', cleanup);
            });
        }
    });

    // Shake animation on the form card
    const card = document.getElementById('generatorForm');
    if (card) {
        card.style.animation = 'none';
        card.offsetHeight; // force reflow
        card.style.animation = 'shakeX 0.4s ease';
    }
}

/* =========================================
   COPY BLOG CONTENT
   ========================================= */
function copyBlogContent() {
    const hidden = document.getElementById('hiddenBlogContent');
    const btn = document.getElementById('copyBtn');
    if (!hidden || !btn) return;

    const text = hidden.textContent.trim();

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => showCopied(btn));
    } else {
        // Fallback for non-secure context
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showCopied(btn);
        } catch (err) {
            console.warn('Copy failed:', err);
        }
        document.body.removeChild(textarea);
    }
}

function showCopied(btn) {
    btn.classList.add('copied');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<span>✅</span> Copied to Clipboard!';
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.classList.remove('copied');
    }, 2500);
}

/* =========================================
   SCROLL REVEAL ANIMATIONS
   ========================================= */
function initScrollReveal() {
    const elements = document.querySelectorAll('.feature-card, .blog-section, .sidebar-card');

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((el, idx) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${idx * 0.07}s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.07}s`;
        observer.observe(el);
    });
}

/* =========================================
   NAVBAR SCROLL EFFECT
   ========================================= */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.background = 'rgba(8, 8, 16, 0.95)';
        } else {
            navbar.style.background = 'rgba(8, 8, 16, 0.8)';
        }
    }, { passive: true });
}

/* =========================================
   ADD SHAKE KEYFRAMES DYNAMICALLY
   ========================================= */
function injectDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shakeX {
            0%, 100% { transform: translateX(0); }
            15%       { transform: translateX(-8px); }
            30%       { transform: translateX(8px);  }
            45%       { transform: translateX(-6px); }
            60%       { transform: translateX(6px);  }
            75%       { transform: translateX(-4px); }
            90%       { transform: translateX(4px);  }
        }
    `;
    document.head.appendChild(style);
}

/* =========================================
   WORD COUNT SLIDER FEEDBACK
   ========================================= */
function initWordCountFeedback() {
    const input = document.getElementById('word_count');
    if (!input) return;

    input.addEventListener('input', () => {
        const val = parseInt(input.value);
        let tip = '';
        if (val < 200) tip = '💡 Tip: Very short — consider 300+ words for better SEO.';
        else if (val > 3000) tip = '💡 Tip: Long reads — great for in-depth guides!';
        else tip = '';

        let feedback = input.parentElement.querySelector('.wc-feedback');
        if (!feedback) {
            feedback = document.createElement('p');
            feedback.className = 'wc-feedback';
            feedback.style.cssText = 'font-size:0.75rem;color:#9898b8;margin-top:6px;min-height:1.2em;';
            input.parentElement.appendChild(feedback);
        }
        feedback.textContent = tip;
    });
}

/* =========================================
   MAIN INIT
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    injectDynamicStyles();
    initParticles();
    initForm();
    initScrollReveal();
    initNavbar();
    initWordCountFeedback();

    // Hide loading if we navigated back
    hideLoading();
});

// Expose copy function globally for inline onclick
window.copyBlogContent = copyBlogContent;
