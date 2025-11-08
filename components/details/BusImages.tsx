
import React, { useState } from 'react';

interface BusImagesProps {
  photos: string[];
}

export const BusImages: React.FC<BusImagesProps> = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState(photos[0]);

  if (!photos || photos.length === 0) {
    return <div className="text-center p-8 text-gray-500">No images available for this bus.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img src={selectedImage} alt="Selected bus view" className="w-full h-96 object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {photos.map((photo, index) => (
          <button key={index} onClick={() => setSelectedImage(photo)} className={`rounded-lg overflow-hidden border-2 transition ${selectedImage === photo ? 'border-brand-primary' : 'border-transparent hover:border-brand-primary/50'}`}>
            <img src={photo} alt={`Bus view ${index + 1}`} className="w-full h-24 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
