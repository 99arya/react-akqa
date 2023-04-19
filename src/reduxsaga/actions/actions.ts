import { createAction } from "@reduxjs/toolkit";
import { ProductInfo } from "../../models/productinfo";

export const getProducts = createAction('GET_PRODUCTS', (msg:string)=>{
    return {
        payload:{
            message:msg
        }
    }
});
// Parameter 1: ACTION_TYPE
// Parameter 2: callback aka Action Creator, this will
// have the output parameter that is generated aftre the 
// action is successfully executed in this case it it 'products'
export const getProductsSuccess = createAction('GET_PRODUCTS_SUCCESS', (products:Array<ProductInfo>)=>{
    return {
        payload:{
            products:products
        }
    }
});

export const addProduct= createAction('ADD_PRODUCT',(prd:ProductInfo)=>{
    console.log(`In Aciton ${JSON.stringify(prd)}`);
   return {
    payload: {
        product:prd // the input data received from the action dispatched from UI 
    }
   }  
});

export const addProductSuccess = createAction('ADD_PRODUCT_SUCCESS',(prd:ProductInfo)=>{
    return {
        payload:{
            product:prd // the newly created product received after succesful execution of the action
        }
    }
});

export const deleteProductSuccess= createAction('DELETE_PRODUCT',(prd:ProductInfo)=>{
    console.log(`In delete Action ${JSON.stringify(prd)}`);
   return {
    payload: {
        product:prd // the input data received from the action dispatched from UI 
    }
   }  
});

