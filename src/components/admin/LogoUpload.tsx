import React, { useState, useCallback } from "react";
import { Upload, Link as LinkIcon, Image } from "lucide-react";
import {
  fileToBase64,
  validateImageFile,
  formatFileSize,
} from "../../utils/fileUtils";

interface LogoUploadProps {
  logoUrl: string;
  onLogoChange: (url: string) => void;
  logoUploadType: "url" | "file";
  setLogoUploadType: (type: "url" | "file") => void;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export function LogoUpload({
  logoUrl,
  onLogoChange,
  logoUploadType,
  setLogoUploadType,
}: LogoUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Reset error state
      setError(null);

      // Validate file
      const validationError = validateImageFile(file, MAX_FILE_SIZE);
      if (validationError) {
        setError(validationError);
        e.target.value = ""; // Reset input
        return;
      }

      try {
        setIsLoading(true);
        const base64 = await fileToBase64(file);
        onLogoChange(base64);
      } catch (error) {
        console.error("Error converting file:", error);
        setError("Error uploading file. Please try again.");
      } finally {
        setIsLoading(false);
        e.target.value = ""; // Reset input
      }
    },
    [onLogoChange]
  );

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      onLogoChange(e.target.value);
    },
    [onLogoChange]
  );

  const handleTypeChange = useCallback(
    (type: "url" | "file") => {
      setLogoUploadType(type);
      setError(null);
      if (type === "url" && logoUrl.startsWith("data:")) {
        onLogoChange(""); // Clear base64 data when switching to URL
      }
    },
    [setLogoUploadType, onLogoChange, logoUrl]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => handleTypeChange("url")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors
                     ${
                       logoUploadType === "url"
                         ? "border-primary-500 bg-primary-50 text-primary-700"
                         : "border-gray-200 hover:bg-gray-50 text-gray-600"
                     }`}
        >
          <LinkIcon className="w-4 h-4" />
          URL
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("file")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors
                     ${
                       logoUploadType === "file"
                         ? "border-primary-500 bg-primary-50 text-primary-700"
                         : "border-gray-200 hover:bg-gray-50 text-gray-600"
                     }`}
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      {logoUploadType === "url" ? (
        <div>
          <input
            type="url"
            value={logoUrl}
            onChange={handleUrlChange}
            placeholder="https://..."
            className={`w-full px-4 py-2 border rounded-lg transition-colors
                     ${
                       error
                         ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                         : "border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                     }`}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="logo-upload"
            disabled={isLoading}
          />
          <label
            htmlFor="logo-upload"
            className={`flex flex-col items-center justify-center w-full h-32 px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                     ${
                       error
                         ? "border-red-300 hover:border-red-500 hover:bg-red-50"
                         : "border-gray-300 hover:border-primary-500 hover:bg-primary-50"
                     }
                     ${isLoading ? "opacity-50 cursor-wait" : ""}`}
          >
            <Image
              className={`w-8 h-8 mb-2 ${
                error ? "text-red-400" : "text-gray-400"
              }`}
            />
            <span
              className={`text-sm ${error ? "text-red-600" : "text-gray-600"}`}
            >
              {isLoading ? "Uploading..." : "Click to upload logo"}
            </span>
            <span
              className={`text-xs mt-1 ${
                error ? "text-red-500" : "text-gray-500"
              }`}
            >
              {error || `SVG, PNG, JPG (max. ${formatFileSize(MAX_FILE_SIZE)})`}
            </span>
          </label>
        </div>
      )}

      {logoUrl && !error && (
        <div className="mt-4">
          <div className="w-20 h-20 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
            <img
              src={logoUrl}
              alt="Logo preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = `https://ui-avatars.com/api/?name=Logo&background=random`;
                if (logoUploadType === "url") {
                  setError("Invalid image URL");
                  onLogoChange(""); // Clear invalid URL
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
