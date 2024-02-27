import { useState } from "react"
import { useToast } from "../../context/ToastContext.jsx"

const CheckoutForm = ({ onConfirm }) => {
    const [ name, setName] = useState("")
    const [ phone, setPhone] = useState("")
    const [ email, setEmail] = useState("")
    const [ nameConfirmation, setNameConfirmation] = useState("")
    const [ phoneConfirmation, setPhoneConfirmation] = useState("")
    const [ emailConfirmation, setEmailConfirmation] = useState("")

    const { notify } = useToast()

    // Se crea userData para crear la orden y se crea la misma
    const handleConfirm = (evt) => {
        evt.preventDefault()

        if(name !== nameConfirmation || phone !== phoneConfirmation || email !== emailConfirmation){
            notify("error", "Los datos ingresados no coinciden")
        }else{
            const userData = {
                name, phone, email
            }
    
            onConfirm(userData)
        }
    }

    return(
        <div className={classes.formsContainer}>
            <form  className={classes.form}>
                <input type="text" placeholder="Nombre" value={name} onChange={({ target }) => setName(target.value)}/>
                <input type="text" placeholder="Telefono" value={phone} onChange={({ target }) => setPhone(target.value)}/>
                <input type="text" placeholder="Email" value={email} onChange={({ target }) => setEmail(target.value)}/>
            </form>
            <form onSubmit={handleConfirm} className={classes.form}>
                <input type="text" placeholder="Confirmar nombre" value={nameConfirmation} onChange={({ target }) => setNameConfirmation(target.value)}/>
                <input type="text" placeholder="Confirmar telefono" value={phoneConfirmation} onChange={({ target }) => setPhoneConfirmation(target.value)}/>
                <input type="text" placeholder="Confirmar email" value={emailConfirmation} onChange={({ target }) => setEmailConfirmation(target.value)}/>
                <input type="submit" value="Generar Orden" className={classes.submitButton}/>
            </form>
        </div>
    )
}

export default CheckoutForm