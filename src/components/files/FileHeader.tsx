import React from 'react';
import { UploadButton } from '../common/UploadButton';

interface FileHeaderProps {
  onUpload: () => void;
}

export function FileHeader({ onUpload }: FileHeaderProps) {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          My Files
        </h2>
      </div>
      <div className="mt-4 md:mt-0">
        <UploadButton onClick={onUpload} />
      </div>
    </div>
  );
}