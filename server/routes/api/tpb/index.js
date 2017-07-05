const search = require('express').Router()

search.get('/', (req, res) => {
    res.send({hello: 'tpb'})
})
search.use('/movies', require('./movies'))
search.use('/tvshows', require('./tvshows'))

module.exports = search