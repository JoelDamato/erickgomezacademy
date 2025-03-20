import * as React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { themePlugin } from "@react-pdf-viewer/theme";
import type { ToolbarSlot, TransformToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css"; 

interface RemovePartsDefaultToolbarExampleProps {
  fileUrl: string;
}

const PDFBookViewer: React.FC<RemovePartsDefaultToolbarExampleProps> = ({
  fileUrl,
}) => {
  const toolbarPluginInstance = toolbarPlugin();
  const themePluginInstance = themePlugin(); // Inicializamos el plugin sin importar CSS

  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    Print: () => <></>,
    OpenMenuItem: () => <></>,
    PrintMenuItem: () => <></>,
    DownloadMenuItem: () => <></>,
    SwitchThemeMenuItem:()=><></>
  });

  return (
    <div
      className="rpv-core__viewer"
      style={{
        border: "1px solid rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#d1d1d1",
          color: "white",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          padding: "0.25rem",
        }}
      >
        <Toolbar >{renderDefaultToolbar(transform)}</Toolbar>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Viewer fileUrl={fileUrl} theme='dark' plugins={[toolbarPluginInstance, themePluginInstance]} />
      </div>
    </div>
  );
};

export default PDFBookViewer;
