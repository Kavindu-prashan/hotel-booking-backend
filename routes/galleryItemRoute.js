import express from 'express';
import { createGalleryItem ,getGalleryItem} from '../controllers/galleryitemController.js'; // Match the exact casing of the file

const galleryItemRouter = express.Router();


galleryItemRouter.post("/", createGalleryItem); 
galleryItemRouter.get("/", getGalleryItem); 

export default galleryItemRouter;
