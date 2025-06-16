import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '@/redux/store';
import { addToCart } from '@/redux/cartSlice';
import { fetchDataByGender } from '@/utils/fetchData';
import { formatter } from '@/utils/currencyFormatter';
import type { PropType } from '@/types/type';
import type { Item } from '@/types/type';
import { Base_URL } from '@/constants/ProductApi';
import { useQuery } from "@tanstack/react-query";



const ProductDisplay = ({gender}:PropType) => {
const dispatch=useDispatch<AppDispatch>()


 const {data, isLoading, isError} = useQuery({
    queryKey: ["clothes"],
    queryFn: () => fetchDataByGender(Base_URL,gender),
 })

 console.log(data)

 const handleAddClick=(item:Item)=>{
   dispatch(addToCart(item))
}

if(isLoading){
    return <p>Loading...</p>
}

 if(isError){
    return <p>Error in fetching data</p>
 }


  return (
    <>
    <div className='flex flex-wrap gap-10 mx-25 mt-10'>{
     data.map((item:Item)=>{
        return <Card key={item.id} className='w-58'>
         <img src={item.image} alt="Cloth" className='h-40'/>
         <CardHeader> <CardTitle>{item.name}</CardTitle></CardHeader>
         <CardContent>
            <p>{item.category}</p>
         <p>{formatter.format(item.price)}</p>
         </CardContent>
         <CardFooter>
             <Button onClick={()=>handleAddClick(item)} className='cursor-pointer'>Add to cart</Button>
         </CardFooter>
        </Card>
     })

    }
        </div>
    </>
  )
}

export default ProductDisplay