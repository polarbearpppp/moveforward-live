import './App.css';
import './datatable.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Overview, { CannotAccess, UsersReport } from './pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import Message, { MessagesOne } from './pages/Message';
import Support from './pages/Support';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Vote from './pages/Vote';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
// Define roles and permissions
const roles = {
  admin: ['read', 'write', 'update', 'delete'],
  user: ['read', 'write'],
  guest: ['read'],
};

function App() {
  const {currentUser} = useContext(AuthContext);
  const [userRole, setUserRole] = useState(currentUser ? currentUser.role : 'guest');
  let permission = 'user'

  // console.log('ID1',currentUser.uid)
  const RequireAuth = ({ children }) => {
    return currentUser ? (
      children
    ) : (
      <Redirect to="/support" />
    );
  };

  const [data, setData] = useState([]);
  useEffect (() => {
    let list = []
    const fetechData = async () =>{
      try {
      const querySnapshot = await getDocs(collection(db, "userAccess"),currentUser.pid);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data())
        if( doc.id === currentUser.uid){
          permission = doc.data().role;
        }
        list.push(doc.data())
        console.log('inUsesss',permission)
      });
      setData(list)
      }catch (err){
        console.log(err)
      }
    };
    fetechData();
  },[permission])
  
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

  return (
    <Router>
      <Switch>
        <Route path="/support" exact component={Support} />
        <RequireAuth>
          <Sidebar />
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
             <Route path="/vote" exact component={CannotAccess} />
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
            </RequirePermission>
          )}
        </RequireAuth>
      </Switch>
    </Router>
  );
}

export default App;
