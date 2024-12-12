import React from 'react';
import { FileCard } from './FileCard';
import { useUpload } from '../../context/UploadContext';

export function FileList() {
  const { fileList } = useUpload();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {fileList.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}