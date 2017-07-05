
let axios = require('axios')

module.exports = require('express')
    .Router()
        .get('/', (req, res) => {
            let requestText = buildApiRequest(req.query.query)
                .then(a => {
                    axios.get(a)
                        .then((b) => {
                            console.log(a)
                            let results = b.data.torrent_results
                            console.log(results)
                            if (!results) {
                                res.json([])
                            } else {
                                res.json(results)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    })
            })
