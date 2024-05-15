import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import ProductsDetails from "./ProductDetails";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddNewProduct from "./AddNewProduct";

export default function CustomTable() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");

  const [limit, setLimit] = React.useState("");
  const [openProductModal, setOpenProductModal] = useState(false);
  const [isDesc, setIsDesc] = useState("");
  const [OpenModalToAddProduct, setOpenModalToAddProduct] = useState(false);

  const handleChange = (event) => {
    setLimit(event.target.value);
    console.log("event.target.value", event.target.value);
  };

  const fetchProducts = async () => {
    const response = await fetch(
      `https://fakestoreapi.com/products?limit=${limit}&sort=${isDesc}`
    );

    const data = await response.json();

    console.log("data", data);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [limit, isDesc]);

  const handleCLickOnProductDetails = (rowData) => {
    setProduct(rowData);
    setOpenProductModal(true);
  };

  const handleCloseProductDetails = () => {
    setOpenProductModal(false);
  };

  const handleDesendingOrder = () => {
    if (isDesc === "desc") {
      setIsDesc("asc");
    } else {
      setIsDesc("desc");
    }
  };

  const handleAddProduct = () => {
    setOpenModalToAddProduct(true);
  };

  const handleCloseAddProduct = () => {
    setOpenModalToAddProduct(false);
  };

  return (
    <>
      <ProductsDetails
        openProductModal={openProductModal}
        handleCloseProductDetails={handleCloseProductDetails}
        product={product}
      />
      <AddNewProduct OpenModalToAddProduct={OpenModalToAddProduct} handleCloseAddProduct={handleCloseAddProduct} />
      <Box
        mb={2}
        sx={{ display: "flex", justifyContent: "space-between", gap: "24px" }}
      >
        <FormControl fullWidth sx={{ maxWidth: "120px" }} size="small">
          <InputLabel id="demo-simple-select-label">Limit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Button variant="contained" onClick={() => handleDesendingOrder()}>
            Desc
          </Button>
        </Box>
        {/* <Box flexGrow={1}    /> */}
        <Box>
          <Button
            onClick={() => handleAddProduct()}
            endIcon={<AddIcon />}
            fullWidth
            variant="outlined"
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleCLickOnProductDetails(row)}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">
                  {row.description.length > 50
                    ? row.description.slice(0, 50) + "..."
                    : row.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
