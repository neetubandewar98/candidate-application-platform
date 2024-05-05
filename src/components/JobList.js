import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobsSuccess,
  fetchJobsFailure,
  loadMoreJobsSuccess,
} from "../redux/actions";
import JobCard from "./JobCard";
import Filters from "./Filters";
import { Grid } from "@mui/material";

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, error } = useSelector((state) => state.jobs);

  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [filteredData, setFilterData] = useState([]);
  const [filters, setFilters] = useState({
    minExperience: "",
    companyName: "",
    location: "",
    remote: false,
    techStack: "",
    role: "",
    minBasePay: "",
  });

  const filterData = (jobs) => {
    const filteredJobs = jobs.filter((job) => {
      return (
        job.minExp === filters.minExperience ||
        job.companyName.toLowerCase() === filters?.companyName?.toLowerCase() ||
        job.location.toLowerCase() === filters?.location?.toLowerCase() ||
        job.jobRole.toLowerCase() === filters?.role?.toLowerCase() ||
        job.minJdSalary === parseFloat(filters?.minBasePay)
      );
    });
    setFilterData(filteredJobs);
    dispatch(fetchJobsSuccess(filteredJobs));
  };

  useEffect(() => {
    fetchJobs();
    filterData(jobs);
  }, [filters]);
  const fetchJobs = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 10,
            offset: offset,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      dispatch(loadMoreJobsSuccess(data.jdList));
      setOffset((prevOffset) => prevOffset + 10);
    } catch (error) {
      dispatch(fetchJobsFailure(error.message));
    } finally {
      setIsFetching(false);
    }
  }, [dispatch, offset]);

  const handleFilterChange = (newFilters) => {
    console.log("newFilters", newFilters);
    setFilters(newFilters);

    setOffset(0);
  };
  const handleScroll = useCallback(() => {
    if (
      !isFetching &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !error
    ) {
      fetchJobs();
    }
  }, [fetchJobs, isFetching, error]);

  useEffect(() => {
    const throttleScroll = throttle(handleScroll, 500);
    window.addEventListener("scroll", throttleScroll);
    return () => {
      window.removeEventListener("scroll", throttleScroll);
    };
  }, [handleScroll]);

  const throttle = (func, delay) => {
    let lastCalled = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCalled < delay) {
        return;
      }
      lastCalled = now;
      func.apply(this, args);
    };
  };

  return (
    <div>
      <Filters filters={filters} onFilterChange={handleFilterChange} />

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {error && <div>{error}</div>}
        {jobs.map((job, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <JobCard key={job.id} job={job} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default JobList;
