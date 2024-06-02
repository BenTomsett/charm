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
  for (const [address, value] of memory.entries()) {
    memoryEntries.push(
      <TableRow key={`mem-${address}`}>
        <TableCell className="font-bold">{`0x${address.toString(16).toUpperCase().padStart(4, '0')}`}</TableCell>
        <TableCell>{formatValue(displayBase, value)}</TableCell>
      </TableRow>
    );
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
