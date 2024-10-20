document.addEventListener('DOMContentLoaded', function() {
  // Defer non-essential tasks until the browser is idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initOptimizedJavaScript);
  } else {
    setTimeout(initOptimizedJavaScript, 100);  // Fallback for older browsers
  }

  // Prioritize LCP element: Preload large images or key content
  const heroImage = document.querySelector('.hero-img');
  if (heroImage) {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = heroImage.getAttribute('data-src');
    document.head.appendChild(preloadLink);

    // Ensure hero image is loaded ASAP
    heroImage.src = heroImage.getAttribute('data-src');
    heroImage.onload = () => {
      console.log('Hero image loaded for LCP');
    };
  }
});

function initOptimizedJavaScript() {
  // Lazy-load images or other media
  lazyLoadImages();

  // Throttle scroll and resize events
  throttleEventListeners();
  
  // Optimize Webflow animations if unnecessary
  optimizeWebflowAnimations();

  // Defer heavy scripts after page interaction
  loadDeferredScripts();
}

// Lazy-load images or iframes using IntersectionObserver
function lazyLoadImages() {
  const lazyElements = document.querySelectorAll('img[data-src], iframe[data-src]');
  if ('IntersectionObserver' in window) {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.src = el.getAttribute('data-src');
          el.removeAttribute('data-src');
          observer.unobserve(el);
        }
      });
    });

    lazyElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyElements.forEach(el => {
      el.src = el.getAttribute('data-src');
      el.removeAttribute('data-src');
    });
  }
}

// Example of throttling scroll and resize events
function throttleEventListeners() {
  let scrollTimeout, resizeTimeout;

  window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        // Perform scroll actions here
        scrollTimeout = null;
      }, 100);  // Adjust timing for throttle
    }
  });

  window.addEventListener('resize', function() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function() {
        // Perform resize actions here
        resizeTimeout = null;
      }, 200);  // Adjust timing for debounce
    }
  });
}

// Optimize Webflow interactions or animations by removing unnecessary listeners
function optimizeWebflowAnimations() {
  // Example: Remove Webflow's legacy scroll listeners if not needed
  if (typeof Webflow !== 'undefined') {
    Webflow.require('ix2').init();
    // Disable specific interactions if they are performance bottlenecks
  }
}

// Defer loading of heavy scripts until the user scrolls or interacts
function loadDeferredScripts() {
  const deferredScripts = [
    'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js',
    'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=65ef333017aee9099c17ebbf',
    'https://cdn.prod.website-files.com/65ef333017aee9099c17ebbf/js/webflow.1f299678f.js',
    'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
  ];

  window.addEventListener('scroll', function loadScriptsOnScroll() {
    deferredScripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;  // Ensures scripts are non-blocking
      document.body.appendChild(script);
    });

    window.removeEventListener('scroll', loadScriptsOnScroll);  // Load scripts once
  });
}
