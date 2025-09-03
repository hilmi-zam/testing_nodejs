const express = require('express');
const app = express();
const PORT = 3100;

app.use(express.json());

let filmList = [
    {filmId: 1, name: 'Inception', creator: 'Christopher Nolan', release: 2010},
    {filmId: 2, name: 'The Matrix', creator: 'The Wachowskis', release: 1999},
    {filmId: 3, name: 'Interstellar', creator: 'Christopher Nolan', release: 2014},
];

let creatorList = [
    {creatorId: 1, fullname: 'Christopher Nolan'},
    {creatorId: 2, fullname: 'The Wachowskis'}
];

// Home endpoint
app.get('/home', (req, res) => {
    res.send('Selamat datang di layanan data film!');
});

// Ambil semua film
app.get('/film', (req, res) => {
    res.json(filmList);
});

// Cari film berdasarkan id
app.get('/film/id/:filmId', (req, res) => {
    const id = Number(req.params.filmId);
    const found = filmList.filter(f => f.filmId === id);
    if (found.length === 0) {
        return res.status(404).send('Film tidak ditemukan!');
    }
    res.json(found[0]);
});

// Cari film berdasarkan nama
app.get('/film/name/:name', (req, res) => {
    const searchName = req.params.name.toLowerCase();
    const result = filmList.find(f => f.name.toLowerCase() === searchName);
    if (!result) {
        return res.status(404).send('Film dengan nama tersebut tidak ada.');
    }
    res.json(result);
});

// Cari film berdasarkan creator
app.get('/film/creator/:creator', (req, res) => {
    const searchCreator = req.params.creator.toLowerCase();
    const result = filmList.filter(f => f.creator.toLowerCase() === searchCreator);
    if (result.length === 0) {
        return res.status(404).send('Film dengan creator tersebut tidak ditemukan.');
    }
    res.json(result);
});

// CRUD creator

// Ambil semua creator
app.get('/creator', (req, res) => {
    res.json(creatorList);
});

// Ambil creator berdasarkan id
app.get('/creator/id/:creatorId', (req, res) => {
    const id = Number(req.params.creatorId);
    const found = creatorList.find(c => c.creatorId === id);
    if (!found) {
        return res.status(404).send('Creator tidak ditemukan!');
    }
    res.json(found);
});

// Tambah creator
app.post('/creator', (req, res) => {
    const { fullname } = req.body;
    if (!fullname) {
        return res.status(400).send('Field fullname wajib diisi.');
    }
    const newCreator = { creatorId: Date.now(), fullname };
    creatorList.push(newCreator);
    res.status(201).json(newCreator);
});

// Update creator
app.put('/creator/id/:creatorId', (req, res) => {
    const id = Number(req.params.creatorId);
    const creator = creatorList.find(c => c.creatorId === id);
    if (!creator) {
        return res.status(404).send('Creator tidak ditemukan!');
    }
    const { fullname } = req.body;
    if (!fullname) {
        return res.status(400).send('Field fullname wajib diisi.');
    }
    creator.fullname = fullname;
    res.json(creator);
});

// Hapus creator
app.delete('/creator/id/:creatorId', (req, res) => {
    const id = Number(req.params.creatorId);
    const idx = creatorList.findIndex(c => c.creatorId === id);
    if (idx === -1) {
        return res.status(404).send('Creator tidak ditemukan!');
    }
    const removed = creatorList.splice(idx, 1);
    res.json(removed[0]);
});

// Tambah film
app.post('/film', (req, res) => {
    const { name, creator, release } = req.body;
    if (!name || !creator || !release) {
        return res.status(400).send('Semua field (name, creator, release) wajib diisi.');
    }
    const newFilm = {
        filmId: Date.now(),
        name,
        creator,
        release: Number(release)
    };
    filmList.push(newFilm);
    res.status(201).json(newFilm);
});

app.listen(PORT, () => {
    console.log(`API berjalan di http://localhost:${PORT}`);
});

