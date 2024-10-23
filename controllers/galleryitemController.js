import GalleryItem from "../models/galleryItems.js"; 

export const createGalleryItem = (req, res) => {

        const user = req.user
        if (user == null) {
            res.status(403).json({ 
                message:"Please login to create a new gallery item."
            })
            return
        }
        if (user.type!="admin ") {
            res.status(403).json({
                message :"you are not allowed to create a new gallery item"
            })
            return
        }
      


    try {
        
        const galleryItemData = req.body.item;

       
        const newGalleryItem = new GalleryItem(galleryItemData);

        
        const savedGalleryItem = newGalleryItem.save();

       
        res.status(201).json({
            message: "Gallery item saved successfully",
            galleryItem: savedGalleryItem
        });

    } catch (error) {
     
        res.status(500).json({
            message: "Failed to save gallery item",
            error: error.message
        });
    }
};

export const getGalleryItem = (req, res) => {
    GalleryItem.find()  
        .then((list) => {
            res.json({
                list: list,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error retrieving gallery items",
                error: error.message,
            });
        });
};