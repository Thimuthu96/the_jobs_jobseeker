import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { Form } from "react-bootstrap";
import { v4 } from "uuid";
import { format } from "date-fns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";

const JobseekerSignUp = () => {
  const theme1 = createTheme({
    palette: {
      secondary: {
        main: "#FE724C",
      },
    },
  });

  const [dob, setDob] = useState("");
  const appId = v4().slice(0, 5);

  const validationSchema = Yup.object().shape({
    Jobfield: Yup.string().required("Job Category is required"),
    FullName: Yup.string().required("Full Name is required"),
    Email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    nic: Yup.string().required("NIC is required"),
    password: Yup.string().required("Password is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      Jobfield: "",
      FullName: "",
      Email: "",
      nic: "",
      password: "",
      contactNumber: "",
      gender: "",
      dob: "",
      // Add initial values for other fields here
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        handleAdd(values);
        // formik.resetForm();
      } catch (err) {
        console.log(`Something went wrong : ${err}`);
      }
    },
  });

  const handleAdd = (values) => {
    const formattedDob = format(new Date(dob), "yyyy-MM-dd");
    const data = {
      name: values.FullName,
      nic: values.nic,
      email: values.Email,
      password: values.password,
      contactNumber: values.contactNumber,
      userRole: "jobseeker",
      job_field: values.Jobfield,
      gender: values.gender,
      dob: formattedDob,
    };

    console.log("************data*************");
    console.log(data);
    console.log("****************************");

    try {
      axios
        .post("http://localhost:8080/api/v1/jobseeker/add", data)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Jobseeker account created successfully!", {
              position: "bottom-right",
            });
          } else {
            toast.error("Check the details which you entered and try again!", {
              position: "bottom-right",
            });
          }
        })
        .catch((error) => {
          toast.error("Something went wrong!", {
            position: "bottom-right",
          });
          console.error("Error creating appointment:", error);
        });
    } catch (err) {
      console.log(`Something went wrong ${err}`);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* <DialogContent sx={{ width: "600px" }}>
          <Grid container spacing={2}>
            <Grid item xs={4} sm={4} lg={4}></Grid>
            <Grid item xs={4} sm={4} lg={4}></Grid>
            <Grid item xs={4} sm={4} lg={4}></Grid>
          </Grid> */}
      <FormControl sx={{ mt: 2, rowGap: "1em" }} fullWidth size="small">
        <InputLabel id="demo-select-small" color="warning">
          Job Category
        </InputLabel>
        <Select
          labelId="demo-select-small"
          id="Jobfield"
          label="Select Jobfield"
          name="Jobfield"
          value={formik.values.Jobfield}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color="warning"
        >
          <MenuItem defaultValue disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
          <MenuItem value="Software Engineering">Software Engineering</MenuItem>
          <MenuItem value="Electrical Engineering">
            Electrical Engineering
          </MenuItem>
          <MenuItem value="Teaching">Teaching</MenuItem>
          <MenuItem value="Care Giver">Care Giver</MenuItem>
        </Select>
        {formik.errors.Jobfield && formik.touched.Jobfield && (
          <div style={{ color: "red" }}>{formik.errors.Jobfield}</div>
        )}

        <TextField
          id="FullName"
          label="Full Name"
          name="FullName"
          value={formik.values.FullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          size="small"
          color="warning"
          required
        />
        {formik.errors.FullName && formik.touched.FullName && (
          <div style={{ color: "red" }}>{formik.errors.FullName}</div>
        )}

        <TextField
          id="Email"
          label="Email"
          name="Email"
          value={formik.values.Email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          size="small"
          color="warning"
          required
        />
        {formik.errors.Email && formik.touched.Email && (
          <div style={{ color: "red" }}>{formik.errors.Email}</div>
        )}

        <TextField
          id="nic"
          label="NIC"
          name="nic"
          value={formik.values.nic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          size="small"
          color="warning"
          required
        />
        {formik.errors.nic && formik.touched.nic && (
          <div style={{ color: "red" }}>{formik.errors.nic}</div>
        )}

        <TextField
          id="password"
          label="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          size="small"
          color="warning"
          required
        />
        {formik.errors.password && formik.touched.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        <TextField
          id="contactNumber"
          label="Contact Number"
          name="contactNumber"
          value={formik.values.contactNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          size="small"
          color="warning"
          required
        />
        {formik.errors.contactNumber && formik.touched.contactNumber && (
          <div style={{ color: "red" }}>{formik.errors.contactNumber}</div>
        )}

        <FormControl sx={{ mt: 2, rowGap: "1em" }} fullWidth size="small">
          <InputLabel id="demo-select-small" color="warning">
            Gender
          </InputLabel>
          <Select
            labelId="demo-select-small"
            id="gender"
            label="Select Gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color="warning"
          >
            <MenuItem defaultValue disabled>
              <em>None</em>
            </MenuItem>
            <MenuItem value="male">male</MenuItem>
            <MenuItem value="female">female</MenuItem>
          </Select>
          {formik.errors.gender && formik.touched.gender && (
            <div style={{ color: "red" }}>{formik.errors.gender}</div>
          )}
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            {/* <DatePicker
                  label="Schedule date"
                  defaultValue={dayjs(scheduleDate)}
                /> */}
            <DatePicker
              label="Date of birth"
              value={dob}
              onChange={(newValue) => setDob(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </FormControl>

      <Grid
        container
        spacing={2}
        // sx={{
        //   paddingLeft: "1em",
        //   paddingRight: "1em",
        // }}
      >
        <Grid item xs={12}>
          <Button
            type="submit"
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
      </Grid>
      {/* </DialogContent> */}
    </form>
  );
};

export default JobseekerSignUp;
