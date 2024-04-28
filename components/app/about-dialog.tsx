import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TooltipButton } from '@/components/ui/button';
import { Info } from 'lucide-react';

const AboutDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TooltipButton variant="outline" size="icon" tooltipText="About chARM">
          <Info className="h-4 w-4" />
        </TooltipButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About chARM</DialogTitle>
          <DialogDescription>
            <p>
              chARM is a web-based visual emulator for the emulating simple ARM assembly programs.
              It is designed to be used as a teaching tool for students learning about computer
              architecture and assembly language programming.
            </p>

            <br />

            <p>
              It supports a subset of the ARM Unified Assembler Language (UAL) and provides a visual
              representation of the registers during program execution. It includes a simple
              step-through debugger.
            </p>

            <br />

            <p>
              This project was developed using the Next.js framework and is written in TypeScript.
            </p>

            <br />
            <br />

            <div className="rounded-md bg-slate-100 px-4 py-3">
              <p>
                chARM was developed by Ben Tomsett. The code is open-source and available on{' '}
                <a className="text-black underline" href="/">
                  GitHub
                </a>
                .
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
