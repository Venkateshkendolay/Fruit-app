import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

const Admin = () => {

  let [products, setProducts] = useState([])

  useEffect(() => {
    GetData()
  })

  const GetData = () => {
    Axios.get("http://127.0.0.1:5000/api/products").then((res) => {
      setProducts(res.data)
    }).catch((err) => { })
  }


  let deleteProduct = (id) => {
    Axios.delete(`http://127.0.0.1:5000/api/products/${id}`)
      .then((resp) => {
        // navigate("/admin")
      }).catch((err) => {

      })
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <table className='table table-bordered table-striped'>
              <thead className="table-primary text-dark">
                <tr>
                  <th>Product Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Info</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.length > 0 ? <>
                    {
                      products.map((product) => {
                        return <tr key={product._id}>
                          <td>{product.name}</td>
                          <td><img height='60px' width='60px' src={product.image} alt="" /></td>
                          <td>{product.price}</td>
                          <td>{product.qty}</td>
                          <td>{product.info}</td>
                          <td><Link to={`/Edit/${product._id}`} className='btn btn-outline-warning'>Edit</Link ></td>
                          <td><Link className='btn btn-outline-danger' onClick={deleteProduct.bind(this, product._id)}>Delete</Link ></td>
                        </tr>

                      })
                    }
                  </> : null
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin