'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FC } from 'react';

interface Register {
  name: string;
  label?: string;
}

const specialRegisters: Record<string, string> = {
  R13: 'Stack pointer',
  R14: 'Link register',
  R15: 'Program counter',
};

interface RegistersProps {
  registersState: Record<string, number>;
  displayBase: 'hex' | 'dec' | 'bin';
}

const formatValue = (base: RegistersProps['displayBase'], value: number): string => {
  switch (base) {
    case 'hex':
      return `0x${value.toString(16).toUpperCase()}`;
    case 'dec':
      return value.toString();
    case 'bin':
      return `0b${value.toString(2)}`;
  }
};

const Registers: FC<RegistersProps> = ({ registersState, displayBase }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="font-mono">
        {Object.entries(registersState).map((register) => (
          <div
            key={register[0]}
            className="flex flex-row items-center justify-between border-b border-gray-200 px-1 py-2 text-lg"
          >
            <Tooltip>
              <TooltipTrigger>
                <span className="font-medium text-gray-500">{register[0]}</span>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span className="text-sm">{specialRegisters[register[0]] || 'Data register'}</span>
              </TooltipContent>
              <span className="">{formatValue(displayBase, registersState[register[0]])}</span>
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default Registers;
