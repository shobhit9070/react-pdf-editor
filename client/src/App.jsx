import React, { Component,useState } from 'react';
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import ReactPDF from '@react-pdf/renderer';
import axios from 'axios';
import { saveAs } from 'file-saver';

import './App.css';

class App extends Component {
  state = {
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0,
    arr:[],
    showMessage: false
  }
  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })
  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        // this.state.arr = pdfBlob
        this.setState({arr:pdfBlob})
        this.setState({showMessage: true});
        console.log(`${__dirname}/src`)
        console.log(this.state.arr)
        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} />
        <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
        <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;