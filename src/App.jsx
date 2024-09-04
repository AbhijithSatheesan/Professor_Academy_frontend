import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import appStore, { persistor } from './utils/appStore';
import Header from './components/Header/Header';
import Footer from './components/Header/Footer';
import ScrollToTop from './components/ScrollTop/ScrollToTop';

// Lazy load components
const Categories = lazy(() => import('./screens/categories/Categories'));
const LoginForm = lazy(() => import('./screens/auth/loginForm'));
const Subcategories = lazy(() => import('./screens/categories/subCategories'));
const CollegeList = lazy(() => import('./screens/colleges/CollegeList'));
const CollegePage = lazy(() => import('./screens/colleges/CollegePage'));
const UserDetails = lazy(() => import('./screens/user/UserDetails'));
const Tester = lazy(() => import('./screens/Tester'));
const Admin = lazy(() => import('./Admin/Admin'));
const UserRegistration = lazy(() => import('./Admin/UserRegistration'));
const AddCollege = lazy(() => import('./Admin/AdminCollege/AddCollege'));
const CategorySubcategoryForm = lazy(() => import('./Admin/CategorySubcategoryForm'));
const AdminEditUsers = lazy(() => import('./Admin/Adminuser/AdminEditUsers'));
const UserLogout = lazy(() => import('./screens/auth/UserLogout'));
const PasswordResetRequest = lazy(() => import('./Passwordreset/PasswordResetRequest'));
const PasswordResetConfirm = lazy(() => import('./Passwordreset/PasswordResetConfirm'));
const SearchComponent = lazy(() => import('./components/Search/SearchComponent'));

const HEADER_HEIGHT = '6rem';
const FOOTER_HEIGHT = '3rem';

const RequireAuth = ({ children }) => {
  const authenticated = useSelector(state => state.user?.authenticated);
  return authenticated === 'True' ? children : <Navigate to="/" />;
};

// Updated NotFound component without auto-redirect
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
        <p className="text-2xl mb-4">Oops! Page not found</p>
        <p className="text-lg mb-8">The page you are looking for doesn't exist or has been removed</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-2 bg-white text-purple-500 rounded-full hover:bg-purple-100 transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

// Updated RequireAdmin component
const RequireAdmin = ({ children }) => {
  const user = useSelector(state => state.user);
  if (user?.authenticated !== 'True' || user?.admission_placed !== 113800) {
    return <NotFound />;
  }
  return children;
};

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <div className="fixed top-0 left-0 right-0 z-50" style={{ height: HEADER_HEIGHT }}>
      <Header />
    </div>
    <div className="flex-grow pt-24">
      {children}
    </div>
    <div className="text-white text-center py-4" style={{ height: FOOTER_HEIGHT }}>
      <Footer />
    </div>
  </div>
);

