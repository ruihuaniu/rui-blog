



// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ruihua's Blog",
  tagline: 'A place to share my knowledge and ideas',
  url: 'https://blog.niuruihua.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Ruihua', // Usually your GitHub org/user name.
  projectName: 'Ruihua Blog', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },

  themes: ['@docusaurus/theme-live-codeblock'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // routeBasePath: '/docs',
          sidebarPath: require.resolve('./sidebars.js'),

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          blogSidebarTitle: 'All Blogs',
          blogSidebarCount: 'ALL',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Ruihua's Blog",
        logo: {
          alt: 'Ruihua Blog',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'leetcode/index',
            position: 'left',
            label: 'Leetcode',
          },
          //{ to: '/docs', label: 'Leetcode', position: 'left' },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            type: 'doc',
            docId: 'challenges/index',
            position: 'left',
            label: 'Challenges',
          },
          {
            to: '/tags',
            label: 'Tags',
            position: 'right',
          },
          {
            href: 'https://github.com/ruihuaniu/rui-blog',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Blog',
            items: [
              {
                label: 'Blog',
                to: '/',
              },
            ],
          },
          {
            title: 'Leetcode',
            items: [
              {
                label: 'Leetcode',
                to: '/docs/leetcode/',
              },
              {
                label: 'Challenges',
                to: '/docs/challenges/',
              },
            ],
          },
          {
            title: 'Tags',
            items: [
              {
                label: 'Tags',
                to: '/docs/tags/',
              },
            ],
          },
        //   {
        //     title: 'Community',
        //     items: [
        //       {
        //         label: 'Stack Overflow',
        //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //       },
        //       {
        //         label: 'Discord',
        //         href: 'https://discordapp.com/invite/docusaurus',
        //       },
        //       {
        //         label: 'Twitter',
        //         href: 'https://twitter.com/docusaurus',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More',
        //     items: [
        //       {
        //         label: 'Blog',
        //         to: '/blog',
        //       },
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/facebook/docusaurus',
        //       },
        //     ],
        //   },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ruihua All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },

    }),

  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        language: ["en", "zh"],
        indexDocs: false
      }
    ]

  ],
};

module.exports = config;

