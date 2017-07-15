
const axios = require('axios')
const requestify = require('requestify');

module.exports = require('express')
    .Router()
        .get('/', (req, res) => {
            let requestText = buildApiRequest(req.query.query)
                .then(a => {
                    var requestify = require('requestify');
                    console.log(a)
                    requestify.get(a)
                        .then(function(response) {
                            let data = response.data
                            console.log(data)
                            // Get the response body (JSON parsed or jQuery object for XMLs)
                            let r = data.map((torrent) => {
                                return {
                                    name: torrent.filename,
                                    magnet: torrent.download,
                                    seeds: 0,
                                    leechs: 0
                                }
                            })
                            res.json(r)
                        })
                })
            })
