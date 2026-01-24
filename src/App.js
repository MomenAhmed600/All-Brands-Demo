import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CustomNavbar from "./components/customNavbar";
import Footer from "./components/footer";
import { UserProvider } from "./context/UserContext";
import { lazy, Suspense } from "react";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { SyncLoader } from "react-spinners";

const MainContent = lazy(() => import("./components/mainContent"));
const DetailsPage = lazy(() => import("./components/DetailsPage"));
const CreateAccount = lazy(() => import("./pages/CreateAcountPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <SearchProvider>
            <CartProvider>
              <CustomNavbar />

              <Suspense
                fallback={
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "60vh" }}
                  >
                    <SyncLoader color="#000000" size={15} margin={5} />
                  </div>
                }
              >
                <Routes>
                  <Route path="/create-account" element={<CreateAccount />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/profile/:userId" element={<ProfilePage />} />
                  <Route path="/" element={<MainContent />} />
                  <Route path="/carts" element={<CartPage />} />
                  <Route path="/products/:gender?" element={<ProductsPage />} />
                  <Route path="/details-page/:id" element={<DetailsPage />} />
                </Routes>
              </Suspense>

              <Footer />
            </CartProvider>
          </SearchProvider>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
