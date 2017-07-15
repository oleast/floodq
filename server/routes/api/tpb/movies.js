
let axios = require('axios')

module.exports = require('express')
    .Router()
        .get('/', (req, res) => {

            piratebay.search(req.query.query, { cat:208, page:req.query.page || 0 }, (err, results) => {
                if (err) {
                    console.error(err)
                    res.json([])
                } else if (results) {
                    console.log(results)
                    res.json(results)
                } else {
                    console.log('Got else')
                    res.json([])
                }
            })
        })
