import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import type { Item } from "@/types/type"
import { fetchData } from "@/utils/fetchData"
import { Base_URL } from "@/constants/ProductApi"


import { toast } from "react-toastify"
import { useEdit } from "@/context/editContext/EditContext"

export const useProducts = () => {
  const queryClient = useQueryClient()
  const {setisEdit,setEditItem} = useEdit()

  const [newName, setNewName] = useState("")
  const [newCategory, setCategory] = useState("")
  const [newGender, setGender] = useState("")
  const [newPrice, setPrice] = useState(0)
  const [newImage, setImage] = useState("")

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
  })

  const addNewItem = async (newItem: Item) => {
    const { data } = await axios.post(Base_URL, newItem)
    return data
  }

  const deleteItem = async (id: number) => {
    const { data } = await axios.delete(`${Base_URL}/${id}`)
    return data
  }

  const updateItem = async (updatedItem:Item)=>{
    const {data} = await axios.put(`${Base_URL}/${updatedItem.id}`,updatedItem)
    return data
  }


  const addMutation = useMutation({
    mutationFn: addNewItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setNewName("")
      setCategory("")
      setGender("")
      setPrice(0)
      setImage("")
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Item Deleted")
    },
  })



  const handleAddItem = () => {
    if (!newName || !newCategory || !newGender || !newPrice || !newImage) return
    addMutation.mutate({
      id: data?.length ? data.length + 1 : 1,
      name: newName,
      category: newCategory,
      gender: newGender,
      price: newPrice,
      image: newImage,
    })
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure to delete?")) {
      deleteMutation.mutate(id)
    }
  }

   const updateMutation = useMutation({
  mutationFn: updateItem,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    setisEdit(false)
    setEditItem(null)
    toast.success("Item updated successfully!");
  },
  onError: (error: any) => {
    toast.error(`Update failed: ${error.message}`);
  },
});

  return {
    data,
    isLoading,
    isError,
    newName,
    setNewName,
    newCategory,
    setCategory,
    newGender,
    setGender,
    newPrice,
    setPrice,
    newImage,
    setImage,
    handleAddItem,
    handleDelete,
    addMutation,
    deleteMutation,
    updateMutation,
 
  }
}
