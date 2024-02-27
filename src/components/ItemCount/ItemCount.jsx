import {useState} from "react"

const ItemCount = ({stock, initial, onAdd, onRemove, producto}) => {
    const [quantity, setQuantity] = useState(initial)
    //Se agrega uno a la cantidad
    const increment = () => {
        if(quantity < stock){
            setQuantity(quantity + 1)
        }
    }
    //Se remueve uno de la cantidad
    const decrement = () => {
        if(quantity > 1){
            setQuantity(quantity - 1)
        }
    }

    return(
        <div className={classes.itemCount}>
            <div className={classes.firstDiv}>
                <button onClick={decrement} className={classes.decrementButton}>-</button>
                <div>
                    <h4>{quantity}</h4>
                </div>
                <button onClick={increment} className={classes.incrementButton}>+</button>
            </div>
            <div className={classes.submit}>
                {/* Fija el numero que se haya elegido en la cantidad */}
                <button onClick={() => onAdd({...producto, quantity: quantity})} disabled={!stock}>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default ItemCount