import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import styles from "./index.module.scss";

const getFileSize = (size: number = 0) => {
  if (!size) return "";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return (size / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
};

const UploadItem = (props: { file: UploadFile }) => {
  const { file } = props;
  const handleCopy = async () => {
    const copyValue = file?.response?.url;
    try {
      if (!navigator.clipboard) {
        throw new Error("Browser don't have support for native clipboard.");
      }
      await navigator.clipboard.writeText(copyValue || "");
      message.success("copy success");
    } catch (error) {
      console.log("copy error:", error);
    }
  };
  return (
    <div className={styles.fileList}>
      <div className={styles.name}>{file.name}</div>
      <div className={styles.size}>{getFileSize(file.size)}</div>
      <div className={styles.url}>{file?.response?.url}</div>
      <div className={styles.copy} onClick={handleCopy}>
        copy url
      </div>
    </div>
  );
};
const UploadComp = () => {
  const [uploadList, setUploadList] = useState<UploadFile[]>([]);
  const props: UploadProps = {
    name: "file",
    action: "https://118.178.243.82:3002/upload",
    headers: {
      authorization: "authorization-text",
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setUploadList([...uploadList, info.file]);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  console.log(uploadList, 192819);
  return (
    <>
      <div className={styles.container}>
        <Upload multiple accept="image/*" {...props}>
          <div className={styles.upload}>Click to Upload</div>
        </Upload>
        {uploadList.length > 0 && (
          <>
            <div className={styles.fileList}>
              <div className={styles.name}>文件名</div>
              <div className={styles.size}>大小</div>
              <div className={styles.url}>地址</div>
              <div className={styles.copyEmpty}></div>
            </div>
            {uploadList.map((file) => (
              <UploadItem file={file}></UploadItem>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default UploadComp;
