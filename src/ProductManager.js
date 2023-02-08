import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  // Create initial product list file
  createProductListFile = async () => {
    try {
      let data = JSON.stringify(this.products);
      if (!existsSync(this.path)) {
        await writeFile(this.path, data);
        return console.log('The file has been created successfully');
      } else {
        return console.log('The File already exists');
      }
    } catch (err) {
      console.log(`Error message: ${err.message}`);
    }
  };

  // Create products (CREATE)
  addProduct = async (title, description, price, image, code, stock) => {
    try {
      let data = await JSON.parse(await readFile(this.path));

      const productData = {
        id: data.length + 1,
        title,
        description,
        price,
        image,
        code,
        stock,
      };
      this.products.push(productData);
      let newProduct = JSON.stringify(this.products);
      await writeFile(this.path, newProduct);
      console.log('The product was created successfully');
    } catch (err) {
      console.log(`Error message: ${err.message}`);
    }
  };

  // Get products (READ)
  getProducts = async (query) => {
    try {
      const data = await JSON.parse(await readFile(this.path));
      const { limit } = query;

      if (limit !== undefined) {
        const filtrado = await data.filter((p) => p.id <= limit);
        return filtrado;
      } else {
        return data;
      }
    } catch (err) {
      console.log(`Error message: ${err.message}`);
    }
  };

  // Get product by ID (READ)
  getProductById = async (productId) => {
    try {
      const { id } = productId;
      const data = await JSON.parse(await readFile(this.path));
      const exists = await data.find((p) => p.id === parseInt(id));
      if (exists) {
        const product = await data.filter((p) => p.id === parseInt(id));
        return product;
      } else {
        return { msg: 'El producto no existe' };
      }
    } catch (err) {
      console.log(`Error message: ${err.message}`);
    }
  };

  // Update product (UPDATE)
  updateProduct = async (id, title, description, price, image, code, stock) => {
    try {
      const data = await JSON.parse(await readFile(this.path));
      const exists = await data.find((p) => p.id === parseInt(id));
      if (exists) {
        this.products = await data.map((p) =>
          p.id === id ? { ...p, ...{ title } } : p
        );
        let productDataUpdated = JSON.stringify(this.products);
        await writeFile(this.path, data);
        console.log('The product was updated successfully');
      } else {
        return { msg: 'The product not exists' };
      }
    } catch (err) {
      console.log(`Error message: ${err.message}`);
    }
  };

  // Delete a product (DELETE)
  deleteProduct = async (id) => {
    try {
      const data = await JSON.parse(await readFile(this.path));
      const exists = await data.find((p) => p.id === parseInt(id));
      if (exists) {
        this.products = await data.filter((p) => p.id !== id);
        const productDeleted = JSON.stringify(this.products);
        await writeFile(this.path, productDeleted);
        console.log('The product was updated successfully');
      } else {
        return { msg: 'The product not exists' };
      }
    } catch (err) {
      console.log(`Error message: ${err.message}`);
    }
  };
}

export default ProductManager;
