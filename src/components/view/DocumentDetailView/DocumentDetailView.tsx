import React from "react";
import { Button, LoadingIndicator } from "../../presentational";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { useInitializeView } from "../../../helpers";

export interface DocumentDetailViewProps {
  fileKey: string;
}

export default function ImageWithMeta(props: DocumentDetailViewProps) {
  //const [meta, setMeta] = useState({ width: 0, height: 0, size: 0 });

  let [presignedUrl, setPresignedUrl] = React.useState("");

  function initialize() {
    MyDataHelps.getFileDownloadUrl(encodeURI(props.fileKey)).then(function (response) {
      setPresignedUrl(response.preSignedUrl);
    });
  }

  async function downloadFile() {
    const deviceInfo = await MyDataHelps.getDeviceInfo();

    if (!deviceInfo || deviceInfo.platform == "Web") {
      window.open(presignedUrl);
    } else {
      (window as any).webkit.messageHandlers.OpenFile.postMessage({ url: presignedUrl });
    }
  }

  useInitializeView(() => {
    initialize();
  }, [], []);

  return (
    <>
      {!presignedUrl && <LoadingIndicator />}
      {presignedUrl &&
        <div>
          <div style={{ display: "flex", alignItems: "flex-end" }}><Button onClick={() => downloadFile()}>Download</Button></div>
          <iframe src={presignedUrl}></iframe>
        </div>
      }
    </>
  );
}