require("dotenv").config();

const multer = require('multer');
const { DefaultAzureCredential } = require('@azure/identity');
const { BlobServiceClient } = require('@azure/storage-blob');
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const mysql = require('mysql2/promise');
const cors = require("cors");
const upload = multer({ storage: multer.memoryStorage() });
const containerName =process.env.AZURE_STORAGE_CONTAINER_NAME;



const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
app.use(cors());

app.get("/api/findIngredients", async (req, res) => {
    console.log("searching for ingredient");

    try {
        console.log('query', req.query.ingredientsList);
        const ingredientNames = req.query.ingredientsList;

        if (!ingredientNames) {
            return res.status(400).send("Missing 'ingredientsList' query parameter.");
        }

        const ingredientsArray = ingredientNames.split('.')
            .map(ingredientName => ingredientName.trim().toLowerCase())
            .filter(Boolean);

        if (ingredientsArray.length === 0) {
            return res.status(400).send("No valid ingredients provided.");
        }
        console.log(ingredientsArray);
        const [rows, cols] = await pool.query(
            'SELECT * FROM ingredients WHERE LOWER(ingredient_name) IN (?)',
            [ingredientsArray]
        );

        res.json(rows);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server Error");
    }
});

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.put('/connect', upload.single('file'), async (req, res) => {
    try {
        const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
        const credentials = new DefaultAzureCredential();
        const storageEndpoint = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/`;
        const blobServiceClient = new BlobServiceClient(storageEndpoint, credentials);
        const containerClient = blobServiceClient.getContainerClient(containerName);


        const blobName = "newblob" + new Date().getTime();
        const content = "Hello world!";

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

    } catch (error) {
        console.error('Error uploading file to Azure Blob Storage:', error);
        res.status(500).send('Error uploading file');
    }
});

