import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Grid, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BsInfoCircle } from "react-icons/bs";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { format } from "date-fns";

const ApprovalPending = () => {
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

  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  // const [openDetails, setOpenDetails] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [rowData, setRowData] = useState({});
  const [selectedTable, setSelectedTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("2023-09-05");
  const [nic, setNic] = useState("963402660V");
  const [consultantId, setConsultantId] = useState("963402660V");
  const [appointmentId, setAppointmentId] = useState("");
  const userNic = localStorage.getItem("userNic");

  const columns = [
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 150,
      flex: 1,
      align: "center",
    },
    {
      field: "appointmentId",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 90,
      flex: 0.8,
      align: "center",
    },
    {
      field: "scheduledDate",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 110,
      flex: 0.8,
      align: "center",
    },
    {
      field: "nic",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 120,
      flex: 1,
      align: "center",
    },
    {
      field: "email",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 120,
      flex: 1,
      align: "center",
    },
    {
      field: "job_field",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 120,
      flex: 1,
      align: "center",
    },
    {
      field: "Actions",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // width: 380,
      flex: 2,
      align: "center",
      renderCell: (data) => {
        return (
          <ThemeProvider theme={theme}>
            <Grid
              sx={{ display: "flex", flexDirection: "row", columnGap: "2em" }}
            >
              <span>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    // setAppointmentId(data.row.appointmentId);
                    handleConfirm(data.row.appointmentId);
                    // console.log(data.row.appointmentId);
                    // handleOpen();
                  }}
                >
                  Approve
                </Button>
              </span>
            </Grid>
          </ThemeProvider>
        );
      },
    },
  ];

  const fetchData = async () => {
    // let list = [];

    // const formattedDate = format(new Date(), "yyyy-MM-dd");
    const formattedDate = "2023-09-10";
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/appointment?scheduledDate=${formattedDate}&nic=${userNic}`
      );
      const data = response.data.map((row) => ({
        ...row,
        id: v4(), // Generate a unique ID for each row
      }));

      setAppointmentData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Approve an appointment
  const handleConfirm = async (appointmentid) => {
    try {
      const response = await axios
        .put(
          `http://localhost:8080/api/v1/appointment/status-update?appointmentId=${appointmentid}&consultantId=${userNic}`
        )
        .then(fetchData());

      if (response.status === 200) {
        toast.success("Appointment updated successfully!", {
          position: "bottom-right",
        });
      } else {
        toast.success("Appointment couldn't be updated!", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log();
      // setMessage('Failed to update appointment');
    }
  };

  //REMOVE AN ORDER
  const handleRemove = async () => {
    // await deleteDoc(doc(db, "order", rowData));
    fetchData();
  };

  const customLocaleText = {
    noRowsLabel: "No data found!", // Change this to your desired message
  };

  return (
    <>
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
            rows={appointmentData}
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
    </>
  );
};

export default ApprovalPending;
