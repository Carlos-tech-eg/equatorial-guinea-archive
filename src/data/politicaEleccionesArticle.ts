import type { Locale } from '@/i18n';
import type { Photo } from '@/hooks/useContent';
import { POLITICA_ELECCIONES_IMAGE } from '@/data/politicaMockNews';

export const POLITICA_ELECCIONES_ID = 'politica-mock-elecciones';

export type PoliticaArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string };

export type PoliticaEleccionesArticleContent = {
  /** Titular completo en la página del artículo. */
  title: string;
  /** Titular corto en la portada de la rejilla. */
  coverTitle: string;
  coverSummary: string;
  meta: string;
  blocks: PoliticaArticleBlock[];
};

const ELECCIONES_ES: PoliticaEleccionesArticleContent = {
  coverTitle: 'Elecciones Guinea Ecuatorial 1968',
  title:
    'Elecciones Guinea Ecuatorial 1968 celebrados el 22 de septiembre de 1968 (con una segunda vuelta presidencial el 29 de septiembre)',
  coverSummary: '22 y 29 de septiembre de 1968 · Segunda vuelta presidencial',
  meta: '22 y 29 de septiembre de 1968 · Guinea Ecuatorial',
  blocks: [
    {
      type: 'p',
      text: 'El proceso que llevó a las elecciones de septiembre de 1968 en Guinea Ecuatorial estuvo marcado por una intensa lucha de intereses entre las distintas facciones políticas locales, la influencia de potencias extranjeras y una profunda división dentro del propio gobierno colonial español.',
    },
    {
      type: 'h2',
      text: '1. El Contexto y los Intereses de España',
    },
    {
      type: 'p',
      text: 'La descolonización de Guinea Ecuatorial no fue un proceso uniforme, y las autoridades españolas intentaron mantener su influencia a través de un proyecto «neocolonial». Sin embargo, el gobierno de España estaba profundamente dividido en su estrategia:',
    },
    {
      type: 'p',
      text: 'El sector de Asuntos Exteriores: Liderado por el ministro Fernando María Castiella, buscaba dejar el poder en manos de un líder moderado que mantuviera fuertes vínculos políticos y económicos con España, inspirándose en las transiciones de países como Gabón o Camerún. Su intención inicial era unir a los candidatos Bonifacio Ondó Edú y Atanasio Ndongo en una sola candidatura.',
    },
    {
      type: 'p',
      text: 'El sector de Presidencia: Liderado por el vicepresidente Luis Carrero Blanco (y apoyado por el dictador Francisco Franco), alentó el separatismo de la etnia bubi en la isla de Fernando Poo (actual Bioko) apoyando la candidatura de Edmundo Bossio. Su esperanza era retener el control español sobre la isla, independientemente de lo que ocurriera en el territorio continental.',
    },
    {
      type: 'h2',
      text: '2. La Campaña Electoral',
    },
    {
      type: 'p',
      text: 'Las elecciones fueron supervisadas y ratificadas como limpias por observadores internacionales de la Organización para la Unidad Africana y las Naciones Unidas. Durante la campaña, las diferencias de recursos y enfoques fueron notables:',
    },
    {
      type: 'p',
      text: 'Bonifacio Ondó Edú (MUNGE): Al ser el presidente del Gobierno autónomo, contó con el apoyo financiero de capitalistas españoles y las autoridades coloniales facilitaron sus mítines políticos.',
    },
    {
      type: 'p',
      text: 'Atanasio Ndongo (MONALIGE): Centró su campaña en las zonas urbanas utilizando la radio y la televisión. Aunque era el preferido por el Ministerio de Asuntos Exteriores español por su perfil intelectual, recibió una ayuda mínima y no obtuvo el respaldo financiero que esperaba.',
    },
    {
      type: 'p',
      text: 'Francisco Macías Nguema (IPGE): Capitalizó el sentimiento anticolonialista. A diferencia de sus rivales, adoptó un discurso mucho más populista y nacionalista que conectó directamente con las masas, especialmente en la región continental.',
    },
    {
      type: 'h2',
      text: '3. La Primera Vuelta y el «Error Garrafal»',
    },
    {
      type: 'p',
      text: 'La primera vuelta de las elecciones presidenciales se celebró el 22 de septiembre de 1968. Los resultados confirmaron la fragmentación del electorado:',
    },
    {
      type: 'p',
      text: 'Macías Nguema obtuvo el 40% de los votos. Ondó Edú consiguió el 35%. Ndongo alcanzó el 20%. Edmundo Bossio logró el 5% (obteniendo el 50,5% de los sufragios exclusivamente en la isla de Fernando Poo).',
    },
    {
      type: 'p',
      text: 'Dado que ningún candidato alcanzó la mayoría absoluta, se forzó una segunda vuelta. En este momento crucial, ocurrió lo que los historiadores describen como un enorme error político por parte de Bonifacio Ondó Edú: los candidatos eliminados (Ndongo y Bossio) acudieron primero a él para negociar una coalición, pero Ondó los despreció.',
    },
    {
      type: 'p',
      text: 'Ante este rechazo, Ndongo y Bossio se dirigieron a Francisco Macías, quien aceptó encantado la alianza y les prometió integrarlos en su futuro gobierno.',
    },
    {
      type: 'h2',
      text: '4. La Segunda Vuelta y sus Consecuencias Inmediatas',
    },
    {
      type: 'p',
      text: 'El respaldo de Ndongo y Bossio fue determinante. En la segunda vuelta del 29 de septiembre, Macías Nguema ganó la presidencia de manera holgada. El 12 de octubre de 1968, se firmó el acta de independencia y España transfirió los poderes al nuevo presidente.',
    },
    {
      type: 'p',
      text: 'Sin embargo, la inestabilidad comenzó casi de inmediato. Tras asumir el poder, Macías desarrolló un miedo obsesivo a ser derrocado. Lanzó acusaciones públicas contra los empresarios madereros españoles, alegando que conspiraban con Ondó Edú, lo que desencadenó detenciones de políticos opositores y forzó a Ondó a exiliarse en Gabón a principios de noviembre de 1968. Esto marcó el inicio del colapso del incipiente sistema democrático en el nuevo país.',
    },
  ],
};

