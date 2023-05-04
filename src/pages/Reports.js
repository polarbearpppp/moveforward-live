import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService , PointService} from '../service/ProductService';
import { Tag } from 'primereact/tag';
import { InputNumber } from 'primereact/inputnumber'
import '../datatable.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';   
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel';
import { Splitter } from 'primereact/splitter';
import { ProgressBar } from 'primereact/progressbar';
import { Slider } from 'primereact/slider';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { VoteService } from '../service/VoteService';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";




export const Reports = () => {
  return (
    <div className='reports'>
      <h1>Reports</h1>
    </div>
  );
};

export const ReportsOne = () => {
  return (
    <div className='reports'>
      <h1>Reports/reports1</h1>
    </div>
  );
};

export const ReportsTwo = () => {
  return (
    <div className='reports'>
      <h1>Reports/reports2</h1>
    </div>
  );
};

export const ReportsThree = () => {
  return (
    <div className='reports'>
      <h1>Reports/reports3</h1>
    </div>
  );
};

export const TestPage = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getVoteData()
  }, [])
  
  useEffect(() => {
    console.log(scores)
  }, [scores])
  

  function getVoteData() {
    const voteColRef = collection(db,'เขตจตุจักร/แขวงลาดยาว/จุดที่ 1/จุดที่ 1/partyscore')
    // const getSubColRef = collection(voteColRef,'')
    getDocs(voteColRef)
    .then(  response => {
      const vscore = response.docs.map(doc => ({
      data: doc.data(),
      id:doc.id
      }))
      setScores(vscore)
    })
    .catch(error => console.log(error))
  }



  return (
    <div className=''>
      <h1>Testpage</h1>
      <ul>
      {scores.map(e => (
      <li key={e.id}> {e.data.name} : {e.data.score}</li>
      ))}
      </ul>
    </div>
  );
}