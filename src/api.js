const axios = require('axios');

// URL base do servidor json-server
const baseURL = 'http://localhost:3001';

// Exemplo de requisição GET
axios.get(`${baseURL}/posts`)
  .then(response => {
    console.log('Posts:', response.data);
  })
  .catch(error => {
    console.error('Erro ao obter posts:', error);
  });

// Exemplo de requisição POST
const newPost = { title: 'Novo Post' };
axios.post(`${baseURL}/posts`, newPost)
  .then(response => {
    console.log('Novo post criado:', response.data);
  })
  .catch(error => {
    console.error('Erro ao criar novo post:', error);
  });
