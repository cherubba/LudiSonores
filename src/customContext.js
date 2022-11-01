
import React, {useState, useEffect} from "react"
const CustomContext = React.createContext()

function CustomContextProvider (props){

    const [allPhotos, setAllPhotos] = useState([])
    const[cartItems, setCartItems] = useState([])
    const [order, setOrder] = useState(false)

    useEffect(() => {
        async function getPhotos() {
            const res = await fetch("https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json")
            const data = await res.json()
            setAllPhotos(data)
        }
        getPhotos()
    }, [])

    function toggleFavorite (id) {
        const updateArr = allPhotos.map(photo =>{
            if(photo.id === id){
                return {
                    ...photo,
                    isFavorite: !photo.isFavorite
                }
            }
            return photo
        })

        setAllPhotos(updateArr)
    }

    function addImage (img){
        setCartItems(prev=>[...prev, img])
        
    }
    console.log(cartItems)

    function removeImage(id){
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    function placeOrder(){
        setOrder(prev=>!prev)
        setTimeout(()=>{
            alert("Order placed!")
            setCartItems([])
            setOrder(prev=>!prev)
        },3000)
    }

    return(
        <CustomContext.Provider value={{allPhotos, toggleFavorite, addImage, cartItems, removeImage, placeOrder, order}}>
            {props.children}
        </CustomContext.Provider>
    )
}

export {CustomContextProvider, CustomContext}
