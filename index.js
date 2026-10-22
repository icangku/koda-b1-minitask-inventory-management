const rs = require("readline-sync");
const inventories = [];

const addProduct = (product) => {
  if (typeof product !== "object") {
    return "Sorry, this is not an object";
  }

  if (Object.hasOwn(product, "name")) {
    return "Sorry, this product has no name";
  }

  if (Object.hasOwn(product, "stock")) {
    return "Sorry, this product has no stock";
  }

  inventories.push(product);
  return `Product ${product.name} is added`;
};

const productName = rs.question("What product you want to add?");
const productStock = rs.question(`How many of ${productName} you want to add?`);
