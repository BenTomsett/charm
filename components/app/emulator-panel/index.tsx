import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Registers from '@/components/app/emulator-panel/registers';
import Memory from '@/components/app/emulator-panel/memory';

const EmulatorPanel = () => {
  return (
    <div>
      <Tabs defaultValue="registers">
        <TabsList className="w-full">
          <TabsTrigger value="registers">Registers</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
        </TabsList>
        <TabsContent value="registers">
          <Registers />
        </TabsContent>
        <TabsContent value="memory">
          <Memory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmulatorPanel;
