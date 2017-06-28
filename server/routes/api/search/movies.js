
let axios = require('axios')

module.exports = require('express')
    .Router()
        .post('/', (req, res) => {
            axios.get(buildApiRequest(req.body.query))
                .then((res) => {
                    console.log(res)
                })
                .catch(function (err) {
                    console.log(err)
                })
            })
