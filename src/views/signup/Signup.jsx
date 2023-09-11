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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BgImg from "../../assets/bg.jpg";
import JobseekerSignUp from "../signup/JobseekerSignUp";
import ConsultantSignUp from "../signup/ConsultantSignUp";

const SignUp = () => {
  const theme1 = createTheme({
    palette: {
      secondary: {
        main: "#FE724C",
      },
    },
  });

  const [open, setOpen] = useState(true);
  const [userRole, setUserRole] = useState("");

  return (
    <div>
      <img
        src={BgImg}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100vh",
        }}
      />
      <div>
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
            SignUp
          </DialogTitle>
          <DialogContent sx={{ width: "500px" }}>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} lg={4}></Grid>
              <Grid item xs={4} sm={4} lg={4}></Grid>
              <Grid item xs={4} sm={4} lg={4}></Grid>
            </Grid>
            <FormControl
              sx={{ mt: 2, rowGap: "1em", mb: 5 }}
              fullWidth
              size="small"
            >
              <InputLabel id="demo-select-small" color="warning">
                Signup as
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="userRole"
                label="Select User Role"
                name="userRole"
                // value={formik.values.Jobfield}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                color="warning"
                onChange={(newValue) => setUserRole(newValue.target.value)}
              >
                <MenuItem defaultValue disabled>
                  <em>None</em>
                </MenuItem>
                <MenuItem value="JobSeeker">Job Seeker</MenuItem>
                <MenuItem value="Consultant">Consultant</MenuItem>
              </Select>
              <>
                {userRole === "Consultant" ? (
                  <ConsultantSignUp />
                ) : (
                  <JobseekerSignUp />
                )}
              </>
            </FormControl>
            {/* <FormControl
          sx={{ mt: 2, rowGap: "1em", mb: 2.5 }}
          fullWidth
          size="small"
        >
          
        </FormControl> */}
          </DialogContent>
          <DialogActions>
            {/* <Grid
              container
              spacing={2}
              sx={{
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <Grid item xs={12}>
                <Button
                  // onClick={() => {
                  //   setAppointmentData([]);
                  //   onClose();
                  // }}
                  color="warning"
                  sx={{
                    width: "100%",
                    backgroundColor: "#FE724C",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#FF5733",
                      color: "#fff",
                    },
                  }}
                >
                  Sign up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  // onClick={() => {
                  //   setAppointmentData([]);
                  //   onClose();
                  // }}
                  color="warning"
                  sx={{
                    width: "100%",
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid> */}
            {/* <Button variant="contained" color="warning" onClick={fetchData}>
              Check
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default SignUp;
