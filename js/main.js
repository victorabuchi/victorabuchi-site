document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const messageField = form.querySelector('#contact-message');
  const sendBtn = form.querySelector('#form-send');

  messageField.addEventListener('input', () => {
    sendBtn.classList.toggle('is-visible', messageField.value.trim().length > 0);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) return;

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: form.access_key.value,
          botcheck: form.botcheck.checked,
          subject: `New message from ${name} (victorabuchi.com)`,
          name,
          email,
          message,
        }),
      });
      const result = await response.json();

      if (result.success) {
        sendBtn.textContent = 'Sent';
        form.reset();
        sendBtn.classList.remove('is-visible');
      } else {
        sendBtn.textContent = 'Try again';
      }
    } catch (err) {
      sendBtn.textContent = 'Try again';
    }

    sendBtn.disabled = false;
    window.setTimeout(() => {
      sendBtn.textContent = 'Send';
    }, 2500);
  });
});
