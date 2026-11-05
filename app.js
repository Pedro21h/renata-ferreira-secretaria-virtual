(() => {
  const config = window.SITE_CONFIG;
  const phoneAvailable = /^\d{10,15}$/.test(config.whatsapp);
  const radios = document.querySelectorAll('[name="need"]');
  const recommendation = document.querySelector('#recommendation');
  const clear = document.querySelector('#clear-need');
  const contacts = document.querySelectorAll('[data-contact]');
  const generalMessage = 'Olá, Renata! Vim pelo site e gostaria de conhecer o serviço de secretariado virtual.';

  document.querySelectorAll('.js-only').forEach(element => { element.hidden = false; });
  function selectPlan(plan) {
    document.querySelectorAll('.plan').forEach(element => {
      element.classList.toggle('selected', element.id === `plano-${plan?.id}`);
    });
    recommendation.textContent = plan
      ? `Indicação inicial: ${plan.name}. Confirme sua necessidade com Renata.`
      : 'A escolha ajuda a começar a conversa.';
    clear.hidden = !plan;
    const message = plan
      ? `Olá, Renata! Vim pelo site e tenho interesse no plano ${plan.name}. Gostaria de negociar uma proposta para minha rotina.`
      : generalMessage;
    if (phoneAvailable) {
      contacts.forEach(link => {
        link.href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
      });
    }
  }
  radios.forEach(input => {
    input.addEventListener('change', () => {
      selectPlan(config.plans.find(plan => plan.id === input.value));
    });
  });
  clear.addEventListener('click', () => {
    radios.forEach(input => { input.checked = false; });
    selectPlan(null);
    radios[0]?.focus();
  });

  if (config.photo) {
    const photo = new Image();
    photo.alt = 'Renata Ferreira, secretária virtual';
    photo.width = 120;
    photo.height = 122;
    photo.loading = 'lazy';
    photo.addEventListener('load', () => document.querySelector('#portrait').replaceChildren(photo));
    photo.src = config.photo;
  }
  if (/^[a-zA-Z0-9._]+$/.test(config.instagram)) {
    const instagram = document.querySelector('#instagram');
    instagram.href = `https://www.instagram.com/${config.instagram}/`;
    instagram.textContent = `@${config.instagram} ↗`;
  }
})();
