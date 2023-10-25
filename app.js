const express = require("express");
const userObjs = require("./userDB");
const productObjs = require("./productDb");

const app = express();

app.get("/get-user-product-summary/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  const user = userObjs.find((user) => user.id === userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const userProducts = productObjs.filter(
    (product) => product.user_id === userId
  );

  const totalPrice = userProducts.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );

  res.json({
    user_id: user.id,
    name: user.name,
    email: user.email,
    product_summary: userProducts.map((product) => ({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    })),
    total_price: totalPrice,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
