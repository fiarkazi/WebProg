const form = document.querySelector('#feedback-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(field, message) {
  document.getElementById(field.id + '-error').textContent = message;

  if (message) {
    field.setAttribute('aria-invalid', 'true');
  } else {
    field.removeAttribute('aria-invalid');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  let emailError = '';

  if (!email) {
    emailError = 'Введите email.';
  } else if (!emailPattern.test(email) || emailInput.validity.typeMismatch) {
    emailError = 'Введите email в формате name@example.com.';
  }

  const checks = [
    [nameInput, name ? '' : 'Введите имя.'],
    [emailInput, emailError],
    [messageInput, message ? '' : 'Введите сообщение.'],
  ];

  for (const [field, error] of checks) {
    showError(field, error);
  }

  const firstError = checks.find(([, error]) => error);
  if (firstError) {
    firstError[0].focus();
    return;
  }

  alert('Данные формы успешно проверены! Отправка на сервер пока не настроена');
});
