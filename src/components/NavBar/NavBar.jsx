import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from "../../config/firebaseConfig.js"

const NavBar = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const categoriesCollection = query(collection(db, 'categories'), orderBy('name', 'desc'))

        getDocs(categoriesCollection)
            .then(querySnapshot => {
                const categoriesAdapted = querySnapshot.docs.map(doc => {
                    const fields = doc.data()
                    return { id: doc.id, ...fields}
                })

                setCategories(categoriesAdapted)
            })
    }, [])

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <Link to='/'>NUEVO Ecommerce</Link>
            <section>
                {
                    categories.map(cat => (
                        <Link key={cat.id} to={`/category/${cat.slug}`}>{cat.name}</Link>
                    ))
                }
            </section>
            <CartWidget />
        </nav>
    )
}

export default NavBar