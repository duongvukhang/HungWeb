import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./context/router/Router.jsx";
import { MenuProvider } from "./context/contextProvider/menuContext.jsx";
import { FlyoutProvider } from "./context/contextProvider/FlyoutMenu.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MenuProvider>
        <FlyoutProvider>
          <RouterProvider router={router} />
        </FlyoutProvider>
      </MenuProvider>
    </AuthProvider>
  </StrictMode>
);