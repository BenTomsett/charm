import { EmulatorState } from '@/lib/emulator/emulator';
import { FC, useEffect, useState } from 'react';

export interface FlagsProps {
  flags: EmulatorState['flags'];
}

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
    console.log({ newFlash });

    setFlash(newFlash);
    setPrevFlags(flags);

    const timer = setTimeout(() => {
      setFlash({});
    }, 1000);
  }, [flags]);

  return (
    <div className="border-t">
      <div className="flex items-center justify-between p-5">
        <p className="font-medium">Flags</p>
        <div className="flex gap-4">
          {Object.entries(flags).map(([flag, value]) => (
            <div className="flex overflow-hidden rounded-md border text-lg" key={flag}>
              <p className="bg-gray-200 px-4 py-1 font-bold">{flag}</p>
              <p
                className={`bg-gray-100 px-4 py-1 font-mono ${flash[flag] ? 'flash-animation' : ''}`}
              >
                {value ? '1' : '0'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flags;
