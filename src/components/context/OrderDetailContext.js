import React, { createContext, useState } from "react";

export const OrderDetailContext = createContext();

export function OrderDetailProvider(props) {
  const [orderDetail, setOrderDetail] = useState({ totalPrice: 0 });
  const handleItem = (id, change) => {
    let menuItems = [];
    let totalPrice = orderDetail.totalPrice;
    for (const item of orderDetail.menuItems) {
      if (item.menuItemId === id) {
        menuItems.push({ ...item, quantity: item.quantity + change });
        totalPrice += change * item.price;
      } else {
        menuItems.push(item);
      }
    }

    let newOrderDetail = { ...orderDetail, menuItems, totalPrice };

    setOrderDetail(newOrderDetail);
  };

  return (
    <OrderDetailContext.Provider
      value={{ orderDetail, handleItem, setOrderDetail }}
    >
      {props.children}
    </OrderDetailContext.Provider>
  );
}
