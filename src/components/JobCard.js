import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <Card
      sx={{
        maxWidth: 360,
        borderRadius: "20px",
        margin: "16px auto",
        padding: "16px",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px !important",
        backgroundColor: "rgb(255, 255, 255)",
        color: "rgba(0, 0, 0, 0.87)",
      }}
    >
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          color="text.secondary"
          gutterBottom
        >
          <img width={"25px"} src={job.logoUrl} />
          {job.companyName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {capitalizeFirst(job.jobRole)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <h4>{capitalizeFirst(job.location)}</h4>
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Estimated Salary: ₹{job?.minJdSalary} {job?.minJdSalary && "-"}{" "}
          {job.maxJdSalary} LPA ✅
        </Typography>

        <Typography variant="body2" paragraph>
          <p>{"About Company:"}</p>
          {expanded
            ? job.jobDetailsFromCompany
            : job.jobDetailsFromCompany.slice(0, 100) + "..."}{" "}
          <Button size="small" onClick={toggleDescription}>
            {expanded ? "View Less" : "View Job"}
          </Button>
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Minimum Experience:
          <br />
          {job.minExp ? job.minExp + " years" : "Not available"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "rgb(85, 239, 196)",
            color: "black",
            fontWeight: "500",
          }}
          href={job.jdLink}
          target="_blank"
        >
          ⚡ Easy Apply
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
