# Blog WEB - Tech Challenge

O **Blog WEB** é um serviço de front-end desenvolvido como parte do **Desafio Técnico da Pós-Graduação de Full Stack Development da FIAP Postech (5FSDT - Fase3)**. Seu principal objetivo é fornecer uma camada de front-end completa para uma aplicação de blog, lidando com a interface e a experiência do usuário.

O projeto foi construído com foco em boas práticas de desenvolvimento e modularizando os componentes, o que favorece a clareza, a organização e a facilidade de manutenção do código. A implementação foi realizada individualmente pelo aluno listado abaixo, com seu respectivo registro acadêmico.

`* Renato Carapiá Brunetti / RM362132`

# ⛭ Informações Técnicas

## → Containers

Os containers são unidades leves, portáteis e isoladas que empacotam uma aplicação junto com todas as suas dependências, garantindo que o software funcione de forma consistente em diferentes ambientes. Eles ajudam a evitar problemas de configuração e facilitam a implantação e escalabilidade da aplicação.

### + Docker

O Docker é a plataforma mais utilizada para a criação e gerenciamento de containers. Ele permite que os desenvolvedores definam ambientes completos de forma reproduzível, automatizando a construção, execução e distribuição de aplicações. No projeto, o Docker foi utilizado para containerizar a aplicação Node.js, promovendo padronização e facilidade no setup do ambiente.

![Docker Desktop executanto o serviço Web!](/public/images/docker-desktop-web.png 'Docker Desktop executanto o serviço Web') _"Docker Desktop executanto o serviço Web"_

Comando utilizado: `docker compose up -d web`

### + Docker Compose

O Docker Compose é uma ferramenta que permite orquestrar múltiplos containers de forma simples, por meio de um arquivo YAML. No projeto, ele foi utilizado para configurar e executar o serviço da aplicação, facilitando o desenvolvimento, testes e a manutenção do sistema como um todo.

## → Integração Contínua e Entrega/Implementação Contínua - CI/CD

CI/CD (Integração Contínua e Entrega/Implantação Contínua) é uma prática essencial em DevOps que automatiza os processos de teste, build e deploy de aplicações. Com CI/CD, o código passa por validações automatizadas sempre que há mudanças, garantindo maior qualidade, agilidade e segurança nas entregas.

### + GitHub Actions

O GitHub Actions é a ferramenta de automação do GitHub que permite configurar pipelines de CI/CD diretamente no repositório. No projeto, foi utilizado para automatizar testes, builds e o envio de imagens Docker para o DockerHub, garantindo que cada alteração no código seja validada e integrada ao fluxo de entrega de forma eficiente.

![GitHub Actions!](/public/images/github-actions.png 'GitHub Actions') _"GitHub Actions"_

## → Tecnologias utilizadas

> Clique para visualizar a descrição de cada item

<details>
  <summary>Node.js</summary>
  Um ambiente de execução JavaScript assíncrono e baseado em eventos. Ele permite a construção de aplicações de rede escaláveis e de alta performance, sendo a base para o desenvolvimento do back-end da API.
</details>
<details>
  <summary>TypeScript</summary>
  Uma superset do JavaScript que adiciona tipagem estática opcional. Ele melhora a manutenibilidade, a legibilidade e a confiabilidade do código, detectando erros de forma antecipada e facilitando o desenvolvimento em equipe.
</details>

---

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
