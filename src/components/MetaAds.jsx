import { useState, useEffect } from "react";

export default function ClicksDashboard() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="relative pb-[56.25%] h-0"> {/* Aspect ratio 16:9 */}
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/fb84801e-0f35-41e0-89ec-a771bf1a100d/page/p_nbp290oend"
          frameBorder="0"
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          className="absolute top-0 left-0 w-full h-full border-0"
        ></iframe>
      </div>
    </div>
  );
}
