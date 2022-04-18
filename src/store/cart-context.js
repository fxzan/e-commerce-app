import React from "react";
import ReactDOM from "react-dom";

import Cart from "../components/Cart/Cart";
import AuthContext from "./auth-context";
import InfoModalContext from "./infoModal-context";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => { },
  removeAll: (id) => { },
});


export function CartContextProvider(props) {
  const modalCtx = React.useContext(InfoModalContext);
  const userID = React.useContext(AuthContext).userID;

  const [cartIsShown, setCartIsShown] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartTotal, setCartTotal] = React.useState(0);

  function showCartHandler() {
    setCartIsShown(true);
  }

  function hideCartHandler() {
    setCartIsShown(false);
  }

  const fetchCartItemsHandler = async () => {
    const response = await fetch(
      `https://the-band-website-default-rtdb.asia-southeast1.firebasedatabase.app/cart${userID}.json`
    );

    const data = await response.json();
    const loadedItems = [];
    for (let key in data) {
      loadedItems.push({
        cartID: key,
        id: data[key].id,
        title: data[key].title,
        price: data[key].price,
        amount: data[key].amount,
        imageUrl: data[key].imageUrl,
      });
    }
    const updatedTotal = loadedItems.reduce((curTot, item) => {
      return curTot + Number(item.price) * Number(item.amount);
    }, 0);

    setCartItems(loadedItems);
    setCartTotal(updatedTotal.toFixed(2));
  };

  React.useEffect(() => {
    fetchCartItemsHandler();
  });

  async function addItemToCartHandler(item) {
    try {
      const response = await fetch(
        `https://the-band-website-default-rtdb.asia-southeast1.firebasedatabase.app/cart${userID}.json`,
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      fetchCartItemsHandler();
    } catch (error) {
      alert(error);
    }
  }

  async function increaseItemHandler(cartID) {
    const item = cartItems.find((cartItem) => cartItem.cartID === cartID);
    const newAmount = Number(item.amount) + 1;
    try {
      const response = await fetch(
        `https://the-band-website-default-rtdb.asia-southeast1.firebasedatabase.app/cart${userID}/${cartID}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ amount: newAmount }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      fetchCartItemsHandler();
    } catch (error) {
      alert(error);
    }
  }

  async function removeAllHandler(cartID) {
    try {
      const response = await fetch(
        `https://the-band-website-default-rtdb.asia-southeast1.firebasedatabase.app/cart${userID}/${cartID}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      console.log(response);
      fetchCartItemsHandler();
    } catch (error) {
      alert(error);
    }
  }

  async function removeItemFromCartHandler(cartID) {
    const item = cartItems.find((cartItem) => cartItem.cartID === cartID);
    const newAmount = Number(item.amount) - 1;
    if (newAmount === 0) {
      removeAllHandler(cartID);
    } else {
      try {
        const response = await fetch(
          `https://the-band-website-default-rtdb.asia-southeast1.firebasedatabase.app/cart${userID}/${cartID}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({ amount: newAmount }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        console.log(response);
        fetchCartItemsHandler();
      } catch (error) {
        alert(error);
      }
    }
  }

  async function purchaseHandler() {
    for (let item of cartItems) {
      try {
        const response = await fetch(
          `https://the-band-website-default-rtdb.asia-southeast1.firebasedatabase.app/cart${userID}/${item.cartID}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        console.log(response.status);
      } catch (error) {
        alert(error);
      }
    }
    fetchCartItemsHandler();
    hideCartHandler();
    modalCtx.showModal("Thank you for your purchase!");
  }

  const cartContext = {
    items: cartItems,
    totalAmount: cartTotal,
    cartIsShown: cartIsShown,
    addItem: addItemToCartHandler,
    increaseItem: increaseItemHandler,
    removeItem: removeItemFromCartHandler,
    removeAll: removeAllHandler,
    showCart: showCartHandler,
  };

  const cartModal = ReactDOM.createPortal(
    <Cart onClose={hideCartHandler} onPurchase={purchaseHandler} />,
    document.getElementById("overlays")
  );

  return (
    <CartContext.Provider value={cartContext}>
      {cartIsShown && cartModal}
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
