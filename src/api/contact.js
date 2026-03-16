import api from './client';

export async function submitContact(form) {
  return api('contact', {
    method: 'POST',
    body: {
      name: form.name?.trim(),
      email: form.email?.trim(),
      phone: form.phone?.trim(),
      subject: form.subject?.trim(),
      message: form.message?.trim(),
    },
  });
}
