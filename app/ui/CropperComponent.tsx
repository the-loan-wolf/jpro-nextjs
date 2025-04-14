// CropperComponent.tsx
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import getCroppedImg from '../utils/cropImageHelper';

const CropperComponent = ({ imageSrc, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropDone(croppedImage);
  };

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: 300 }}>
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
      <div style={{ marginTop: 16 }}>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, zoom) => setZoom(zoom as number)}
        />
        <Button onClick={handleCrop} variant="contained" color="primary">
          Crop & Save
        </Button>
      </div>
    </div>
  );
};

export default CropperComponent;
