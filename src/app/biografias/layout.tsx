import { ColeccionesSubnav } from '@/app/components/ColeccionesSubnav';

export default function BiografiasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColeccionesSubnav />
      {children}
    </>
  );
}
