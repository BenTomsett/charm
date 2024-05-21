'use client';

import { ChevronLeft, ChevronRight, Play, RotateCcw, ThumbsUp } from 'lucide-react';
import { Button, TooltipButton } from '@/components/ui/button';
import Logo from '@/components/app/navbar/logo';
import NavbarMenu from '@/components/app/navbar/menubar';
import React, { FC } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import AboutDialog from '@/components/app/about-dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DisplayBase } from '@/lib/utils';

interface NavbarProps {
  onExecute: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  onDisplayBaseChange: (base: DisplayBase) => void;
  onProgramSave: () => void;
  onProgramLoad: () => void;
}

const Navbar: FC<NavbarProps> = ({
  onExecute,
  onStepForward,
  onStepBack,
  onReset,
  onDisplayBaseChange,
  onProgramSave,
  onProgramLoad,
}) => {
  return (
    <nav className="flex justify-between border-b border-gray-200 px-4 py-2">
      <div className="flex items-center">
        <Logo className="pr-4" />
        <div className="h-3/4 border-[0.5px] border-gray-200" />
        <NavbarMenu actions={{ save: onProgramSave, open: onProgramLoad }} />
      </div>

      <div className="flex w-full max-w-[640px] items-center justify-center rounded-md border">
        Emulator ready.
      </div>

      <TooltipProvider delayDuration={0}>
        <div className="flex gap-2">
          <TooltipButton
            variant="outline"
            size="icon"
            tooltipText="Reset emulator"
            onClick={onReset}
          >
            <RotateCcw className="h-4 w-4" />
          </TooltipButton>

          <Button onClick={onExecute}>
            <Play className="mr-2 h-4 w-4" />
            Run
          </Button>

          <TooltipButton onClick={onStepBack} variant="outline" size="icon" tooltipText="Step back">
            <ChevronLeft className="h-4 w-4" />
          </TooltipButton>

          <TooltipButton
            onClick={onStepForward}
            variant="outline"
            size="icon"
            tooltipText="Step forward"
          >
            <ChevronRight className="h-4 w-4" />
          </TooltipButton>
          <Tabs defaultValue="hex" onValueChange={onDisplayBaseChange}>
            <TabsList>
              <TabsTrigger value="hex">Hex</TabsTrigger>
              <TabsTrigger value="bin">Bin</TabsTrigger>
              <TabsTrigger value="dec">Dec</TabsTrigger>
            </TabsList>
          </Tabs>
          <TooltipButton variant="outline" size="icon" tooltipText="Send feedback">
            <ThumbsUp className="h-4 w-4" />
          </TooltipButton>

          <AboutDialog />
        </div>
      </TooltipProvider>
    </nav>
  );
};

export default Navbar;
