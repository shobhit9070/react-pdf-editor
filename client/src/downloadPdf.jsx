import React from 'react'

const downloadPdf = () => {
    state = {
        name: '',
        receiptId: 0,
        price1: 0,
        price2: 0,
        arr:[],
        showMessage: false
      }
      const handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })
      const createAndDownloadPdf = () => {
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
        return (
          <div className="App">
            <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
            <input type="number" placeholder="Receipt ID" name="receiptId" onChange={handleChange} />
            <input type="number" placeholder="Price 1" name="price1" onChange={handleChange} />
            <input type="number" placeholder="Price 2" name="price2" onChange={handleChange} />
            <button onClick={createAndDownloadPdf}>Download PDF</button>
          </div>
        );
      }


export default downloadPdf