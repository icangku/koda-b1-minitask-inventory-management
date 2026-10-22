const rs = require("readline-sync");
let isExit = false;
const isMainMenu = true;
const inventories = [{ id: "e13da", name: "Shampoo Sunsilk", stock: 200 }];

const addProduct = (product) => {
  if (typeof product !== "object") {
    return "Sorry, this is not an object";
  }

  if (!Object.hasOwn(product, "name")) {
    return "Sorry, this product has no name";
  }

  if (!Object.hasOwn(product, "stock")) {
    return "Sorry, this product has no stock";
  }

  inventories.push(product);
  return `Product ${product.name} is added`;
};

const listProduct = () => {
  let inventoriesStr = ``;
  inventories.forEach((inv) => {
    inventoriesStr += `\n[${inv.id.toString().padEnd(4)}] ${inv.name.toString().padEnd(30)}${inv.stock.toString().padEnd(5)}pc(s)`;
  });
  console.log(inventoriesStr);
};

const checkProductInfo = () => {
  listProduct();
  const idProduct = rs.question("ID Product: ");
  const index = inventories.findIndex((inv) => inv.id === idProduct.trim());

  if (index === -1) {
    console.log("Product ID not found");
  } else {
    var inOrOut = rs.question("Is this in or out?");
    switch (inOrOut) {
      case "in":
        var amount = rs.questionInt("How many? ");
        inventories[index].stock = inventories[index].stock + amount;
        console.log("Updated");
        listProduct();
        break;
      case "out":
        var amount = rs.questionInt("How many? ");
        if (amount > 0) {
          inventories[index].stock = inventories[index].stock - amount;
        } else {
          console.log("Sorry, stock is below 1");
        }
        console.log("Updated");
        listProduct();
        break;
      default:
        console.log("Option not found");
        break;
    }
  }
};

const createProduct = () => {
  const product = {};
  const productName = rs.question("What product you want to add? ");
  product.name = productName;
  const productStock = rs.questionInt(
    `How many of ${productName} you want to add? `,
  );
  product.stock = productStock;
  product.id = crypto.randomUUID().slice(0, 5);
  addProduct(product);
};

const displayMenu = () => {
  console.log(`
      1. Add Product
      2. Update Stock
      3. List Product
      4. Search Product
      0. Exit
    `);
};

const menuSwitcher = (menu) => {
  switch (menu) {
    case 0:
      isExit = !isExit;
      break;
    case 1:
      createProduct();
      break;
    case 2:
      checkProductInfo();
      break;
  }
};

while (!isExit) {
  if (isMainMenu) {
    displayMenu();
    var menu = rs.questionInt("Please choose a menu:");
    menuSwitcher(menu);
  }
}
