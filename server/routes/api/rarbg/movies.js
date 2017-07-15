
let axios = require('axios')

module.exports = require('express')
    .Router()
        .get('/', (req, res) => {
            let requestText = buildApiRequest(req.query.query)
                .then(a => {
                    axios.get(a)
                        .then((b) => {
                            let data = b.data.torrent_results
                            if (!data) {
                                res.json([])
                            } else {
                                data.map((torrent => {
                                    return {
                                        manget: torrent.download,
                                        name: torrent.filename,
                                        seeds: 0,
                                        leechs: 0
                                    }
                                }))
                                res.json(data)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            res.json([])
                        })
                    })
            })
