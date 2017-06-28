
const api = require('express').Router()

api.get('/', (req, res) => {
    res.send({hello: 'api'})
})
api.use('/search', require('./search'))

module.exports = api