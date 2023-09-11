import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
// import { makeStyles } from "@mui/material/styles";
// import { MdOutlineNotificationsActive } from "react-icons/md";

//components
import Tab from "../../../common/Tab";
import ToDo from "../widgets/ToDo";
import ApprovalPending from "../widgets/ApprovalPending";
import { auth } from "../../../utils/db";

const tabs = [
  {
    label: "To Do Appointments",
    value: 1,
  },
  {
    label: "Pending Approvals",
    value: 2,
  },
];

const tabPanels = [
  {
    value: 1,
    element: <ToDo />,
  },
  {
    value: 2,
    element: <ApprovalPending />,
  },
];
const Appointments = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  const tabChangeHandler = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    // let list = [];

    try {
      setIsLoading(true);
      const userEmail = localStorage.getItem("userEmail");
      const response = await axios.get(
        `http://localhost:8080/api/v1/consultant-nic?email=${userEmail}`
      );
      const nicData = response.data;
      localStorage.setItem("userNic", nicData);
      console.log("========**********========");
      console.log(nicData);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    if (!user) navigate("/");
  }, [user]);

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
        <Tab
          tabs={tabs}
          tabPanels={tabPanels}
          value={value}
          onChange={tabChangeHandler}
        />
      </Grid>
    </Grid>
  );
};

export default Appointments;
