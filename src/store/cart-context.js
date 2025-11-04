import React from "react";
import ReactDOM from "react-dom";

import Cart from "../components/Cart/Cart";
import AuthContext from "./auth-context";
import InfoModalContext from "./infoModal-context";
import supabase from "../helper/supabaseClient";

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
    try {   
      const { data, error } = await supabase
      .from('cart')
      .select('*')
      .eq('userId', userID);

      if (error) {
        console.log(error);
        throw new Error(`${error.code} ${error.message}`)
      }

      const loadedItems = [];
      for (let each in data) {
        loadedItems.push({
          cartID: data[each].id,
          id: data[each].productId,
          title: data[each].title,
          price: data[each].price,
          amount: data[each].amount,
          imageUrl: data[each].imageUrl,
        });
      }
      const updatedTotal = loadedItems.reduce((curTot, item) => {
        return curTot + Number(item.price) * Number(item.amount);
      }, 0);

      setCartItems(loadedItems);
      setCartTotal(updatedTotal.toFixed(2));
    } catch (error) {
      modalCtx.showModal(error);
    }
  };

  React.useEffect(() => {
    fetchCartItemsHandler();
  });

  async function addItemToCartHandler(item) {
    try {
      const { data, error } = await supabase
      .from('cart')
      .insert({
        userId: userID,
        productId: item.id,
        title: item.title,
        price: item.price,
        imageUrl: item.imageUrl,
        amount: item.amount
      });

      if (error) {
        console.log(error);
        throw new Error(`${error.code} ${error.message}`)
      }
      console.log(data);
      fetchCartItemsHandler();
    } catch (error) {
      modalCtx.showModal(error);
    }
  }

  async function increaseItemHandler(cartID) {
    const item = cartItems.find((cartItem) => cartItem.cartID === cartID);
    const newAmount = Number(item.amount) + 1;
    try {
      const { data, error } = await supabase
      .from('cart')
      .update({ amount: newAmount })
      .eq('id', cartID).eq('userId', userID);

      if (error) {
        console.log(error);
        throw new Error(`${error.code} ${error.message}`)
      }
      console.log(data);
      fetchCartItemsHandler();
    } catch (error) {
      modalCtx.showModal(error);
    }
  }

  async function removeAllHandler(cartID) {
    try {
      const { data, error } = await supabase
      .from('cart')
      .delete()
      .eq('id', cartID).eq('userId', userID);

      if (error) {
        console.log(error);
        throw new Error(`${error.code} ${error.message}`)
      }

      console.log(data);
      fetchCartItemsHandler();
    } catch (error) {
      modalCtx.showModal(error);
    }
  }

  async function removeItemFromCartHandler(cartID) {
    const item = cartItems.find((cartItem) => cartItem.cartID === cartID);
    const newAmount = Number(item.amount) - 1;
    if (newAmount === 0) {
      removeAllHandler(cartID);
    } else {
      try {
        const { data, error } = await supabase
        .from('cart')
        .update({ amount: newAmount })
        .eq('id', cartID).eq('userId', userID);

        if (error) {
          console.log(error);
          throw new Error(`${error.code} ${error.message}`)
        }
        console.log(data);                        
        fetchCartItemsHandler();
      } catch (error) {
        modalCtx.showModal(error);
      }
    }
  }

  async function purchaseHandler() {
    for (let item of cartItems) {
      try {
        const { data, error } = await supabase
        .from('cart')
        .delete()
        .eq('id', item.cartID).eq('userId', userID);

        if (error) {
          console.log(error);
          throw new Error(`${error.code} ${error.message}`)
        }
        console.log(data); 
      } catch (error) {
        modalCtx.showModal(error);
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
