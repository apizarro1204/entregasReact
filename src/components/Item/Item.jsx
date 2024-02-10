import { Link } from "react-router-dom"

const Item = ({ id, name, img, category, price}) => {
    console.log('render de item: ', id)
    return (
        <div>
            <h3>{name}</h3>
            <img src={img} style={{ width: 150 }}/>
            <p>Categoria: {category}</p>
            <h4>${price}</h4>
            <Link to={`/detail/${id}`}>Ver detalle</Link>
        </div>  
    )
}

export default Item