import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import './Login.css'


export function Login(){

   
    const [hidden, setHidden] = useState(true)
    const [spanTxt, setSpanTxt] = useState('')
    const [validated, setValidated] = useState(false);
   
    const handleSubmit = (e)=>{
        e.preventDefault()
        const username = e.currentTarget[0].value
        const password = e.currentTarget[1].value
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }
      
          setValidated(true);
   
   
        fetch('http://localhost:5000/login',{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
         }).then(res=>{
    
        if(res.ok){
            setHidden(false)
            setSpanTxt('iniciando sesion...')
            setTimeout(()=>{
                window.location.href = '/'
            },2000)
        }else{
            e.preventDefault()
            setHidden(false)
            setSpanTxt('error al iniciar sesion...')
            setTimeout(()=>{setHidden(true)},2000)
            console.log(res)
        }
        })
    
    }
        
        
    

       

    return(
        <div className="login-form">
     <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group >
        <Form.Label>Username</Form.Label>
        <Form.Control id="register-username" minLength={2} required/>
        <Form.Control.Feedback type="invalid">
             Escribe el nombre de usuario
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control id="register-password" minLength={6} maxLength={16} required />
        <Form.Control.Feedback type="invalid">
             Escribe una contraseña valida
        </Form.Control.Feedback>
        </Form.Group>
       
        <Button type="submit">Iniciar Sesion</Button>
    </Form>
    <div>
        <span hidden={hidden}>{spanTxt}</span>
    </div>
    <div>
       <Link className="link" to='/register'>Registrarse</Link>
    </div>
        </div>
    )
}