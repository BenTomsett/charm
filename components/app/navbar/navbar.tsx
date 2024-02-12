"use client";

import {ChevronLeft, ChevronRight, Info, Play, RotateCcw, ThumbsUp} from "lucide-react";
import {Button, TooltipButton} from "@/components/ui/button";
import Logo from "@/components/app/navbar/logo";
import NavbarMenu from "@/components/app/navbar/menubar";
import React from "react";
import {TooltipProvider} from "@/components/ui/tooltip";
import AboutDialog from "@/components/app/about-dialog";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 py-2 border-gray-200 border-b">
      <div className="flex items-center">
        <Logo className="pr-4" />
        <div className="h-3/4 border-[0.5px] border-gray-200" />
        <NavbarMenu />
      </div>

      <TooltipProvider delayDuration={0}>
        <div className="flex gap-2">
          <TooltipButton variant="outline" size="icon" tooltipText="Reset emulator">
            <RotateCcw className="h-4 w-4"/>
          </TooltipButton>

          <Button>
            <Play className="mr-2 h-4 w-4"/>
            Run
          </Button>

          <TooltipButton variant="outline" size="icon" tooltipText="Step back">
            <ChevronLeft className="h-4 w-4"/>
          </TooltipButton>

          <TooltipButton variant="outline" size="icon" tooltipText="Step forward">
            <ChevronRight className="h-4 w-4"/>
          </TooltipButton>
        </div>

        <div className="flex gap-2">
          <TooltipButton variant="outline" size="icon" tooltipText="Send feedback">
            <ThumbsUp className="h-4 w-4"/>
          </TooltipButton>

          <AboutDialog />
        </div>
      </TooltipProvider>
    </nav>
  )
}

export default Navbar
