import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/Header/Header';
import Categories from './screens/categories/Categories';
import LoginForm from './screens/auth/loginForm';
import appStore, { persistor } from './utils/appStore';
import Subcategories from './screens/categories/subCategories';
import CollegeList from './screens/colleges/CollegeList';
import CollegePage from './screens/colleges/CollegePage';
import UserDetails from './screens/auth/UserDetails';

const HEADER_HEIGHT = '6rem'; // Set the header height to 6rem (96px)
const FOOTER_HEIGHT = 48; // Replace with the actual height of your Footer component

const RequireAuth = ({ children }) => {
  const authenticated = useSelector(state => state.user?.authenticated);
  return authenticated === 'True' ? children : <Navigate to="/login" />;
};

const MainLayout = ({ children }) => (
  <>
    <div className="fixed top-0 left-0 right-0 z-50" style={{ height: HEADER_HEIGHT }}>
      <Header />
    </div>
    <div className="relative z-10 pt-[6rem]"> {/* Add relative positioning and z-index */}
      {children}
    </div>
    <div className="bg-white text-white text-center py-4" style={{ height: FOOTER_HEIGHT }}>
      Footer content here
    </div>
  </>
);

const App = () => {
  return (
    <Provider store={appStore}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
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
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;






// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import Header from './components/Header/Header';
// import Categories from './screens/categories/Categories';
// import LoginForm from './screens/auth/loginForm';
// import appStore, { persistor } from './utils/appStore';
// import Subcategories from './screens/categories/subCategories';
// import CollegeList from './screens/colleges/CollegeList';
// import CollegePage from './screens/colleges/CollegePage';

// const HEADER_HEIGHT = '6rem'; // Set the header height to 6rem (96px)
// const FOOTER_HEIGHT = 48; // Replace with the actual height of your Footer component

// const App = () => {
//   return (
//     <Provider store={appStore}>
//       <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
//         <Router>
//           <div className="min-h-screen flex flex-col">
//             <div className="fixed top-0 left-0 right-0 z-50" style={{ height: HEADER_HEIGHT }}>
//               <Header />
//             </div>
//             <div className="relative z-10 pt-[6rem]"> {/* Add relative positioning and z-index */}
//               <Routes>
//                 <Route path="/categories" element={<Categories headerHeight={HEADER_HEIGHT} footerHeight={FOOTER_HEIGHT} />} />
//                 <Route path="/" element={<LoginForm />} />
//                 <Route path="/subcategories/:categoryId" element={<Subcategories />} />
//                 <Route path="/colleges/:subCategoryId" element={<CollegeList />} />
//                 <Route path="/college/:collegeId" element={<CollegePage />} />
//               </Routes>
//             </div>
//             <div className="bg-white text-white text-center py-4" style={{ height: FOOTER_HEIGHT }}>
//               Footer content here
//             </div>
//           </div>
//         </Router>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;


