// Legacy route — permanently redirects to the canonical admin URL.
import { permanentRedirect } from 'next/navigation';

export default function AdminBeyondChaptersLegacyPage() {
  permanentRedirect('/admin/experiences/beyond-the-map');
}
