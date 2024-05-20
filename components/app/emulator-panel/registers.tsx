'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FC } from 'react';
import { EmulatorState } from '@/lib/emulator/emulator';
import { DisplayBase, formatValue } from '@/lib/utils';

const specialRegisters: Record<string, string> = {
  R13: 'Stack pointer',
  R14: 'Link register',
  R15: 'Program counter',
};

interface RegistersProps {
  registers: EmulatorState['registers'];
  displayBase: DisplayBase;
}

const Registers: FC<RegistersProps> = ({ registers, displayBase }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="font-mono">
        {Object.entries(registers).map((register) => (
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
              <span className="">{formatValue(displayBase, registers[register[0]])}</span>
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default Registers;
