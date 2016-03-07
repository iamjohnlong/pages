const http = require('http')
const fs = require('fs')
const Prism = require('./prism.js')


// Actual default values
var md = require('markdown-it')({
  highlight: function (str, lang) {
    return Prism.highlight(str, Prism.languages.javascript);
  }
});

const s = http.createServer()

s.on('request', (req, res)=> {
  if(req.url === '/styles/main.css') {
    res.writeHead(200, {'Content-Type': 'text/css'})
    const css = fs.readFileSync(`${process.cwd()}${req.url}`, 'utf-8')
    res.end(css)
    return
  }
  if(req.url === '/') file = 'index'
  const base = fs.readFileSync(`${process.cwd()}/index.html`, 'utf-8')
  const mdFile = fs.readFileSync(`${process.cwd()}/md/${file}.md`, 'utf-8')
  const result = md.render( mdFile );
  res.end(base.replace('{{CONTENTS}}', result))
})

s.listen(8000, ()=> {
  console.log('server started on ' + 8000);
})