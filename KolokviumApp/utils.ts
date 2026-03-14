export const YEARS = Array.from({ length: 2025 - 2010 + 1 }, (_, i) => 2025 - i)

export const SESSIONS = [
    { id: 'Winter', label: 'Zimowa' },
    { id: 'Summer', label: 'Letnia' }
] as const

export const STUDY_YEARS = [
    { id: 1, label: 'I' },
    { id: 2, label: 'II' },
    { id: 3, label: 'III' }
] as const

export const BREAKPOINTS = {
    xs: 0,
    sm: 380,
    md: 576,
    lg: 768,
    xl: 992
} as const

export interface Subject {
    id: string;
    name: string;
    icon: string;
}

export interface Direction {
    id: string;
    name: string;
    icon: string;
    subjects: Subject[];
}

export const universityData: Direction[] = [
    {
        id: 'biol_i_biotech',
        name: 'Biologia i biotechnologia',
        icon: '🧬',
        subjects: [
            { id: 'genetyka', name: 'Genetyka', icon: '🧬' },
            { id: 'mikrobiologia', name: 'Mikrobiologia', icon: '🧫' },
            { id: 'biochemia', name: 'Biochemia', icon: '🧪' },
            { id: 'ekologia', name: 'Ekologia', icon: '🌿' },
            { id: 'biol_mol', name: 'Biologia molekularna', icon: '🔬' },
            { id: 'met_biotech', name: 'Metody biotechnologiczne', icon: '⚙️' },
            { id: 'zaj_lab', name: 'Zajęcia laboratoryjne', icon: '🧑‍🔬' },
        ]
    },
    {
        id: 'chemia',
        name: 'Chemia',
        icon: '⚗️',
        subjects: [
            { id: 'chemia_org', name: 'Chemia organiczna', icon: '🧪' },
            { id: 'chemia_nieorg', name: 'Chemia nieorganiczna', icon: '🧊' },
            { id: 'chemia_fiz', name: 'Chemia fizyczna', icon: '⚖️' },
            { id: 'chemia_analit', name: 'Chemia analityczna', icon: '🔬' },
            { id: 'nanochemia', name: 'Nanochemia', icon: '⚛️' },
            { id: 'tech_chem', name: 'Technologia chemiczna', icon: '🏭' },
            { id: 'lab_chem', name: 'Laboratoria chemiczne', icon: '👨‍🔬' },
        ]
    },
    {
        id: 'mat_fiz_inf',
        name: 'Matematyka, fizyka i informatyka',
        icon: '💻',
        subjects: [
            { id: 'prog', name: 'Programowanie', icon: '⌨️' },
            { id: 'algorytmy', name: 'Algorytmy i str. danych', icon: '🏗️' },
            { id: 'bazy_danych', name: 'Bazy danych', icon: '🗄️' },
            { id: 'ai', name: 'Sztuczna inteligencja', icon: '🤖' },
            { id: 'ml', name: 'Uczenie maszynowe', icon: '📈' },
            { id: 'algebra', name: 'Algebra liniowa', icon: '📐' },
            { id: 'analiza', name: 'Analiza matematyczna', icon: '➗' },
            { id: 'fizyka_kwant', name: 'Fizyka kwantowa', icon: '🌌' },
        ]
    },
    {
        id: 'ekonomia',
        name: 'Ekonomia i zarządzanie',
        icon: '📊',
        subjects: [
            { id: 'mikro', name: 'Mikroekonomia', icon: '📉' },
            { id: 'makro', name: 'Makroekonomia', icon: '📈' },
            { id: 'finanse', name: 'Finanse przedsiębiorstw', icon: '💰' },
            { id: 'rachunkowosc', name: 'Rachunkowość', icon: '🧾' },
            { id: 'marketing', name: 'Marketing', icon: '📢' },
            { id: 'zarz_proj', name: 'Zarządzanie projektami', icon: '📋' },
            { id: 'statystyka', name: 'Statystyka', icon: '📊' },
        ]
    },
    {
        id: 'politologia',
        name: 'Politologia i stos. międzynar.',
        icon: '🌍',
        subjects: [
            { id: 'polityka_miedz', name: 'Polityka międzynarodowa', icon: '🤝' },
            { id: 'geopolityka', name: 'Geopolityka', icon: '🗺️' },
            { id: 'dyplomacja', name: 'Dyplomacja', icon: '🏛️' },
            { id: 'sys_polit', name: 'Systemy polityczne', icon: '⚖️' },
            { id: 'kom_med', name: 'Komunikacja medialna', icon: '📺' },
            { id: 'analiza_polit', name: 'Analiza polityczna', icon: '📊' },
        ]
    },
    {
        id: 'psychologia',
        name: 'Psychologia i pedagogika',
        icon: '🧠',
        subjects: [
            { id: 'psych_ogol', name: 'Psychologia ogólna', icon: '🧠' },
            { id: 'psych_spol', name: 'Psychologia społeczna', icon: '👥' },
            { id: 'psych_rozw', name: 'Psychologia rozwoju', icon: '📈' },
            { id: 'psych_klin', name: 'Psychologia kliniczna', icon: '⚕️' },
            { id: 'met_naucz', name: 'Metody nauczania', icon: '📚' },
            { id: 'diag_psych', name: 'Diagnostyka psychol.', icon: '📝' },
        ]
    },
    {
        id: 'prawo',
        name: 'Prawo i administracja',
        icon: '⚖️',
        subjects: [
            { id: 'prawo_konst', name: 'Prawo konstytucyjne', icon: '📜' },
            { id: 'prawo_cyw', name: 'Prawo cywilne', icon: '📂' },
            { id: 'prawo_karne', name: 'Prawo karne', icon: '🔒' },
            { id: 'prawo_admin', name: 'Prawo administracyjne', icon: '🏢' },
            { id: 'prawo_miedz', name: 'Prawo międzynarodowe', icon: '🌍' },
            { id: 'logika_praw', name: 'Logika prawnicza', icon: '🧠' },
        ]
    },
    {
        id: 'historia',
        name: 'Historia i archeologia',
        icon: '🏛️',
        subjects: [
            { id: 'hist_eur', name: 'Historia Europy', icon: '🗺️' },
            { id: 'met_arch', name: 'Metody archeologiczne', icon: '⛏️' },
            { id: 'hist_sredn', name: 'Historia średniowieczna', icon: '🏰' },
            { id: 'hist_kult', name: 'Historia kultury', icon: '🏺' },
            { id: 'analiza_zrodel', name: 'Analiza źródeł hist.', icon: '📜' },
        ]
    },
    {
        id: 'filologia',
        name: 'Filologia i języki obce',
        icon: '🗣️',
        subjects: [
            { id: 'gramat', name: 'Gramatyka języka', icon: '📖' },
            { id: 'literatura', name: 'Literatura', icon: '📚' },
            { id: 'translatoryka', name: 'Translatoryka', icon: '🔄' },
            { id: 'lingwistyka', name: 'Lingwistyka', icon: '🗣️' },
            { id: 'kultura_kraj', name: 'Kultura krajów', icon: '🌍' },
        ]
    },
    {
        id: 'geografia',
        name: 'Geografia i gospodarka przestrz.',
        icon: '⛰️',
        subjects: [
            { id: 'geologia', name: 'Geologia', icon: '🪨' },
            { id: 'kartografia', name: 'Kartografia', icon: '🗺️' },
            { id: 'gis', name: 'Systemy GIS', icon: '💻' },
            { id: 'plan', name: 'Planowanie przestrzenne', icon: '🏙️' },
            { id: 'ochrona', name: 'Ochrona środowiska', icon: '🌱' },
        ]
    }
];


