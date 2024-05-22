'use client';

// TODO: Fix `window is not defined` error when importing Range from monaco-editor
import { editor, Range } from 'monaco-editor';
import Editor from '@monaco-editor/react';
import React, { useEffect, useRef } from 'react';

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

      decorationsCollectionRef.current = e.createDecorationsCollection([]);
    }
  };

  useEffect(() => {
    if (editorRef.current !== null && decorationsCollectionRef.current) {
      const decorations: editor.IModelDeltaDecoration[] = [];

      if (currentLine !== undefined) {
        decorations.push({
          range: new Range(currentLine, 1, currentLine, 1),
          options: {
            isWholeLine: true,
            className: 'bg-orange-300',
          },
        });
      }

      if (nextLine !== undefined) {
        decorations.push({
          range: new Range(nextLine, 1, nextLine, 1),
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
