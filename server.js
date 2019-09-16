require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json())//

const sendEmailRouter = require('./routes/sendEmail');
app.use('/sendEmail', sendEmailRouter);

app.use(express.static(path.join(__dirname, 'client/build')))

if (process.env.NOD_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '../client/build/index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});