# jc-htmltopdf
Proyecto para convertir un template html a PDF

## NPM

[Página de npm de la librería](https://www.npmjs.com/package/jc-htmltopdf)

Instalar `npm install --save jc-htmltopdf`

## Explicación del proyecto

### Tenemos un proyecto básico donde tenemos una vista creada con código HTML con algunos cambios sencillo
 - - Se encuentra en la ruta /views en el archivo encontratemos fragmentos de código

 #### Usar un for
 - La estrucura es la siguiente

```js
     {{#each pokemons}}
        <h1> {{nombre}}</h1>
    {{/each}}
```
    De esta forma podemos acceder a los atributos de un array

 #### Usar un if
  - La estrucura es la siguiente

```js
      {{#if titulo2}}
      <h2 class="display-6 text-center mb-4">{{titulo2}}</h2>
      {{else}}
      <h2 class="display-6 text-center mb-4">No cuenta con título</h2>
      {{/if}}
```

  - Si el titulo contiene información va aparecer si no aparecerá el else que pondrá que no contiene titulo

 ###  En el endpoint /pruebaspdf esta el export del documento a pdf

 - rutaAlPdfHbs: Es donde se encuentra el archivo de HTML.
 - datos: Es el JSON de la información que se va mostrar en el HTML.
 - CHROMIUM_PATH: Es el path del CHROMIUM cuando usamos docker y subir a un servidor.
 - format: Es el formato del pdf que se va exporta en la seccion de [Formatos] estan los disponibles.

```js
  const rutaAlPdfHbs = path.join(process.cwd(), 'views', 'index.hbs')
   const buffer = await jcGeneratepdfHtml(rutaAlPdfHbs, datos, CHROMIUM_PATH, format)
```

## Deploy con docker

### Cambiamos CHROMIUM_PATH en el index.json

    Cambiamos esta infomación para que se pueda usar el path del CHROMIUM en el servidor

```js
    const CHROMIUM_PATH = config.CHROMIUM_PATH
   const buffer = await jcGeneratepdfHtml(rutaAlPdfHbs, datos, CHROMIUM_PATH, format)
```
### Creamos la imagen de docker 

```js
    docker build -t nodejs-pdf .
```

### Iniciamos el docker 
```js
    docker run -p 8080:8080 nodejs-pdf
```

## Rutas del proyecto 

 - http://localhost:8080               Se ve el archivo que se va exportar
 - http://localhost:8080/pruebaspdf    Se descarga el PDF 


### Configuración de parametros
|Nombre         |Type            |Default                         |Descripción                                                                                                 |
|------------   |----------------|--------------------------------|------------------------------------------------------------------------------------------------------------|
|htmlPath       |String          | Es requerido                   |Se manda el path donde esta el template de html.                                                            |
|info           |Array           | Es requerida la información    |Se manda el array con información que se mandara con los datos que se pintanran en el HTML.                 |
|CHROMIUM_PATH  |String          |`""`                            |Path de CHROMIUM_PATH para poder hacer el renderizado en el servidor si no se require mandar `""`           |
|format         |String          |`""`                            |El formato que se le dara al PDF puedes ver los formatos [AQUÍ](#Formatos)                                  |

### Formatos
 -Formatos permitidos

| Formatos  |
|-----------|
| Tabloid   | 
| Legal     | 
| A4        |
| A3        |
| A5        |
| A6        |
| A7        |
| A8        |
| Folio     |



## Créditos

[José Alejandro](https://github.com/josecd)
