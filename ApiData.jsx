import React, { useEffect, useState } from "react";
import axios from "axios";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { AiOutlineCopy } from "react-icons/ai";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { IconButton, Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Dropdown } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
const ApiData = () => {
  const [data, setData] = useState([]);
  const [postApi, setPostApi] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    //dev: hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  useEffect(() => {
    fetchData();
    postData();
  }, []);

  // *********************************** Get API ******************************************
  const fetchData = async () => {
    console.log("data", "Call API");
    try {
      axios.get(`http://199.247.3.230:8080/api/sponsors`).then((response) => {
        console.log("Sponser response.....", response);
        setData(response.data);
      });
    } catch (error) {
      console.log("sponsor", error);
    }
  };

  // **************************************** Post API ***************************************

  const postData = () => {
    const data = {
      // The data you want to send in the request
      sponsoraddress: " 0xB5F7C3813Ae7A5a6aa45e47e769CE2c336E7EAe3",
      affiliateaddress: "0x89D24651Db303a12169E1f2Ffd673763255EdEDC",
    };

    fetch(" http://199.247.3.230:8080/api/sponsors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the success response
        setPostApi(data);
        console.log(data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };
  return (
    <>
      <div>
        <Button variant="contained" onClick={() => fetchData()} style={{marginLeft:"50%"}}>
          API Called
        </Button>
        <h5>POST API</h5>
        <div>
          <Button variant="contained" onClick={() => postData()}>
            Make POST Request
          </Button>
        </div>
        <br></br>
        <br></br>
        <h5>GET API</h5>

        <TableContainer
          component={Paper}
          sx={{ minWidth: 700, backgroundColor: "#101018" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#1976D2" }}>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  SponsorAddress
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Affiliate Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, id) => (
                  <StyledTableRow key={id} sx={{ color: "white" }}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ color: "white" }}
                    >
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ color: "white" }}>
                      {item.sponsoraddress}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ color: "white" }}>
                      {item.affiliateaddress}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ApiData;
