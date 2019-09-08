import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert2';
import Header from "../../shared/Header/Header";

class ListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      loaded: false,
      status: this.props.status
    }; 

    //this.urlAPI = `http://localhost:8090/tech-start-assessment-api/simple_rest_api_php/api/`;
    this.urlAPI = `http://proyecto-prueba.com/tech-start/api/`;
  }

  componentDidMount() {
    this.getPosts(); 
  }
  
  getPosts = (status =  this.state.status) => {
    let URL = this.urlAPI+`Invoice/${status}`;
    fetch(URL)
      .then(response => { 
        return response.json();
      })
      .then(data => { 
        this.setState(
          {
            invoices: data,
            loaded: true,
          }
        );
      })
      .catch(error =>{ 
        swal.fire({
          title: ':(',
          text: error,
          type: 'error'
        })
      });
  };

  changeStatus = (id, status) => {   
    let URL = this.urlAPI+`Update/${id}/${status}`; 

    swal.fire({
      title: 'Are you sure?',
      text: "Please confirm the change of status",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.setState({ loaded: false });
        fetch(URL)
        .then(response => { 
          return response.json();
        })
        .then(data => {  
        this.getPosts();
        this.setState({ loaded: false });
          swal.fire({
            title: 'Great!',
            html: data.message,
            type: 'success'
          });
        })
      }
    })
    
  };

  render() {
    const items = this.state.invoices.map((invoice, idx) => (
      <tr key={invoice.id}>
        <th scope="row" className="center">{idx + 1}</th>
        <td className="center">{invoice.invoice_number}</td>
        <td>{invoice.vendor_name}</td>
        <td>{invoice.remittance_address}</td>
        <td className="right">{invoice.currency} {invoice.total}</td>
        <td className="center">{invoice.invoice_date}</td>
        <td className="center">{invoice.due_date}</td>
        <td className="center"><button type="button" className="btn btn-outline-success btn-sm"  onClick={this.changeStatus.bind(this, invoice.id, this.state.status)}>{(this.state.status==='pending') ? 'Approve' : 'Pending'}</button></td>
      </tr>
    ));
 

    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading clearfix">
              <div className="float-left">
                <h1 className="panel-title">Invoices</h1>
              </div>
              <div className="float-right"><span>Filter: </span>
                <div className="btn-group btn-group-sm" role="group" aria-label="Filter">
                  <Link to="/pending" className={(this.state.status==='pending') ? 'btn btn-dark' : 'btn btn-light'} >Pending</Link> 
                  <Link to="/approved" className={(this.state.status==='approved') ? 'btn btn-dark' : 'btn btn-light'}>Approved</Link>
                </div>
              </div>
            </div>
            <div className="panel-body">
            {this.state.loaded ?
              (<div>
                {this.state.invoices.length > 0 ?
                (<table className="table table-hover table-bordered table-responsive-sm">
                  <thead>
                    <tr>
                      <th scope="col" className="center">#</th>
                      <th scope="col" className="center">Invoice Number</th>
                      <th scope="col">Vendor Name</th>
                      <th scope="col">Vendor Address</th>
                      <th scope="col" className="right">Invoice Total</th>
                      <th scope="col" className="center">Invoice Date</th>
                      <th scope="col" className="center">Due Date</th>
                      <th scope="col" className="center">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>{items}</tbody>
                </table>):(<p>Sorry, for the moment not exist {this.state.status} records.</p>)
              }</div>):(<p>Loading...</p>)
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListView;
