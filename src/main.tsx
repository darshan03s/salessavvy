import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import "@/index.css";
import { ThemeProvider } from "@/features/theme";
import { Toaster } from "./components/ui/sonner";
import CartContextProvider from "./context/CartContext";
import UserContextProvider from "./context/UserContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <UserContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </UserContextProvider>
      <Toaster />
    </ThemeProvider>
  </BrowserRouter>
);
