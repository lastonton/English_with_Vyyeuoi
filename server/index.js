const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`)
});
const bodyParsers = require('body-parser')
app.use(bodyParsers.json({limit: '10mb'}));

app.use('/api/user', require('./api/user.js'));

const path = require('path');
app.use('/', express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});