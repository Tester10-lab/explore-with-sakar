// Legacy route — permanently redirects to the canonical admin URL.
import { permanentRedirect } from 'next/navigation';

export default function AdminServicesLegacyPage() {
  permanentRedirect('/admin/experiences');
}
