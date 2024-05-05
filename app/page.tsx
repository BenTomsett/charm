'use client';

import React, { useRef, useState } from 'react';

import Navbar from '@/components/app/navbar/navbar';
import EmulatorPanel from '@/components/app/emulator-panel';

import { useToast } from '@/components/ui/use-toast';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import Emulator from '@/lib/emulator';
import { useWindowSize } from '@/lib/hooks/use-window-size';

import { editor } from 'monaco-editor';
import MonacoEditor from '@/components/app/editor';

export default function Home() {
  const { toast } = useToast();
  const [width] = useWindowSize();

  const [processed, setProcessed] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [states, setStates] = useState([new Emulator().getEmulatorState()]);
  const [statesIndex, setStatesIndex] = useState(0);

  const [displayBase, setDisplayBase] = useState<'hex' | 'bin' | 'dec'>('hex');

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const process = () => {
    const emulator = new Emulator();
    const results = emulator.executeProgram(editorRef.current?.getValue() || '');
    setStates(results);
    setProcessed(true);
    return results.length;
  };

  const onExecute = () => {
    setExecuting(true);
    if (!processed) {
      setStatesIndex(process() - 1);
    } else {
      const finalStateIndex = states.length - 1;
      setStatesIndex(finalStateIndex);
    }
    setExecuting(false);
  };

  const onStepForward = () => {
    let statesLength = states.length;
    if (!processed) {
      statesLength = process();
    }

    if (statesIndex < statesLength - 1) {
      const newIndex = statesIndex + 1;
      setStatesIndex(newIndex);

      if (newIndex === statesLength - 1) {
        setExecuting(false);
      } else {
        setExecuting(true);
      }
    }
  };

  const onStepBack = () => {
    if (statesIndex > 0) {
      if (!processed) {
        process();
      }

      const newIndex = statesIndex - 1;
      setStatesIndex(newIndex);

      if (newIndex === 0) {
        setProcessed(false);
        setExecuting(false);
      } else {
        setExecuting(true);
      }
    }
  };

  const onReset = async () => {
    setStatesIndex(0);
    setStates([new Emulator().getEmulatorState()]);
    setProcessed(false);
    setExecuting(false);
    toast({ title: 'Success', description: 'Emulator reset' });
  };

  const onChange = () => {
    if (processed) {
      setProcessed(false);
    }
  };

  return (
    <>
      <Navbar
        onExecute={onExecute}
        onStepForward={onStepForward}
        onStepBack={onStepBack}
        onReset={onReset}
        onDisplayBaseChange={setDisplayBase}
        processed={processed}
        executing={executing}
      />
      <main className="flex-1 bg-gray-100 p-4">
        <ResizablePanelGroup direction={width > 992 ? 'horizontal' : 'vertical'}>
          <ResizablePanel defaultSize={70} minSize={60}>
            <div className="h-full overflow-hidden rounded-md bg-white">
              <MonacoEditor
                editorRef={editorRef}
                onExecute={onExecute}
                executing={executing}
                onChange={onChange}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="h-full overflow-y-scroll rounded-md bg-white p-4">
              <EmulatorPanel emulatorState={states[statesIndex]} displayBase={displayBase} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}
