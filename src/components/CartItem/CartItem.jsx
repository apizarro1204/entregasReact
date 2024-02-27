const CartItem = ({producto, onRemove}) => {
    

    return(
        <div className={classes.cartItem}>
            <div className={classes.productDiv}>
                <div className={classes.divInfo}>
                    <img src={import.meta.env.BASE_URL + producto.src} alt=""/>
                    <h3>{producto.tipoBebida} {producto.variedad} {producto.marca} {producto.contenido}</h3>
                </div>
                <div className={classes.divPrecio}>
                    <b>{producto.quantity}</b>
                    <b>Total: ${producto.precio * producto.quantity}</b>
                </div>
            </div>
            <button className={classes.button}onClick={() => onRemove(producto)}>X</button>
        </div>
    )
}

export default CartItem