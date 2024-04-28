'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FC } from 'react';

interface Register {
  name: string;
  label?: string;
}

const registers: Register[] = [
  { name: 'R0' },
  { name: 'R1' },
  { name: 'R2' },
  { name: 'R3' },
  { name: 'R4' },
  { name: 'R5' },
  { name: 'R6' },
  { name: 'R7' },
  { name: 'R8' },
  { name: 'R9' },
  { name: 'R10' },
  { name: 'R11' },
  { name: 'R12' },
  { name: 'R13', label: 'Stack Pointer (SP)' },
  { name: 'R14', label: 'Link Register (LR)' },
  { name: 'R15', label: 'Program Counter (PC)' },
];

interface RegistersProps {
  registersState: Record<string, number>;
}

const Registers: FC<RegistersProps> = ({ registersState }) => {
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
              <span className="">{registersState[register.name]}</span>
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default Registers;
