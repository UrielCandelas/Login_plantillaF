import { useForm } from "react-hook-form";
import { useEffect,useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/Auth.context";

function RegisterPage() {

  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    // if (password != confirmPassword) {
    //   setError("Las contraseñas no coinciden");
    //   return;
    // }
    signup(values);
  });
  return (
    <div>
      <div>
        {registerErrors.map((error, i) => (
          <div key={i}>
            {error}
          </div>
        ))}
        <h1>
          Registro de Usuario
        </h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Nombre de usuario"
          />
          {errors.username && (
            <p>El nombre de usuario es requerido</p>
          )}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p>La contraseña es requerida</p>
          )}
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            placeholder="Confirmar Contraseña"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p>La confirmacion de la contraseña es requerida</p>
          )}
          <button type="submit">Registrarse</button>
        </form>
        <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesion aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
