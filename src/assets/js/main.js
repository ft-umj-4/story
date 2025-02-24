/*
Hide header on scroll down & show on scroll up
*/

const header = document.getElementById('header');
let lastPos = document.documentElement.scrollTop;

window.addEventListener(
  'scroll',
  () => {
    const currPos = document.documentElement.scrollTop;

    if (currPos > lastPos) {
      if (currPos > header.offsetHeight) {
        header.classList.add('-translate-y-full');
        header.classList.remove('shadow-md');
      }
    } else {
      header.classList.remove('-translate-y-full');
      header.classList.add('shadow-md');
    }

    lastPos = currPos;
  },
  false
);

/*
Toggle the menu when pressed on hamburger button
Only on mobile devices
*/

const menu = document.getElementById('menu');
const searchBox = document.getElementById('search');
const menuToggle = document.getElementById('menu-toggle');

menuToggle.addEventListener(
  'click',
  () => {
    menu.classList.toggle('hidden');
    searchBox.classList.toggle('hidden');
  },
  false
);

/*
Lazy load images
*/
const lazyImages = document.querySelectorAll('.lazy');

document.addEventListener(
  'DOMContentLoaded',
  () => {
    if (window.IntersectionObserver) {
      console.log('USE IntersectionObserver');
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      };

      const intersectionCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let elem = entry.target;
            const originalImage = elem.dataset.src;
            if (originalImage) {
              elem.setAttribute('src', originalImage);
              elem.removeAttribute('data-src');
              elem.setAttribute('data-loaded', 'true');
            }
          }
        });
      };

      const observer = new IntersectionObserver(intersectionCallback, options);
      [...lazyImages].forEach((elem) => {
        if (elem) {
          observer.observe(elem);
        }
      });
    } else {
      [...lazyImages].forEach((elem) => {
        const originalImage = elem.dataset.src;

        elem.setAttribute('src', originalImage);
        elem.removeAttribute('data-src');
      });
    }
  },
  false
);

/** Share Post */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    let btnShare = document.querySelector('.btn-share');
    if (btnShare) {
      btnShare.addEventListener('click', async () => {
        const shareData = {
          title: 'Alumni FT UMJ IV',
          text: btnShare.getAttribute('data-title'),
          url: btnShare.getAttribute('data-url'),
        };

        try {
          await navigator.share(shareData);
        } catch (err) {
          console.error('ERR', err);
        }
      });
    }
  },
  false
);

/** Switch theme */
let btnSwitchTheme = document.querySelector('#toggle-theme');
const rootHtml = window.document.documentElement;

function toggleTheme() {
  if (rootHtml.classList.contains('light')) {
    rootHtml.classList.add('dark');
    rootHtml.classList.remove('light');

    localStorage.theme = 'dark';
  } else {
    rootHtml.classList.add('light');
    rootHtml.classList.remove('dark');

    localStorage.theme = 'light';
  }
}

btnSwitchTheme.addEventListener('click', toggleTheme);
