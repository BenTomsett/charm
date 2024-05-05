'use client';

import { editor } from 'monaco-editor';
import Editor from '@monaco-editor/react';
import React, { useRef } from 'react';

interface MonacoEditorProps {
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  onExecute: () => void;
  executing: boolean;
  onChange: (value: string) => void;
}

function MonacoEditor({ editorRef, onExecute, executing, onChange }: MonacoEditorProps) {
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

  return (
    <Editor onMount={handleEditorDidMount} options={{ readOnly: executing }} onChange={onChange} />
  );
}

export default MonacoEditor;
