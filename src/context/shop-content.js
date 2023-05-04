import { createContext, useContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";
import "../vote.css";
import { addDoc, collection, doc, getDocs, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import VoteOffline from "../pages/voteOffline";
import { NodeContext } from "../App";


export const ShopContext = createContext(null);


const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
const getDefaultVote = (path) => {
    // const locate = 'จุดที่ 3';
    const voteColRef = collection(db,path);
    let voteList = {};
    const unsubscribe = onSnapshot(voteColRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
        voteList[doc.id] = doc.data().score;
        }else{
        voteList[doc.id] = 0;
        }
      });
      console.log('voteList', voteList);
    });
    return voteList;
  };

const createPost = (productName,path,vscore) =>{
    // const locate = 'จุดที่ 1';
    const tmpPath = path.split('/')
    // const voteScore = collection(db,`เขตจตุจักร/แขวงลาดยาว/point1/จุดที่ 1/partyscore`)
    const docVoteRef = doc(db,path,productName)
    setDoc(docVoteRef,{
        name: productName,
        score: vscore,
        image: 'testaddData'
    }).then(response => {
        console.log(response)
    })
    .catch(error =>  alert(error.message))
    const docVoteRef2 = doc(db,`${tmpPath[0]}/${tmpPath[1]}/${tmpPath[2]}`,`${tmpPath[3]}`)
    setDoc(docVoteRef2,{
        name: tmpPath[3],
        status: 'qualified',
    }).then(response => {
        // alert('Vote Success')
        console.log('success')
    })
    .catch(error =>  alert(error.message))


}

const addVote = (itemId, productName,voteCount,path) => {
    const locate = 'จุดที่ 3';
    
    console.log('in add vote', path)
    // const voteScore = collection(db,`เขตจตุจักร/แขวงลาดยาว/point1/จุดที่ 1/partyscore`)
    const docVoteRef = doc(db,path,productName)
    updateDoc(docVoteRef,{
        score: voteCount
    }).then(response => {
        console.log(response)
    })
    .catch(error =>  alert(error.message))
    alert(voteCount)
}

export const ShopContextProvider = (props) => {
//  const { dbar1, dbar2, dbar3 } = useContext(NodeContext);
//  console.log('this is --------------------->',dbar1,dbar2,dbar3)

  const [dbar1, setDbar1] = useState(['เขตจตุจักร'])
  const [dbar2, setDbar2] = useState(['แขวงลาดยาว'])
  const [dbar3, setDbar3] = useState(['จุดที่ 5'])

  var [cartItems, setCartItems] = useState(getDefaultVote(`${dbar1}/${dbar2}/ทุกจุด/${dbar3}/partyscore`));
  const [voteCount, setVoteCount] = useState([]);
  
  useEffect(() => {
    setVoteCount(getDefaultVote(`${dbar1}/${dbar2}/ทุกจุด/${dbar3}/partyscore`));
  }, []);
  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    
    for (const item in cartItems) {
        // console.log('this is offline mode', item)
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === item);
        totalAmount += cartItems[item];
      }
    }
    return totalAmount;
  };


  const addToCart2 = (itemId, productName,path) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] +1 }));

  }
  const removeFromCart2 = (itemId, productName,path) => {
    if (cartItems[itemId] > 0) {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] -1 }));
    }else{
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId]  }));
    }

  }


  const addToCart = (itemId, productName,path) => {
    console.log('this is add',path)
    setVoteCount(getDefaultVote(path))
    // setVoteCount((prev) => ({ ...prev, [itemId]: prev[itemId] }));
    voteCount[itemId] += 1
    // console.log('vote- count', voteCount)
    addVote(itemId, productName, voteCount[itemId],path)
    // console.log([productName])
  };

  const removeFromCart = (itemId, productName,path) => {
    setVoteCount(getDefaultVote(path))
    voteCount[itemId] -= 1
    // console.log('vote-count', voteCount)
    addVote(itemId, productName, voteCount[itemId],path)
    // console.log([productName])
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId]  }));
  };

  const updateCartItemCount = (newAmount, itemId, productName, path) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    // console.log(voteCount)
    // setVoteCount(getDefaultVote())

    
  };
  const checkout = (path) =>{
  
    for (const item in cartItems) {
        console.log('this is offline mode', path)
      if (cartItems[item] > 0) {
        createPost(item,path,cartItems[item])
        
        
      }else{
        createPost(item,path,0)
      }
    }
    alert('vote success')
  }

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    voteCount,
    addToCart2,
    removeFromCart2,
    setDbar1,
    setDbar2,
    setDbar3,
    dbar1,
    dbar2,
    dbar3,
    setCartItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
