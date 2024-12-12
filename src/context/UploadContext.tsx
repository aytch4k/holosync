import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { FileMetadata, EncryptionTier } from '../types/file';
import { mockFiles } from '../data/mockFiles';

interface UploadContextType {
  showUpload: boolean;
  setShowUpload: (show: boolean) => void;
  selectedFile: FileMetadata | null;
  setSelectedFile: (file: FileMetadata | null) => void;
  showVersions: boolean;
  setShowVersions: (show: boolean) => void;
  showSecurity: boolean;
  setShowSecurity: (show: boolean) => void;
  handleFileUpload: (files: File[], encryptionTier: EncryptionTier) => void;
  fileList: FileMetadata[];
  handleVersionRestore: (fileId: string, versionId: string) => void;
  handleVersionDownload: (fileId: string, versionId: string) => void;
  updateFileEncryption: (fileId: string, newTier: EncryptionTier) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileMetadata | null>(null);
  const [showVersions, setShowVersions] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [fileList, setFileList] = useState<FileMetadata[]>(mockFiles);

  const handleFileUpload = (newFiles: File[], encryptionTier: EncryptionTier) => {
    const newFileEntries: FileMetadata[] = newFiles.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: file.name,
      type: file.name.split('.').pop()?.toLowerCase() || 'unknown',
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      lastModified: new Date(file.lastModified),
      encryptionTier,
      owner: 'Current User',
      versions: [{
        id: 'v1',
        timestamp: new Date(),
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        author: 'Current User',
        changes: 'Initial version'
      }]
    }));

    setFileList(prevFiles => [...prevFiles, ...newFileEntries]);
    setShowUpload(false);
  };

  const handleVersionRestore = (fileId: string, versionId: string) => {
    setFileList(prevFiles => prevFiles.map(file => {
      if (file.id === fileId && file.versions) {
        const version = file.versions.find(v => v.id === versionId);
        if (version) {
          const newVersion = {
            id: `v${file.versions.length + 1}`,
            timestamp: new Date(),
            size: file.size,
            author: 'Current User',
            changes: `Restored from version ${versionId}`
          };
          return {
            ...file,
            versions: [...file.versions, newVersion]
          };
        }
      }
      return file;
    }));
    setShowVersions(false);
  };

  const handleVersionDownload = (fileId: string, versionId: string) => {
    const file = fileList.find(f => f.id === fileId);
    const version = file?.versions?.find(v => v.id === versionId);
    if (file && version) {
      console.log(`Downloading version ${versionId} of file ${file.name}`);
      // In a real app, this would trigger the actual download
    }
  };

  const updateFileEncryption = (fileId: string, newTier: EncryptionTier) => {
    setFileList(prevFiles => prevFiles.map(file => {
      if (file.id === fileId) {
        return {
          ...file,
          encryptionTier: newTier,
          versions: file.versions ? [
            ...file.versions,
            {
              id: `v${file.versions.length + 1}`,
              timestamp: new Date(),
              size: file.size,
              author: 'Current User',
              changes: `Updated encryption to ${newTier}`
            }
          ] : undefined
        };
      }
      return file;
    }));
    setShowSecurity(false);
  };

  return (
    <UploadContext.Provider value={{
      showUpload,
      setShowUpload,
      selectedFile,
      setSelectedFile,
      showVersions,
      setShowVersions,
      showSecurity,
      setShowSecurity,
      handleFileUpload,
      fileList,
      handleVersionRestore,
      handleVersionDownload,
      updateFileEncryption
    }}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
}