const readline = require("readline");
const fs = require("fs");
const yargs = require("yargs");

const argv = yargs
  .option("file", {
    alias: "f",
    describe: "Archivo JSON",
    type: "string",
    default: "productos.json",
  })
  .help().argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const CrearProductos = async () => {
  try {
    rl.question("Nombre del producto: ", (productName) => {
      rl.question("Precio: ", (price) => {
        rl.question("Cantidad: ", (quantity) => {
          const newProduct = {
            nombre: productName,
            precio: price,
            cantidad: quantity,
          };

          const filePath = argv.file;

          if (fs.existsSync(filePath)) {
            const existingData = fs.readFileSync(filePath, "utf-8");
            const products = JSON.parse(existingData);

            products.push(newProduct);

            fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
          } else {
            const products = [newProduct];
            fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
          }

          const savedData = fs.readFileSync(filePath, "utf-8");
          const savedProducts = JSON.parse(savedData);

          console.log("Productos guardados:");
          console.log(JSON.stringify(savedProducts, null, 2));

          rl.close();
        });
      });
    });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
  }
};