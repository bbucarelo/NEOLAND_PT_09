//Importamos la librería 
import { useForm } from 'react-hook-form';
//!Pendiente ruta y paginado
const Login = () => {
    const { 
        register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                    <input 
                        type="email" 
                        {...register("email", { required: "El correo es obligatorio" })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
            </div>
        
            <div>
                <label>Contraseña</label>
                    <input 
                        type="password" 
                        {...register("password", { required: "La contraseña es obligatoria" })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button type="submit">Ingresar</button>
        </form>
    );
};

export default Login;