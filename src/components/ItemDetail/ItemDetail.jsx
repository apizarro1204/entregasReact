import { Link } from 'react-router-dom'
import ItemCount from '../ItemCount/ItemCount'
import { useCart } from '../../context/CartContext'
import { useNotification } from '../../notification/NotificationService'

const ItemDetail = ({ id, name, category, img, price, stock, description }) => {
    const { addItem, getProductQuantity } = useCart()
    const { showNotification } = useNotification()

    const handleOnAdd = (quantity) => {
        const objProductToAdd = {
            id, name, price, quantity
        }
        addItem(objProductToAdd)
        showNotification('info', `Se agregaron correctamente ${quantity} ${name}`)
    }

    const productQuantity = getProductQuantity(id)

    return (
        <article>
            <header>
                <h2>
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} style={{ width: 200}}/>
            </picture>
            <section>
                <p>
                    Categoria: {category}
                </p>
                <p>
                    Descripción: {description}
                </p>
                <p>
                    Precio: {price}
                </p>
            </section>           
            <footer>
                <ItemCount onAdd={handleOnAdd} stock={stock} initial={productQuantity}/>
            </footer>
        </article>
    )
}

export default ItemDetail