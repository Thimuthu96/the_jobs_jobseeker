import React, { useEffect, useState } from "react";
import NavBar from "../../../common/NavBar";
import { Grid, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddAppointmentDialog from "../widgets/AddAppointmentDialog";
import CheckStatusDialog from "../widgets/CheckStatusDialog";

const Home = () => {
  const theme1 = createTheme({
    palette: {
      secondary: {
        main: "#FE724C",
      },
    },
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusDialogOpen, setstatusDialogOpen] = useState(false);

  //open appointment dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  //open status dialog
  const handleOpenStatusDialog = () => {
    setstatusDialogOpen(true);
  };

  //close appointment dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  //close status dialog
  const handleCloseStatusDialog = () => {
    setstatusDialogOpen(false);
  };

  useEffect(() => {
    handleOpenDialog();
    // setDialogOpen(true);
  }, []);
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
                onClick={handleOpenDialog}
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
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleOpenStatusDialog}
              >
                Check Your Reservation!
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </header>
      <AddAppointmentDialog open={dialogOpen} onClose={handleCloseDialog} />
      <CheckStatusDialog
        open={statusDialogOpen}
        onClose={handleCloseStatusDialog}
      />
    </div>
  );
};

export default Home;
