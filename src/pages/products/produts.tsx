import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Product } from "../../models/product";

const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
      const {data} = await axios.get('/products');
      console.log('products:', data.data);
      setProducts(data.data);
      } catch (e: any) {
        console.log('error:', e.message)
      }
    }
    getProducts();
  }, []);

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
                  <td></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}

export default Products;