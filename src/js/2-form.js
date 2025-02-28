const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

function initPage() {
  const savedData = loadFromLS(STORAGE_KEY);
  if (savedData) {
    formData = savedData;
    refs.form.elements.email.value = formData.email || '';
    refs.form.elements.message.value = formData.message || '';
  }
}

initPage();

refs.form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value.trim();
  saveToLS(STORAGE_KEY, formData);
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const { email, message } = formData;
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  e.target.reset();
});

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLS(key) {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
