import { useState, useEffect } from "react"
import { getProducts, getProductsByCategory } from "../../asyncMock.js"
import ItemList from "../ItemList/ItemList.jsx"
import { useParams } from "react-router-dom"
import { db } from '../../config/firebaseConfig.js'
import { getDocs, collection, query, where } from 'firebase/firestore'
import Loading from '../Loading/Loading.jsx'


const ItemListContainer = (props) => {
    //Se declaran las variables necesarias y se recoje el parametro enviado mediante la url
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoria } = useParams()

    useEffect(() => {
        // Dependiendo si hay categoria o no se guarda una coleccion distina
        const productsCollection = categoria 
        ?query(collection(db, 'products'), where('tipoBebida', '==', categoria)) 
        :collection(db, 'products')
        
        //Se trae la info de firebase
        console.log("consulta hecha")
        getDocs(productsCollection)
        //Se procesa esa informacion para adaptarla a lo requerido
        .then(querySnapshot => {
            const productsAdapted = querySnapshot.docs.map(doc => {
                const infoProd = doc.data() 
                return{id: doc.id, ...infoProd}
            })
            setProductos(productsAdapted)
        })
        .catch(err => {console.error(err)
            setLoading(false)})

        //Seteamos loading a false para dejar de ver el mensaje
        setLoading(false)}, [categoria])
        
    return(
        <div className={classes.itemListContainer}>
            <Loading loading={loading}/>
            <ItemList productos = {productos}/>
        </div>
        
    )
}

export default ItemListContainer