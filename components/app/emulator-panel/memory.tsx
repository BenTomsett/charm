import { EmulatorState } from '@/lib/emulator/emulator';
import { FC } from 'react';
import { formatValue } from '@/components/app/emulator-panel/index';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface MemoryProps {
  memory: EmulatorState['memory'];
  displayBase: 'hex' | 'dec' | 'bin';
}

const Memory: FC<MemoryProps> = ({ memory, displayBase }) => {
  const memoryEntries: React.JSX.Element[] = [];
  for (let i = 0; i < memory.length; i++) {
    if (memory[i] !== 0) {
      memoryEntries.push(
        <TableRow key={`mem-${i}`}>
          <TableCell className="font-bold">{`0x${i.toString(16).toUpperCase().padStart(4, '0')}`}</TableCell>
          <TableCell>{formatValue(displayBase, memory[i])}</TableCell>
        </TableRow>
      );
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>Address</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-mono">
        {memoryEntries.length > 0 ? (
          memoryEntries
        ) : (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              Uninitialized memory is set to zero.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Memory;
