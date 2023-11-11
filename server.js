// Importing modules
const express = require('express');
const url = require('url');

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

app.listen(port, () => {
  console.log("toten_interativo_ON");
})