import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { decrease, increase, removeCart } from '@/slices/cart';

const CartPage = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const discount = useAppSelector((state) => state.cart.discount);
  // Tính tổng giá trị giỏ hàng
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
<div>
<div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">

 
<div className="w-full flex flex-col h-fit gap-4 p-4 ">
    <p className="text-blue-900 text-xl font-extrabold">My cart</p>

  
    {cartItems.map((item) => (
      <div key={item.id}  className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
      <div className="flex flex-col md:flex-row gap-3 justify-between">
 
          <div className="flex flex-row gap-6 items-center">
              <div className="w-28 h-28">
                  <img className="w-full h-full" src={item.image}/>
              </div>
              <div className="flex flex-col gap-1">
                  <p className="text-lg text-gray-800 font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-600 font-semibold">Loại: <span className="font-normal">{item.category}</span></p>
                  <p className="text-xs text-gray-600 font-semibold">Size: <span className="font-normal">{item.size}</span></p>
              </div>
          </div>
       
          <div className="self-center text-center">
              <p className="text-gray-800 font-normal text-xl">{item.price}</p>
          </div>
       
          <div className="self-center">
              <button className="">
              <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => dispatch(removeCart(item.id))}
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
              </button>
          </div>
      </div>
      <div className="flex flex-row self-center gap-1">
          <button onClick={() => dispatch(decrease(item.id))} className="w-5 h-5 self-center rounded-full border border-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
              </svg>
          </button>
          <input type="number" min={1}  value={item.quantity} className="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm"/>
          <button onClick={() => dispatch(increase(item.id))} className="w-5 h-5 self-center rounded-full border border-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14M5 12h14" />
              </svg>
          </button>
      </div>
  </div>
    ))}
</div>

<div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
    <p className="text-blue-900 text-xl font-extrabold">Purchase Resume</p>
    <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
        <div className="flex flex-row justify-between">
            <p className="text-gray-600">Subtotal (2 Items)</p>
            <p className="text-end font-bold">${calculateTotalPrice()}</p>
        </div>
      
       
        <hr className="bg-gray-200 h-0.5"/>
        <div className="flex flex-row justify-between">
            <p className="text-gray-600">Discount Coupon</p>
            <a className="text-gray-500 text-base underline" href="#">Add</a>
        </div>
        <hr className="bg-gray-200 h-0.5"/>
        <div className="flex flex-row justify-between">
            <p className="text-gray-600">Total</p>
            <div>
            <p className="text-end font-bold">${calculateTotalPrice()}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
                    FINISH  
            </button>
            <button className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
                    ADD MORE PRODUCTS
            </button>
        </div>
    </div>
</div>
</div>
</div>
  );
};

export default CartPage;



