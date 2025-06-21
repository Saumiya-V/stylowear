import { Base_URL } from "@/constants/ProductApi";
import axios from "axios";

//Data fetching based on gender

export const fetchDataByGender = async ( gender: string, pageParam: number) => {
  const response = await axios.get(`${Base_URL}?gender=${gender}&_limit=10&_page=${pageParam}`)

  return {
    data: response.data,
    totalCount: parseInt(response.headers['x-total-count'] || '0'),
  };
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

