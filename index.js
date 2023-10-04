const express = require('express');
const app = express();
const {connectToMongoDB} = require('./connect')
const URL = require('./models/url');

const urlRoute = require('./routes/url');
const port = 8001;

connectToMongoDB("mongodb://127.0.0.1/short-url")

app.use(express.json());
app.use("/url", urlRoute);

app.get('/:shortId', async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push :{
        visitHistory:{
            timestamp: Date.now(),
        }
    }});
    res.redirect(entry.redirectURL);
})

app.listen(port);