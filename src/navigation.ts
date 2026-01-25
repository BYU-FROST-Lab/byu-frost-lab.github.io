import { getPermalink} from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Research',
      href: getPermalink('/research'),
      // links: [
      //   {
      //     text: 'SaaS',
      //     href: getPermalink('/homes/saas'),
      //   },
      //   {
      //     text: 'Startup',
      //     href: getPermalink('/homes/startup'),
      //   },
      // ],
    },
    {
      text: 'Lab Members',
      href: getPermalink('/people'),
    },
    {
      text: 'Publications',
      href: getPermalink('/publications'),
    },
    {
      text: 'Robots',
      href: getPermalink('/robots'),
    },
    {
      text: 'Facilities',
      href: getPermalink('/facilities'),
    },
  ],
  actions: [{ text: 'Get Involved', href: getPermalink('/get-involved')}],
};

export const footerData = {
  links: [
    {
      title: 'FROST Lab Links',
      links: [
        { text: 'People', href: getPermalink('/people') },
        { text: 'Research', href: getPermalink('/research') },
        { text: 'Publications', href: getPermalink('/publications') },
        { text: 'Robots', href: getPermalink('/robots') },
        { text: 'Facilities', href: getPermalink('/facilities') },
        { text: 'Get Involved', href: getPermalink('/get-involved') },
      ],
    },
    {
      title: 'Related Webpages',
      links: [
        { text: 'BYU Homepage', href: 'https://byu.edu/' },
        { text: 'BYU Robotics REU', href: 'https://robotics.byu.edu/' },
        { text: 'BYU ECE', href: 'https://ece.byu.edu/' },
        { text: 'BYU Mech. Eng.', href: 'https://www.me.byu.edu/' },
      ],
    },
    // {
    //   title: 'Social Media',
    //   links: [
    //     { text: 'LinkedIn', href: 'https://www.linkedin.com/company/byu-frost-lab/' },
    //     { text: 'GitHub', href: 'https://github.com/byu-frost-lab' },
    //     { text: 'Twitter', href: 'https://x.com/byu-frost-lab' },
    //     { text: 'YouTube', href: 'https://www.youtube.com/@byufrostlab' },
    //   ],
    // },
    {
      title: 'Resources',
      links: [
        { text: 'Office of Belonging', href: 'https://belonging.byu.edu/' },
        { text: 'Student Development', href: 'https://sds.byu.edu' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Brigham Young University', href: 'https://www.byu.edu/' },
    // { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/byu-frost-lab' },
    // { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/byu-frost-lab/' },
    // { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/@byufrostlab' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/byu-frost-lab' },
  ],
  footNote: `
    Built using <a class="text-blue-400 underline dark:text-muted" href="https://github.com/arthelokyo"> Arthelokyo Theme</a> · All rights reserved.
  `,
};
