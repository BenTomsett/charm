import { EmulatorState } from '@/lib/emulator/emulator';
import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DisplayBase, formatValue } from '@/lib/utils';

interface MemoryProps {
  memory: EmulatorState['memory'];
  displayBase: DisplayBase;
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
