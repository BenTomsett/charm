'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@/lib/hooks/use-window-size';

import Navbar from '@/components/app/navbar/navbar';
import EmulatorPanel from '@/components/app/emulator-panel';

import { useToast } from '@/components/ui/use-toast';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import Emulator from '@/lib/emulator';

import { editor } from 'monaco-editor';
import MonacoEditor from '@/components/app/editor';

enum EmulatorStatus {
  Ready,
  Processing,
  Processed,
  Executing,
  Executed,
  Error,
}

export default function Home() {
  const { toast } = useToast();
  const [width] = useWindowSize();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [displayBase, setDisplayBase] = useState<'hex' | 'bin' | 'dec'>('hex');

  const [status, setStatus] = useState(0);
  const [emulator, setEmulator] = useState<Emulator>(new Emulator());
  const [registers, setRegisters] = useState(emulator.getEmulatorState().registers);
  const [memory, setMemory] = useState(emulator.getEmulatorState().memory);
  const [symbols, setSymbols] = useState(emulator.getEmulatorState().symbols);

  useEffect(() => {
    const handleUpdate = () => {
      console.log('Emulator state updated');
      const state = emulator.getEmulatorState();
      console.log({ oldState: registers, newState: state.registers });
      setRegisters(state.registers);
      console.log({ oldState: memory, newState: state.memory });
      setMemory(state.memory);
      console.log({ oldState: symbols, newState: state.symbols });
      setSymbols(state.symbols);
    };

    emulator.subscribe(handleUpdate);

    return () => {
      emulator.unsubscribe(handleUpdate);
    };
  }, [emulator]);

  const preprocess = () => {
    setStatus(EmulatorStatus.Processing);
    const program = editorRef.current?.getValue() || '';
    emulator.preprocessProgram(program);
    setStatus(EmulatorStatus.Processed);
  };

  const onExecute = () => {
    if (status !== EmulatorStatus.Processed) {
      preprocess();
    }

    emulator.execute();
  };

  const onStepForward = () => {
    // TODO: re-implement
  };

  const onStepBack = () => {
    // TODO: re-implement
  };

  const onReset = async () => {
    emulator.reset();
    setStatus(EmulatorStatus.Ready);
    toast({ title: 'Success', description: 'Emulator reset' });
  };

  const onChange = () => {
    if (status === EmulatorStatus.Processed) {
      setStatus(EmulatorStatus.Ready);
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
      />
      <main className="flex-1 bg-gray-100 p-4">
        <ResizablePanelGroup direction={width > 992 ? 'horizontal' : 'vertical'}>
          <ResizablePanel defaultSize={70} minSize={60}>
            <div className="h-full overflow-hidden rounded-md bg-white">
              <MonacoEditor
                editorRef={editorRef}
                onExecute={onExecute}
                executing={false}
                onChange={onChange}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="h-full overflow-y-scroll rounded-md bg-white p-4">
              <EmulatorPanel
                displayBase={displayBase}
                registers={registers}
                memory={memory}
                symbols={symbols}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}
