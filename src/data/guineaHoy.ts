/**
 * Datos para la sección Guinea Ecuatorial Hoy.
 * Misma estructura y lógica que el diseño original; contenido preservado.
 */

export interface GuineaHoyArticle {
  id: number;
  cat: string;
  cc: string;
  title: string;
  sub: string;
  author: string;
  date: string;
  time: string;
  img: string;
  excerpt: string;
  body: string;
  tags: string[];
}

export const ARTICLES: GuineaHoyArticle[] = [
  {
    id: 1,
    cat: 'Historia',
    cc: 'cat-h',
    title: 'La independencia de Guinea Ecuatorial: 12 de octubre de 1968',
    sub: 'Cómo un pequeño territorio colonial se convirtió en el único país hispanohablante del África subsahariana',
    author: 'Ndong Mba Eyang',
    date: '8 Mar 2025',
    time: '12 min',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Kongofloden_1906.jpg/800px-Kongofloden_1906.jpg',
    excerpt:
      'El 12 de octubre de 1968, Guinea Ecuatorial proclamó su independencia de España tras décadas de colonización.',
    body: `El 12 de octubre de 1968, Guinea Ecuatorial proclamó su independencia de España tras décadas de colonización. Este momento trascendental fue el resultado de un largo proceso de resistencia, negociación y movilización popular.

Cuando España proclamó Guinea Ecuatorial como provincia española en 1959, lejos de calmar las aspiraciones de autonomía del pueblo ecuatoguineano, aceleró el proceso de toma de conciencia política. Las élites locales, muchas de ellas formadas en seminarios católicos y en instituciones españolas, comenzaron a articular una visión de futuro independiente.

La figura de Macías Nguema emergió en este contexto como líder carismático del Movimiento Nacional de Liberación de Guinea Ecuatorial. Sus discursos en las plazas de Bata y Santa Isabel movilizaron a miles de ciudadanos que reclamaban el fin del dominio colonial.

Las negociaciones en Madrid en 1967 y 1968 fueron tensas. España, presionada internacionalmente por el proceso de descolonización que recorría África, accedió a conceder la independencia bajo condiciones que garantizaran ciertos intereses económicos.

El 12 de octubre de 1968, con las banderas de azul, verde, blanco y rojo ondeando sobre el palacio de gobierno de Santa Isabel —que pasaría a llamarse Malabo—, Guinea Ecuatorial se convertía en el estado número 45 de la Organización para la Unidad Africana.`,
    tags: ['Independencia', 'Siglo XX', 'Macías Nguema', 'Política colonial'],
  },
  {
    id: 2,
    cat: 'Cultura',
    cc: 'cat-c',
    title: 'La literatura oral Fang: guardianes de la memoria ancestral',
    sub: 'Los mbom e iton —cuentos y cantos— como repositorios vivos de la cosmovisión equatoguineana',
    author: 'Rosario Eló Nvé',
    date: '5 Mar 2025',
    time: '8 min',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Dakar-1900.jpg/800px-Dakar-1900.jpg',
    excerpt:
      'En las aldeas del interior de Río Muni, los ancianos siguen transmitiendo oralmente un corpus de historias y proverbios que constituyen el corazón cultural del pueblo Fang.',
    body: `La tradición oral del pueblo Fang, el grupo étnico más numeroso de Guinea Ecuatorial, constituye uno de los patrimonios culturales más ricos y menos documentados de África central.

Los mbom son cuentos de animales —con el elefante, la tortuga y la araña como protagonistas habituales— que encierran enseñanzas morales y visiones del mundo. Los itom son relatos más extensos, épicos a veces, que narran los orígenes del pueblo y las gestas de los héroes ancestrales.

Esta tradición está hoy en peligro. La urbanización, la expansión de los medios digitales y la pérdida del contacto con las lenguas maternas están erosionando los canales de transmisión intergeneracional.

Sin embargo, hay señales alentadoras. Un grupo de investigadores y artistas está trabajando en proyectos de documentación y reinterpretación de este patrimonio. La cantante Lela Owono ha incorporado melodías tradicionales Fang en su música contemporánea, creando puentes entre la tradición y la modernidad.`,
    tags: ['Fang', 'Tradición oral', 'Patrimonio', 'Lenguas'],
  },
  {
    id: 3,
    cat: 'Fotografía',
    cc: 'cat-f',
    title: 'El álbum perdido: imágenes de Santa Isabel en los años treinta',
    sub: 'Una colección de fotografías de época redescubierta en los archivos de la misión claretiana',
    author: 'Archivo Editorial',
    date: '3 Mar 2025',
    time: '6 min',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Mombasa_harbour_1890.jpg/800px-Mombasa_harbour_1890.jpg',
    excerpt:
      'Más de doscientas fotografías inéditas de la capital colonial durante el período de entreguerras han salido a la luz gracias al trabajo de un archivista.',
    body: `El hallazgo ocurrió casi por accidente. El archivista Jordi Palomeras, trabajando en la catalogación del fondo misionero de la orden claretiana, encontró entre cajas sin clasificar un álbum encuadernado en cuero con más de doscientas fotografías.

Las imágenes, tomadas entre 1928 y 1942, muestran una Santa Isabel que casi nadie recordaba: mercados bulliciosos, procesiones religiosas donde convivían trajes europeos y vestimentas tradicionales, retratos de funcionarios coloniales y trabajadores del puerto.

Lo que más llama la atención no es la arquitectura colonial sino la vida que se cuela por los márgenes: los niños que miran a cámara desde las esquinas, las mujeres que venden frutas, los pescadores que reparan sus redes.

Son imágenes que contradicen la narrativa oficial del archivo colonial, que tendía a monumentalizar el proyecto civilizatorio y a borrar la agencia de los propios ecuatoguineanos.`,
    tags: ['Fotografía histórica', 'Santa Isabel', 'Malabo', 'Archivo'],
  },
  {
    id: 4,
    cat: 'Sociedad',
    cc: 'cat-s',
    title: 'La diáspora ecuatoguineana: entre dos mundos',
    sub: 'Más de 200.000 ecuatoguineanos viven fuera del país, principalmente en España, Camerún y EE.UU.',
    author: 'Mariam Nchama',
    date: '1 Mar 2025',
    time: '10 min',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Madagascar_mission_1905.jpg/800px-Madagascar_mission_1905.jpg',
    excerpt:
      'La comunidad ecuatoguineana en el exterior construye su identidad negociando entre las culturas de acogida y el vínculo con una patria que muchos nunca han visitado.',
    body: `En Madrid, en el barrio de Vallecas, existe una pequeña pero vibrante comunidad ecuatoguineana. Se reúnen los domingos para comer arroz con pollo a la guineana, hablan un español con cadencias propias, y mantienen vínculos con sus familias en Malabo o Bata a través de videollamadas diarias.

La diáspora ecuatoguineana comenzó a crecer significativamente durante los años del régimen de Macías Nguema, cuando el terror político expulsó del país a miles de profesionales e intelectuales.

Hoy, las razones de la emigración son más complejas: la búsqueda de oportunidades educativas, la reunificación familiar, el deseo de escapar de un sistema político que sigue siendo autoritario a pesar de la riqueza generada por el petróleo.`,
    tags: ['Diáspora', 'Migración', 'Identidad', 'España'],
  },
  {
    id: 5,
    cat: 'Arte',
    cc: 'cat-a',
    title: 'Leoncio Evita: el padre de la novela ecuatoguineana',
    sub: 'Cuando las olas se retiran (1953), la primera novela publicada en el África subsahariana hispanohablante',
    author: 'Donato Ndongo-Bidyogo',
    date: '28 Feb 2025',
    time: '9 min',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Lagos_street_1906.jpg/800px-Lagos_street_1906.jpg',
    excerpt:
      'La obra pionera de Leoncio Evita abrió el camino de la narrativa en lengua española en el África subsahariana.',
    body: `En 1953, cuando la mayoría de los africanos colonizados no tenían acceso a la educación formal, un joven guineano llamado Leoncio Evita Enoy publicó en Madrid una novela que pasaría a la historia de las letras africanas.

Cuando las olas se retiran narra la historia de un joven Fang que regresa de la ciudad a su aldea natal y debe negociar entre los valores tradicionales de su comunidad y los de la modernidad colonial que ha absorbido.

Lo extraordinario de la obra de Evita no es solo su valor literario, sino el gesto mismo de escribir: en un contexto en el que los africanos eran representados pero raramente se representaban a sí mismos, Evita tomó la pluma y construyó un mundo desde adentro.`,
    tags: ['Literatura', 'Leoncio Evita', 'Novela', 'Cultura'],
  },
  {
    id: 6,
    cat: 'Economía',
    cc: 'cat-e',
    title: 'Petróleo y pobreza: la paradoja de Guinea Ecuatorial',
    sub: 'A pesar de ser uno de los países con mayor PIB per cápita de África, la mayoría vive en pobreza',
    author: 'Joaquín Eyene',
    date: '25 Feb 2025',
    time: '11 min',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Douala_1900s.jpg/800px-Douala_1900s.jpg',
    excerpt:
      'El descubrimiento de petróleo en aguas guineanas en 1995 prometía transformar radicalmente el país. Treinta años después, el balance es ambivalente.',
    body: `En 1995, el descubrimiento de importantes yacimientos de petróleo en las aguas territoriales de Guinea Ecuatorial generó expectativas extraordinarias. El país se convertiría en décadas en el tercer productor de petróleo del continente subsahariano.

El crecimiento económico fue real y espectacular. El PIB per cápita, que en 1990 apenas superaba los 300 dólares anuales, alcanzó en 2012 más de 20.000 dólares.

Sin embargo, esta riqueza no se tradujo en mejoras generalizadas de las condiciones de vida. Según datos del PNUD, más del 75% de la población sigue viviendo en condiciones de pobreza multidimensional. La desigualdad extrema y la corrupción sistémica explican esta paradoja.`,
    tags: ['Economía', 'Petróleo', 'Desarrollo', 'Desigualdad'],
  },
  {
    id: 7,
    cat: 'Historia',
    cc: 'cat-h',
    title: 'Los Bubi: guardianes de la isla de Bioko',
    sub: 'El pueblo originario de Bioko mantuvo su autonomía frente a la colonización durante siglos',
    author: 'Teresa Mba',
    date: '22 Feb 2025',
    time: '7 min',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Cameroun_1915_cacao.jpg/800px-Cameroun_1915_cacao.jpg',
    excerpt:
      'La resistencia Bubi a la penetración colonial es una de las páginas menos conocidas y más fascinantes de la historia de Guinea Ecuatorial.',
    body: `La isla de Bioko —que los colonizadores llamaron Fernando Poo— estuvo habitada por el pueblo Bubi durante siglos antes de que la presencia europea transformara radicalmente su mundo.

Los Bubi son un pueblo bantú que llegó a la isla migrando desde el continente hace aproximadamente dos mil años. Organizados en clanes patrilineales con una sofisticada estructura política, habían desarrollado una cultura material y espiritual de gran riqueza.

La resistencia Bubi fue tenaz y prolongada. Varios levantamientos sacudieron la isla entre 1880 y 1910, siendo el más recordado el de 1898, cuando guerreros Bubi atacaron simultáneamente varios puestos coloniales.`,
    tags: ['Bubi', 'Bioko', 'Etnología', 'Resistencia'],
  },
  {
    id: 8,
    cat: 'Política',
    cc: 'cat-p',
    title: 'Teodoro Obiang: cuatro décadas en el poder',
    sub: 'El presidente más longevo de África sigue al frente del país que gobierna desde el golpe de 1979',
    author: 'Redacción',
    date: '20 Feb 2025',
    time: '8 min',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Fang_people_1910.jpg/800px-Fang_people_1910.jpg',
    excerpt:
      'Un análisis de los cuarenta y cinco años de mandato de Teodoro Obiang Nguema Mbasogo y el futuro político del país.',
    body: `El 3 de agosto de 1979, Teodoro Obiang Nguema Mbasogo derrocó a su propio tío, Francisco Macías Nguema, en un golpe de estado que puso fin a once años de terror político.

Obiang prometió apertura y democracia. Lo que llegó fue un régimen diferente en forma pero no radicalmente distinto en sustancia. La represión política continuó; el partido en el poder monopolizó la vida política; los opositores fueron encarcelados o exiliados.

El descubrimiento del petróleo en los años noventa transformó la ecuación política. Con recursos ingentes a su disposición, el régimen compró lealtades, financió infraestructuras y proyectó hacia el exterior una imagen de modernidad y estabilidad.`,
    tags: ['Obiang', 'Política', 'Gobierno', 'Historia'],
  },
];

