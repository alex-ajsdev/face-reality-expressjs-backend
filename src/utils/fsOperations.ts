import path from 'path';
import fs from 'fs';

const IMAGE_DIRECTORY = path.join(__dirname, '..', '..', 'img');
const TOTAL_IMAGES = 9;
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

/**
 * Returns a list of valid image files from a given directory.
 * @param {string} directoryPath - Path to the directory.
 * @returns {string[]} - List of valid image files.
 */
function getValidImagesFromDirectory(directoryPath: string): string[] {
  try {
    return fs
      .readdirSync(directoryPath)
      .filter((file) => VALID_EXTENSIONS.includes(path.extname(file)));
  } catch (error) {
    console.error(`Error reading directory: ${directoryPath}`, error);
    return [];
  }
}

/**
 * Returns a random image from a specified set, excluding provided images.
 * @param {string} set - Image set to fetch from.
 * @param {Image[]} excludedImages - Images to exclude.
 * @returns {Image | undefined} - A random image or undefined.
 */
function getRandomImageFromSet(
  set: string,
  excludedImages: Image[] = []
): Image | undefined {
  const directoryPath = path.join(IMAGE_DIRECTORY, set);
  const images = getValidImagesFromDirectory(directoryPath).filter(
    (img) =>
      !excludedImages.some(
        (selected) => selected.id === img && selected.set === set
      )
  );

  if (images.length === 0) return;

  const randomImage = images[Math.floor(Math.random() * images.length)];
  return {
    id: randomImage,
    set: set,
    url: `img/${set}/${randomImage}`
  };
}

/**
 * Returns a collection of images ensuring at least one from each set.
 * @param {string[]} imageSets - List of image sets.
 * @returns {Image[]} - Collection of images.
 */
export function getImages(imageSets: string[]): Image[] {
  const selectedImages: Image[] = [];

  // Ensure at least one image from each set
  for (const set of imageSets) {
    const image = getRandomImageFromSet(set);
    if (image) selectedImages.push(image);
  }

  // Fill in the rest of the images
  fillRemainingImages(imageSets, selectedImages);

  return selectedImages;
}

/**
 * Fills in the remaining images to the collection.
 * @param {string[]} imageSets - List of image sets.
 * @param {Image[]} selectedImages - Collection of selected images.
 */
function fillRemainingImages(imageSets: string[], selectedImages: Image[]) {
  while (selectedImages.length < TOTAL_IMAGES) {
    const randomSet = imageSets[Math.floor(Math.random() * imageSets.length)];
    const image = getRandomImageFromSet(randomSet, selectedImages);
    if (image) selectedImages.push(image);
  }
}

interface Image {
  id: string;
  set: string;
  url: string;
}
