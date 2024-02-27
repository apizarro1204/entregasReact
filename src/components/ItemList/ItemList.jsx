import Item from "../Item/Item.jsx"

const ItemList = ({productos}) => {
    return(
        <div className={classes.itemList}>
            {productos.map(producto => 
            <Item key={producto.id} producto = {producto}/>
            )}
        </div>
    )
}

export default ItemList