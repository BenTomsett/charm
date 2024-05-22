'use client';

import { editor } from 'monaco-editor';
import Editor from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';

interface MonacoEditorProps {
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  onExecute: () => void;
  executing: boolean;
  onChange: (value: string) => void;
  currentLine?: number;
  nextLine?: number;
}

function MonacoEditor({
  editorRef,
  onExecute,
  executing,
  onChange,
  currentLine,
  nextLine,
}: MonacoEditorProps) {
  const decorationsCollectionRef = useRef<editor.IEditorDecorationsCollection | null>(null);
  const [monaco, setMonaco] = useState<typeof import('monaco-editor') | null>(null);

  const handleEditorDidMount = async (e: editor.IStandaloneCodeEditor) => {
    if (editorRef.current === null) {
      editorRef.current = e;

      const m = await import('monaco-editor');
      setMonaco(m);

      editorRef.current.addAction({
        id: 'execute',
        label: 'Run program',
        keybindings: [m.KeyMod.CtrlCmd | m.KeyCode.Enter],
        run: onExecute,
      });

      decorationsCollectionRef.current = e.createDecorationsCollection([]);
    }
  };

  useEffect(() => {
    if (editorRef.current !== null && decorationsCollectionRef.current && monaco) {
      const decorations: editor.IModelDeltaDecoration[] = [];

      if (currentLine !== undefined) {
        decorations.push({
          range: new monaco!.Range(currentLine, 1, currentLine, 1),
          options: {
            isWholeLine: true,
            className: 'bg-orange-300',
          },
        });
      }

      if (nextLine !== undefined) {
        decorations.push({
          range: new monaco!.Range(nextLine, 1, nextLine, 1),
          options: {
            isWholeLine: true,
            className: 'bg-orange-100',
          },
        });
      }

      decorationsCollectionRef.current.set(decorations);
    }
  }, [currentLine, nextLine]);

  return (
    <Editor onMount={handleEditorDidMount} options={{ readOnly: executing }} onChange={onChange} />
  );
}

export default MonacoEditor;
