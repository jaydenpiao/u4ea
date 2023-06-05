const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/lyrics', async (req, res) => {
    try {
        const { artist, title } = req.query;

        if (!artist || !title) {
            return res.status(400).send('Artist and Title');
        }

        const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
        const data = await response.json();

        if (data.error) {
            return res.status(404).send('Could not find lyrics.');
        }

        res.send(data.lyrics);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
