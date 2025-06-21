import { MainCarousel } from "@/components/carousel/MainCarousel";
import { Category } from "@/components/categories/Category";
import SearchBar from "@/components/searchbar/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { addToCart } from "@/redux/cartSlice";
import type { AppDispatch } from "@/redux/store";
import type { Item } from "@/types/type";
import { formatter } from "@/utils/currencyFormatter";
import { fetchProduct } from "@/utils/fetchData";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const SearchedItemDisplay = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const timeoutRef = useRef<number|null>(null)
  const dispatch=useDispatch<AppDispatch>()

    useEffect(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
     timeoutRef.current = window.setTimeout(()=>{
    const fetchFiltered = async () => {
      if (query.trim() === "") {
        setProducts([]); 
        return;
      }
      const data = await fetchProduct(query);
      setProducts(data);
    };

    fetchFiltered();
    },500)
  }, [query]);


 const handleAddClick=(item:Item)=>{
   dispatch(addToCart(item))
}


  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      {query.trim() === "" ? (<>
      <MainCarousel/>
      <Category/>
      </>) : (
        <div className="flex flex-wrap justify-center gap-4 mt-5">
          {products.length > 0 ? (
            products.map((product: Item) => (
              <Card key={product.id} className="w-58">
                <img src={product.image} alt="Cloth" className="h-40 w-full object-cover" />
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{product.category}</p>
                  <p>{formatter.format(product.price)}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleAddClick(product)}
                    className="cursor-pointer"
                  >
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center font-medium mt-10">No products found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
};
