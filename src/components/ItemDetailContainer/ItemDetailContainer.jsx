import { useState, useEffect } from "react"
import { getProductById } from "../../asyncMock"
import ItemDetail from "../ItemDetail/ItemDetail.jsx"
import { useParams } from "react-router-dom"
import { db } from '../../config/firebaseConfig.js'
import { getDoc, doc } from "firebase/firestore"
import Loading from "../Loading/Loading.jsx"
import { useToast } from "../../context/ToastContext.jsx"

const ItemDetailContainer = () => {
    //declaramos variables y parametros mediante url necesarios
    
    const [producto, setProducto] = useState([])
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
    
    const productDocument = doc(db, 'products', id)
    //Se trae la info de la db
    getDoc(productDocument)
    //Se procesa para que sea apta
    .then(queryDocumentSnapshot => {
        const info = queryDocumentSnapshot.data()
        if(info){
            const productAdapted = {id: queryDocumentSnapshot.id, ...info}
            setProducto(productAdapted)
            setLoading(false)
        }else{
            setLoading(false)
            setProducto(null)
        }
    })
    .catch(error => {
        console.error("Error fetching document:", error);
        setLoading(false);
    });
    //Se setea loading a false
    
    }
    , [id])
    return(
        <div className={classes.itemDetailContainer}>
            <Loading loading={loading}/>
            <ItemDetail producto={producto}/>
        </div>
    )
}

export default ItemDetailContainer