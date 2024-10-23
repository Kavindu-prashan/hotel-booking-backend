import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

export default GalleryItem;