export const TIMELINE = [
  { year: '1471', event: 'Llegada portuguesa a la isla de Bioko' },
  { year: '1778', event: 'España adquiere el territorio en el Tratado de El Pardo' },
  { year: '1843', event: 'Primer asentamiento permanente en Santa Isabel' },
  { year: '1904', event: 'Creación del Gobierno General del Golfo de Guinea' },
  { year: '1959', event: 'Guinea Ecuatorial declarada provincia española' },
  { year: '1968', event: 'Independencia — 12 de octubre' },
  { year: '1979', event: 'Golpe de estado de Obiang Nguema' },
  { year: '1995', event: 'Descubrimiento de reservas de petróleo' },
];

export const TICKER = [
  'NUEVA EXPOSICIÓN: Fotografías coloniales en el Archivo General de Alcalá',
  'PUBLICACIÓN: Nuevas memorias digitalizadas de la administración colonial (1885–1968)',
  'CULTURA: Festival de teatro en lengua Fang en Bata — del 15 al 22 de marzo',
  'HISTORIA: Conmemoración del 56.º aniversario de la independencia',
  'MÚSICA: Estreno del álbum de fusión tradicional de Eloína Monsuy',
];

export const CATS = [
  'Todo',
  'Historia',
  'Cultura',
  'Fotografía',
  'Sociedad',
  'Arte',
  'Economía',
  'Política',
];
