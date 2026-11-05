# Renata Ferreira | Secretária Virtual

Landing page de secretariado remoto para profissionais e consultórios da área da saúde. A experiência prioriza a leitura no celular, a comparação dos planos e o contato com Renata pelo WhatsApp.

## Recursos

- Apresentação curta e resumo dos serviços.
- Planos Essencial, Profissional e Premium com negociação direta e valores sob proposta.
- Indicação opcional por tipo de necessidade, com mensagem de WhatsApp adaptada.
- Detalhes dos serviços e perguntas frequentes expansíveis.
- Acesso persistente ao WhatsApp no celular.
- Navegação por teclado, foco visível e respeito à preferência por movimento reduzido.

## Executar

Com Node.js instalado, rode `npm start` na pasta do projeto. Acesse http://127.0.0.1:4173.

## Estrutura

O projeto usa HTML, CSS e JavaScript puro. O Node.js serve a prévia e gera a distribuição estática.

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura e textos editoriais |
| `config.js` | Planos, apresentação, FAQ e contatos |
| `styles.css` e `responsive.css` | Identidade visual e adaptação às telas |
| `app.js` | Indicação de plano e mensagens de contato |
| `prerender.cjs` | Atualização dos planos e FAQ no HTML |
| `build.cjs` | Geração da pasta `dist` |
| `assets/logo-renata-verde-creme.png` | Logo principal fornecido para o projeto |
| `logo-rf.svg` | Monograma anterior, preservado como alternativa |

## Publicar

Execute `npm run prerender`, `npm run check` e `node build.cjs`. Publique o conteúdo de `dist/` no servidor. A Vercel usa a configuração de `vercel.json` ao importar o repositório.

Após alterar `config.js`, gere novamente o HTML e a distribuição. Consulte também o [guia de manutenção](LEIA-ME.md).

A versão original recebida permanece em assets/logo-renata.png. A versão verde e creme foi refinada com geração de imagens por IA, preservando as iniciais, a silhueta e os textos da marca.

