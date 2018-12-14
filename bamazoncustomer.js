var mysql = require("mysql")
var inquirer = require("inquirer")
const table = require("console.table")




var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connection successful!");
    productslog();
  });

  function productslog(){

    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res)

        itemprompt(res)
    })

  }
   
  function itemprompt(inventory) {

    inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "what is the ID of the item you like to purchase?[Quit with Q] ",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val){
      exitcheck(val.choice)
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);



      if (product){
        promptforquantity(product)
      }
      else{
        console.log("That item is not in the inventory")
        productslog();
      }
    });
  }

function promptforquantity(product){
inquirer
  .prompt([
    {
      type: "input",
      name: "quantity",
      message: "How many would you like? [Quit with Q]",
      validate: function(val) {
        return val > 0 || val.toLowerCase() === "q";
      }
    }
  ])
  .then(function(val){
    exitcheck(val.quantity)
    var quantity = parseInt(val.quantity);
    
    if (quantity > product.stock_quantity) {
      console.log("\nInsufficient quantity!");
      productslog();
    }
    else {
      
      Purchase(product, quantity);
    }
  })
}
function Purchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // Let the user know the purchase was successful, re-run loadProducts
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      productslog();
    }
  );
}
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

function exitcheck(choice) {
  if (choice.toLowerCase() === "q") {
    // Log a message and exit the current node process
    console.log("Goodbye!");
    process.exit(0);
  }
}