const App = () => {
  return (
    <Provider store={appStore}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/passwordreset" element={<PasswordResetRequest />} />
              <Route path="/passwordresetconfirm/:uid/:token" element={<PasswordResetConfirm />} />

              {/* Admin routes */}
              <Route
                path="/add-student"
                element={
                  <RequireAdmin>
                    <MainLayout>
                      <UserRegistration />
                    </MainLayout>
                  </RequireAdmin>
                }
              />
              <Route
                path="/add-college"
                element={
                  <RequireAdmin>
                    <MainLayout>
                      <AddCollege />
                    </MainLayout>
                  </RequireAdmin>
                }
              />
              <Route
                path="/addcategories"
                element={
                  <RequireAdmin>
                    <MainLayout>
                      <CategorySubcategoryForm />
                    </MainLayout>
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/edit-user/:id"
                element={
                  <RequireAdmin>
                    <MainLayout>
                      <AdminEditUsers />
                    </MainLayout>
                  </RequireAdmin>
                }
              />
              <Route
                path="/adminishere"
                element={
                  <RequireAdmin>
                    <MainLayout>
                      <Admin />
                    </MainLayout>
                  </RequireAdmin>
                }
              />

              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <Categories headerHeight={HEADER_HEIGHT} footerHeight={FOOTER_HEIGHT} />
                    </MainLayout>
                  </RequireAuth>
                }
              />
              <Route
                path="/t"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <Tester />
                    </MainLayout>
                  </RequireAuth>
                }
              />
              <Route
                path="/subcategories/:categoryId"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <Subcategories />
                    </MainLayout>
                  </RequireAuth>
                }
              />
              <Route
                path="/colleges/:subCategoryId"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <CollegeList />
                    </MainLayout>
                  </RequireAuth>
                }
              />
              <Route
                path="/college/:collegeId"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <CollegePage />
                    </MainLayout>
                  </RequireAuth>
                }
              />
              <Route
                path="/myprofile"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <UserDetails />
                    </MainLayout>
                  </RequireAuth>
                }
              />
              <Route
                path="/search"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <SearchComponent />
                    </MainLayout>
                  </RequireAuth>
                }
              />
              <Route
                path="/logout"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <UserLogout />
                    </MainLayout>
                  </RequireAuth>
                }
              />

              {/* Catch-all route for 404 errors */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;



























// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Provider, useSelector } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import Header from './components/Header/Header';
// import Categories from './screens/categories/Categories';
// import LoginForm from './screens/auth/loginForm';
// import appStore, { persistor } from './utils/appStore';
// import Subcategories from './screens/categories/subCategories';
// import CollegeList from './screens/colleges/CollegeList';
// import CollegePage from './screens/colleges/CollegePage';
// import UserDetails from './screens/user/UserDetails';
// import Tester from './screens/Tester';
// import Admin from './Admin/Admin';
// import UserRegistration from './Admin/UserRegistration';
// import AddCollege from './Admin/AdminCollege/AddCollege';
// import CategorySubcategoryForm from './Admin/CategorySubcategoryForm';
// import AdminEditUsers from './Admin/Adminuser/AdminEditUsers';
// import UserLogout from './screens/auth/UserLogout';
// import PasswordResetRequest from './Passwordreset/PasswordResetRequest';
// import PasswordResetConfirm from './Passwordreset/PasswordResetConfirm';
// import SearchComponent from './components/Search/SearchComponent';
// import ScrollToTop from './components/ScrollTop/ScrollToTop';


// const HEADER_HEIGHT = '6rem';
// const FOOTER_HEIGHT = '3rem';

// const RequireAuth = ({ children }) => {
//   const authenticated = useSelector(state => state.user?.authenticated);
//   return authenticated === 'True' ? children : <Navigate to="/login" />;
// };

// const MainLayout = ({ children }) => (
//   <div className="flex flex-col min-h-screen">
//     <div className="fixed top-0 left-0 right-0 z-50" style={{ height: HEADER_HEIGHT }}>
//       <Header />
//     </div>
//     <div className="flex-grow pt-24">
//       {children}
//     </div>
//     <div className="bg-gray-700 text-white text-center py-4" style={{ height: FOOTER_HEIGHT }}>
//       Footer content here
//     </div>
//   </div>
// );

// const App = () => {
//   return (
//     <Provider store={appStore}>
//       <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
//         <Router>
//           <Routes>
//             <Route path="/login" element={<LoginForm />} />
//             <Route path="/passwordreset" element={<PasswordResetRequest />} />
            
//             <Route path="/passwordresetconfirm/:uid/:token" element={<PasswordResetConfirm />} />
           
            


//             {/* admin */}
//             <Route path="/add-student" element={<UserRegistration />} />
//             <Route path="/add-college" element={<AddCollege />} />
//             <Route path="/addcategories" element={<CategorySubcategoryForm />} />
//             <Route path="/admin/edit-user/:id" element={<AdminEditUsers />} />
            

            
//             <Route
//               path="/"
//               element={
//                 <RequireAuth>
//                   <MainLayout>
//                     <Categories headerHeight={HEADER_HEIGHT} footerHeight={FOOTER_HEIGHT} />
//                   </MainLayout>
//                 </RequireAuth>
//               }
//             />
//             <Route
//               path="/t"
//               element={
//                 <RequireAuth>
//                   <MainLayout>
//                     <Tester />
//                   </MainLayout>
//                 </RequireAuth>
//               }
//             />
//              <Route
//               path="/adminishere"
//               element={
//                 <RequireAuth>
//                   <MainLayout>
//                     <Admin />
//                   </MainLayout>
//                 </RequireAuth>
//               }
//             />
//             <Route
//               path="/subcategories/:categoryId"
//               element={
//                 <RequireAuth>
//                   <MainLayout>
//                     <Subcategories />
//                   </MainLayout>
//                 </RequireAuth>
//               }
//             />
//             <Route
//               path="/colleges/:subCategoryId"
//               element={
//                 <RequireAuth>
//                   <MainLayout>
//                     <CollegeList />
//                   </MainLayout>
//                 </RequireAuth>
//               }
//             />
//             <Route
//               path="/college/:collegeId"
//               element={
//                 <RequireAuth>
//                   <MainLayout>
//                     <CollegePage />
//                   </MainLayout>
//                 </RequireAuth>
//               }
//             />
//             <Route
//               path="/myprofile"
//               element={
//                 <RequireAuth>
//                   <MainLayout>
//                     <UserDetails />
//                   </MainLayout>
//                 </RequireAuth>
//               }
//             />
//              <Route
//               path="/search"
//               element={
//                 <RequireAuth>
//                   <MainLayout>
//                     <SearchComponent />
//                   </MainLayout>
//                 </RequireAuth>
//               }
//             />
//             <Route
//               path="/logout"
//               element={
//                 <RequireAuth>
//                   <MainLayout>
//                     <UserLogout />
//                   </MainLayout>
//                 </RequireAuth>
//               }
//             />
//           </Routes>
//         </Router>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;



