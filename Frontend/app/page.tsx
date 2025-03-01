import React from "react";
import { StatusBar } from "../components/status-bar";
import { ProcessingSettings } from "../components/processing-settings";
import { SystemMetrics } from "../components/system-metrics";
import { PerformanceMetrics } from "../components/performance-metrics";
import { AITrainingView } from "../components/ai-training-view";
import { AgentStatus } from "../components/agent-status";
import { APIStatus } from "../components/api-status";
import { DeepSeekMonitor } from "../components/deepseek-monitor";
import { TrainingControls } from "../components/training-controls";
import { SystemOverview } from "../components/system-overview";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 flex flex-col gap-6">
      {/* ✅ Status Bar at the top */}
      <StatusBar />

      {/* ✅ First Row - Processing, System, Performance */}
      <div className="grid grid-cols-3 gap-6">
        <ProcessingSettings />
        <SystemMetrics />
        <PerformanceMetrics />
      </div>

      {/* ✅ Second Row - AI Training (Left), DeepSeek (Middle), Agent+API (Right) */}
      <div className="grid grid-cols-3 gap-6">
        <DeepSeekMonitor />
        <AgentStatus />
        <APIStatus />
      </div>

      {/* ✅ Third Row - Map (Left), Training Controls (Middle), System Overview (Right) */}
      <div className="grid grid-cols-3 gap-6"> 
        <SystemOverview />
        <AITrainingView />
        <TrainingControls />
      </div>
      </div>
  );
}
