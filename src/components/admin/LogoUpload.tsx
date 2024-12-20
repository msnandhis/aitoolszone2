import React from 'react';
import { Upload, Link as LinkIcon, Image } from 'lucide-react';
import { fileToBase64 } from '../../utils/fileUtils';

interface LogoUploadProps {
  logoUrl: string;
  onLogoChange: (url: string) => void;
  logoUploadType: 'url' | 'file';
  setLogoUploadType: (type: 'url' | 'file') => void;
}

export function LogoUpload({ 
  logoUrl, 
  onLogoChange, 
  logoUploadType, 
  setLogoUploadType 
}: LogoUploadProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setLogoUploadType('url')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors
                     ${logoUploadType === 'url'
                       ? 'border-primary-500 bg-primary-50 text-primary-700'
                       : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                     }`}
        >
          <LinkIcon className="w-4 h-4" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setLogoUploadType('file')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors
                     ${logoUploadType === 'file'
                       ? 'border-primary-500 bg-primary-50 text-primary-700'
                       : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                     }`}
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      {logoUploadType === 'url' ? (
        <div>
          <input
            type="url"
            value={logoUrl}
            onChange={(e) => onLogoChange(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg
                     focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
          />
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                try {
                  const base64 = await fileToBase64(file);
                  onLogoChange(base64);
                } catch (error) {
                  console.error('Error converting file:', error);
                }
              }
            }}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Image className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              Click to upload logo
            </span>
            <span className="text-xs text-gray-500 mt-1">
              SVG, PNG, JPG (max. 2MB)
            </span>
          </label>
        </div>
      )}

      {logoUrl && (
        <div className="mt-4">
          <div className="w-20 h-20 rounded-lg border border-gray-200 overflow-hidden">
            <img
              src={logoUrl}
              alt="Logo preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = `https://ui-avatars.com/api/?name=Logo&background=random`;
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
