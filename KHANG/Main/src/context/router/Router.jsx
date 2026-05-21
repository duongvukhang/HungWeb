import { createBrowserRouter } from "react-router-dom";
import HomePageComponent from "../../Page/HomePage/HomePage.jsx";
import NotFoundPage from "../../Page/notFoundPage/notFoundPage.jsx";
import MainLayout from "../../mainLayout/MainLayout.jsx";
import Contact from "../../Page/ContactPage/ContactPage.jsx";
import ProductPage from "../../Page/ProductPage/ProductPage.jsx";
import CompanyProfile from "../../Page/CompanyProfilePage/CompanyProfile.jsx";
import BoilerServicesPage from "../../Page/ServicesPage/ServicesPage.jsx";
import NewsPage from "../../Page/NewsPage/NewsPage.jsx";
import AdminProductPage from "../../Page/AdminProductPage/AdminProductPage.jsx"
import ProductDetailPage from "../../Page/ProductPage/ProductDetailPage.jsx";



export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePageComponent /> },
      { path: "/contactPage", element: <Contact /> },
      { path: "/productsPage", element: <ProductPage /> },
      { path: "/companyProfilePage", element: <CompanyProfile /> },
      { path: "/servicesPage", element: <BoilerServicesPage /> },
      { path: "/newsPage", element: <NewsPage /> },
      { path: "/adminProducts",element: <AdminProductPage />,},
      { path: "/productsPage/:id", element: <ProductDetailPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);