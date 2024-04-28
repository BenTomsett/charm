'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import EmulatorPanel from '@/components/app/emulator-panel';
import Navbar from '@/components/app/navbar/navbar';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import { execute, reset } from '@/app/actions';
import { useToast } from '@/components/ui/use-toast';
import { defaultState } from '@/lib/emulator/emulator';

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

export default function Home() {
  const [emulatorState, setEmulatorState] = useState(defaultState);
  const [width] = useWindowSize();
  const editorRef: React.MutableRefObject<IStandaloneCodeEditor | null> = useRef(null);
  const { toast } = useToast();

  const onExecute = async () => {
    if (editorRef.current !== null) {
      const code = editorRef.current.getValue();
      const newState = await execute(code);
      console.log(newState);
      setEmulatorState(newState);
    }
  };

  const onReset = async () => {
    const response = await reset();
    setEmulatorState(response);
    toast({ title: 'Success', description: 'Emulator reset' });
  };

  return (
    <>
      <Navbar onExecute={onExecute} onReset={onReset} />
      <main className="flex-1 bg-gray-100 p-4">
        <ResizablePanelGroup direction={width > 992 ? 'horizontal' : 'vertical'}>
          <ResizablePanel defaultSize={70} minSize={60}>
            <div className="h-full overflow-hidden rounded-md bg-white">
              <Editor
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="h-full rounded-md bg-white p-4">
              <EmulatorPanel emulatorState={emulatorState} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}
