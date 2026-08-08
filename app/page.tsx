"use client";

import { useEffect, useState } from "react";
import { TabBar } from "@/components/shell/TabBar";
import { TaskMapStrip } from "@/components/shell/TaskMapStrip";
import { UxProcessStrip } from "@/components/shell/UxProcessStrip";
import { ProgressDots } from "@/components/shell/ProgressDots";
import { LadderTab } from "@/components/ladder/LadderTab";
import { BenchTab } from "@/components/bench/BenchTab";
import { RoomTab } from "@/components/room/RoomTab";
import { CaseTab } from "@/components/assessment/CaseTab";
import { readStored, usePersistentState } from "@/lib/storage";
import type { BenchPlan } from "@/components/bench/BenchTab";
import type { StageId, TabId } from "@/lib/types";

export default function Page() {
  const [activeTab, setActiveTab] = usePersistentState<TabId>(
    "activeTab",
    "ladder",
  );
  const [progress, setProgress] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);

  // Progress dots read the same keys the instruments write, refreshed on tab
  // change so the strip never disagrees with what the learner just did.
  useEffect(() => {
    const visited = readStored<StageId[]>("ladder.visited", []);
    const plan = readStored<BenchPlan>("bench.plan", { aspects: [], run: false });
    const quarter = readStored<number>("room.quarter", 1);
    setProgress([visited.length >= 4, plan.run, quarter > 4]);
  }, [activeTab]);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-10">
      <TabBar active={activeTab} onChange={setActiveTab} />
      <TaskMapStrip />
      <UxProcessStrip />
      <ProgressDots done={progress} />

      <div className="min-h-[720px]">
        <TabPanel id="ladder" active={activeTab}>
          <LadderTab />
        </TabPanel>
        <TabPanel id="bench" active={activeTab}>
          <BenchTab />
        </TabPanel>
        <TabPanel id="room" active={activeTab}>
          <RoomTab />
        </TabPanel>
        <TabPanel id="case" active={activeTab}>
          <CaseTab />
        </TabPanel>
      </div>
    </main>
  );
}

function TabPanel({
  id,
  active,
  children,
}: {
  id: TabId;
  active: TabId;
  children: React.ReactNode;
}) {
  const selected = id === active;
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      hidden={!selected}
      tabIndex={0}
    >
      {selected ? children : null}
    </div>
  );
}
