// Importing modules
const express = require('express');
const url = require('url');
const axios = require('axios');
require('dotenv').config();

// Initializing the express and port number
const app = express();
const port = process.env.PORT || 3000

// read static files
app.use(express.static('public'));

// Calling the express.json() method for parsing
app.use(express.json({ limit: "2mb" }));

// html server
app.get('/', async (req, res) => {
  var q = url.parse(req.url, true);
  var filename = "./public/" + q.pathname;
  if (q.pathname == "/") { filename = "./public/index.html"}

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("Pagina Nao Encontrada");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });       
});

// chatgpt config
const apiKey = process.env.OPENAI_API_KEY;
const engineModel = 'gpt-3.5-turbo';
const temperature = 0.7;
const role = "user";
const urlAPI = 'https://api.openai.com/v1/chat/completions';

// Rota de Conversação 
app.get('/talk', async (req, res) => {

  //obtem mensagem enviada pelo usuário
  let q = url.parse(req.url, true).query;    
  let prompt = q.msg ;

  //obtem retorno da API
  const response = await sendPrompt(prompt);

  //envia resposta para o usuário
  return res.end(response);
});

// requisição HTTP para API do ChatGPT
async function sendPrompt(prompt) {

  const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
  };

  const body = {
      model: engineModel,
      messages: [
        {
          role: role,
          content: prompt,
        }
      ],
      temperature: temperature
  };

  try {
      const response = await axios.post(urlAPI, body, { headers });      
      let msg = response.data.choices[0].message.content;
      return msg;
  } catch (error) {
      console.error('Erro ao solicitar a API:', error);
      return "Ocorreu um erro ao obter resposta da API";
  }
}

app.listen(port, () => {
  console.log("toten_interativo_ON");
})