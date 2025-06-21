import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/useProducts"
import { Input } from "../ui/input"
import { useEdit } from "@/context/editContext/EditContext"
import { useEffect } from "react"
import { container, formContainer, formStyles, imgStyles, inputStyles } from "@/styles/formStyles"
import { IMG_URL } from "@/constants/ProductApi"


const Form = () => {
   
   const {newName,newCategory,newGender,newPrice,newImage,handleAddItem,setNewName,setPrice,setCategory,setGender,setImage,updateMutation} = useProducts()
   const { isEdit, editItem } = useEdit();

  useEffect(() => {
    if (isEdit && editItem) {
      setNewName(editItem.name);
      setCategory(editItem.category);
      setGender(editItem.gender);
      setPrice(editItem.price);
      setImage(editItem.image);
    }
  }, [isEdit, editItem]);

  
  return (
  <div className={formContainer}>
    <div>
        <img className={imgStyles} src={IMG_URL} />
    </div>

    <div className={container}>

        <form className={formStyles} onSubmit={e=>{
        e.preventDefault();
                if (isEdit && editItem) {
        updateMutation.mutate({
          ...editItem,
          name: newName,
          category: newCategory,
          gender: newGender,
          price: newPrice,
          image: newImage,
        });
      } else {
        handleAddItem();
      }

        }}>
            <Input className={inputStyles} 
            type="text" placeholder='Name' 
            value={newName} 
            onChange={(e)=>setNewName(e.target.value)}/>

            <Input className={inputStyles} 
            type="text" 
            placeholder='Category' 
            value={newCategory} 
            onChange={(e)=>setCategory(e.target.value)}/>

            <Input className={inputStyles} 
            type="text" 
            placeholder='Gender' 
            value={newGender} 
            onChange={(e)=>setGender(e.target.value)}/>

            <Input className={inputStyles} 
            type="number" 
            placeholder='Price' 
            value={newPrice} 
            onChange={(e)=>setPrice(Number(e.target.value))}/>

             <Input className={inputStyles} 
             type="url" 
             placeholder='Paste Image Url' 
             value={newImage} onChange={(e)=>setImage(e.target.value)}/>
             
           <Button>
            {
              isEdit?"Update Item" : "Add Item"
            }
           </Button>
        </form>
    </div>
  </div>
  )
}

export default Form