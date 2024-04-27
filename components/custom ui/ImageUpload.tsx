import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (results: any) => {
    onChange(results.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div className="relative w-[200px] h-[200px]">
          
            <div className="absolute top-0 right-0 z-10">
                <Button type="button" onClick={()=> onRemove(url)} size='sm' className="bg-red-600 text-white">
                    <Trash className="h-4 w-4" />
                </Button>
            </div>

            <Image
              src={url}
              alt="category"
              className="object-cover rounded"
              fill
            />  
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="imilctbt" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-gray-500 text-white flex items-center gap-2"
            >
              <ImagePlus className="w-4 h-4" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
