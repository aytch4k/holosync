import type { FileMetadata } from '../types/file';

export const mockFiles: FileMetadata[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    items: '24 files',
    size: '-',
    lastModified: new Date(),
    owner: 'Current User',
    encryptionTier: 'basic'
  },
  {
    id: '2',
    name: 'Images',
    type: 'folder',
    items: '12 files',
    size: '-',
    lastModified: new Date(),
    owner: 'Current User',
    encryptionTier: 'advanced'
  },
  {
    id: '3',
    name: 'Project Proposal.pdf',
    type: 'pdf',
    size: '2.4 MB',
    lastModified: new Date(),
    owner: 'Current User',
    encryptionTier: 'enterprise',
    versions: [
      {
        id: 'v1',
        timestamp: new Date(Date.now() - 86400000),
        size: '2.3 MB',
        author: 'John Doe',
        changes: 'Updated executive summary'
      },
      {
        id: 'v2',
        timestamp: new Date(Date.now() - 172800000),
        size: '2.2 MB',
        author: 'Jane Smith',
        changes: 'Initial draft'
      }
    ]
  },
  {
    id: '4',
    name: 'Meeting Notes.docx',
    type: 'doc',
    size: '1.2 MB',
    lastModified: new Date(),
    owner: 'Current User',
    encryptionTier: 'basic'
  },
  {
    id: '5',
    name: 'Profile Picture.png',
    type: 'image',
    size: '3.1 MB',
    lastModified: new Date(),
    owner: 'Current User',
    encryptionTier: 'none'
  }
];