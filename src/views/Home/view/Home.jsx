import React from "react";
import NavBar from "../../../common/NavBar";
import { Grid, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Home = () => {
  const theme1 = createTheme({
    palette: {
      secondary: {
        main: "#FE724C",
      },
    },
  });

  return (
    <div className="landing-page">
      <NavBar />
      <header className="hero-content">
        <h1>
          Unlock Your <br /> Dream Career Today
        </h1>
        <p>Your Success Story Begins Here!</p>
        <Grid container sx={{ pl: 0, pt: 4, gap: 2 }}>
          <Grid item xs={12} sm={12} lg={4} sx={{ pb: 2 }}>
            <ThemeProvider theme={theme1}>
              <Button
                variant="contained"
                color="secondary"
                className="open-appointments"
              >
                Reserve your Time Now!
              </Button>
            </ThemeProvider>
          </Grid>
          <Grid item xs={4} sm={12} lg={4} sx={{ pb: 2 }}>
            {/* <p className="light-lext">
              Many immersive & interactive experience.
            </p> */}
            <ThemeProvider theme={theme1}>
              <Button variant="outlined" color="secondary">
                Check Your Reservation!
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </header>
    </div>
  );
};

export default Home;
