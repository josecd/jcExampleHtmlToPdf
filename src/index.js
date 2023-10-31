const express = require('express')
const app = express()
const port = 3000
const { jcGeneratepdfHtml } = require('jc-htmltopdf')
const path = require('path')
const datos = require('./poke.json')

app.get('/', (req, res) => {
  /**
   * renderizar vista
   */
    res.render('index.hbs',datos);
})

app.get('/pruebaspdf', async (req, res) => {
  /**
   * CHROMIUM_PATH es la configuración que se hace para poder tener
   * la ruta del CHROMIUM_PATH del servidor cloud
   *
   * const CHROMIUM_PATH = config.CHROMIUM_PATH
   * usaremos las constante de arriba cuando usemos un contenedor de docker
   */
  const CHROMIUM_PATH = ''
  const rutaAlPdfHbs = path.join(process.cwd(), 'views', 'index.hbs')
  const buffer = await jcGeneratepdfHtml(rutaAlPdfHbs, datos, CHROMIUM_PATH, '')
  const fileName = 'test'
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename=${fileName}-.pdf`,
    'Content-Length': buffer.length,
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0
  })
  res.end(buffer)
})

app.listen(8080, () => {
  console.log('Listening to requests on Port 8080')
})
