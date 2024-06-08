//Importamos la librería 
import { useForm } from "react-hook-form"
//!Pendiente ruta y paginado
function SingUp() {
    const {
        register, handleSubmit, formState: { errors }, getValues} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='name'>Nombre</label>
                    <input
                        type='text'
                        id='name'
                        {...register("name", { required: "El nombre es obligatorio" })}                
                    />
                    {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor='email'>Email</label>
                    <input
                        type="email" 
                        {...register("email", { 
                            required: "El correo electronico es obligatorio",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Formato de correo electrónico no válido",
                            },
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Contraseña</label>   
                    <input
                        type="password"
                        {...register("password", { 
                            required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres"
                                },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
                            },
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
                <label>Confirm Password</label>
                    <input 
                        type="password" 
                        {...register("confirmPassword", { 
                            required: "Please confirm your password",
                                validate: (value) => value === getValues('password') || "Passwords do not match"
                            
                        })}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
            <button type='submit'>Registrarte</button>
    </form>
    );
}

export default SingUp;