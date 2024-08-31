import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState } from "react"
import './Login.css'


export function Register(){

   
   
    const [hidden, setHidden] = useState(true)
    const [spanTxt, setSpanTxt] = useState('')
    const [validated, setValidated] = useState(false);

   
    const handleSubmit = (e)=>{
        e.preventDefault()
        const username = e.currentTarget[0].value
        const password = e.currentTarget[1].value
        const email = e.currentTarget[2].value

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }
      
          setValidated(true);
     
        fetch('https://e-commerce-backend-zh4k.onrender.com/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, email})
         }).then(res=>{
    
        if(res.ok){
            setHidden(false)
            setSpanTxt('usuario creado, redireccionando al login...')
            setTimeout(()=>{
                window.location.href = '/login'
            },2000)
        }else{
            e.preventDefault()
            setHidden(false)
            setSpanTxt('Error al crear ususario...')
            setTimeout(() => {
                setHidden(true)
            }, 2000);
            console.log(res)
        }
        })
    
    }
        
        
    

       

    return(
        <div className="login-form">
     <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group >
        <Form.Label>Username</Form.Label>
        <Form.Control id="register-username" minLength={5} required/>
        <Form.Control.Feedback type="invalid">
             Elige un nombre de usuario con mas de 5 caracteres
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control id="register-password" minLength={6} maxLength={16} required />
        <Form.Control.Feedback type="invalid">
             Escribe una contraseña que contenga entre 6 y 16 caracteres
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group >
        <Form.Label>Email address</Form.Label>
        <Form.Control id="register-email" type="email" placeholder="name@example.com" required/>
        <Form.Control.Feedback type="invalid">
             Escribe una direccion de email valida
        </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Crear usuario</Button>
    </Form>
    <div>
    <span hidden={hidden}>{spanTxt}</span>
    </div>
    <div>
    <Link className="link" to='/login'>Iniciar sesion</Link>
    </div>
        </div>
    )
}