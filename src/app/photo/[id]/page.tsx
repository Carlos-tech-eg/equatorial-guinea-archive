import { PhotoDetail } from '@/app/components/photo-detail';
import { photos } from '@/data/photos';

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return photos.map((p) => ({ id: p.id }));
}

export default async function PhotoPage({ params }: Props) {
  const { id } = await params;
  return <PhotoDetail id={id} />;
}
