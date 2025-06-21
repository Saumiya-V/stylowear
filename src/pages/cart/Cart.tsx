import { Button } from "@/components/ui/button"
import { formatter } from "@/utils/currencyFormatter"
import { useDispatch, useSelector } from "react-redux"
import {type AppDispatch, type RootState } from "@/redux/store"
import {  decrementCartItem, incrementCartItem, removeFromCart } from "@/redux/cartSlice"
import { toast } from "react-toastify"
import { cartDiv, cartimgDiv, cartItemDiv, cartItemImg, container, headerDiv, heading, quantityDiv, subHeading, totalDiv } from "@/styles/cartStyles"


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
  <div className={container}>
  <h3 className={heading}>
    {cart.length === 0?"Your Cart is Empty":"Your Cart"}
  </h3>

  <div className={headerDiv}>
    <h3>Item</h3>
    <h3>Price</h3>
    <h3>Quantity</h3>
    <h3>Total</h3>
  </div>

  <div className={cartDiv}>
    {
      cart.map((item, i) => (
        <div key={i} className={cartItemDiv}>
          <div className={cartimgDiv}>
            <img className={cartItemImg} src={item.image} alt={item.name} />
            <div>
              <h2 className={subHeading}>{item.name}</h2>
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
          <div className={quantityDiv}>
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
  <div className={totalDiv}>
    <span>Grand Total:</span>
    <span>{formatter.format(total)}</span>
  </div>
</div>

  )
}

export default Cart