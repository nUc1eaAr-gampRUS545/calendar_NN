import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import { stylesDrop } from "../../styledComponents/DatePickerSC";

interface UploadFileComponentProps {
  setFiles: Dispatch<SetStateAction<File[] | undefined>>;
  setIsDragActive: Dispatch<SetStateAction<boolean>>;
}

const Contact: React.FC<UploadFileComponentProps> = ({
  setFiles,
  setIsDragActive,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = acceptedFiles;
      setFiles(files);

      const newPreviews: string[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            newPreviews.push(reader.result as string);
            // Обновляем состояние только после чтения всех файлов
            if (newPreviews.length === files.length) {
              setPreviews(newPreviews);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    setIsDragActive(isDragActive);
  }, [isDragActive]);

  return (
    <div className="mb-5">
      <div {...getRootProps()}>
        <input type="file" multiple {...getInputProps()} />
        {isDragActive ? (
          <div style={stylesDrop.dragActive}>Drop the files here ...</div>
        ) : (
          <Button
            sx={{ mt: 4, mb: 3 }}
            color="primary"
            variant="contained"
            fullWidth
          >
            Drop file
          </Button>
        )}
      </div>
      {previews.length != 0 &&
        previews.map((file, index) => (
          <div key={index} className="mb-5">
            <img
              width="15%"
              height="auto"
              src={file}
              alt={`Upload preview ${index}`}
            />
          </div>
        ))}
    </div>
  );
};

export default Contact;
