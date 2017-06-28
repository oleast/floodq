
// ///////////////////////////////////////////////////
// Server/Root File for the Project
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// Include Statements
// ///////////////////////////////////////////////////

const express = require('express')
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const session = require('express-session')
const path = require('path')

global.logger = require('winston')
global.appRoot = path.resolve(__dirname)

global.apiRoot = "http://torrentapi.org/pubapi_v2.php"
global.apiToken = "xxxx"

global.buildApiRequest = (query) => {
    return (apiRoot + "?mode=search&search_string='" + query + "'&token=" + apiToken)
}

global.getToken = () => {
    axios.get(apiRoot + "?get_token=get_token")
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}

const routes = require('./routes')

// ///////////////////////////////////////////////////
// Constants
// ///////////////////////////////////////////////////

const PORT = process.env.FLOODQ_PORT || 8000
const HOST = process.env.FLOODQ_HOST || '0.0.0.0'
const LOG_LEVEL = process.env.FLOODQ_LOG_LEVEL || 'debug'

// ///////////////////////////////////////////////////
// Initial Server Setup
// ///////////////////////////////////////////////////

const app = express()

app.set('view options', { pretty: true })
app.set('json spaces', 2)

app.use(cookieparser())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(express.static('public'))

// Adjust the log level via environment variable
logger.level = LOG_LEVEL

app.use('/', routes)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

let server = app.listen(PORT, HOST, () => logger.info('FloodQ server running on: ' + HOST + ':' + PORT))

// ///////////////////////////////////////////////////
// End of file
// ///////////////////////////////////////////////////