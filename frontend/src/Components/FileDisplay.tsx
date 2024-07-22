import axios from "axios";
import { apiFileHandler, downloadFile } from "../api/apiFileHand";
import { useEffect, useState } from "react";
import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"; 
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { serverURL } from "../utils/constants";

interface FileDisplayProps {
  filesDataBase: number[] | undefined;
}

export const FileDisplay: React.FC<FileDisplayProps> = ({ filesDataBase }) => {
  const [objectsFile, setObjectsFiles] = useState<any>([]);

  useEffect(() => {
    filesDataBase?.forEach((id) =>
      apiFileHandler
        .getUrls(id)
        .then((res) => setObjectsFiles((state: any) => [...state, res]))
    );
  }, [filesDataBase]);

  const getFileIcon = (extension: string) => {
    switch (extension) {
      case "pdf":
        return <PictureAsPdfIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  return (
    <Grid container spacing={1}>
      {objectsFile.map((data: any) => {
        const fileName = data.file.split("/").pop();
        const fileExtension = fileName.split(".").pop();
        

        return (
          <Card key={data.id} sx={{ maxWidth: 145, mb: 2, mr: 2 }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                style={{ display: "flex", alignItems: "center" }}
              >
                {getFileIcon(fileExtension)}
                <span style={{ marginLeft: 8 }}>{fileName}</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uploaded on: {new Date(data.uploaded_on).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions>
              {fileExtension === "pdf" ? (
                <Button
                  size="small"
                  color="primary"
                  href={serverURL + data.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open
                </Button>
              ) : (
                <Button
                  size="small"
                  color="primary"
                  onClick={() => downloadFile(data.file)}
                >
                  Download
                </Button>
              )}
            </CardActions>
          </Card>
        );
      })}
    </Grid>
  );
};
