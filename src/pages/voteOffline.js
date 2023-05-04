import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/shop-content";
import { PRODUCTS } from "../products";
import { PartyList } from "./partylist";
// import { useNavigate } from "react-router-dom";
import '../voteoffline.css'
import '../vote.css'
import { TreeSelect } from "primereact/treeselect";
import { NodeService } from "../service/NodeService";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import '../Popup.css'
import Popup from "../pages/Popup"


const VoteOffline = () => {
    const { cartItems, getTotalCartAmount, checkout, setDbar1, setDbar2, setDbar3,  dbar1, dbar2, dbar3, } = useContext(ShopContext);
    const [nodes, setNodes] = useState(null);
    let [selectedNodeKey, setSelectedNodeKey] = useState(null);
    let [selectedNodeKey2, setSelectedNodeKey2] = useState(null)
    let [selectedNodeKey3, setSelectedNodeKey3] = useState(null)
    const totalAmount = getTotalCartAmount();
    
    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []);
    const [isOpen, setIsOpen] = useState(false);


    const toast = useRef(null);


    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have voted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have voted', life: 3000 });
    };

    const message = Object.keys(cartItems)
    .map((key) => `${key}: ${cartItems[key]}`)
    .join('\n');
    
    // console.log('THIS is message ====>', message)
    const confirm1 = (event) => {
        
        confirmPopup({
            target: event.currentTarget,
            message: 'Are u sure?',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject,  
        });
    };


    setDbar1('เขตจตุจักร');
    setDbar2('แขวงลาดยาว');
    setDbar3('จุดที่ 6'); 

    
    return (
        <div >
        <h1  className="shopTitle">Vote Offline</h1>
        <div className="grid2 padtop padbot">
    <div className="flex justify-content-front">
         <div className="padright padleft "> <p >เขต </p> </div>
            <TreeSelect value={selectedNodeKey} onChange={(e) => setSelectedNodeKey(e.value)} options={nodes} 
                filter className="md:w-20rem w-full"placeholder="Select Item" ></TreeSelect>
    </div>
    <div className="flex justify-content-front">
         <div className="padright padleft"><p>แขวง</p></div> 
            <TreeSelect value={selectedNodeKey2} onChange={(e) => setSelectedNodeKey2(e.value)} options={nodes} 
                filter className="md:w-20rem w-full" placeholder="Select Item"></TreeSelect>
    </div>
    <div className="flex justify-content-front">
         <div className="padright padleft">  <p>จุดที่</p></div>
            <TreeSelect value={selectedNodeKey3} onChange={(e) => setSelectedNodeKey3(e.value)} options={nodes} 
                filter className="md:w-20rem w-full" placeholder="Select Item"></TreeSelect>
    </div>
    </div>
      <div className="cart">
      </div>
        <div className="cart" >
          {PRODUCTS.map((product) => {
            // if (cartItems[product.id] !== 0) {
            //   return <PartyList data={product} />;
            // }
            return <PartyList data={product} bar1={dbar1}  bar2={dbar2}  bar3={dbar3} />
          })}
        </div>
  
        {totalAmount > 0 ? (
        <>
        <button className="checkout"onClick={() => setIsOpen(true)}>
        Open Pop-up
        </button>
        {isOpen && (
       <Popup trigger={isOpen} setTrigger={setIsOpen}  bar1={dbar1}  bar2={dbar2}  bar3={dbar3}>
       <h3> Summarize </h3>
       {Object.keys(cartItems).map((key) => (
         <div className="flex-row">
           <p>
             {key}: {cartItems[key]}
           </p>
         </div>
       ))}
     </Popup>
      )}
        </>
     ) : (
    <h1>You didn't change anything</h1>
  )}
      </div>
    );
  };

export default VoteOffline;

