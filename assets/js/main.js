(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  var status = document.getElementById('formStatus');
  var lang = document.documentElement.getAttribute('lang') || 'en';

  var MSG = {
    en: {
      missing: 'Please fill in your name, email, and message.',
      sending: 'Sending…',
      ok: 'Thank you — your message was received. We will get back to you soon.',
      err: 'Something went wrong sending your message. Please try again, or reach out by phone.'
    },
    he: {
      missing: 'נא למלא שם, אימייל והודעה.',
      sending: 'שולח…',
      ok: 'תודה — ההודעה התקבלה. ניצור איתך קשר בהקדם.',
      err: 'משהו השתבש בשליחת ההודעה. נסו שוב, או צרו קשר טלפוני.'
    }
  };
  var t = MSG[lang] || MSG.en;

  function showStatus(kind, text) {
    status.textContent = text;
    status.className = 'form-status show ' + kind;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (form.querySelector('input[name="company"]').value) {
      return; // honeypot triggered — silently drop
    }

    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();
    var phone = form.querySelector('#phone').value.trim();
    var message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showStatus('err', t.missing);
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    showStatus('ok', t.sending);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: '4ed7da55-cf7e-49ed-86d3-7412c65e8c3a',
        subject: 'New website inquiry from ' + name,
        from_name: 'drshafrir website',
        name: name, email: email, phone: phone, message: message, language: lang
      })
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (!data || !data.success) throw new Error('bad response');
        showStatus('ok', t.ok);
        form.reset();
      })
      .catch(function () {
        showStatus('err', t.err);
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });
})();
