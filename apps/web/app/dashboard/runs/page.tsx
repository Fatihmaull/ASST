import { getAssuranceData } from "@/lib/data";
import RunsTable from "./RunsTable";

export default function RunsPage() {
  const { manifests } = getAssuranceData();

  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "32px", fontFamily: "var(--font-serif)" }}>Assurance Runs</h1>
      
      <div className="whisper-shadow bg-surface" style={{ borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
        <RunsTable manifests={manifests} />
      </div>
    </div>
  );
}
