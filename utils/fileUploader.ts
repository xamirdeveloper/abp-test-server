import { api } from './axios';
import type { ApiResponse } from '@/types/api';
import imageCompression from 'browser-image-compression';

export interface UploadOptions {
  url: string;
  file: File;
  request_id?: string;
  extraData?: Record<string, any>;
  type?: 'image' | 'video';
}

export const uploadFile = async (options: UploadOptions): Promise<ApiResponse> => {
  let finalFile = options.file;

  if (options.type === 'image') {
    try {
      finalFile = await compressAndConvertToPNG(options.file);
    } catch (err) {
      console.error('Image compression failed, sending original file:', err);
    }
  }

  const formData = new FormData();

  if (options.request_id) {
    formData.append('request_id', options.request_id);
  }

  formData.append('file', finalFile);

  if (options.extraData) {
    for (const [key, value] of Object.entries(options.extraData)) {
      formData.append(key, value);
    }
  }

  return api.post(options.url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export function base64ToFile(base64: string, filename: string, type?: string): File {
  const arr = base64.split(',');
  const mime = type || arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function validateFile(
  file: File,
  maxSizeMB = 1,
  allowedTypes = ['image/png']
): string | null {
  if (!allowedTypes.includes(file.type)) {
    return `فرمت فایل باید فقط PNG باشد.`;
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `حجم فایل نباید بیشتر از ${maxSizeMB} مگابایت باشد.`;
  }

  return null;
}

export async function compressAndConvertToPNG(file: File, maxSizeMB = 1): Promise<File> {
  const options = {
    maxSizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/png',
  };

  const compressedFile = await imageCompression(file, options);

  const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
  const newFile = new File([compressedFile], `${fileNameWithoutExt}.png`, { type: 'image/png' });

  return newFile;
}
