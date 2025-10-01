//import des elements
require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose")

const app = express();
const PORT = process.env.PORT;


//1-connecter la base de donner mongodb
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("la base de donnée connecter avec succes");
    })
    .catch(() => {
        console.error(error);

    });


//2-creer un schema
const schema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stockStatus: {
        type: String,
        enum: ["en stock", "petite stock", "pas en stock"],
        default: ("en stock"),
        required: true
    }

});


//3-creer le modele production
const productModel = mongoose.model("produits", schema)

//Middleware
app.use(express.json());


//route GET
app.get('/produits', async (req, res) => {
    const afficheProduit = await productModel.find();
    res.send({
        afficheProduit,
    });
});

// route GET
app.get('/produits/:id', async (req, res) => {
    const id = req.params.id;
    const recupereProduit = await productModel.findById(id);

    if (!recupereProduit) {
        res.status(401).send({
            message: "produit non trouver"
        });
        return;
    }
    res.send({
        recupereProduit
    });

});


//ajouter un nouvel produits
app.post("/produits", async (req, res) => {
    const produit = req.body;

    try {
        await productModel.create(produit);
    } catch (error) {
        res.send({
            message: error,
        });
        return;
    }

    res.send({
        message: "le produit a étè ajouter avec succes",
        produit,
    });
});

// mettre a jour un produit
app.patch('/produits/:id', async (req, res) => {
    const produitId = req.params.id;
    console.log(produitId);
    
    const recuperer = await productModel.findById(produitId);

    if (!recuperer) {
        res.status(401).send({
            message: "produit non trouver"
        });
        return;
    }
    const { productName, price } = req.body;
    const updatedProduit = await productModel.findByIdAndUpdate(produitId, { productName, price }, { "new": true });
    res.send({
        message: "produit mis a jour",
        updatedProduit
    })

})

app.patch('/produits/:id/:stockStatus', async (req, res) => {
    const produitId = req.params.id;
    const recuperer = await productModel.findById(produitId);

    if (!recuperer) {
        res.status(401).send({
            message: "produit non trouver"
        });
        return;
    }
    const { stockStatus } = req.body;
    const updatedProduit = await productModel.findByIdAndUpdate(produitId, { stockStatus }, { "new": true });
    res.send({
        message: "produit mis a jour",
        updatedProduit
    })

})

//supprimer un produit
app.delete('/produits/:id', async (req, res) => {
    const deleteProduit = await productModel.findByIdAndDelete(req.params.id);

    if (!deleteProduit) {
        res.status(401).send({
            message: "le prooduit n'est pas supprimer"
        });
        return;
    }

    res.send({
        message: "le produit a étè supprimer avec succes",
        deleteProduit
    })
})


//defir le port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});