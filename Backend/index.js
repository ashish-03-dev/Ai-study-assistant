import app from './app.js';
import dotenv from 'dotenv';
import * as vectorService from "./services/vectorService.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})