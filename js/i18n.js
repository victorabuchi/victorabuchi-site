/* UI strings, search index and hover-menu content, per language.
   Page copy itself lives in the HTML (English at /, Finnish at /fi/). */

(function () {
  const GITHUB = 'https://github.com/victorabuchi';
  const LINKEDIN = 'https://www.linkedin.com/in/victor-abuchi-06b086338';
  const EMAIL = 'mailto:contact@victorabuchi.com';

  const en = {
    ui: {
      searchLabel: 'Search',
      searchPlaceholder: 'Search victorabuchi.com',
      searchCancel: 'Cancel',
      quickLinks: 'Quick Links',
      results: 'Results',
      noResults: (q) => `No results for “${q}”.`,
      sending: 'Sending…',
      sent: 'Sent',
      tryAgain: 'Try again',
      send: 'Send',
    },

    quick: ['/projects/', '/case-studies/', '/resume/', '/contact/'],

    index: [
      { title: 'Home', url: '/', kind: 'Page', keywords: 'software developer landing etusivu' },
      { title: 'About', url: '/about/', kind: 'Page', keywords: 'student university eastern finland background why' },
      { title: 'Case Studies', url: '/case-studies/', kind: 'Page', keywords: 'work stories' },
      { title: 'Rannikon Case Study', url: '/case-studies/rannikon/', kind: 'Case study', keywords: 'timesheet farm berry payroll workforce next.js fastify postgresql' },
      { title: 'Projects', url: '/projects/', kind: 'Page', keywords: 'portfolio apps products' },
      { title: 'Services', url: '/services/', kind: 'Page', keywords: 'freelance hire web development shopify' },
      { title: 'Process', url: '/process/', kind: 'Page', keywords: 'how i work workflow' },
      { title: 'Skills', url: '/skills/', kind: 'Page', keywords: 'stack languages javascript typescript tools' },
      { title: 'Resume', url: '/resume/', kind: 'Page', keywords: 'cv experience education' },
      { title: 'Testimonials', url: '/testimonials/', kind: 'Page', keywords: 'reviews clients' },
      { title: 'Blog', url: '/blog/', kind: 'Page', keywords: 'writing posts articles' },
      { title: 'Contact', url: '/contact/', kind: 'Page', keywords: 'email phone message hire get in touch' },
      { title: 'Rannikon', url: '/projects/#rannikon', kind: 'Project', keywords: 'timesheet platform farm' },
      { title: 'Rannikon Mobile', url: '/projects/#rannikon-mobile', kind: 'Project', keywords: 'mobile companion javascript' },
      { title: 'Onshipy', url: '/projects/#onshipy', kind: 'Project', keywords: 'dropshipping shopify automation' },
      { title: 'Knewler', url: '/projects/#knewler', kind: 'Project', keywords: 'elearning multi-tenant training typescript' },
      { title: 'Swifrly', url: '/projects/#swifrly', kind: 'Project', keywords: 'crypto payments finance' },
      { title: 'Kuopas', url: '/projects/#kuopas', kind: 'Project', keywords: 'student housing kuopio chat noticeboard booking mobile expo typescript' },
      { title: 'Blanc', url: '/projects/#blanc', kind: 'Project', keywords: 'shopify theme liquid fashion online store 2.0' },
      { title: 'Onshipy Shopify App', url: '/projects/#onshipy-shopify-app', kind: 'Project', keywords: 'shopify app embedded polaris app bridge dropshipping' },
      { title: 'Kuopas Mobile', url: '/projects/#kuopas-mobile', kind: 'Project', keywords: 'kuopas mobile expo react native android ios' },
      { title: 'Rannikon Site', url: '/projects/#rannikon-site', kind: 'Project', keywords: 'website wordpress migration next.js farm coming soon' },
    ],

    menu: {
      '/about/': {
        label: 'Explore About',
        main: [['Overview', '/about/'], ['Skills', '/skills/'], ['Resume', '/resume/']],
        sideLabel: 'Connect',
        side: [['Contact', '/contact/'], ['GitHub', GITHUB], ['LinkedIn', LINKEDIN]],
      },
      '/case-studies/': {
        label: 'Explore Case Studies',
        main: [['Rannikon', '/case-studies/rannikon/'], ['All Case Studies', '/case-studies/']],
        sideLabel: 'Related',
        side: [['Projects', '/projects/'], ['Process', '/process/']],
      },
      '/projects/': {
        label: 'Explore Projects',
        main: [['Onshipy', '/projects/#onshipy'], ['Swifrly', '/projects/#swifrly'], ['Rannikon', '/projects/#rannikon']],
        sideLabel: 'More Projects',
        side: [['Kuopas', '/projects/#kuopas'], ['Blanc', '/projects/#blanc'], ['Rannikon Mobile', '/projects/#rannikon-mobile']],
      },
      '/services/': {
        label: 'Explore Services',
        main: [['Overview', '/services/'], ['Process', '/process/'], ['Case Studies', '/case-studies/']],
        sideLabel: 'Get Started',
        side: [['Contact', '/contact/'], ['Resume', '/resume/']],
      },
      '/process/': {
        label: 'Explore Process',
        main: [['Overview', '/process/'], ['Services', '/services/'], ['Case Studies', '/case-studies/']],
        sideLabel: 'See It in Practice',
        side: [['Rannikon Case Study', '/case-studies/rannikon/'], ['Projects', '/projects/']],
      },
      '/skills/': {
        label: 'Explore Skills',
        main: [['Overview', '/skills/'], ['Projects', '/projects/'], ['Resume', '/resume/']],
        sideLabel: 'Related',
        side: [['About', '/about/'], ['Case Studies', '/case-studies/']],
      },
      '/resume/': {
        label: 'Explore Resume',
        main: [['Overview', '/resume/'], ['Skills', '/skills/'], ['About', '/about/']],
        sideLabel: 'Get in Touch',
        side: [['Email', EMAIL], ['Contact', '/contact/']],
      },
      '/testimonials/': {
        label: 'Explore Testimonials',
        main: [['Overview', '/testimonials/'], ['Case Studies', '/case-studies/'], ['Projects', '/projects/']],
        sideLabel: 'Work With Me',
        side: [['Services', '/services/'], ['Contact', '/contact/']],
      },
      '/blog/': {
        label: 'Explore Blog',
        main: [['All Posts', '/blog/'], ['Projects', '/projects/']],
        sideLabel: 'Stay Updated',
        side: [['GitHub', GITHUB], ['LinkedIn', LINKEDIN]],
      },
      '/contact/': {
        label: 'Explore Contact',
        main: [['Contact', '/contact/'], ['Email', EMAIL], ['Send a Message', '/contact/#contact-form']],
        sideLabel: 'Elsewhere',
        side: [['GitHub', GITHUB], ['LinkedIn', LINKEDIN]],
      },
    },
  };

  const fi = {
    ui: {
      searchLabel: 'Haku',
      searchPlaceholder: 'Hae sivustolta victorabuchi.com',
      searchCancel: 'Peruuta',
      quickLinks: 'Pikalinkit',
      results: 'Tulokset',
      noResults: (q) => `Ei tuloksia haulle “${q}”.`,
      sending: 'Lähetetään…',
      sent: 'Lähetetty',
      tryAgain: 'Yritä uudelleen',
      send: 'Lähetä',
    },

    quick: en.quick,

    index: [
      { title: 'Etusivu', url: '/', kind: 'Sivu', keywords: 'home ohjelmistokehittäjä ohjelmistokehitys' },
      { title: 'Minusta', url: '/about/', kind: 'Sivu', keywords: 'about opiskelija itä-suomen yliopisto tausta miksi' },
      { title: 'Case-esimerkit', url: '/case-studies/', kind: 'Sivu', keywords: 'case studies työnäytteet tapaukset' },
      { title: 'Rannikon-case', url: '/case-studies/rannikon/', kind: 'Case-esimerkki', keywords: 'työaika tuntikirjanpito marjatila palkanlaskenta työvoima next.js fastify postgresql' },
      { title: 'Projektit', url: '/projects/', kind: 'Sivu', keywords: 'projects portfolio sovellukset tuotteet' },
      { title: 'Palvelut', url: '/services/', kind: 'Sivu', keywords: 'services freelance tilaa verkkokehitys shopify' },
      { title: 'Prosessi', url: '/process/', kind: 'Sivu', keywords: 'process työtapa työnkulku' },
      { title: 'Taidot', url: '/skills/', kind: 'Sivu', keywords: 'skills teknologiat kielet javascript typescript työkalut' },
      { title: 'CV', url: '/resume/', kind: 'Sivu', keywords: 'resume ansioluettelo kokemus koulutus' },
      { title: 'Suositukset', url: '/testimonials/', kind: 'Sivu', keywords: 'testimonials arvostelut asiakkaat' },
      { title: 'Blogi', url: '/blog/', kind: 'Sivu', keywords: 'blog kirjoitukset artikkelit' },
      { title: 'Yhteystiedot', url: '/contact/', kind: 'Sivu', keywords: 'contact sähköposti puhelin viesti ota yhteyttä' },
      { title: 'Rannikon', url: '/projects/#rannikon', kind: 'Projekti', keywords: 'työaikajärjestelmä marjatila' },
      { title: 'Rannikon Mobile', url: '/projects/#rannikon-mobile', kind: 'Projekti', keywords: 'mobiili mobiilisovellus javascript' },
      { title: 'Onshipy', url: '/projects/#onshipy', kind: 'Projekti', keywords: 'dropshipping shopify automaatio' },
      { title: 'Knewler', url: '/projects/#knewler', kind: 'Projekti', keywords: 'verkko-oppiminen elearning koulutus typescript' },
      { title: 'Swifrly', url: '/projects/#swifrly', kind: 'Projekti', keywords: 'krypto maksut rahoitus' },
      { title: 'Kuopas', url: '/projects/#kuopas', kind: 'Projekti', keywords: 'opiskelija-asuminen kuopio chat ilmoitustaulu varaukset mobiili expo typescript' },
      { title: 'Blanc', url: '/projects/#blanc', kind: 'Projekti', keywords: 'shopify teema liquid muoti verkkokauppa' },
      { title: 'Onshipy Shopify-sovellus', url: '/projects/#onshipy-shopify-app', kind: 'Projekti', keywords: 'shopify sovellus polaris app bridge dropshipping' },
      { title: 'Kuopas Mobile', url: '/projects/#kuopas-mobile', kind: 'Projekti', keywords: 'kuopas mobiili expo react native android ios' },
      { title: 'Rannikon-sivusto', url: '/projects/#rannikon-site', kind: 'Projekti', keywords: 'verkkosivusto wordpress migraatio next.js marjatila tulossa pian' },
    ],

    menu: {
      '/about/': {
        label: 'Tutustu: Minusta',
        main: [['Yleiskatsaus', '/about/'], ['Taidot', '/skills/'], ['CV', '/resume/']],
        sideLabel: 'Yhteys',
        side: [['Yhteystiedot', '/contact/'], ['GitHub', GITHUB], ['LinkedIn', LINKEDIN]],
      },
      '/case-studies/': {
        label: 'Tutustu: Case-esimerkit',
        main: [['Rannikon', '/case-studies/rannikon/'], ['Kaikki case-esimerkit', '/case-studies/']],
        sideLabel: 'Liittyvää',
        side: [['Projektit', '/projects/'], ['Prosessi', '/process/']],
      },
      '/projects/': {
        label: 'Tutustu: Projektit',
        main: [['Onshipy', '/projects/#onshipy'], ['Swifrly', '/projects/#swifrly'], ['Rannikon', '/projects/#rannikon']],
        sideLabel: 'Lisää projekteja',
        side: [['Kuopas', '/projects/#kuopas'], ['Blanc', '/projects/#blanc'], ['Rannikon Mobile', '/projects/#rannikon-mobile']],
      },
      '/services/': {
        label: 'Tutustu: Palvelut',
        main: [['Yleiskatsaus', '/services/'], ['Prosessi', '/process/'], ['Case-esimerkit', '/case-studies/']],
        sideLabel: 'Aloita tästä',
        side: [['Yhteystiedot', '/contact/'], ['CV', '/resume/']],
      },
      '/process/': {
        label: 'Tutustu: Prosessi',
        main: [['Yleiskatsaus', '/process/'], ['Palvelut', '/services/'], ['Case-esimerkit', '/case-studies/']],
        sideLabel: 'Käytännössä',
        side: [['Rannikon-case', '/case-studies/rannikon/'], ['Projektit', '/projects/']],
      },
      '/skills/': {
        label: 'Tutustu: Taidot',
        main: [['Yleiskatsaus', '/skills/'], ['Projektit', '/projects/'], ['CV', '/resume/']],
        sideLabel: 'Liittyvää',
        side: [['Minusta', '/about/'], ['Case-esimerkit', '/case-studies/']],
      },
      '/resume/': {
        label: 'Tutustu: CV',
        main: [['Yleiskatsaus', '/resume/'], ['Taidot', '/skills/'], ['Minusta', '/about/']],
        sideLabel: 'Ota yhteyttä',
        side: [['Sähköposti', EMAIL], ['Yhteystiedot', '/contact/']],
      },
      '/testimonials/': {
        label: 'Tutustu: Suositukset',
        main: [['Yleiskatsaus', '/testimonials/'], ['Case-esimerkit', '/case-studies/'], ['Projektit', '/projects/']],
        sideLabel: 'Tee yhteistyötä',
        side: [['Palvelut', '/services/'], ['Yhteystiedot', '/contact/']],
      },
      '/blog/': {
        label: 'Tutustu: Blogi',
        main: [['Kaikki kirjoitukset', '/blog/'], ['Projektit', '/projects/']],
        sideLabel: 'Pysy ajan tasalla',
        side: [['GitHub', GITHUB], ['LinkedIn', LINKEDIN]],
      },
      '/contact/': {
        label: 'Tutustu: Yhteystiedot',
        main: [['Yhteystiedot', '/contact/'], ['Sähköposti', EMAIL], ['Lähetä viesti', '/contact/#contact-form']],
        sideLabel: 'Muualla',
        side: [['GitHub', GITHUB], ['LinkedIn', LINKEDIN]],
      },
    },
  };

  window.SITE_I18N = { en, fi };
})();
