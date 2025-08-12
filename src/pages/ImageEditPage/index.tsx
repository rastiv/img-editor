import { useNavigate, useParams } from "react-router-dom";
import { ImageEditor } from "@/features/ImageEditor";
import { imagesData } from "@/app/entries/image";

export const ImageEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const image = imagesData.find((img) => img.id === id);

  if (!image) {
    return <div>Image not found</div>;
  }

  const handleSave = (base64: string, fileName: string) => {
    // Handle save logic here
    // ...
    console.log(base64, fileName);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <ImageEditor image={image} onSave={handleSave} onBack={handleCancel} />
  );
};
