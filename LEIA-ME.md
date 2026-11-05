# Guia de manutenção

## Rodar e editar

Execute `npm start` na pasta do projeto. A prévia fica em http://127.0.0.1:4173.

Edite `config.js` para alterar planos, apresentação, FAQ e contatos. Os textos editoriais ficam em `index.html`. Todos os planos são apresentados como “Solicite uma proposta”, com negociação pelo WhatsApp. Os campos de preço permanecem vazios e não são exibidos.

Após editar, execute os comandos abaixo, um por vez.

```sh
npm run prerender
npm run check
node build.cjs
```

A pasta `dist/` contém os arquivos para hospedar. No Git, mantenha os arquivos-fonte e a pasta `assets/`. A Vercel gera `dist/` automaticamente.

## Identidade

A imagem fornecida é a logo principal em `assets/logo-renata-verde-creme.png`. O monograma anterior foi preservado em `logo-rf.svg` e `favicon.svg`. Para alternar, ajuste as referências das imagens e do ícone no `index.html` e gere novamente `dist/`.

## Contato

WhatsApp comercial confirmado em `config.js`, com o número internacional 5548984500320. Os botões abrem a conversa com uma mensagem preenchida. O visitante decide quando enviá-la.

## Versão mobile simplificada

Os planos aparecem após um resumo de três serviços. Serviços completos, FAQ e início da contratação ficam em blocos expansíveis. O seletor é opcional e destaca o plano conforme o tipo de apoio. Horários, capacidade e condições são alinhados diretamente com Renata.

A versão original recebida permanece em assets/logo-renata.png. A versão verde e creme foi refinada com geração de imagens por IA, preservando as iniciais, a silhueta e os textos da marca.

