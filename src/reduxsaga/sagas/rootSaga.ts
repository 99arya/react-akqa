// import necessary operators
import {all, call, put, takeLatest} from 'redux-saga/effects';
// import service that encapsulate async calls
import { ProductHttpService } from '../../service/producthttpservice';
import { ProductInfo } from '../../models/productinfo';
import { addProductSuccess, getProductsSuccess, deleteProductSuccess} from '../actions/actions';
 
// Recommended: Helper functions those will invoke methods from service
// and these functions will return Resolved Promise Object
// this promise resolve will read the data and this data will be 
// made availabler to Output Action generator function

function getAllProducts():Promise<ProductInfo[]>{
  let serv = new ProductHttpService();
  // get the promise from the Async call
  const response = serv.getProducts().then((result)=>result); 
  // resolve this promise and pass its data to the caller
  return Promise.resolve(response);
}

function createProduct(product:ProductInfo):Promise<ProductInfo>{
    let serv = new ProductHttpService();
    const response = serv.postProduct(product).then((result)=>result);
    return Promise.resolve(response);
}

function deleteProduct(product:ProductInfo):Promise<boolean>{
  let serv = new ProductHttpService();
  const response = serv.deleteProduct(product.ProductRowId).then((result)=>result);
  return Promise.resolve(response);
}

// Lets create Generator Functions for Input and Output Actions

function* createProductOutput(action:any):Generator {
    try {
        // 1. read the payload received from the input dispath action
        const inputData = action.payload.product;
        console.log(`In Saga add = ${JSON.stringify(inputData)}`);
        const response = yield call(createProduct, inputData);
        // 2 parse the response
        const product:ProductInfo = response as ProductInfo;
        yield put(addProductSuccess(product));
    }catch(e:any){
        yield put({
            type: 'ADD_PRODUCT_FAILED',
            message: `Add Operation filed ${e.message}`
        });
    }
}

function* createProductInput(){
    // the Payload will be read here
    // the arguments (if any) will be passed
    // to the linked Output Action Generator function
     yield takeLatest('ADD_PRODUCT', createProductOutput);
}

function* getProductsOutput():Generator{
  try {
    // 1. invoke the helper function
    const response = yield call(getAllProducts);
    // parse the resolved data into the desired object
    // Note: They must be convertibale
    let products:Array<ProductInfo> = response as Array<ProductInfo>;
    // dispatch the Output Sucecss Function
    yield put(getProductsSuccess(products));
  }catch(e:any){
    // dispatch the failed action 
    yield put({
        type: 'GET_PRODUCTS_FAILED',
        message: 'Read Operation filed'
    });
  }
}

function* deleteProductOutput(action:any):Generator {
  try {
      // 1. read the payload received from the input dispath action
      const inputData = action.payload.product;
      console.log(`In Saga delete = ${JSON.stringify(inputData)}`);
      const response = yield call(deleteProduct, inputData);
      // 2 parse the response
      const product:ProductInfo = response as ProductInfo;
      yield put(deleteProductSuccess(product));
  }catch(e:any){
      yield put({
          type: 'DELETE_PRODUCT_FAILED',
          message: `Delete Operation filed ${e.message}`
      });
  }
}

function* getProductsInput(){
    // takeLatest: Listen to dispatched action
    // as will as the payload returned by it (if any) 
   yield takeLatest('GET_PRODUCTS', getProductsOutput); 
}

function* deleteProductInput(){
  yield takeLatest('DELETE_PRODUCT',deleteProductOutput)
}

// Lets create a root saga generator function, that will make sure that
// the Middleware with its generators are executing at root level
function* rootSaga(){
    yield all([getProductsInput(), createProductInput(), deleteProductInput()]);
}

export default rootSaga;



