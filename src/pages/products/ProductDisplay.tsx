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
import { useInfiniteQuery } from "@tanstack/react-query";
import { container, loadBtn } from "@/styles/productStyles";


const ProductDisplay = ({gender}:PropType) => {
const dispatch=useDispatch<AppDispatch>()


 const {data,error,fetchNextPage,status,hasNextPage,isFetchingNextPage} = useInfiniteQuery({
    queryKey: ["clothes",gender],
    queryFn: ({ pageParam = 1 }) => fetchDataByGender(gender, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage,allPages) => {
    const loadedItems = allPages.reduce((total, page) => total + page.data.length, 0);
    return loadedItems < lastPage.totalCount ? allPages.length + 1 : undefined;
    }
 })



 const handleAddClick=(item:Item)=>{
   dispatch(addToCart(item))
}

if(status === 'pending'){
    return <p>Loading...</p>
}

 if(status === 'error'){
    return <>
    <p>Error in fetching data</p>
    <p>{error.message}</p>
    </>
 }

  return (
    <>
    <div className={container}>{
     data?.pages.map((page)=>{
        return page.data.map((item:Item)=>{
         return  <Card key={item.id} className='w-58'>
         <img src={item.image} alt="Cloth" className='h-40'/>

         <CardHeader> 
            <CardTitle>{item.name}</CardTitle>
         </CardHeader>

         <CardContent>
            <p>{item.category}</p>
            <p>{formatter.format(item.price)}</p>
         </CardContent>

         <CardFooter>
             <Button onClick={()=>handleAddClick(item)} className='cursor-pointer'>Add to cart</Button>
         </CardFooter>
        </Card>
        })
     })
    }
        </div>
       <Button className={loadBtn} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
       {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Load More' : 'No more items'}
       </Button>
</>
  )
}

export default ProductDisplay




