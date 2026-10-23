

import { useState } from 'react';
import "../../stylings/shipments/PackagePhotos.css"

const MAX_PHOTOS = 10;
const MAX_SIZE = 5 * 1024 * 1024;

const PackagePhotos = function({ photos, setPhotos }){
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = function(fileList){
    const files = Array.from(fileList);
    if (!files.length) return;

    const imageFiles = files.filter(function(file){
      return file.type === 'image/png' || file.type === 'image/jpeg';
    });
    const sizedFiles = imageFiles.filter(function(file){
      return file.size <= MAX_SIZE;
    });

    let message = '';
    if (imageFiles.length < files.length) message = 'Only JPG and PNG images are allowed';
    else if (sizedFiles.length < imageFiles.length) message = 'Each photo must be 5MB or less';

    const newPhotos = sizedFiles.map(function(file){
      return { id: URL.createObjectURL(file), file: file };
    });

    const room = Math.max(MAX_PHOTOS - photos.length, 0);
    if (newPhotos.length > room) {
      message = 'You can upload up to 10 photos';
      newPhotos.slice(room).forEach(function(photo){ URL.revokeObjectURL(photo.id); });
    }

    setError(message);
    setPhotos(function(prev){
      return [...prev, ...newPhotos.slice(0, room)];
    });
  };

  const handleFileChange = function(e){
    addFiles(e.target.files);
    e.target.value = null;
  };

  const handleDragOver = function(e){
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = function(){
    setIsDragging(false);
  };

  const handleDrop = function(e){
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removePhoto = function(idToRemove){
    URL.revokeObjectURL(idToRemove);
    setError('');
    setPhotos(function(prev){
      return prev.filter(function(photo){ return photo.id !== idToRemove; });
    });
  };

  return (
    <div className="package-photos-container">
      <p className="upload-label-text">
        Package Photos <span>(optional)</span>
      </p>

      <input
        type="file"
        id="photo-upload-input"
        style={{ display: 'none' }}
        accept="image/png, image/jpeg"
        multiple
        onChange={handleFileChange}
      />

      <div className="photos-row">
        {photos.length < MAX_PHOTOS && (
          <label
            htmlFor="photo-upload-input"
            className={`dropzone-box ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-icon">↑</div>
            <div className="upload-main-text">
              <span className="text-mobile">Tap to upload or add photos</span>
              <span className="text-wide">Click to upload or drag and drop</span>
            </div>
            <div className="upload-sub-text">JPG, PNG (Max 5MB each)</div>
          </label>
        )}

        {photos.length > 0 && (
          <div className="photos-grid">
            {photos.map(function(photo){
              return (
                <div className="photo-thumbnail-card" key={photo.id}>
                  <img src={photo.id} alt="Package preview" />
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={function(){ removePhoto(photo.id); }}
                    aria-label="Remove photo"
                  >
                    ×
                  </button>
                </div>
              );
            })}

            {photos.length < MAX_PHOTOS && (
              <label htmlFor="photo-upload-input" className="add-more-card">
                <span className="plus-icon">+</span>
              </label>
            )}
          </div>
        )}
      </div>

      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

export default PackagePhotos;