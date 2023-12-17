import { useRef, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Trash2Icon, UploadCloudIcon } from "lucide-react";

export default function File({ form, field, ...props }) {
  const inputFileRef = useRef(null);

  const upload = (event) => {
    event.preventDefault();
    inputFileRef.current.click();
  };

  const remove = (event) => {
    event.preventDefault();
    form.setValue(field.name, "");
  };

  async function performUpload() {
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = await response.json();
    form.setValue(field.name, newBlob.url);
  }

  return (
    <>
      <Input
        ref={inputFileRef}
        type="file"
        onChange={performUpload}
        className="hidden"
      />
      <Input type="hidden" field={field} {...props} />
      {field.value ? (
        <div>
          <div className="flex items-start mb-4 space-x-2">
            <Button variant="outline" onClick={upload}>
              <UploadCloudIcon size={20} className="mr-2" /> Replace
            </Button>
            <Button variant="destructive" onClick={remove}>
              <Trash2Icon size={20} className="mr-2" /> Remove
            </Button>
          </div>
          <img
            src={field.value}
            alt="Image Preview"
            className="max-h-40 w-auto"
          />
        </div>
      ) : (
        <div className="flex items-start">
          <Button variant="outline" onClick={upload}>
            <UploadCloudIcon size={20} className="mr-2" /> Upload
          </Button>
        </div>
      )}
    </>
  );
}
