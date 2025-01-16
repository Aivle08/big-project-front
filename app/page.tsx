'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type FileStatus = 'added' | 'uploading' | 'done' | 'error';

interface FileWithPreview extends File {
  preview?: string;
  status?: FileStatus;
  progress?: number;
}

export default function Home() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [totalProgress, setTotalProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => 
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          status: 'added' as FileStatus,
          progress: 0
        }) as FileWithPreview
      )
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  const uploadFile = async (file: FileWithPreview) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      setFiles(prevFiles =>
        prevFiles.map(f =>
          f === file ? { ...f, status: 'done' as FileStatus, progress: 100 } : f
        )
      );
    } catch (error) {
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f === file ? { ...f, status: 'error' as FileStatus, progress: 0 } : f
        )
      );
    }
  };

  const uploadAll = () => {
    const pendingFiles = files.filter(f => f.status === 'added');
    pendingFiles.forEach(file => {
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f === file ? { ...f, status: 'uploading' as FileStatus } : f
        )
      );
      uploadFile(file);
    });
  };

  const removeFile = (fileToRemove: FileWithPreview) => {
    setFiles(prevFiles => prevFiles.filter(f => f !== fileToRemove));
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
  };

  useEffect(() => {
    const uploadingFiles = files.filter(f => f.status === 'uploading');
    const totalFiles = files.length;
    const progress = uploadingFiles.length > 0
      ? (files.filter(f => f.status === 'done').length / totalFiles) * 100
      : 0;
    setTotalProgress(progress);
  }, [files]);

  return (
    <div className="container mx-auto p-4" {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="flex justify-between items-center mb-8">
        <div className="space-x-2">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center">
            <span className="mr-2">+</span>
            Add files...
          </button>
          <button
            onClick={uploadAll}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            <span className="mr-2">↑</span>
            Start upload
          </button>
        </div>
        <div className="w-1/3">
          {totalProgress > 0 && (
            <div className="w-full bg-gray-200 rounded">
              <div
                className="bg-blue-500 rounded h-2 transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white rounded shadow">
            <div className="flex items-center space-x-4">
              {file.preview && (
                <img
                  src={file.preview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {file.status === 'added' && (
                <>
                  <button
                    onClick={() => uploadFile(file)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Start
                  </button>
                  <button
                    onClick={() => removeFile(file)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </>
              )}
              {file.status === 'done' && (
                <button
                  onClick={() => removeFile(file)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              )}
              {file.status === 'uploading' && (
                <div className="w-32 bg-gray-200 rounded">
                  <div
                    className="bg-blue-500 rounded h-2 transition-all duration-300"
                    style={{ width: `${file.progress || 0}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}