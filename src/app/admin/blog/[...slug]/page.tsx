import { redirect } from 'next/navigation';

export default function AdminBlogSlugRedirect({
  params,
}: {
  params: { slug?: string[] };
}) {
  const subpath = params.slug ? params.slug.join('/') : '';
  redirect(`/admin/blogs${subpath ? `/${subpath}` : ''}`);
}
