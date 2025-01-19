import React from "react";
import { RefreshCcw } from "lucide-react";
const Loading = ({ isLoad }: { isLoad: boolean }) => {
  if (!isLoad) return;
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-[999]">
      <div className="animate-spin">
        <RefreshCcw color="#fff" />
      </div>
    </div>
  );
};

export default Loading;
