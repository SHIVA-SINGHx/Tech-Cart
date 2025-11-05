import express from "express"

export const getProduct = async (req, res) =>{
    try {
        const {productName, productDescription, price, category, brand} = req.body;
        const userId = req.id;

        if(!productName || !productDescription || !price || !category || !brand){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // handle multiple images
        let productImg = [];
        if(req.files && req.files.length > 0){

        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}