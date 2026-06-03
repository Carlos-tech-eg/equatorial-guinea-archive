export type ArchivoHistoricoSlide = {
  id: number;
  fecha: string;
  categoria: string;
  titulo: string;
  extracto: string;
  imagen: string;
};

export const archivoHistorico: ArchivoHistoricoSlide[] = [
  {
    id: 1,
    fecha: '12 DE OCTUBRE, 1968',
    categoria: 'INDEPENDENCIA, POLÍTICA',
    titulo: 'El amanecer de una nueva república soberana',
    extracto:
      'Tras siglos de administración colonial, el país asume su propio destino. Las calles se llenan de una mezcla de júbilo y expectativa ante el izado de la nueva bandera nacional, marcando el fin de la Guinea Española.',
    imagen: '/images/independencia-de-guinea.jpeg',
  },
  {
    id: 2,
    fecha: 'FINALES DEL SIGLO XIX',
    categoria: 'CULTURA, PRECOLONIAL',
    titulo: 'Las rutas comerciales de la isla de Bioko',
    extracto:
      'Antes de la consolidación de las fronteras modernas, las dinámicas de intercambio en la región establecieron redes complejas que definieron la estructura social y económica de las comunidades autóctonas.',
    imagen: '/images/obig.jpeg',
  },
];
