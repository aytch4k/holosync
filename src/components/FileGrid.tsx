import React from 'react';
import { FileList } from './files/FileList';
import { FileHeader } from './files/FileHeader';
import { useUpload } from '../context/UploadContext';

export function FileGrid() {
  const { setShowUpload } = useUpload();

  return (
    <div className="space-y-6">
      <FileHeader onUpload={() => setShowUpload(true)} />
      <FileList />
    </div>
  );
}