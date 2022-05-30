import axios from "axios";
import { SyntheticEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import Wrapper from "../../components/Wrapper";

const ProductsUpdate = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0)
  const [state, setState] = useState(false);


  const {id} = useParams();
  const getId = () => {
    return id;
  }

  useEffect(() => {
    const getProduct = async () => {
      const id = getId();
      try {
        const {data} = await axios.get(`products/${id}`);
        console.log(data)
        setTitle(data.title);
        setImage(data.image);
        setDescription(data.description);
        setPrice(data.price);
      } catch (e: any) {
        console.log('error: ', e.message)
      }
    }
    getProduct()
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
      const response = await axios.put(`/products/${id}`, {
        title: title,
        image: image,
        description: description,
        price: price,
      });

      console.log(response.data)

      setState(true)
    } catch (e :any) {
      console.log('error:', e.message, e.config.url)
    }
  }

  if (state) {
    return <Navigate to='/products'/>
  }

  return(
    <Wrapper>
      <form className="needs-validation" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Add Product</h1>

          <div className="mb-3">
            <label>Title</label>
            <input type="text" className="form-control" placeholder="Title" required
              defaultValue={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Image</label>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Image" required
                defaultValue={image}
                onChange={e => setImage(e.target.value)}
              />
              <ImageUpload uploaded={setImage}/> 
            </div>
          </div>

          <div className="mb-3">
            <label>description</label>
            <textarea className="form-control" placeholder="Description" required
              defaultValue={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input type="number"  step="0.01" className="form-control" placeholder="Price" required
              defaultValue={price}
              onChange={e => setPrice(parseInt(e.target.value))}
            />
          </div>

          <button className="btn btn-lg btn-primary" type="submit">Submit</button>
      </form>
    </Wrapper>
  );
}

export default ProductsUpdate;