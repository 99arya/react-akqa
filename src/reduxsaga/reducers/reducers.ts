// import State Schema
import { IAppState } from "../state/state";
// createReducer from ToolKit
import { createReducer } from "@reduxjs/toolkit";
// the ProductInfo class
import { ProductInfo } from "../../models/productinfo";
// actions those are monitored
import {getProducts, getProductsSuccess, addProduct, addProductSuccess, deleteProductSuccess} from './../actions/actions';

// 1. define initial state
const initialState:IAppState = {
     product:new ProductInfo(0,'','','','','',0),
     products: new Array<ProductInfo>(),
     message:''
};

export const reducer = createReducer(initialState, (builder)=>{
    builder.addCase(getProducts,(state, action)=>{
        state.products = [];
    }).addCase(getProductsSuccess,(state,action)=>{
        state.products = action.payload.products;
    }).addCase(addProductSuccess,(state,action)=>{
        state.product = action.payload.product; // newly added record
        // mutate the prodiucts state using the newly created product  
        state.products = [...state.products, action.payload.product];
    }).addCase(deleteProductSuccess,(state,action)=>{
        state.product = action.payload.product; // to delete record
        let filteredList = state.products.filter((i)=>i.ProductId !== state.product.ProductId);
        state.products = [...filteredList];
    });;
});

