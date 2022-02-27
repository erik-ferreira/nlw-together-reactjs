<h1 align="center">
    <img src=".github/logo.svg" width="250px">
</h1>

<p>
    <img src=".github/cover.svg" width="100%">
</p>

## :rocket: Tecnologias

Projeto criado em [Vite.js](https://vitejs.dev) usando as seguintes tecnologias:

- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com)
- [Typescript](https://www.typescriptlang.org)

## :computer: Projeto

Projeto desenvolvido durante o Next Level Week Together pela [Rocketseat](https://rocketseat.com.br), para criar salas Q&A com seu público.

## :thinking: Como rodar o projeto?

Será necessário criar uma conta no [firebase](https://firebase.google.com), e um projeto para utilizar o Realtime Database.

1. Ao criar o projeto, na aba esquerda navegue até `Realtime Database > Regras`

2. Adicione as seguintes regras e salve:

```
{
  "rules": {
    "rooms": {
      ".read": false,
    	".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('author.id').val() == auth.id)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
          }
        }
      }
    },
  }
}
```

3. Rodar `yarn install` no terminal para instalar as dependências

4. Depois executar `yarn dev` para inicializar o servidor

5. Abrir no navegador a url http://localhost:3000 e visualizar o projeto rodando.
