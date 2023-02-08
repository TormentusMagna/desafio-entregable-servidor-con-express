import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ProductManager from './ProductManager.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const admin = new ProductManager(join(__dirname, 'data', 'productList.json'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/products', async (req, res) => {
  const products = await admin.getProducts(req.query);
  res.send(products);
});

app.get('/products/:id', async (req, res) => {
  const product = await admin.getProductById(req.params);
  res.send(product);
});

app.listen(8080, () => console.log(`Server running on port: 8080`));
