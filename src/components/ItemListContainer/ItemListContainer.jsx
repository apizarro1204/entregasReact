import { useState, useEffect } from "react"
// import { getProducts, getProductsByCategory } from "../../asyncMock"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { useNotification } from "../../notification/NotificationService"
import { db } from "../../config/firebaseConfig.js"
import { getDocs, collection, query, where } from "firebase/firestore"

const ItemListContainer = ({ greeting }) => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const { categoryId } = useParams()

    const { showNotification } = useNotification()

    useEffect(() => {
        console.log(categoryId);
        if(categoryId) document.title = 'Ecommerce: ' + categoryId 
        
        return () => {
            document.title = 'Ecommerce'
        }
    })

    useEffect(() => {
        setLoading(true)
        
        const productsCollection = categoryId 
            ? query(collection(db, 'item'), where('category', '==', categoryId))
            : collection(db, 'item')

        getDocs(productsCollection)
            .then(querySnapshot => {
                const productsAdapted = querySnapshot.docs.map(doc => {
                    const fields = doc.data()
                    return { id: doc.id, ...fields}
                })

                setProducts(productsAdapted)
            })
            .catch(error => {
                showNotification('error', 'Hubo un error')
            })
            .finally(() => {
                setLoading(false)
            })

    }, [categoryId])

    if(loading) {
        return <h1>Cargando los productos...</h1>
    }

    return (
        <div>
            <h1>{greeting + (categoryId ?? '')}</h1>
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer