function displayProduct(product: Product): void {
    console.log(`Product: ${product.name}`);
    console.log(`Price: $${product.price}`);
    console.log(`Available: ${product.inStock}`);
}

const product: Product = {
    id: 101,
    name: "Laptop",
    price: 1200,
    inStock: true
};

displayProduct(product);