const http = require("http");
const { read_file, write_file } = require("./file-manager/file-manager");

const options = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

const app = http.createServer((req, res) => {
  // GET
  if (req.method === "GET" && req.url === "/get_all_products"){
    try {
        const fileData = read_file("product.json");

  res.writeHead(200, options);
  res.end(JSON.stringify(fileData))
    }
    catch(error) {
      res.end(JSON.stringify({
        message: error.message
    }))
  }
}
    //POST  
  if (req.method === "POST" && req.url === "/add_product") {
    req.on("data", (a) => {
      const data = JSON.parse(a);
      const { title, price, desc } = data;

      const fileData = read_file("product.json");

      fileData.push({
        title,
        price,
        desc
      });

      write_file("product.json", fileData);

      res.writeHead(201, options);
      res.end(JSON.stringify({ message: "Added new product" }));
    });
  } else {
    res.writeHead(404, options);
    res.end(JSON.stringify({ message: "added product" }));
  }

  // put
  if (req.method === "PUT" && req.url === `/update_product/${reqId}`) {
    req.on('data', (chunk) => {
        const data = JSON.parse(chunk)
        const { title, price, desc } = data

        const fileData = read_file("product.json")

        const foundedProduct = fileData.find((item) => item.id === reqId)

        if(!foundedProduct) {
            res.writeHead(404, options)
            return res.end(JSON.stringify({
                message: "Product not found"
            }))
        }

        fileData.forEach((item) => {
            if(item.id === reqId) {

            }
        })

        write_file("product.json", data)
        res.writeHead(200, options)
        res.end(JSON.stringify({
          message: "Updated product"
        }))
    })
}
// delete\

if(req.method === "DELETE" && req.url === "/delete_product/" + reqId) {
    const fileData = read_file("product.json")

    const foundedProduct = fileData.find((a) => a.id === reqId)

    if(!foundedProduct) {
        res.writeHead(404, options)
        return res.end(JSON.stringify({
            message: "Product not found"
        }))
    }

    fileData.forEach((b, index) => {
        if(b.id === reqId) {
          fileData.splice(index, 1)
        }
      })
}});

app.listen(3000, () => {
  console.log("server running");
  
})
