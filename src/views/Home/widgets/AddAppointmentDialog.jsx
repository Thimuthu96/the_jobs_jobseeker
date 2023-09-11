import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
} from "@mui/material";
import { Form } from "react-bootstrap";
import { v4 } from "uuid";
import { format } from "date-fns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../../utils/db";
import app from "../../../utils/db";
import { toast } from "react-toastify";
import moment from "moment";

//components
import ConfirmationDialog from "../../../common/CustomDialog";
import defaultPdfImg from "../../../assets/defaultPdfImg.png";

const AddAppointmentDialog = (props) => {
  const { open, onClose } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const appId = v4().slice(0, 5);

  //close confirmation dialog
  const handleClose = () => {
    setDialogOpen(false);
    onClose();
  };

  const validationSchema = Yup.object().shape({
    Jobfield: Yup.string().required("Job Category is required"),
    FullName: Yup.string().required("Full Name is required"),
    Email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    nic: Yup.string().required("NIC is required"),
    // ExpectedCountries: Yup.string().required("NIC is required"),
    ScheduleTime: Yup.string().required("Schedule time is required"),
  });

  const formik = useFormik({
    initialValues: {
      Jobfield: "",
      FullName: "",
      Email: "",
      nic: "",
      ScheduleTime: "",
      selectedPdf: null,
      lastUploadedCv: null,
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
    const formattedScheduleDate = format(new Date(scheduleDate), "yyyy-MM-dd");
    const data = {
      name: values.FullName,
      appointmentId: `ap${appId}`,
      scheduledDate: formattedScheduleDate,
      nic: values.nic,
      scheduledTime: {
        [values?.ScheduleTime]: true,
      },
      appointmentState: "Pending",
      cvUrl: values.lastUploadedCv,
      job_field: values.Jobfield,
      email: values.Email,
    };

    console.log("************data*************");
    console.log(data);
    console.log("****************************");

    try {
      axios
        .post("http://localhost:8080/api/v1/appointment", data)
        .then((response) => {
          toast.success("Appoitment placed successfully!", {
            position: "bottom-right",
          });
          console.log("Appointment created successfully:", response.data);
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

    // try {
    //   addDoc(dbRef, data);
    //   navigate("/menu");
    //   toast.success("Item added successfully!", {
    //     position: "bottom-right",
    //   });
    // } catch (err) {
    //   console.log("could not updated" + err);
    //   toast.error("Something went wrong!", {
    //     position: "bottom-right",
    //   });
    // }
  };

  const handlePdfSelect = (e) => {
    formik.setFieldValue("selectedPdf", e.target.files[0]);
  };

  const handlePdfUpload = () => {
    const selectedCv = formik.values.selectedPdf;
    if (selectedCv) {
      // const formData = new FormData();
      // formData.append("file", selectedCv);

      // axios
      //   .post("http://localhost:8080/api/v1/upload-cv", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error uploading file:", error);
      //     // setMessage("File upload failed.");
      //   });

      const storageRef = ref(storage, `cv/${selectedCv.name + v4()}`);
      try {
        uploadBytes(storageRef, selectedCv)
          .then((snapshot) => {
            toast.success("CV uploaded successfully!", {
              position: "bottom-right",
            });
            getDownloadURL(storageRef).then((url) => {
              formik.setFieldValue("lastUploadedCv", url);
            });
          })
          .catch((error) => {
            toast.error("Something went wrong!", {
              position: "bottom-right",
            });
          });
      } catch (err) {
        console.log(`Something went wrong ${err}`);
      }
    }
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
          Create appointment
        </DialogTitle>

        <form onSubmit={formik.handleSubmit}>
          <DialogContent sx={{ width: "600px" }}>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} lg={4}></Grid>
              <Grid item xs={4} sm={4} lg={4}></Grid>
              <Grid item xs={4} sm={4} lg={4}></Grid>
            </Grid>
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
                <MenuItem value="Software Engineering">
                  Software Engineering
                </MenuItem>
                <MenuItem value="Electrical Engineering">
                  Electrical Engineering
                </MenuItem>
                <MenuItem value="Teaching">Teaching</MenuItem>
                <MenuItem value="Care Giver">Care Giver</MenuItem>
              </Select>
              {formik.errors.Jobfield && formik.touched.Jobfield && (
                <div style={{ color: "red" }}>{formik.errors.Jobfield}</div>
              )}
              <Box display="flex" alignItems="center">
                <Form.Control
                  type="file"
                  accept="application/pdf"
                  width={400}
                  onChange={handlePdfSelect}
                />
                <Button onClick={handlePdfUpload}>Upload CV</Button>
              </Box>
              {formik.values.lastUploadedCv && (
                <img
                  src={defaultPdfImg}
                  alt="Last uploaded"
                  style={{ height: "100px", width: "100px" }}
                />
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

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Schedule date"
                    onChange={(date) => {
                      const formattedDate = moment(date).format("YYYY-MM-DD");
                      setScheduleDate(formattedDate);
                      console.log(scheduleDate);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider> */}

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

              <FormControl sx={{ mt: 2, rowGap: "1em" }} fullWidth size="small">
                <InputLabel id="demo-select-small" color="warning">
                  Schedule time
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="ScheduleTime"
                  label="Select Schedule time"
                  name="ScheduleTime"
                  value={formik.values.ScheduleTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  color="warning"
                >
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="afternoon">Afternoon</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </Select>
                {formik.errors.ScheduleTime && formik.touched.ScheduleTime && (
                  <div style={{ color: "red" }}>
                    {formik.errors.ScheduleTime}
                  </div>
                )}
              </FormControl>
            </FormControl>

            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={onClose} color="warning">
                Close
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="warning"
                // onClick={onClose}
              >
                Submit
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleClose}
        // handleFunc={formik.handleSubmit}
        handleFunc={""}
        resetFunc={""}
        title="Update Item"
        desc="Are you sure to update this item?"
      />
    </>
  );
};

export default AddAppointmentDialog;
