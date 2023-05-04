import React, { useContext, useRef } from 'react'
import '../Popup.css'
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import { ShopContext } from '../context/shop-content';

function Popup(props) {
   const toast = useRef(null);
   const { checkout } = useContext(ShopContext);
   const path = props.bar1 + '/'+ props.bar2 + '/ทุกจุด/' + props.bar3 + '/partyscore'
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have voted', life: 3000 });
        checkout(path);
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have voted', life: 3000 });
    };
    const confirm1 = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are u sure?',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject,  
        });
    };

  return (props.trigger ? (
    // <div className='popup'>
    <div className='popup-inner'>
            <button className='close-btn' onClick={() => props.setTrigger(false)}> close </button>
            {props.children}

        <>
         <Toast ref={toast}/>
         <ConfirmPopup />
          <div className="checkout">
            <Button onClick={confirm1} icon="pi pi-check" label="Confirm" >
            </Button>
          </div>
          </>
    </div>
    // </div>
  ) : ';'
  )
}
export default Popup;