import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PassComponent() {
  const navigate = useNavigate();
  const location = useLocation()
  const { ruta } = location.state
  useEffect(()=>{
    navigate(ruta);
    console.log(ruta)
  },[ruta])
      

  return <h1>Pass</h1>;
}

export default PassComponent;
