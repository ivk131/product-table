import "./App.css";
import { Box, Container, Grid, Typography } from "@mui/material";
import CustomTable from "./components/CustomTable";

function App() {
  return (
    <Container maxWidth="lg" style={{ justifyContent: "center" }}>
      <div className="App">
        <Box mt={3} >
        <Typography variant="h4" color="purple"  >Product Table</Typography>
        </Box>
        <Box mt={3}>
          <CustomTable />
        </Box>
      </div>
    </Container>
  );
}

export default App;
