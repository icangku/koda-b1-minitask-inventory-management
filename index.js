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
  inventories.forEach((product) => {
    inventoriesStr += `\n[${product.id.padEnd(4)}] ${product.name.toString().padEnd(30)}${product.stock} pc(s)`;
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
    const inOrOut = rs.question("Is this in or out?").trim().toLowerCase();
    if (inOrOut !== "in" && inOrOut !== "out") {
      console.log("No Option");
      return;
    }

    const amount = rs.questionInt("How many? ");
    switch (inOrOut) {
      case "in":
        inventories[index].stock += amount;
        console.log("Updated");
        listProduct();
        break;
      case "out":
        if (amount <= 0) {
          console.log("Sorry, stock is below 1");
        } else if (inventories[index].stock >= amount) {
          inventories[index].stock -= amount;
          console.log("Updated");
          listProduct();
        } else {
          console.log(
            `Sorry, insufficient stock! Current stock is only ${inventories[index].stock}.`,
          );
        }
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
    case 3:
      listProduct();
    break;
    case 4:
      searchProduct();
      break;
    default:
      displayMenu();
}};

const searchProduct = () => {
  const input = rs.question("Search product name: ").trim();
  const keyword = input.toLowerCase();

  if (keyword === "") {
    console.log("Keyword cannot be empty");
    return;
    
  }

  const results = inventories.filter((inv) =>
    String(inv.name).toLowerCase().includes(keyword),
  );

  if (results.length === 0) {
    console.log(`Product "${input}" not found`);
    return;
  }

  let resultsStr = ``;
  results.forEach((inv) => {
    resultsStr += `\n[${inv.id.toString().padEnd(4)}] ${inv.name.toString().padEnd(30)}${inv.stock.toString().padEnd(5)}pc(s)`;
  });
  console.log(`\nFound ${results.length} product(s):${resultsStr}`);
};

while (!isExit) {
  if (isMainMenu) {
    displayMenu();
    const menu = rs.questionInt("Please choose a menu:");
    menuSwitcher(menu);
  }
}
