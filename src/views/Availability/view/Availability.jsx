import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
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
} from "@mui/material";
import { format } from "date-fns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import moment from "moment";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { v4 } from "uuid";

const Availability = () => {
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

  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [availableData, setAvailableData] = useState([]);

  const handleSubmit = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const userNic = localStorage.getItem("userNic");
    const formattedScheduleDate = format(new Date(scheduleDate), "yyyy-MM-dd");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/consultant/availability",
        {
          nic: userNic,
          email: userEmail,
          date: formattedScheduleDate,
          availableTime: {
            morning: scheduleTime === "Morning",
            afternoon: scheduleTime === "Afternoon",
            evening: scheduleTime === "Evening",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Availability added successfully");
      } else {
        toast.error("Failed to add availability");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add availability");
    }
  };

  const columns = [
    {
      field: "date",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 150,
      flex: 1,
      align: "center",
    },
    {
      field: "availableTime",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 90,
      flex: 0.8,
      align: "center",
    },
  ];

  //=------------------------------------------------------------------
  const fetchData = async () => {
    // let list = [];

    try {
      setIsLoading(true);
      const response = await axios
        .get
        // `http://localhost:8080/api/v1/consultant/check/appointment?consultantId=${consultantId}`
        ();
      const data = response.data.map((row) => ({
        ...row,
        id: v4(), // Generate a unique ID for each row
      }));

      setAvailableData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const customLocaleText = {
    noRowsLabel: "No data found!", // Change this to your desired message
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        height: "auto",
        pl: 2,
      }}
    >
      <Grid item xs={12} sx={{ mt: 5 }}>
        <h2>Add your availability here</h2>
      </Grid>
      <Grid item xs={12} sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          {/* On small screens, each item will take up 6 columns */}
          <Grid item xs={12} sm={6} lg={3} sx={{ mt: 5 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                {/* <DatePicker
                    label="Schedule date"
                    defaultValue={dayjs(scheduleDate)}
                  /> */}
                <DatePicker
                  label="Schedule date"
                  value={scheduleDate}
                  onChange={(newValue) => setScheduleDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} sx={{ mt: 5 }}>
            <FormControl sx={{ mt: 2, rowGap: "1em" }} fullWidth size="small">
              <InputLabel id="demo-select-small" color="warning">
                Schedule time
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="ScheduleTime"
                label="Select Schedule time"
                name="ScheduleTime"
                // value={formik.values.ScheduleTime}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                color="warning"
                onChange={(newValue) => setScheduleTime(newValue.target.value)}
              >
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Afternoon">Afternoon</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} sx={{ mt: 7 }}>
            <Button variant="contained" color="warning" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 550,
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
                height: 550,
                width: "100%",
                "& .super-app-theme--header": {
                  color: "#FFFFFF",
                  backgroundColor: "#FE724C",
                },
              }}
            >
              <DataGrid
                rows={availableData}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                initialState={{
                  sorting: {
                    sortModel: [
                      { field: "Date", sort: "ASC" },
                      { field: "Time", sort: "ASC" },
                    ],
                  },
                }}
                localeText={customLocaleText}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Availability;