const ELECCIONES_FR: PoliticaEleccionesArticleContent = {
  coverTitle: 'Élections Guinée équatoriale 1968',
  title:
    'Élections Guinée équatoriale 1968, le 22 septembre 1968 (second tour présidentiel le 29 septembre)',
  coverSummary: '22 et 29 septembre 1968 · Second tour présidentiel',
  meta: '22 et 29 septembre 1968 · Guinée équatoriale',
  blocks: ELECCIONES_ES.blocks,
};

const BY_LOCALE: Record<Locale, PoliticaEleccionesArticleContent> = {
  es: ELECCIONES_ES,
  fr: ELECCIONES_FR,
};

export function getPoliticaEleccionesArticle(locale: Locale): PoliticaEleccionesArticleContent {
  return BY_LOCALE[locale] ?? ELECCIONES_ES;
}

export function isPoliticaEleccionesTitle(title: string | undefined | null): boolean {
  if (!title?.trim()) return false;
  return /elecciones|élections/i.test(title) && /guinea|guinée/i.test(title);
}

export function isPoliticaEleccionesPhoto(photo: {
  id?: string;
  title?: string | null;
}): boolean {
  if (photo.id === POLITICA_ELECCIONES_ID) return true;
  return isPoliticaEleccionesTitle(photo.title);
}

export function createEleccionesPhoto(locale: Locale): Photo {
  const article = getPoliticaEleccionesArticle(locale);
  return {
    id: POLITICA_ELECCIONES_ID,
    title: article.coverTitle,
    description: article.blocks[0]?.type === 'p' ? article.blocks[0].text : '',
    imageUrl: POLITICA_ELECCIONES_IMAGE,
    year: '1968',
    location: 'Guinea Ecuatorial',
    source: locale === 'fr' ? 'Archive illustrative' : 'Archivo ilustrativo',
    category: 'politica',
  };
}

export function applyEleccionesArticleToPhoto(photo: Photo, locale: Locale): Photo {
  if (!isPoliticaEleccionesPhoto(photo)) return photo;
  const article = getPoliticaEleccionesArticle(locale);
  return {
    ...photo,
    title: article.coverTitle,
    description: article.blocks[0]?.type === 'p' ? article.blocks[0].text : photo.description,
    imageUrl: POLITICA_ELECCIONES_IMAGE,
    year: photo.year || '1968',
    location: photo.location || 'Guinea Ecuatorial',
  };
}
