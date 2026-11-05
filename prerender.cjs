const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'config.js'), 'utf8'), context);
const config = context.window.SITE_CONFIG;
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const hasPhone = /^\d{10,15}$/.test(config.whatsapp);
const generalMessage = 'Olá, Renata! Vim pelo site e gostaria de conhecer o serviço de secretariado virtual.';
const contactAttributes = message => hasPhone
  ? `href="https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}" target="_blank" rel="noopener noreferrer"`
  : 'role="link" aria-disabled="true" title="WhatsApp ainda não disponibilizado"';

const plans = config.plans.map(plan => {
  const message = `Olá, Renata! Vim pelo site e tenho interesse no plano ${plan.name}. Gostaria de negociar uma proposta para minha rotina.`;
  const services = plan.services.map(service => `<li>${escapeHtml(service)}</li>`).join('\n');
  return `<article class="plan" id="plano-${escapeHtml(plan.id)}">
    <h3>${escapeHtml(plan.name)}</h3>
    <p class="plan-purpose">${escapeHtml(plan.purpose)}</p>
    <p class="plan-price">Solicite uma proposta</p>
    <a class="button" ${contactAttributes(message)}>Negociar com a Renata ↗<span class="sr-only"> sobre o plano ${escapeHtml(plan.name)}</span></a>
    <details><summary>O que está incluído?</summary><p>${escapeHtml(plan.intro)}</p><ul>${services}</ul></details>
  </article>`;
}).join('\n');
const faq = config.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('\n');
const file = path.join(__dirname, 'index.html');
let html = fs.readFileSync(file, 'utf8');
function replaceSection(name, content) {
  const start = `<!-- ${name}:start -->`;
  const end = `<!-- ${name}:end -->`;
  const begin = html.indexOf(start);
  const finish = html.indexOf(end);
  if (begin < 0 || finish < begin) throw new Error(`Seção ausente: ${name}`);
  html = html.slice(0, begin + start.length) + content + html.slice(finish);
}
replaceSection('plans', plans);
replaceSection('faq', faq);
replaceSection('about', escapeHtml(config.about));
const formattedPhone = config.whatsapp.replace(/^55(\d{2})(\d{5})(\d{4})$/, '+55 ($1) $2-$3');
replaceSection('phone', hasPhone ? `WhatsApp ${formattedPhone}` : 'Contato pelo Instagram abaixo.');
html = html.replace(/<a\b([^>]*\bdata-contact\b[^>]*)>/g, (_, attributes) => {
  const clean = attributes.replace(/\s(?:href|target|rel|aria-disabled|aria-label|title|role)="[^"]*"/g, '');
  return `<a${clean} ${contactAttributes(generalMessage)}>`;
});
fs.writeFileSync(file, html);
console.log('HTML atualizado com os planos sob proposta e as perguntas frequentes.');
