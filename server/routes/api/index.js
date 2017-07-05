
const api = require('express').Router()

api.get('/', (req, res) => {
    res.send({hello: 'api'})
})
api.use('/rarbg', require('./rarbg'))
api.use('/tpb', require('./tpb'))

module.exports = api