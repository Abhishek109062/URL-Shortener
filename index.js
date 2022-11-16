const express = require('express')
const app = express()
const db = require('./short._schema')
const mdb = require('./db_connect')
app.use(express.static('public'))
mdb();


app.use(express.json());
app.get('/geturls', async(req, res) => {

    const data = await db.find();
    res.send(data);
    res.end()
})

app.post('/create', async(req, res) => {
    var cc = req.body.url;
    if (cc.includes('https://'))
        cc = cc.replace('https://', '');
    console.log(cc)
    db.create({ full: cc })

    res.end()
})
app.get('/:url', async(req, res) => {

    const data = await db.findOne({ short: req.params.url })
    if (data) {
        data.clicks++;
        await data.save()

        res.redirect('https://' + data.full)
    }


})

app.post('/delete', async(req, res) => {
    const data = await db.findOne({ full: req.body.url })
    console.log(data)
    if (data)
        data.remove()
    res.end()
})





app.listen(process.env.PORT || 3000);