const express = require('express')


const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())

const port = process.env.PORT || 8000

app.use(bodyParser.json())

app.post('/modal', async (req, res) => {
    console.log(req.body);
    try {
        res.status(200).send(req.body)
    } catch (e) {
        res.status(500).send("problem")
    }


})

app.listen(port, () => {
    console.log(`server is up to port :${port}`);
})