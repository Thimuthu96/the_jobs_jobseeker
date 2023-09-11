import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import BgImg from "../../../assets/bg.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword } from "../../../utils/db";
import { toast } from "react-toastify";

const Login = () => {
  const theme1 = createTheme({
    palette: {
      secondary: {
        main: "#FE724C",
      },
    },
  });

  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/validate-user-role?email=${email}&userRole=${userRole}`
      );
      if (response.status === 200) {
        const res = await logInWithEmailAndPassword(email, password);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userEmail", email);
        if (res === true) {
          loginNavigate();
        }
      } else {
        toast.error("You do not have sufficient access rights!", {
          position: "bottom-right",
        });
      }
      // if (response.status === 200) {
      //   const res = await logInWithEmailAndPassword(email, password);
      //   localStorage.setItem("userRole", userRole);
      //   localStorage.setItem("userEmail", email);
      //   // loginNavigate();
      //   if (res.status === 200) {
      //     toast.success("test!", {
      //       position: "bottom-right",
      //     });
      //   }
      // } else {
      //   toast.error("You do not have sufficient access rights!", {
      //     position: "bottom-right",
      //   });
      // }

      setIsLoading(false);
    } catch (error) {
      toast.error("You do not have sufficient access rights!", {
        position: "bottom-right",
      });
    }
  };

  const loginNavigate = () => {
    if (userRole === "jobseeker") {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/jobseeker");
    } else if (userRole === "consultant") {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/admin");
    } else if (userRole === "admin") {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/admin");
    }
  };

  useEffect(() => {
    if (userRole === "jobseeker") {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/jobseeker");
    } else if (userRole === "consultant") {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/admin");
    } else if (userRole === "admin") {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/admin");
    }
  }, [user, loading]);

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
            Login
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
                Login as
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="userRole"
                label="Select User Role"
                name="userRole"
                onChange={(newValue) => setUserRole(newValue.target.value)}
                color="warning"
              >
                <MenuItem defaultValue disabled>
                  <em>None</em>
                </MenuItem>
                <MenuItem value="jobseeker">Job Seeker</MenuItem>
                <MenuItem value="consultant">Consultant</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              <TextField
                id="email"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                size="small"
                color="warning"
                required
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                size="small"
                color="warning"
                required
              />
            </FormControl>
            {/* <FormControl
          sx={{ mt: 2, rowGap: "1em", mb: 2.5 }}
          fullWidth
          size="small"
        >
          
        </FormControl> */}
          </DialogContent>
          <DialogActions>
            <Grid
              container
              spacing={2}
              sx={{
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <Grid item xs={12}>
                <Button
                  onClick={() => handleLogin()}
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
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => navigate("/signup")}
                  color="warning"
                  sx={{
                    width: "100%",
                  }}
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
            {/* <Button variant="contained" color="warning" onClick={fetchData}>
              Check
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Login;
