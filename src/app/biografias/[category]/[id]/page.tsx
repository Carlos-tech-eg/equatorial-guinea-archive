import { BiografiaDetail } from '@/app/components/biografia-detail';
import { biografiaItems, BIOGRAFIA_CATEGORIES } from '@/data/biografias';
import { notFound } from 'next/navigation';
import type { BiografiaCategory } from '@/data/biografias';

type Props = {
  params: Promise<{ category: string; id: string }>;
};

export function generateStaticParams() {
  return biografiaItems.map((item) => ({
    category: item.category,
    id: item.id,
  }));
}

export default async function BiografiaItemRoute({ params }: Props) {
  const { category, id } = await params;
  if (!BIOGRAFIA_CATEGORIES.includes(category as BiografiaCategory)) {
    notFound();
  }
  const item = biografiaItems.find(
    (i) => i.category === category && i.id === id
  );
  if (!item) {
    notFound();
  }
  return (
    <BiografiaDetail category={category as BiografiaCategory} id={id} />
  );
}
