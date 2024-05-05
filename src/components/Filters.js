import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Grid } from "@mui/material";
import { useSelector } from "react-redux";

const Filters = ({ onFilterChange }) => {
  const { jobs, error } = useSelector((state) => state.jobs);
  const [filters, setFilters] = useState({
    minExperience: "",
    companyName: "",
    location: "",
    remote: "",
    techStack: "",
    role: "",
    minBasePay: "",
  });

  const handleFilterChange = (event, value, reason) => {
    let newFilters = { ...filters };
    if (value !== null) {
      newFilters = { ...newFilters, [event.target.name]: value };
    } else {
      newFilters = { ...newFilters, [event.target.name]: "" };
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  let [company, setCompaniesList] = useState([]);
  let [location, setLocationList] = useState([]);
  let [roles, setRole] = useState([]);
  let [basePay, setBasePay] = useState([]);

  useEffect(() => {
    let companiesList = [];
    let Locations = [];
    let roles = [];
    let basePay = [];

    jobs?.map((v) => {
      companiesList.push(v.companyName);
      Locations.push(v.location);
      roles.push(v.jobRole);
      if (v?.minJdSalary) {
        basePay.push(v?.minJdSalary);
      }
    });
    setCompaniesList(companiesList);
    setLocationList(Locations);
    setRole(roles);
    setBasePay(basePay);
  }, [jobs]);

  return (
    <Grid
      container
      sx={{ marginTop: "5px" }}
      className="filter-head"
      alignItems="center"
    >
      <Grid item xs={12} sm={2} md={2}>
        <Autocomplete
          name="minExperience"
          value={filters.minExperience}
          onChange={(event, value) =>
            handleFilterChange({ target: { name: "minExperience" } }, value)
          }
          options={[1, 2, 3, 4, 5, , 7, 8, 9, 10]}
          renderInput={(params) => (
            <TextField {...params} label="Min Experience" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={2} md={2}>
        <Autocomplete
          value={filters.companyName}
          onChange={(event, value) =>
            handleFilterChange({ target: { name: "companyName" } }, value)
          }
          options={company}
          renderInput={(params) => (
            <TextField {...params} label="Company Name" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={2} md={2}>
        <Autocomplete
          value={filters.location}
          onChange={(event, value) =>
            handleFilterChange({ target: { name: "location" } }, value)
          }
          options={location}
          renderInput={(params) => (
            <TextField {...params} label="Location" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={2} md={2}>
        <Autocomplete
          value={filters.remote}
          onChange={(event, value) =>
            handleFilterChange({ target: { name: "remote" } }, value)
          }
          options={["Remote", "Hybrid", "In-Office"]}
          renderInput={(params) => (
            <TextField {...params} label="Remote/On-site" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={2} md={2}>
        <Autocomplete
          value={filters.techStack}
          onChange={(event, value) =>
            handleFilterChange({ target: { name: "techStack" } }, value)
          }
          options={["java", "react", "angular", "node"]}
          renderInput={(params) => (
            <TextField {...params} label="Tech Stack" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={2} md={2}>
        <Autocomplete
          value={filters.role}
          onChange={(event, value) =>
            handleFilterChange({ target: { name: "role" } }, value)
          }
          options={roles}
          renderInput={(params) => (
            <TextField {...params} label="Role" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={2} md={2}>
        <Autocomplete
          value={filters.minBasePay}
          onChange={(event, value) =>
            handleFilterChange({ target: { name: "minBasePay" } }, value)
          }
          options={basePay}
          renderInput={(params) => (
            <TextField {...params} label="Min Base Pay" variant="outlined" />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
