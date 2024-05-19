import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Registers from '@/components/app/emulator-panel/registers';
import Memory from '@/components/app/emulator-panel/memory';
import Symbols from '@/components/app/emulator-panel/symbols';
import { EmulatorState } from '@/lib/emulator/emulator';
import { FC } from 'react';

export interface EmulatorPanelProps {
  displayBase: 'hex' | 'dec' | 'bin';
  registers: EmulatorState['registers'];
  memory: EmulatorState['memory'];
  symbols: EmulatorState['symbols'];
}

export const formatValue = (base: EmulatorPanelProps['displayBase'], value: number): string => {
  switch (base) {
    case 'hex':
      return `0x${value.toString(16).toUpperCase()}`;
    case 'dec':
      return value.toString();
    case 'bin':
      return `0b${value.toString(2)}`;
  }
};

const EmulatorPanel: FC<EmulatorPanelProps> = ({ displayBase, registers, memory, symbols }) => {
  return (
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
  );
};

export default EmulatorPanel;
