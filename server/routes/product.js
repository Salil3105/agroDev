const express = require("express");
const productRouter = express.Router();
const auth = require("../middlewares/auth");
const { Product } = require("../models/product");

productRouter.get("/api/products/", auth, async (req, res) => {
    try {
        console.log('/api/products/');
        const products = await Product.find({ category: req.query.category });
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// To get search query data
productRouter.get("/api/products/search/:name", auth, async (req, res) => {
    try {
        console.log('api/products/search/');
        const products = await Product.find({
            name: { $regex: req.params.name, $options: "i" },
        });
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// To get a post request to rate a product 
productRouter.post('/api/rate-product', auth, async (req, res) => {
    try {
        const { id, rating } = req.body;

        let product = await Product.findById(id);
        for (let i = 0; i < product.ratings.length; i++) {
            product.ratings.splice(i, 1);
            break;
        }
        const ratingSchema = {
            userId: req.user,
            rating
        };
        product.ratings.push(ratingSchema);
        product = await product.save();
        res.status(200).json(product);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

productRouter.get("/api/deal-of-day", auth, async (req, res) => {
    try {
        let products = await Product.find({});

        products = products.sort((a, b) => {
            let aSum = 0;
            let bSum = 0;

            for (let i = 0; i < a.ratings.length; i++) {
                aSum += a.ratings[i].rating;
            }

            for (let i = 0; i < b.ratings.length; i++) {
                bSum += b.ratings[i].rating;
            }
            return aSum < bSum ? 1 : -1;
        });

        res.json(products[0]);
        res.status(200);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = productRouter;