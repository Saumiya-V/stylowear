import ProductTable from "../products/ProductTable"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"




export const Inventory =()=>{

return (
  
    <>
      <div className="translate-x-5 mt-5">
        <Link to="/form"><Button>+ Add Item</Button></Link>
      </div>
      <ProductTable/>
    </>


)
}

export default Inventory