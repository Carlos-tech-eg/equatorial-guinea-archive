import { BiografiaCategoryPage } from '@/app/components/biografia-category';
// import { BIOGRAFIA_CATEGORIES } from '@/data/biografias';
// import { notFound } from 'next/navigation';
// import type { BiografiaCategory } from '@/data/biografias';

type Props = {
  params: Promise<{ category: string }>;
};

// const VALID_CATEGORIES: BiografiaCategory[] = BIOGRAFIA_CATEGORIES;

// export function generateStaticParams() {
//   return VALID_CATEGORIES.map((category) => ({ category }));
// }

export default async function BiografiaCategoryRoute({ params }: Props) {
  const { category } = await params;
  // Validation moved to client
  return <BiografiaCategoryPage category={category} />;
}
