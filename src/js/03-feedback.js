import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const formEl = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[type=email]');
const messageInput = document.querySelector('textarea');
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onInputSave, 500));
window.addEventListener('DOMContentLoaded', fillFields);
formEl.addEventListener('submit', onSubmit);

function onInputSave() {
  const formData = {
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };
  save(STORAGE_KEY, formData);
}

function onSubmit(event) {
  event.preventDefault();
  console.log(load(STORAGE_KEY));
  remove(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
  console.log(load(STORAGE_KEY));
}

function fillFields() {
  const savedInput = load(STORAGE_KEY);
  if (!savedInput) {
    return;
  }
  emailInput.value = savedInput.email;
  messageInput.value = savedInput.message;
}
