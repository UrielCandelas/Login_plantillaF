import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from "../context/Auth.context";

function LoginPage() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signin, errors: loginErrors} = useAuth();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await signin(data);
      navigate("/main")
    } catch (error) {
      
    }
  });

  return (
    <div>
      <div>
      {loginErrors.map((error, i) => (
          <div key={i}>
            {error}
          </div>
        ))}
        <h1>
          Inicio de Sesion
        </h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && (
            <p>El email es requerido</p>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Contraseña"
          />
          {errors.password && (
            <p>La contraseña es requerida</p>
          )}
          <button type="submit">Ingresar</button>
        </form>
        <p>
        ¿No tienes una cuenta? <Link to="/register">Crea una cuenta aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
