"use client";

import {useLayoutEffect, useState} from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import CodeEditor from "@/components/app/editor/editor";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

export default function Home() {
  const [width] = useWindowSize();

  return (
    <ResizablePanelGroup direction={width > 992 ? 'horizontal' : 'vertical'}>
      <ResizablePanel defaultSize={70} minSize={60}>
        <div className="bg-white overflow-hidden rounded-md h-full">
          <CodeEditor />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="bg-white rounded-md p-4 h-full">
          Registers here
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
