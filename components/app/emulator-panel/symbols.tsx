import { FC } from 'react';
import { EmulatorState } from '@/lib/emulator/emulator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DisplayBase, formatValue } from '@/lib/utils';

interface SymbolsProps {
  symbols: EmulatorState['symbols'];
  displayBase: DisplayBase;
}

const Symbols: FC<SymbolsProps> = ({ symbols, displayBase }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>Label</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-mono">
        {symbols.size > 0 ? (
          Array.from(symbols.entries()).map(([label, data]) => (
            <TableRow key={label}>
              <TableCell className="font-bold">{label}</TableCell>
              <TableCell>{formatValue(displayBase, data.address)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              No symbols
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Symbols;
