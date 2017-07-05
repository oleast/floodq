let axios = require('axios')

module.exports = require('express')
    .Router()
        .get('/', (req, res) => {

            piratebay.search(req.query.query, { category: 208 })
                .then((a) => {
                    console.log(a)
                    res.json(a)
                })
            })
