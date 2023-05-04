import './App.css';
import './datatable.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Overview, { CannotAccess, UsersReport } from './pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree,TestPage } from './pages/Reports';
import Message, { MessagesOne } from './pages/Message';
import Support from './pages/Support';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Vote from './pages/Vote';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { ShopContextProvider } from './context/shop-content';
import VoteOffline from './pages/voteOffline';
// Define roles and permissions
const roles = {
  admin: ['read', 'write', 'update', 'delete'],
  user: ['read', 'write'],
  guest: ['read'],
};

export const NodeContext = createContext({
  dbar1: 'เขตจตุจักร',
  dbar2: 'แขวงลาดยาว',
  dbar3: 'จุดที่ 5'
});

function App() {
  const {currentUser} = useContext(AuthContext);
  // const [userRole, setUserRole] = useState(currentUser ? currentUser.role : 'guest');
  let permission = 'admin'

  // console.log('ID1',currentUser.uid)
  const RequireAuth = ({ children }) => {
    return currentUser ? (
      children
    ) : (
      <Redirect to="/support" />
    );
  };

  const [data, setData] = useState([]);
  // useEffect (() => {
  //   let list = []
  //   const fetechData = async () =>{
  //     try {
  //     const querySnapshot = await getDocs(collection(db, "userAccess"),currentUser.pid);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id, " => ", doc.data())
  //       if( doc.id === currentUser.uid){
  //         permission = doc.data().role;
  //       }
  //       list.push(doc.data())
  //       console.log('inUsesss',permission)
  //     });
  //     setData(list)
  //     }catch (err){
  //       console.log(err)
  //     }
  //   };
  //   fetechData();
  // },[permission])
  
  // data.forEach((e)=>{
  //   // console.log('ID2',currentUser.pid)
  //   if(e.id === currentUser.uid){
  //     console.log(e.role)
  //     permission = e.role
  //   }
  // })
  

  const RequirePermission = ({ role, children }) => {
    // Check if the user has the required permission
    if (role === 'admin') {
      return <>
      {children}
      <Redirect to="/overview" />
      </>
    }else if (role === 'user'){
      return <>
      {children}
      <Redirect to="/vote" />
      </>
    }
  };

  // const [dbar1, setDbar1] = useState('เขตจตุจักร');
  // const [dbar2, setDbar2] = useState('แขวงลาดยาว');
  // const [dbar3, setDbar3] = useState('จุดที่ 5');

  // const updateDbars = (newDbar1, newDbar2, newDbar3) => {
  //   setDbar1(newDbar1);
  //   setDbar2(newDbar2);
  //   setDbar3(newDbar3);
  // };

  return (
    <Router>
      <Switch>
        <Route path="/support" exact component={Support} />
        <RequireAuth>
          <Sidebar />
          
          <ShopContextProvider>
          {/* <NodeContext.Provider value={{ dbar1, dbar2, dbar3, updateDbars}}> */}
          {permission === 'admin' && (
            <RequirePermission role={permission}>
             <Route path="/overview" exact component={Overview} />
             <Route path="/overview/users" exact component={UsersReport} />
             <Route path="/reports" exact component={Reports} />
             <Route path="/reports/reports1" exact component={ReportsOne} />
             <Route path="/reports/reports2" exact component={ReportsTwo} />
             <Route path="/reports/reports3" exact component={ReportsThree} />
             <Route path="/messages" exact component={Message} />
             <Route path="/messages/message1" exact component={MessagesOne} />
             <Route path="/vote" exact component={Vote} />
             <Route path="/voteOffline" exact component={VoteOffline} />
             <Route path="/testpage" exact component={TestPage} />
            </RequirePermission>
            
          )}
          {permission === 'user' && (
             <RequirePermission role={permission}>
             <Route path="/overview" exact component={CannotAccess} />
             <Route path="/overview/users" exact component={CannotAccess} />
             <Route path="/reports" exact component={CannotAccess} />
             <Route path="/reports/reports1" exact component={CannotAccess} />
             <Route path="/reports/reports2" exact component={CannotAccess} />
             <Route path="/reports/reports3" exact component={CannotAccess} />
             <Route path="/messages" exact component={CannotAccess} />
             <Route path="/messages/message1" exact component={CannotAccess} />
             <Route path="/vote" exact component={Vote} />
             <Route path="/voteOffline" exact component={VoteOffline} />
            </RequirePermission>
          )}
          {/* </NodeContext.Provider> */}
          </ShopContextProvider>
          
        </RequireAuth>
      </Switch>
    </Router>
  );
}

export default App;
