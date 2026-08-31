document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const messageField = form.querySelector('#contact-message');
  const sendBtn = form.querySelector('#form-send');

  messageField.addEventListener('input', () => {
    sendBtn.classList.toggle('is-visible', messageField.value.trim().length > 0);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) return;

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';

    const subject = encodeURIComponent(`Message from ${name} — victorabuchi.com`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const mailtoUrl = `mailto:contact@victorabuchi.com?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      window.location.href = mailtoUrl;
      sendBtn.textContent = 'Opening email…';
      window.setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send';
      }, 2000);
    }, 500);
  });
});
