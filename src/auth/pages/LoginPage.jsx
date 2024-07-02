import { useForm } from '../../hooks'
import './LoginPage.css'

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

const registerFormFields = {
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
  registerName: ''
}

export const LoginPage = () => {
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange
  } = useForm(loginFormFields)

  const {
    registerEmail,
    registerPassword,
    registerConfirmPassword,
    registerName,
    onInputChange: onRegisterInputChange
  } = useForm(registerFormFields)

  const loginSubmit = (e) => {
    e.preventDefault()
    console.log({ loginEmail, loginPassword })
  }

  const registerSubmit = (e) => {
    e.preventDefault()
    console.log({
      registerName,
      registerEmail,
      registerPassword,
      registerConfirmPassword
    })
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirmar la contraseña"
                name="registerConfirmPassword"
                value={registerConfirmPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
