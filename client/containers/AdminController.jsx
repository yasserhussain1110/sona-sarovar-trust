import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import AdminPanel from '../components/AdminController/AdminPanel';
// import {BrowserRouter, Route} from 'react-router-dom';
// import BaseContainer from '../components/AdminController/BaseContainer';
// import BasicSideNav from '../components/AdminController/BasicSideNav';
// import ControlPanel from '../components/AdminController/ControlPanel';

// const AdminController = (
//   <div style={{display: 'flex'}}>
//     <BaseContainer style={{background: '#2c3e50', color: '#FFF'}}>
//       <BasicSideNav />
//     </BaseContainer>
//   </div>
// );


// const AdminController = (
//   <BrowserRouter>
//     <main id="admin-panel">
//       <div style={{display: 'flex'}}>
//         <BaseContainer style={{background: '#2c3e50', color: '#FFF'}}>
//           <BasicSideNav match={match}/>
//         </BaseContainer>
//       </div>
//       <Route exact path={`${match.url}`} component={Home}/>
//       <Route path={`${match.url}/about`} component={About}/>
//       <Route path={`${match.url}/projects`} component={Projects}/>
//       <Route path={`${match.url}/activities`} component={Activities}/>
//     </main>
//   </BrowserRouter>
// );

const AdminController = ({userAuth, match}) => {
  return (!userAuth.loggedIn ? <Redirect to="/admin/auth" push/> : <AdminPanel match={match}/>);
};

const mapStateToProps = state => {
  return {
    userAuth: state.userAuth
  }
};

export default connect(mapStateToProps)(AdminController);
