import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Edit = () => {
  let [productID, setProductId] = useState(useParams().id)
  let [selectedproduct, setSelectedProduct] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    info: ""
  })
 
  let setID = (id) => {
    console.log(setID)
    setProductId(id)
  };
  const navigate = useNavigate();

  useEffect(() => {
    let url = `http://127.0.0.1:5000/api/products/${productID}`
    Axios.get(url).then((response) => {
      setSelectedProduct(response.data)
    }).catch((err) => { 
      console.log(err);
    })
  }, [productID])



  let changeInput = (event) => {
    setSelectedProduct({
      ...selectedproduct,
      [event.target.name]: event.target.value
    })
  }

  //Change image to string

  let changeImage = (event) => {
    let imageFile = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(imageFile)

    reader.addEventListener("load", () => {
      if (reader.result) {
        setSelectedProduct({ ...selectedproduct, image: reader.result })
      }
    })
  }


  let submitHandler = (event) => {
    event.preventDefault();
    let dataURL = `http://127.0.0.1:5000/api/products/${productID}`
    Axios.put(dataURL, selectedproduct).then((res) => {

    }).catch((err) => { })
    navigate("/Admin")
  }

  return <>
    <div className="container mt-5">

      {
        <div className="row">
          <div className="col-md-5">
            <div className="card">
              <div className="card-header bg-dark text-white text-center"><h1>update Product</h1></div>
              <div className="card-body bg-secondary">
                <form>
                  <div className="form-group">
                    <input type="text" name="name" value={selectedproduct.name} placeholder='Product Name' className='form-control' onChange={changeInput} /><br />
                  </div>
                  <div className="form-group">
                    <input type="file" name="image" placeholder='Image' className='form-control' onChange={changeImage} /><br />
                  </div>
                  <div className="form-group">
                    <input type="number" name="price" value={selectedproduct.price} placeholder='Price' className='form-control' onChange={changeInput} /><br />
                  </div>
                  <div className="form-group">
                    <input type="number" name="qty" value={selectedproduct.qty} placeholder='QTY' className='form-control' onChange={changeInput} /><br />
                  </div>
                  <div className="form-group">
                    <input type="text" name="info" value={selectedproduct.info} placeholder='Information' className='form-control' onChange={changeInput} /><br />
                  </div>
                  <button type="button" className="btn btn-outline-primary mt-2" onClick={submitHandler}>Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  </>
}

export default Edit