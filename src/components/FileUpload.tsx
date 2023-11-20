"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios';

/* User file upload component */
const FileUpload = () => {

  //Allows API calls to backend
  const {mutate} = useMutation({
    mutationFn: async ({file_key, file_name}: {file_key: string, file_name: string}) => {
      const response = await axios.post('/api/create-chat', {
        file_key,
        file_name
      });
      return response.data;
    },
  });

  //React file drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: {"application/pdf": [".pdf"]},
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
        console.log(acceptedFiles);
        const file = acceptedFiles[0];

        //File is larger than 10mb
        if (file.size > 10 * 1024 * 1024){
          alert('Please upload a smaller file.');
          return;
        }

        try {
          const data = await uploadToS3(file);
          if(!data?.file_key || data.file_name){
            alert("Something went wrong.");
            return;
          }
          mutate(data, {
            onSuccess: (data) => {
              console.log(data);
            },
            onError: (error) => {
              console.log(error);
            }
          });
        } catch (error) {
          console.log(error);
        }
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-blue-500" />
          <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
