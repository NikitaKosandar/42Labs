import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import moment from "moment";
//json
import data from "./data.json"

//css
import "./Audit.css"
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

//UI libraries
import FormControl from "react-bootstrap/FormControl";

//Components
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

// Constants
import {TABLE_OPTIONS} from "../CONSTANTS/Constants"

//datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import $ from "jquery";
//import "react-select/dist/react-select.css";


export class Cases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromDate:"",
      toDate:""
    };
  }
  componentDidMount() {
    this.setState({auditData : data})
  //removed unneccessary white space before search and took it to left
    document.querySelectorAll('.col-lg-8').forEach(function(a){
      a.remove()
      })
  //removed col-lg-4 to make search bar look bigger   
    let col = document.querySelector(".col-lg-4");
    col.classList.remove("col-lg-4");
    col.classList.remove("col-md-6");
    col.classList.add("col-md-4");

  //add id to search bar
  document.getElementsByClassName("react-bs-table-search-form")[0].childNodes[0].setAttribute("id", "searchBar"); 
  }

  showUserNameTooltip = (cell, row) => {
    return (
 
        <span
          title={row.username}
          data-toggle="tooltip"
          className="addEllipses verticalMiddle"
        >
          {row.username}
        </span>
    );
  };
  createdDateFormatter = (cell, row) => {
    return moment(cell).format('DD MMM YYYY. hh:mm A')
  };
  modifiedDateFormatter = (cell, row) => {
    return moment(cell).format('DD MMM YYYY. hh:mm A')
  };
  
  handleDatePickerFrom = (event) => {
    this.setState({
      fromDate:event
    })
  }
  handleDatePickerTo = (event) => {
    this.setState({
      toDate:event
    })
  }
    getDateRelatedData = () => {
    let filterData = [];
    data.map(x => {
      if(this.diffdatebox(x.dateTimeCreated) === true){
          filterData.push(x);
      }
    })
    this.setState({auditData: filterData})
}

diffdatebox = (dateChecked) => {
  const {fromDate, toDate} = this.state;
  console.log("fromDate :",fromDate);
  console.log("toDate :",toDate);
  let dateCheck = moment(dateChecked).format('MM/DD/YYYY');
  console.log("dateCheck :",dateCheck)
  let D_1 = fromDate && fromDate.toLocaleDateString().split("/");
  let D_2 = toDate && toDate.toLocaleDateString().split("/");
  let D_3 = dateCheck && dateCheck.split("/");
  var d1 = new Date(D_1[2], parseInt(D_1[1]) - 1, D_1[0]);
  var d2 = new Date(D_2[2], parseInt(D_2[1]) - 1, D_2[0]);
  var d3 = new Date(D_3[2], parseInt(D_3[1]) - 1, D_3[0]);


  if (d3 > d1 && d3 < d2) {
  return true;
  } else {
  return false;
  }
} 
  render() {

    let j;
  
    return (
      <div className="audit">
     
        <div className="list">
          <div className="list commonPadding d-flex">

            <div> 
              <div className="d-flex justify-center m-left">
              <label>From Date</label>&nbsp;&nbsp;&nbsp;
            <DatePicker
              selected={this.state.fromDate}
              onChange={this.handleDatePickerFrom}
              onSelect={this.handleDatePickerFrom}
              value={this.state.fromDate}
            />&nbsp;&nbsp;&nbsp;
            <label>To Date</label>&nbsp;&nbsp;&nbsp;
            <DatePicker
              selected={this.state.toDate}
              onChange={this.handleDatePickerTo}
              onSelect={this.handleDatePickerTo}
              value={this.state.toDate}
            />&nbsp;&nbsp;&nbsp;
              <button onClick={this.getDateRelatedData}>Apply Dates</button>
              </div>
          
              <BootstrapTable
                trClassName={this.rowClassNameFormat}
                version="4"
                ref="table"
                width="100"
                clear={this.state.clear}
                data={this.state.auditData}
                options={TABLE_OPTIONS}
                bordered={false}
                search={true}
                pagination
                striped
                condensed
              >
                <TableHeaderColumn
                  thStyle={{ verticalAlign: "top" }}
                  dataField="username"
                  dataAlign="left"
                  dataFormat={this.showUserNameTooltip}
                  isKey
                  columnClassName="tableRowStylesWithoutDiv pl-5"
                  headerAlign="left"
                >
                  User Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  thStyle={{ verticalAlign: "top" }}
                  dataFormat={this.nameFormatterForCaseDesc}
                  dataField="mobile"
                  dataAlign="left"
                >
                  Mobile
                </TableHeaderColumn>
                 <TableHeaderColumn
                  ref="lawyerFilter"
                  thStyle={{ verticalAlign: "top" }}
                  dataField="twoFactorStatus"
                  dataAlign="left"
                  className="nameFilter"
                >
                  2-Factor <br/> Status
                </TableHeaderColumn>
                <TableHeaderColumn
                  ref="lawyerFilter"
                  thStyle={{ verticalAlign: "top" }}
                  dataField="maker"
                  dataAlign="left"
                  className="nameFilter"
                >
                  Maker
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataAlign="left"
                  columnClassName="my-class"
                  ref="statusFilter"
                  thStyle={{ verticalAlign: "top" }}
                  dataField="approvalStatus"
                >
                  Approval <br/>Status
                </TableHeaderColumn>
                <TableHeaderColumn                  ref="dateFilter"
                  thStyle={{ verticalAlign: "top" }}
                  dataField="comments"
                  dataAlign="left"
                  sortOrder="desc"
                >
                  Comments
                </TableHeaderColumn>
                <TableHeaderColumn
                  ref="statusFilter"
                  thStyle={{ verticalAlign: "top" }}
                  dataAlign="left"
                  dataField="userStatus"
                >
                  User <br/>Status
                </TableHeaderColumn>
                <TableHeaderColumn
                  thStyle={{ verticalAlign: "top" }}
                  dataFormat={this.nameFormatterForEnquiryType}
                  dataField="fullName"
                  dataAlign="left"
                >
                  Full Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  thStyle={{ verticalAlign: "top" }}
                  dataFormat={this.createdDateFormatter}
                  dataField="dateTimeCreated"
                  dataAlign="left"
                >
                  Created At
                </TableHeaderColumn>
                <TableHeaderColumn
                  thStyle={{ verticalAlign: "top" }}
                  dataFormat={this.modifiedDateFormatter}
                  dataField="dateTimeModified"
                  dataAlign="left"
                >
                  Modified At
                </TableHeaderColumn>
                <TableHeaderColumn
                  thStyle={{ verticalAlign: "top" }}
                  dataFormat={this.nameFormatterForEnquiryType}
                  dataField="checkerComments"
                  dataAlign="left"
                >
                  Checker <br/>Comments
                </TableHeaderColumn>
                <TableHeaderColumn
                  thStyle={{ verticalAlign: "top" }}
                  dataFormat={this.nameFormatterForEnquiryType}
                  dataField="actionType"
                  dataAlign="left"
                >
                  Action Type
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
 
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Cases);
