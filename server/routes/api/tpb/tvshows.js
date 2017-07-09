
let axios = require('axios')

module.exports = require('express')
    .Router()
        .get('/', (req, res) => {

            piratebay.search(req.query.query, { cat:207, page:req.query.page || 0 }, (err, results) => {
                if (err) {
                    console.error(err)
                } else if (results) {
                    let fixedResults = JSON.parse(results).map(torrent => ({
                        filename: torrent.name,
                        download: torrent.magnet
                    }))
                    console.log(JSON.stringify(results))
                    res.json(fixedResults)
                } else {
                    console.log('Got else')
                    res.json([])
                }
            })
        })
