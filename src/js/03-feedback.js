import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const formEl = document.querySelector('.feedback-form');
// const emailInput = document.querySelector('input[type=email]');
// const messageInput = document.querySelector('textarea');
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onInputSave, 500));
window.addEventListener('DOMContentLoaded', fillFields);
formEl.addEventListener('submit', onSubmit);

let formData = {};

function onInputSave(event) {
  formData[event.target.name] = event.target.value;
  save(STORAGE_KEY, formData);
}

function onSubmit(event) {
  event.preventDefault();
  console.log(formData);
  remove(STORAGE_KEY);
  formEl.reset();
  formData = {};
}

function fillFields() {
  const savedInput = load(STORAGE_KEY);
  if (!savedInput) {
    return;
  }

  formData = savedInput;
  Object.entries(formData).forEach(([key, value]) => {
    formEl.elements[key].value = value;
  });
}
