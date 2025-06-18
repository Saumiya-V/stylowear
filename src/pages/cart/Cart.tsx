import { Button } from "@/components/ui/button"
import { formatter } from "@/utils/currencyFormatter"
import { useDispatch, useSelector } from "react-redux"
import {type AppDispatch, type RootState } from "@/redux/store"
import {  decrementCartItem, incrementCartItem, removeFromCart } from "@/redux/cartSlice"
import { toast } from "react-toastify"



const Cart = () => {
  const cart = useSelector((state:RootState)=>state.cart)
  const dispatch = useDispatch<AppDispatch>()

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
    toast.success("Removed from cart")
  }

   const handleIncrement = (id:number)=>{
    dispatch(incrementCartItem({ id }))
   }

   const handleDecrement = (id:number)=>{
    dispatch(decrementCartItem({ id }))
   }

  const total = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity
  }, 0)

  return (
  <div className="p-8 max-w-7xl mx-auto">
  <h3 className="text-center font-bold text-2xl mb-8">{cart.length === 0?"Your Cart is Empty":"Your Cart"}</h3>

  <div className="grid grid-cols-4 gap-4 px-6 font-semibold text-lg border-b pb-2">
    <h3>Item</h3>
    <h3>Price</h3>
    <h3>Quantity</h3>
    <h3>Total</h3>
  </div>

  <div className="flex flex-col divide-y mt-4">
    {
      cart.map((item, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 items-center p-4">
          {/* Item */}
          <div className="flex items-center gap-4">
            <img className="w-25 h-25 object-cover rounded" src={item.image} alt={item.name} />
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>

          {/* Price */}
          <p>{formatter.format(item.price)}</p>

          {/* Quantity */}
          <div className="flex items-center gap-2">
            <Button size="icon" onClick={() => handleIncrement(item.id)}>+</Button>
            <span>{item.quantity}</span>
            <Button size="icon" onClick={() => handleDecrement(item.id)}>-</Button>
          </div>

          {/* Total */}
          <p className="font-medium">{formatter.format(item.price * item.quantity)}</p>
        </div>
      ))
    }
  </div>

  {/* Grand Total */}
  <div className="flex justify-between items-center mt-6 border-t pt-4 text-xl font-semibold">
    <span>Grand Total:</span>
    <span>{formatter.format(total)}</span>
  </div>
</div>

  )
}

export default Cart