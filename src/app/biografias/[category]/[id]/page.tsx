import { BiografiaDetail } from '@/app/components/biografia-detail';
// import { biografiaItems, BIOGRAFIA_CATEGORIES } from '@/data/biografias';
// import { notFound } from 'next/navigation';
// import type { BiografiaCategory } from '@/data/biografias';

type Props = {
  params: Promise<{ category: string; id: string }>;
};

// export function generateStaticParams() {
//   return biografiaItems.map((item) => ({
//     category: item.category,
//     id: item.id,
//   }));
// }

export default async function BiografiaItemRoute({ params }: Props) {
  const { category, id } = await params;
  // Validation moved to client component

  return (
    <BiografiaDetail category={category} id={id} />
  );
}
