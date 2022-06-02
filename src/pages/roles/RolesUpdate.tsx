import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper"
import { SyntheticEvent } from "react";
import { Permission } from "../../models/permission";

const RolesUpdate = () => {

  const [name, setName] = useState('');
  const [permission, setPermission] = useState([]);
  const [selected, setSelected] = useState([] as Number[]);
  const [state, setState] = useState(false);

  const { id } = useParams();
  const getId = () => {
    return id
  }

  useEffect(() => {
    const getPermission = async () => {
      try {
        const id = getId();
        const response = await axios.get('/permissions');
        console.log(response.data);
        setPermission(response.data);

        const {data} = await axios.get(`/roles/${id}`);
        console.log(data);
        setName(data.name)

        setSelected(data.permissions.map((p: Permission) => p.id))
      } catch (e: any) {
        console.log('error:', e.message);
      }
    }
    getPermission();
  },[]);

  const check = (id: number) => {
    if (selected.some(s => s === id)) {
      setSelected(selected.filter(s => s !== id));
      return;
    }
    setSelected([...selected, id]);
    console.log('permissions', selected)
  }

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    console.log('submit permissions', selected)

    try{
      const response = await axios.put(`/roles/${id}`, {
        name: name,
        permissions: selected,
      });

      console.log(response.data)

      setState(true)
    } catch (e :any) {
      console.log('error:', e.message, e.config.url)
    }
  }

  if (state) {
    return <Navigate to='/roles'/>
  }

  return(
    <Wrapper>
      <form className="needs-validation" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Edit Role</h1>

          <div className="mb-3">
            <label>Name</label>
            <input type="text" className="form-control" placeholder="Name" required
              defaultValue={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Permissions</label>
            <div className="col-sm-10">
              {permission.map((p: Permission) => {
                return (
                  <div className="form-check form-check-inline col-3" key={p.id}>
                    <input className="form-check-input" type="checkbox" placeholder="permission"
                      value={p.id}
                      checked={selected.some(s => s === p.id)}
                      onChange={() => check(p.id)}
                    />
                    <label className="form-check-label">{p.name}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="btn btn-lg btn-primary" type="submit">Save</button>
      </form>
    </Wrapper>
  );
}

export default RolesUpdate