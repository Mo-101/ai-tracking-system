import React from "react";
import { StatusBar } from "../../components/status-bar";
import { ProcessingSettings } from "../../components/processing-settings";
import { SystemMetrics } from "../../components/system-metrics";
import { PerformanceMetrics } from "../../components/performance-metrics";
import { AgentStatus } from "../../components/agent-status";
import { APIStatus } from "../../components/api-status";
import { DeepSeekMonitor } from "../../components/deepseek-monitor";
import { CesiumMap } from "../../components/cesium-map"; 
import { SystemOverview } from "../../components/system-overview";

export default function AIHub() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 flex flex-col gap-6">
      {/* ✅ Status Bar */}
      <StatusBar />

      {/* ✅ First Row */}
      <div className="grid grid-cols-3 gap-6">
        <ProcessingSettings />
        <SystemMetrics />
        <PerformanceMetrics />
      </div>

      {/* ✅ Second Row */}
      <div className="grid grid-cols-3 gap-6">
        <DeepSeekMonitor />
        <AgentStatus />
        <APIStatus />
      </div>

      {/* ✅ Third Row - Keep Only AITrainingView and SystemOverview */}
      <div className="grid grid-cols-3 gap-6">
        <CesiumMap />
        {/* ❌ REMOVE TrainingControls from here */}
        <SystemOverview />
      </div>
    </div>
  );
}
