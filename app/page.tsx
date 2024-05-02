'use client';

import React, { useRef, useState } from 'react';

import { execute, reset } from '@/app/actions';

import Editor from '@monaco-editor/react';

import Navbar from '@/components/app/navbar/navbar';
import EmulatorPanel from '@/components/app/emulator-panel';
import { useToast } from '@/components/ui/use-toast';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import Emulator from '@/lib/emulator';
import { useWindowSize } from '@/lib/hooks/use-window-size';
import { editor } from 'monaco-editor';

export default function Home() {
  const { toast } = useToast();
  const [width] = useWindowSize();

  const [emulatorState, setEmulatorState] = useState(new Emulator().getEmulatorState());
  const [displayBase, setDisplayBase] = useState<'hex' | 'bin' | 'dec'>('hex');

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = async (e: editor.IStandaloneCodeEditor) => {
    if (editorRef.current === null) {
      editorRef.current = e;

      const monaco = await import('monaco-editor');

      editorRef.current.addAction({
        id: 'execute',
        label: 'Run program',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
        run: onExecute,
      });
    }
  };

  const onExecute = async () => {
    if (editorRef.current !== null) {
      const code = editorRef.current.getValue();
      const newState = await execute(code);
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
      <Navbar onExecute={onExecute} onReset={onReset} onDisplayBaseChange={setDisplayBase} />
      <main className="flex-1 bg-gray-100 p-4">
        <ResizablePanelGroup direction={width > 992 ? 'horizontal' : 'vertical'}>
          <ResizablePanel defaultSize={70} minSize={60}>
            <div className="h-full overflow-hidden rounded-md bg-white">
              <Editor onMount={handleEditorDidMount} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="h-full overflow-y-scroll rounded-md bg-white p-4">
              <EmulatorPanel emulatorState={emulatorState} displayBase={displayBase} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}
