import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { HomePage } from "@/pages/HomePage";
import { ImageEditPage } from "@/pages/ImageEditPage";
import { ImageReadPage } from "@/pages/ImageReadPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.IMAGE_READ} element={<ImageReadPage />} />
      <Route path={ROUTES.IMAGE_EDIT} element={<ImageEditPage />} />
    </Routes>
  );
};
