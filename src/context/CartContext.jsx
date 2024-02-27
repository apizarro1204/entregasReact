import { useState, createContext, useContext } from "react"
import { useToast } from "./ToastContext.jsx"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    
    const [cart, setCart] = useState([])
    const { notify } = useToast()

    const addItemToCart = (productToAdd) => {
      console.log(productToAdd)
      console.log(cart)
      if(!isInCart(productToAdd.id)) {
        setCart(prev => [...prev, productToAdd])
        notify("success", "Producto agregado correctamente")
      }else{
        notify("error", "El producto ya esta agregado")
      }
    }

    const isInCart = (id) => {
      return cart.some(prod => prod.id == id)
    }
    
    const removeItemFromCart = (productToRemove) => {
      let id = productToRemove.id
      console.log(id)
      console.log(cart)
      const cartUpdated = cart.filter(prod => {
        console.log(id)
        console.log(prod.id)
        return(prod.id !== id)
      })
      notify("info", "El producto se elimino correctamente")
      console.log(cartUpdated)
      setCart(cartUpdated)
    }

    const getTotalQuantity = () => {
        let accu = 0

        cart.forEach(prod => accu += prod.quantity)

        return accu
    }

    const totalQuantity = getTotalQuantity()

    const getTotal = () => {
      let accu = 0

      cart.forEach((prod) => {return(
        accu += prod.quantity * prod.precio
        )
      })
      return accu
    }

    const total = getTotal()

    const clearCart = () => {
      setCart([])
    } 
    return(
        <CartContext.Provider value={{cart, addItemToCart, removeItemFromCart, totalQuantity, total, clearCart}}>
            { children }
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}