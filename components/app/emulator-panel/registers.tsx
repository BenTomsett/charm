'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FC, useEffect, useState } from 'react';
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
  const [prevRegisters, setPrevRegisters] = useState(registers);
  const [flash, setFlash] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newFlash: Record<string, boolean> = {};

    Object.keys(registers).forEach((key) => {
      if (registers[key] !== prevRegisters[key]) {
        newFlash[key] = true;
      }
    });

    setFlash(newFlash);
    setPrevRegisters(registers);

    const timer = setTimeout(() => {
      setFlash({});
    }, 1000);
  }, [registers]);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="font-mono">
        {Object.entries(registers).map(([reg, value]) => (
          <div
            key={reg}
            className={`flex flex-row items-center justify-between border-b border-gray-200 px-1 py-2 text-lg ${flash[reg] ? 'flash-animation' : ''}`}
          >
            <Tooltip>
              <TooltipTrigger>
                <span className="font-medium text-gray-500">{reg}</span>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span className="text-sm">{specialRegisters[reg] || 'Data register'}</span>
              </TooltipContent>
              <span className="">{formatValue(displayBase, value)}</span>
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default Registers;
