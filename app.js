const express = require('express')
const hbs = require('hbs')
const path = require('path')

const swaggerJsDoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000


//Extended: https://swagger.io/specification/#infoObject
const swaggerOptions={
    swaggerDefinition: {
        info: {
            title: 'Restful API',
            description: "API information",
            contact: {
                name: "Pham Phuoc Thinh"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["app.js"]
};

const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/apidocs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *  get:
 *    summary: Json file
 *    responses:
 *      '200':
 *        description: The about html file
 *      default:
 *        description: Unexpected error
 * /about:
 *  get:
 *    summary: Returns about html page status
 *    responses:
 *      '200':
 *        description: The about html file
 */




const viewsPath = path.join(__dirname, './templates/views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
const publicDirectoryPath = path.join(__dirname, './templates/views')
app.use(express.static(publicDirectoryPath))


app.use('/about', (req, res) => {
    res.render('about')
})

app.use('/', (req, res) => {
    res.send({
        name: 'Thinh',
        age: 21
    })
})


app.listen(port,() => {
    console.log("Server running")
})
