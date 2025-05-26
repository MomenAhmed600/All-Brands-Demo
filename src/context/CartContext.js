    import { createContext, useContext, useState } from "react";

    const CartContext = createContext()

    export const CartProvider = ({ children }) => {
        const [carts, setCarts] = useState({})
        

        const addCart = (product) => {
            setCarts((prevCarts) => {
                const count = product.id in prevCarts ? prevCarts[product.id].count + 1 : 1;
                return {
                    ...prevCarts,
                    [product.id]: {
                        product,
                        count,
                    }
                }
            })
        };


        const removeCart = (productId) => {
            setCarts((prevCarts) => {
                const updatedCarts = { ...prevCarts };
                delete updatedCarts[productId];
                return updatedCarts;
            });
        };


        const increaseCartCount = (productId) => {
            setCarts((prevCarts) => ({
                ...prevCarts,
                [productId]: {
                    ...prevCarts[productId],
                    count: prevCarts[productId].count + 1,
                },
            }));
        };
        
        const decreaseCartCount = (productId) => {
            setCarts((prevCarts) => ({
                ...prevCarts,
                [productId]: {
                    ...prevCarts[productId],
                    count: prevCarts[productId].count > 1 ? prevCarts[productId].count - 1 : 1,
                },
            }));
        };


        return (
            <CartContext.Provider value={{ carts, addCart, removeCart, increaseCartCount, decreaseCartCount }}>
                {children}
            </CartContext.Provider>
        )
    }

    export const useCart = () => useContext(CartContext)
