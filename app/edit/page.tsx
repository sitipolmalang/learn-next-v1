import EditPageClient from './EditPageClient';
import { requireUser } from '@/lib/authz';

export default async function EditPage() {
    await requireUser();
    return <EditPageClient />;
}
