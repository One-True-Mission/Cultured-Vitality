/* ===================================================================
   CULTURED VITALITY - script.js
   Handles: mobile nav, active state, FAQ accordion, buy button toast
   =================================================================== */

(function () {
  'use strict';

  /* ----- Active nav state (reads data-page from body) ----- */
  function setActiveNav() {
    const page = document.body.getAttribute('data-page');
    if (!page) return;
    document.querySelectorAll('.nav-links a[data-nav]').forEach(function (link) {
      if (link.getAttribute('data-nav') === page) {
        link.classList.add('is-active');
      }
    });
  }

  /* ----- Mobile nav toggle ----- */
  function setupNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on resize past breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----- FAQ accordion ----- */
  function setupFaq() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;

      btn.addEventListener('click', function () {
        const isOpen = item.classList.contains('is-open');
        // Close all
        items.forEach(function (other) {
          other.classList.remove('is-open');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });
        // Open this one if it wasn't open
        if (!isOpen) {
          item.classList.add('is-open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ----- Toast notification helper ----- */
  let toastTimer = null;
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3600);
  }

  /* ----- Buy button placeholder behavior -----
     Each .product-buy button shows a polite toast. Once Shopify Starter
     is set up, replace each button with the Shopify Buy Button embed
     code (Shopify admin > Sales channels > Buy Button > Generate code). */
  function setupProductButtons() {
    document.querySelectorAll('.product-buy').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        showToast('Online checkout is being set up. Email info@culturedvitality.org to order today.');
      });
    });
  }

  /* ----- Form: basic enhancement -----
     If Formspree fails for any reason, the form will still submit
     to the action URL. We do a tiny client-side validation pass. */
  function setupForm() {
    const form = document.querySelector('form.contact-form-el');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');
      let valid = true;

      [name, email, message].forEach(function (field) {
        if (!field) return;
        if (!field.value.trim()) {
          field.style.borderColor = '#C66B4A';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        e.preventDefault();
        showToast('Please fill in the required fields before sending.');
      }
    });
  }

  /* ----- Footer year ----- */
  function setupYear() {
    const year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ----- Init ----- */
  document.addEventListener('DOMContentLoaded', function () {
    setActiveNav();
    setupNavToggle();
    setupFaq();
    setupProductButtons();
    setupForm();
    setupYear();
  });
})();