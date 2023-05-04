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
import { db } from '../firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

const Message = () => {
    const [products, setProducts] = useState([]);
    const [product1, setproduct1] = useState([]);

    

    const rowClass = (data) => {
      return {
      };
    };
      
    const representativeBodyTemplate = (rowData) => {
      if (!rowData.representative) {
        return null;
      }
      return (
        <div className="flex align-items-center gap-2">
          <img
            alt={rowData.representative.name}
            src={`https://primefaces.org/cdn/primereact/images/avatar/${rowData.representative.image}`}
            width={32}
          />
          <span>{rowData.representative.name}</span>
        </div>
      );
    };
  
    const stockBodyTemplate = (rowData) => {
      const stockClassName = classNames(
        'border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm',
        {
          'bg-red-100 text-red-900': rowData.score === 0,
          'bg-blue-100 text-blue-900': rowData.score > 0 && rowData.score < 10,
          'bg-teal-100 text-teal-900': rowData.score > 9,
        }
      );
  
      return <div className={stockClassName} >{rowData.score}</div>;
    };



    const balanceFilterTemplate = (options) => {
      console.log(options)
      return (
        <InputNumber
          value={options.value}
          onChange={(e) => options.filterCallback(e.value, options.index)}
        />
      );
    };

    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.scorepercen} showValue={false} style={{ height: '10px',}} color='orange'></ProgressBar>;
    };

    const activityFilterTemplate = (options) => {
        return (
            <>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3 bg-color-red" ></Slider>
                <div className="flex align-items-center justify-content-between px-2 ">
                    <span >{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </>
        );
    };
    const [rowClick, setRowClick] = useState(true);

    useEffect(() => {
        PointService.getTotalScore().then((data) => setproduct1(data));
      }, []);
  
    // console.log(selectedProduct.value.id);
  const [scores, setScores] = useState([]);
  // function getVoteData() {
  //   const voteColRef = collection(db, 'เขตจตุจักร/แขวงลาดยาว/ทุกจุด');
  //   const product2 = [];
  
  //   getDocs(voteColRef)
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         const docData = doc.data();
  //         product2.push(docData);
  //       });
  //       console.log('this is product 2====>', product2)
  //       console.log('this is product 1====>', product1)
  //     })
  //     .catch((error) => {
  //       console.log('Error getting documents: ', error);
  //     });
  // }
  // getVoteData()

  // console.log('this is test display',scores[0])
    // console.log(typeof(products))
    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
      }, []);
    return (
      <div className=" flex justify-content-center ">
      <div className='card flex flex-column' style={{ overflowX: 'auto',width: '110%'}}>
      <p className='htext'>คะแนนรวมเขตเลือกตั้งหลักสี่</p>
      <DataTable
        // value={Object.values(selectedProduct)}
        value = {product1}
        rowClassName={rowClass}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          field="representative.name"
          header="Representative"
          style={{ minWidth: '10rem' }} 
          body={representativeBodyTemplate}
        />
        {/* <Column field="code" header="Code"></Column> */}
        <Column field="name" header="Name"></Column>
        {/* <Column field="category" header="Category"></Column> */}
        {/* <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          style={{ minWidth: '100px' }}
        ></Column> */}
        <Column
          field="score"
          header="Score"
          body={stockBodyTemplate}
          sortable
          dataType="numeric"
          style={{ minWidth: '8rem' }}
          filter
          filterElement={balanceFilterTemplate}
          // body={balanceBodyTemplate}
        ></Column>
         <Column 
         field="scorepercen" 
         header="Score" 
         sortable 
         showFilterMatchModes={false} 
         style={{ minWidth: '10rem' }} 
         body={activityBodyTemplate} 
         filterElement={activityFilterTemplate} />
      </DataTable>
      </div>
      </div>
    );
};

export default Message;

