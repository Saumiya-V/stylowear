import { Base_URL } from "@/constants/ProductApi";
import axios from "axios";

//Data fetching based on gender
export const fetchDataByGender = async (url: string,gender:string) => {
  const { data } = await axios.get(`${url}?gender=${gender}`);
  return data;
};

//Overall product fetch
export const fetchData = async ()=>{
  const {data}=await axios.get(Base_URL)
  return data
}


//Product fetch based on search query
export const fetchProduct = async (query: string) => {
  const res = await axios.get(`${Base_URL}`); 
  const products = res.data;

  if (!query.trim()) return products;

  return products.filter((product: any) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category?.toLowerCase().includes(query.toLowerCase())
  );
};

