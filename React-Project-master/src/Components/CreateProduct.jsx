import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import {useNavigate } from 'react-router-dom'

const CreateProduct = () => {
  let [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    info: ""
  })
  const navigate = useNavigate();
  let productData = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value
    })
  }


  let submitHandler = (event) => {
    event.preventDefault();
    let url = "http://127.0.0.1:5000/api/products"
    Axios.post(url, product).then((res) => {
    }).catch(() => { })
    console.log(url)
    navigate("/Admin")
  }

  let changeImage = (event) => {
    let imageFile = event.target.files[0]

    let reader = new FileReader()

    reader.readAsDataURL(imageFile)

    reader.addEventListener("load", () => {
      if (reader.result) {
        setProduct({ ...product, image: reader.result })
      }
    })

  }
  return <>
    <div className="container mt-5 m-auto">
      {
        <div className="row">
          <div className="col-md-5">
            <div className="card">
              <div className="card-header bg-primary text-white text-center"><h1>Create Product</h1></div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input type="text" name="name" placeholder='Product Name' className='form-control' onChange={productData} /><br />
                  </div>
                  <div className="form-group">
                    <input type="file" name="image" placeholder='Image' height='100px' className='form-control' onChange={changeImage} /><br />
                  </div>
                  <div className="form-group">
                    <input type="number" name="price" placeholder='Price' className='form-control' onChange={productData} /><br />
                  </div>
                  <div className="form-group">
                    <input type="number" name="qty" placeholder='QTY' className='form-control' onChange={productData} /><br />
                  </div>
                  <div className="form-group">
                    <input type="text" name="info" placeholder='Information' className='form-control' onChange={productData} /><br />
                  </div>
                  <button type="button" className='btn btn-warning' onClick={submitHandler}>Add Product</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  </>
}

export default CreateProduct