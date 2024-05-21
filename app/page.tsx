'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@/lib/hooks/use-window-size';

import Navbar from '@/components/app/navbar/navbar';

import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import Emulator from '@/lib/emulator';

import { editor } from 'monaco-editor';
import MonacoEditor from '@/components/app/editor';

import Registers from '@/components/app/emulator-panel/registers';
import Memory from '@/components/app/emulator-panel/memory';
import Symbols from '@/components/app/emulator-panel/symbols';
import Flags from '@/components/app/emulator-panel/flags';

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
  const [flags, setFlags] = useState(emulator.getEmulatorState().flags);
  const [symbols, setSymbols] = useState(emulator.getEmulatorState().symbols);

  useEffect(() => {
    const handleUpdate = () => {
      const state = emulator.getEmulatorState();
      setRegisters(state.registers);
      setMemory(state.memory);
      setFlags(state.flags);
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

    try {
      emulator.execute();
    } catch (e) {
      setStatus(EmulatorStatus.Error);
      toast({ title: 'Error', description: e.message });
    }
  };

  const onStepForward = () => {
    if (status < EmulatorStatus.Processed) {
      preprocess();
    }

    try {
      emulator.stepForward();
    } catch (e) {
      setStatus(EmulatorStatus.Error);
      toast({ title: 'Error', description: e.message });
    }
  };

  const onStepBack = () => {
    emulator.stepBack();
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

  const onProgramSave = () => {
    const program = editorRef.current?.getValue() || '';
    const blob = new Blob([program], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'program.asm';
    a.click();
    URL.revokeObjectURL(url);
  };

  const onProgramLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.asm';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const program = event.target?.result as string;
        editorRef.current?.setValue(program);
      };

      reader.readAsText(file);
    };

    input.click();
  };

  return (
    <div className="flex h-dvh max-h-dvh flex-col">
      <Navbar
        onExecute={onExecute}
        onStepForward={onStepForward}
        onStepBack={onStepBack}
        onReset={onReset}
        onDisplayBaseChange={setDisplayBase}
        onProgramSave={onProgramSave}
        onProgramLoad={onProgramLoad}
      />
      <main className="flex-grow overflow-hidden bg-gray-100 p-4">
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
            <div className="flex h-full flex-col justify-between overflow-hidden rounded-md bg-white">
              <div className="overflow-y-scroll p-4">
                <Tabs defaultValue="registers">
                  <TabsList className="w-full">
                    <TabsTrigger value="registers">Registers</TabsTrigger>
                    <TabsTrigger value="memory">Memory</TabsTrigger>
                    <TabsTrigger value="symbols">Symbols</TabsTrigger>
                  </TabsList>
                  <TabsContent value="registers">
                    <Registers registers={registers} displayBase={displayBase} />
                  </TabsContent>
                  <TabsContent value="memory">
                    <Memory memory={memory} displayBase={displayBase} />
                  </TabsContent>
                  <TabsContent value="symbols">
                    <Symbols symbols={symbols} displayBase={displayBase} />
                  </TabsContent>
                </Tabs>
              </div>
              <div>
                <Flags flags={flags} />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
