import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/ Pagination";
import Wrapper from "../../components/Wrapper";
import { Product } from "../../models/product";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
      const {data} = await axios.get(`/products?page=${page}`);
      console.log('products:', data.data);
      setProducts(data.data);
      setLastPage(data.meta.last_page)
      } catch (e: any) {
        console.log('error:', e.message)
      }
    }
    getProducts();
  }, [page]);

  const deleteProduct = async (id: number) => {
    if (window.confirm(`Are you sure you  want to delete this Product?: id = ${id}`)){
      await axios.delete(`/users/${id}`);
      setProducts(products.filter((p: Product) => p.id !== id));
    }
  }

  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product) => {
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td><img src={p.image} alt="product image" width="50"/></td>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>{p.price}</td>
                  <td>
                  <div className='btn-group mr-2'>
                      <a href="/users" className='btn btn-sm btn-outline-danger m-1' onClick={() => deleteProduct(p.id)}>Delete</a>
                      <Link to={`/users/edit/${p.id}`} className='btn btn-sm btn-outline-warning m-1'>Edit</Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination page={page} lastPage={lastPage} pageChanged={setPage}/>
    </Wrapper>
  );
}

export default Products;