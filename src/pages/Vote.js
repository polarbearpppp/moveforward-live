
import { PRODUCTS } from "../products";
import { Votecontent } from './Votecontent';
import React, { useState, useEffect, useContext } from "react";
import { TreeSelect } from 'primereact/treeselect';
import { NodeService } from "../service/NodeService";
import "../vote.css";
import { ShopContext } from "../context/shop-content";


const Vote = () => {
  const [nodes, setNodes] = useState(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [selectedNodeKey2, setSelectedNodeKey2] = useState(null)
    const [selectedNodeKey3, setSelectedNodeKey3] = useState(null)
    const {setDbar1, setDbar2, setDbar3,dbar1,dbar2,dbar3} = useContext(ShopContext)
    // updateDbars(selectedNodeKey , selectedNodeKey2, selectedNodeKey3);
    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []);
    // console.log('Thiss is your selected district =============>','1',dbar1,'2',dbar1,'3',dbar1)

    setDbar1('เขตจตุจักร');
    setDbar2('แขวงลาดยาว');
    setDbar3('จุดที่ 6'); 

  return (
    <div className="shopTitle">
    <h1> Vote Real Time</h1>
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
    <div className="shop grid">

      </div>

      <div className="grid">
        {PRODUCTS.map((product) => (
          <Votecontent data={product} bar1={dbar1}  bar2={dbar2}  bar3={dbar3} />
        ))}
      </div>
    </div>
  );
};

export default Vote;


// const locate = 'จุดที่ 3';
// // const voteScore = collection(db,`เขตจตุจักร/แขวงลาดยาว/point1/จุดที่ 1/partyscore`)
// const docVoteRef = doc(db,`เขตจตุจักร/แขวงลาดยาว/${locate}/${locate}/partyscore`,productName)