export const MessagesOne = () => {
    
    const [products, setProducts] = useState([]);
    const [product1, setproduct1] = useState([]);
    const [product2, setproduct2] = useState([]);

    useEffect(() => {
        PointService.getScore().then((data) => setproduct1(data));
      }, []);
  
    const rowClass = (data) => {
      return {
      };
    };

    const statusBodyTemplate = (rowData) => {
      return (
        <Tag value={getSeverity(rowData.status)} severity={getSeverity(rowData.status)} icon="pi pi-exclamation-triangle" />
      );
    };
    const getSeverity = (status) => {
        switch (status) {
          case 'unqualified':
            return 'danger';
        
          case 'qualified':
            return 'success';
        
          case 'new':
            return 'info';
        
          case 'negotiation':
            return 'warning';
        
          case 'renewal':
            return null;
        
          default:
            return null;
        }
      };
      
    const representativeBodyTemplate = (rowData) => {
      if (!rowData.representative) {
        return null;
      }
      return (
        <div className="flex align-items-center gap-2">
          <img
            alt={rowData.representative.name}
            src={`https://primefaces.org/cdn/primereact/images/avatar/${rowData.representative.image}`}
            width={32}
          />
          <span>{rowData.representative.name}</span>
        </div>
      );
    };
  
    const stockBodyTemplate = (rowData) => {
      const stockClassName = classNames(
        'border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm',
        {
          'bg-red-100 text-red-900': rowData.score === 0,
          'bg-blue-100 text-blue-900': rowData.score > 0 && rowData.score < 10,
          'bg-teal-100 text-teal-900': rowData.score > 9,
        }
      );
  
      return <div className={stockClassName} >{rowData.score}</div>;
    };



    const balanceFilterTemplate = (options) => {
      console.log(options)
      return (
        <InputNumber
          value={options.value}
          onChange={(e) => options.filterCallback(e.value, options.index)}
        />
      );
    };

    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.scorepercen} showValue={false} style={{ height: '10px',}} color='orange'></ProgressBar>;
    };

    const activityFilterTemplate = (options) => {
        return (
            <>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3 bg-color-red" ></Slider>
                <div className="flex align-items-center justify-content-between px-2 ">
                    <span >{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </>
        );
    };
    const [rowClick, setRowClick] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState({
        value : 
                {partyscore: null
             }
        });
    console.log(selectedProduct.value.id);


    // console.log(typeof(products))
    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
      }, []);

      useEffect(() => {
        const voteColRef = collection(db, 'เขตจตุจักร/แขวงลาดยาว/ทุกจุด');
        
        const unsubscribe = onSnapshot(voteColRef, async (querySnapshot) => {
          const product2 = [];
          const keyp2 = [];
        
          querySnapshot.forEach((doc) => {
            const docData = doc.data();
            docData['id'] = docData.name;
            product2.push(docData);
            keyp2.push(docData.name);
          });
        
          let index = 0;
          for (const element of keyp2) {
            let tmpSumScore = 0;
            let newParty = [];
            const partyScore = []
            const tmpREf = collection(db, `เขตจตุจักร/แขวงลาดยาว/ทุกจุด/${element}/partyscore`);
            const partySnapshot = await getDocs(tmpREf);
            partySnapshot.forEach((doc) => {
              const docData = doc.data();
              const scoreObj = {
                score: docData.score,
                name: docData.name,
                image: docData.image
              };
              tmpSumScore += docData.score;
              partyScore.push(scoreObj);
            });
        
            for (const dict of partyScore) {
              let tmp = {}
              tmp = dict
              tmp['scorepercen'] = Math.floor((tmp.score / tmpSumScore) * 100)
              newParty.push(tmp)
            }
            product2[index]['score'] = tmpSumScore;
            product2[index]['partyscore'] = newParty;
            index += 1;
          }
        
          setproduct2(product2);
        });
        
        return () => unsubscribe();
      }, []);
      
      
      console.log('this is totalScore ====>', product2);
    return (
        <div className="flex-container" >

         <div className='card flex flex-column' style={{ overflowX: 'auto',width: '110%'}}>
         <p className='htext'>คะแนนเขตเลือกตั้งหลักสี่ แขวงทุ่งสองห้อง</p>
         {/* <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} /> */}
      <DataTable
        selectionMode={rowClick ? null : 'radiobutton'} selection={selectedProduct} 
        onSelectionChange={(e) => 
            setSelectedProduct(e)
        }
        dataKey="id"
        value={product2}
        paginator rows={10} rowsPerPageOptions={[5, 10]}   
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"    
        rowClassName={rowClass}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column selectionMode="single" headerStyle={{ width: '2rem' }}></Column>
        {/* <Column
          field="representative.name"
         
          body={representativeBodyTemplate}
        /> */}
        {/* <Column field="code" header="Code"></Column> */}
        <Column field="name" header="Name"
        style={{ minWidth: '2rem' }} 
        sortable
        ></Column>
        {/* <Column field="category" header="Category"></Column> */}
        
        <Column
            // className='htext'
          field="status"
          header="status"
          body={statusBodyTemplate}
          style={{ minWidth: '1rem' }}
          sortable
        ></Column>
        <Column
          field="score"
          body={stockBodyTemplate}
          sortable
          dataType="numeric"
          style={{ minWidth: '4rem' }}
          filter
          header="Score"
          filterElement={balanceFilterTemplate}
          // body={balanceBodyTemplate}
        ></Column>
 
      </DataTable>
      </div>


        {/* ==================================table 2 ===================================== */}


      <Divider layout="vertical" />
      <div className='card flex flex-column' style={{ overflowX: 'auto',width: '110%'}}>
      <p className='htext'>คะแนน {selectedProduct.value.id}</p>
      <DataTable
        // value={Object.values(selectedProduct)}
        value = {selectedProduct.value.partyscore}
        rowClassName={rowClass}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          field="representative.name"
          header="Representative"
          style={{ minWidth: '1rem' }} 
          body={representativeBodyTemplate}
        />
        {/* <Column field="code" header="Code"></Column> */}
        <Column field="name" header="Name" style={{ minWidth: '2rem' }} ></Column>
        {/* <Column field="category" header="Category"></Column> */}
        {/* <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          style={{ minWidth: '100px' }}
        ></Column> */}
        <Column
          field="score"
          header="Score"
          body={stockBodyTemplate}
          sortable
          dataType="numeric"
          
          style={{ minWidth: '5rem' }}
          filter
          filterElement={balanceFilterTemplate}
          // body={balanceBodyTemplate}
        ></Column>
         <Column 
         field="scorepercen" 
         header="Score" 
         sortable 
         showFilterMatchModes={false} 
         style={{ minWidth: '10rem' }} 
         body={activityBodyTemplate} 
         filterElement={activityFilterTemplate} />
      </DataTable>
      </div>
      </div>
    );
  };
  



