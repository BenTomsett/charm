'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Register {
  name: string;
  valueHex: string;
  label?: string;
}

const registers: Register[] = [
  { name: 'R0', valueHex: '0x0000' },
  { name: 'R1', valueHex: '0x0000' },
  { name: 'R2', valueHex: '0x0000' },
  { name: 'R3', valueHex: '0x0000' },
  { name: 'R4', valueHex: '0x0000' },
  { name: 'R5', valueHex: '0x0000' },
  { name: 'R6', valueHex: '0x0000' },
  { name: 'R7', valueHex: '0x0000' },
  { name: 'R8', valueHex: '0x0000' },
  { name: 'R9', valueHex: '0x0000' },
  { name: 'R10', valueHex: '0x0000' },
  { name: 'R11', valueHex: '0x0000' },
  { name: 'R12', valueHex: '0x0000' },
  { name: 'R13', valueHex: '0x0000', label: 'Stack Pointer (SP)' },
  { name: 'R14', valueHex: '0x0000', label: 'Link Register (LR)' },
  { name: 'R15', valueHex: '0x0000', label: 'Program Counter (PC)' },
];

const Registers = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="font-mono">
        {registers.map((register) => (
          <div
            key={register.name}
            className="flex flex-row items-center justify-between border-b border-gray-200 px-1 py-2 text-lg"
          >
            <Tooltip>
              <TooltipTrigger>
                <span className="font-medium text-gray-500">{register.name}</span>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span className="text-sm">{register.label || 'Data register'}</span>
              </TooltipContent>
              <span className="">{register.valueHex}</span>
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default Registers;
