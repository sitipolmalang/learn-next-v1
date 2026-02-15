import EditByPageIdClient from './EditByPageIdClient';
import { requireUser } from '@/lib/authz';

export default async function EditByPageIdPage() {
    await requireUser();
    return <EditByPageIdClient />;
}
