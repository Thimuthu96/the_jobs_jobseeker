import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form } from "react-bootstrap";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const CheckStatusDialog = (props) => {
  const { open, onClose } = props;
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nic, setNic] = useState("");

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#52575C",
      },
    },
  });

  const theme1 = createTheme({
    palette: {
      secondary: {
        main: "#FE724C",
      },
    },
  });

  const columns = [
    {
      field: "appointmentId",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 150,
      flex: 0.8,
      align: "center",
    },
    {
      field: "scheduledDate",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 300,
      flex: 1.6,
      align: "center",
    },
    {
      field: "appointmentState",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 160,
      flex: 0.9,
      align: "center",
    },
    {
      field: "consultantId",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 160,
      flex: 0.9,
      align: "center",
    },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/jobseeker/check/appointment?nic=${nic}`
      );
      const data = response.data.map((row) => ({
        ...row,
        id: v4(), // Generate a unique ID for each row
      }));

      setMenuData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const customLocaleText = {
    noRowsLabel: "No data found!", // Change this to your desired message
  };

  return (
    <>
      <Dialog
        open={open}
        // onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            backgroundColor: "#FE724C",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Check your appointment state
        </DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          <Grid container spacing={2}>
            <Grid item xs={4} sm={4} lg={4}></Grid>
            <Grid item xs={4} sm={4} lg={4}></Grid>
            <Grid item xs={4} sm={4} lg={4}></Grid>
          </Grid>
          <FormControl
            sx={{ mt: 2, rowGap: "1em", mb: 2.5 }}
            fullWidth
            size="small"
          >
            <TextField
              id="NIC"
              label="NIC"
              name="NIC"
              onChange={(e) => setNic(e.target.value)}
              variant="outlined"
              size="small"
              color="warning"
              required
            />
          </FormControl>

          <Grid item xs={12} sm={12} md={12}>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 500,
                  width: "100%",
                }}
              >
                <ThemeProvider theme={theme1}>
                  <CircularProgress color="secondary" />
                </ThemeProvider>
              </Box>
            ) : (
              <Box
                sx={{
                  height: 500,
                  width: "100%",
                  "& .super-app-theme--header": {
                    color: "#FFFFFF",
                    backgroundColor: "#FE724C",
                  },
                }}
              >
                <DataGrid
                  style={{
                    height: "350px",
                  }}
                  rows={menuData}
                  columns={columns}
                  pageSize={5}
                  rowHeight={90}
                  rowsPerPageOptions={[8]}
                  localeText={customLocaleText}
                />
              </Box>
            )}
          </Grid>

          <DialogActions sx={{ mt: -12 }}>
            <Button
              onClick={() => {
                setMenuData([]);
                onClose();
              }}
              color="warning"
            >
              Close
            </Button>
            <Button variant="contained" color="warning" onClick={fetchData}>
              Check
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckStatusDialog;
