// Legacy route — permanently redirects to the canonical admin URL.
// The /admin/leave-a-mark path was replaced by /admin/experiences/leave-a-mark
// as part of the unified Experience management architecture.
import { permanentRedirect } from 'next/navigation';

export default function AdminLeaveAMarkLegacyPage() {
  permanentRedirect('/admin/experiences/leave-a-mark');
}
