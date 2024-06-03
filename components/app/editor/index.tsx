'use client';

import { editor } from 'monaco-editor';
import Editor from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import { opcodes } from '@/lib/emulator/instruction-factory';

interface MonacoEditorProps {
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  onExecute: () => void;
  executing: boolean;
  error: boolean;
  onChange: (value: string) => void;
  currentLine?: number;
  nextLine?: number;
}

function MonacoEditor({
  editorRef,
  onExecute,
  executing,
  error,
  onChange,
  currentLine,
  nextLine,
}: MonacoEditorProps) {
  const decorationsCollectionRef = useRef<editor.IEditorDecorationsCollection | null>(null);
  const [monaco, setMonaco] = useState<typeof import('monaco-editor') | null>(null);

  const handleEditorDidMount = async (e: editor.IStandaloneCodeEditor, monaco) => {
    if (editorRef.current === null) {
      editorRef.current = e;

      const opcodesPattern = opcodes.join('|');
      console.log(new RegExp(`\\b(${opcodesPattern})\\b`, 'i'));

      // ARM assembly language support
      monaco.languages.register({ id: 'arm-asm' });
      monaco.languages.setMonarchTokensProvider('arm-asm', {
        tokenizer: {
          root: [
            [/\bR[0-9]|R1[0-5]\b/, 'register'],
            [new RegExp(`\\b(${opcodesPattern})\\b`, 'i'), 'keyword'],
            [/;.*$/, 'comment'],
            [/#\d+/, 'number'],
            [/^[a-zA-Z_]\w*:/, 'label'],
          ],
        },
      });
      monaco.languages.registerCompletionItemProvider('arm-asm', {
        provideCompletionItems: (model, position) => {
          const suggestions: any[] = [];
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          opcodes.forEach((opcode) => {
            suggestions.push({
              label: opcode,
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: opcode,
              range: range,
            });
          });

          for (let i = 0; i <= 15; i++) {
            suggestions.push({
              label: `R${i}`,
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: `R${i}`,
              range: range,
            });
          }

          return { suggestions: suggestions };
        },
      });

      monaco.editor.defineTheme('arm-asm-theme', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'register', foreground: 'FF0000' },
          { token: 'comment', foreground: '008800', fontStyle: 'italic' },
          { token: 'keyword', foreground: '0000FF' },
          { token: 'number', foreground: 'FF00FF' },
          { token: 'label', foreground: 'FFA500' },
        ],
        colors: {},
      });

      setMonaco(monaco);

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
    if (editorRef.current !== null && decorationsCollectionRef.current && monaco) {
      const decorations: editor.IModelDeltaDecoration[] = [];

      if (error && currentLine !== undefined) {
        decorations.push({
          range: new monaco!.Range(currentLine, 1, currentLine, 1),
          options: {
            isWholeLine: true,
            inlineClassName: 'errorLineDecoration',
          },
        });
      } else {
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
      }

      decorationsCollectionRef.current.set(decorations);
    }
  }, [error, currentLine, nextLine]);

  return (
    <Editor
      onMount={handleEditorDidMount}
      options={{ readOnly: executing, fontSize: 14, theme: 'arm-asm-theme' }}
      defaultLanguage="arm-asm"
      theme="arm-asm-theme"
      onChange={onChange}
    />
  );
}

export default MonacoEditor;
