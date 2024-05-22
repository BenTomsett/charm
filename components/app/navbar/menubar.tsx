import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { FC, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface NavbarMenuProps {
  actions: {
    save: () => void;
    open: () => void;
  };
}

const NavbarMenu: FC<NavbarMenuProps> = ({ actions }) => {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetch('/instructions.md')
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text));
  }, []);

  return (
    <Dialog>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={actions.save}>
              Download program <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={actions.open}>
              Load program <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <DialogTrigger asChild>
              <MenubarItem>Instruction list</MenubarItem>
            </DialogTrigger>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <DialogContent className="max-h-[90vh] w-full max-w-[90vw] overflow-auto">
        <div className="prose prose-table:w-full prose-table:text-left flex max-w-none items-center justify-between p-4">
          <Markdown className="w-full" remarkPlugins={[remarkGfm]}>
            {markdownContent}
          </Markdown>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarMenu;
