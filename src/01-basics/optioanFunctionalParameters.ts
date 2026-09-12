function calculateTotal(price: number, quantity: number): number {
    return price * quantity;
}

function isValidPrice(price: number): boolean {
    return price > 0;
}

const price = 500;
const quantity = 3;

if (isValidPrice(price)) {
    const total = calculateTotal(price, quantity);

    console.log(`Price: ${price}`);
    console.log(`Quantity: ${quantity}`);
    console.log(`Total: ${total}`);
} else {
    console.log("Invalid price");
}