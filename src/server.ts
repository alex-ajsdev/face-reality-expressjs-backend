import express from 'express';
import fs from 'fs';
import path from 'path';
import { Image } from './image';

const app = express();
const PORT = 3000;
const IMAGE_DIRECTORY = path.join(__dirname, 'img'); 
const TOTAL_IMAGES = 16;

app.use('/img', express.static('img'));

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.get('/images/stylegan', (req, res) => {
    res.json(getImages(['ffhq', 'stylegan']));
});

app.get('/images/stylegan2', (req, res) => {
    res.json(getImages(['ffhq', 'stylegan2']));
});

app.get('/images/progan', (req, res) => {
    res.json(getImages(['ffhq', 'progan']));
});

function getImages(imageSets: string[]) {
    let selectedImages: Image[] = [];
    // Ensure at least one image from each set
    for (let set of imageSets) {
        const directoryPath = path.join(IMAGE_DIRECTORY, set);
        const images = fs.readdirSync(directoryPath).filter(file => {
            return ['.jpg', '.jpeg', '.png'].includes(path.extname(file));
        });

        const randomImage = images[Math.floor(Math.random() * images.length)];
        selectedImages.push({
            id: randomImage,
            set: set,
            url: `img/${set}/${randomImage}`
        });
    }

    // Fill in the rest of the images
    while (selectedImages.length < TOTAL_IMAGES) {
        const randomSet = imageSets[Math.floor(Math.random() * imageSets.length)];
        const directoryPath = path.join(IMAGE_DIRECTORY, randomSet);
        const images = fs.readdirSync(directoryPath).filter(file => {
            return ['.jpg', '.jpeg', '.png'].includes(path.extname(file));
        }).filter(img => {
            return !selectedImages.some(selected => selected.id === img && selected.set === randomSet);
        });

        if (images.length === 0) continue;

        const randomImage = images[Math.floor(Math.random() * images.length)];
        selectedImages.push({
            id: randomImage,
            set: randomSet,
            url: `img/${randomSet}/${randomImage}`
        });
    }

    return selectedImages;
}


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});