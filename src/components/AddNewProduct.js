import { Modal, Typography, TextField, Grid, Box, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function AddNewProduct({ OpenModalToAddProduct, handleCloseAddProduct }) {
  const [productDetail, setproductDetail] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const handleSubmit = (event) => {
    event.PreventDefault();
    axios
      .post("https://fakestoreapi.com/products", productDetail)
      .catch((error) => console.log('"Failed to Add product"', error));

    setTimeout(() => {
      handleCloseAddProduct();
    }, 3000);
  };

  const handleInputChnage = (event) => {
    setproductDetail({
      ...productDetail,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal
      open={OpenModalToAddProduct}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Box sx={style}>
          <form onSubmit={() => handleSubmit()}>
            <Grid container maxWidth="sm" spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Enter title"
                  value={productDetail.title}
                  name="title"
                  label="Title"
                  onChange={handleInputChnage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Enter Description"
                  value={productDetail.description}
                  name="description"
                  label="Description"
                  onChange={handleInputChnage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Enter Price"
                  value={productDetail.price}
                  name="price"
                  label="Price"
                  onChange={handleInputChnage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Enter category"
                  value={productDetail.category}
                  name="category"
                  label="Category"
                  onChange={handleInputChnage}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="file"
                  placeholder="Select image"
                  value={productDetail.image}
                  name="image"
                  onChange={handleInputChnage}
                />
              </Grid>
            </Grid>

            <Box mt={3}>
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddNewProduct;
