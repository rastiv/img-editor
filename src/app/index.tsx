// import { Toaster } from "@/shared/ui";
import { RouterProvider } from "./providers";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    // <StoreProvider>
    <RouterProvider>
      <AppRouter />
      {/* <Toaster position="bottom-center" visibleToasts={5} /> */}
    </RouterProvider>
    // </StoreProvider>
  );
}

export default App;
