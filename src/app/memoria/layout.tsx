import { MemoriaNacionalSubnav } from '@/app/components/MemoriaNacionalSubnav';

export default function MemoriaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MemoriaNacionalSubnav />
      {children}
    </>
  );
}
