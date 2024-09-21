require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const mysql = require('mysql2/promise');
const cors = require("cors");

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

