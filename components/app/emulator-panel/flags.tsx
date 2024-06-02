import { EmulatorState } from '@/lib/emulator/emulator';
import { FC, useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatValue } from '@/lib/utils';

export interface FlagsProps {
  flags: EmulatorState['flags'];
}

const flagDescriptions: Record<string, { name: string; description: string }> = {
  N: {
    name: 'Negative',
    description: 'Indicates that the result of the last operation was negative.',
  },
  Z: { name: 'Zero', description: 'Indicates that the result of the last operation was zero.' },
  C: {
    name: 'Carry',
    description:
      'Indicates that the last operation resulted in a carry out of the most significant bit.',
  },
  V: {
    name: 'Overflow',
    description: 'Indicates that the last operation resulted in an overflow.',
  },
};

const Flags: FC<FlagsProps> = ({ flags }) => {
  const [prevFlags, setPrevFlags] = useState(flags);
  const [flash, setFlash] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newFlash: Record<string, boolean> = {};

    Object.keys(flags).forEach((key) => {
      if (flags[key] !== prevFlags[key]) {
        newFlash[key] = true;
      }
    });

    setFlash(newFlash);
    setPrevFlags(flags);

    const timer = setTimeout(() => {
      setFlash({});
    }, 1000);
  }, [flags]);

  return (
    <div className="border-t">
      <div className="flex items-center justify-between p-5">
        <TooltipProvider delayDuration={0}>
          <div className="flex gap-4">
            {Object.entries(flags).map(([flag, value]) => (
              <Tooltip key={flag}>
                <TooltipTrigger>
                  <div className="flex overflow-hidden rounded-md border text-lg" key={flag}>
                    <p className="bg-gray-200 px-4 py-1 font-bold">{flag}</p>
                    <p
                      className={`bg-gray-100 px-4 py-1 font-mono ${flash[flag] ? 'flash-animation' : ''}`}
                    >
                      {value ? '1' : '0'}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="font-bold">{flagDescriptions[flag].name}</p>
                  <p className="text-sm">{flagDescriptions[flag].description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Flags;
