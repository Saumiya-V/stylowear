import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/useProducts"
import { Input } from "../ui/input"
import { useEdit } from "@/context/editContext/EditContext"
import { useEffect } from "react"


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
  <div className="flex w-full gap-20 text-white items-center mx-auto translate-x-40 translate-y-40">
    <div>
        <img className="h-70" src="https://imgs.search.brave.com/2OjYHynNcTR2Ls4Bzrb2njV_HHgTrjEODrMDdYCuB38/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzUv/NzE3Lzk4OC9zbWFs/bC9tYW4tbmVhci1y/YWNrLXdpdGgtY2xv/dGhlcy1wbmcucG5n " />
    </div>
    <div className="w-lg">
        <form className="flex flex-col gap-4" onSubmit={e=>{
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
            <Input className='border-2 border-white-100 text-black mr-5 p-2 w-full' type="text" placeholder='Name' value={newName} onChange={(e)=>setNewName(e.target.value)}/>
            <Input className='border-2 border-white-100 text-black mr-4 p-2 w-full' type="text" placeholder='Category' value={newCategory} onChange={(e)=>setCategory(e.target.value)}/>
            <Input className='border-2 border-white-100 text-black mr-5 p-2 w-full' type="text" placeholder='Gender' value={newGender} onChange={(e)=>setGender(e.target.value)}/>
            <Input className='border-2 border-white-100 text-black mr-4 p-2 w-full text-black' type="number" placeholder='Price' value={newPrice} onChange={(e)=>setPrice(Number(e.target.value))}/>
             <Input className='border-2 border-white-100 text-black mr-5 p-2 w-full' type="url" placeholder='Paste Image Url' value={newImage} onChange={(e)=>setImage(e.target.value)}/>
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