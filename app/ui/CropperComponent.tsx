// CropperComponent.tsx
import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import getCroppedImg from "../utils/cropImageHelper";

const CropperComponent = ({
  imageSrc,
  onCropDone,
}: {
  imageSrc: string;
  onCropDone: (croppedFile: File) => void;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    const croppedImage: File = await getCroppedImg(
      imageSrc,
      croppedAreaPixels!
    );
    onCropDone(croppedImage);
  };

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, }}>
      <div >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: "50vw", textAlign: "center" }}>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, zoom) => setZoom(zoom as number)}
          className="bottom-5"
        />
        <Button onClick={handleCrop} variant="contained" color="primary">
          Crop
        </Button>
      </div>
    </div>
  );
};

export default CropperComponent;
