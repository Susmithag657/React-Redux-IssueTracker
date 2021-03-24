import React, { useState } from "react";
import { connect } from "react-redux";
import Issue from "../Issues/Issue";
import { Link } from "react-router-dom";
import {
  filterIssuesByStatus,
  filterIssuesByDescription,
  filterIssuesBySeverity
} from "../../actions/ActionCreators";

const Issues = ({
  issues,
  filterIssuesByDescription,
  filterIssuesBySeverity,
  filterIssuesByStatus,
  isLoggedIn
}) => {
  //const [currentDisplayed, setcurrentDisplayed] = useState(issues);
  //const [filter, setfilter] = useState('');
  const handleFilterChange = (e) => {
    e.preventDefault();
    filterIssuesByDescription(e.target.value);
    //setfilter(e.target.value);
    // const newDisplayed=currentDisplayed.filter(issue=>issue.description.toLowerCase().includes(filter))
    // setcurrentDisplayed(newDisplayed);
  };
  const handleSeverityFilter = (e) => {
    e.preventDefault();
    filterIssuesBySeverity(e.target.value);
  };
  const handleStatusFilter = (e) => {
    e.preventDefault();
    filterIssuesByStatus(e.target.value);
  };
  return (
    <div className="container">
      <h1>Issue Page</h1>
      <div className="row justify-content-end">
        <div className="col-sm-2">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => handleSeverityFilter(e)}
          >
            <option value="All" selected>
              Severity All
            </option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div className="col-sm-2">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => handleStatusFilter(e)}
          >
            <option value="All" selected>
              Status All
            </option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
        <div className="col-sm-2">
          <input
            onChange={(e) => handleFilterChange(e)}
            className="form-control rounded"
            type="text"
            id="filterBy"
            name="filterBy"
            placeholder="Filter By"
          />
        </div>
        <div className="col-sm-2">
          <Link className="btn btn-primary" to="/addIssue">
            Add Issue
          </Link>
        </div>
      </div>
      {issues &&
        issues.map((issue) => (
          <Issue key={issue.id} issue={issue} />
        ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { issues: state.issues.issues };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterIssuesByDescription: (filter) =>
      dispatch(filterIssuesByDescription(filter)),
    filterIssuesBySeverity: (filter) =>
      dispatch(filterIssuesBySeverity(filter)),
    filterIssuesByStatus: (filter) => dispatch(filterIssuesByStatus(filter))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Issues);
