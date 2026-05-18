module.exports = {
  siteName: '中科芯云-高性能EDA平台',
  copyright: '版权所有 © 2023',
  links: [
    {
      // title: "中国科学院EDA中心",
      title: "中科芯云微电子科技有限公司",
      key: 'chip-cloud',
      href: 'http://www.chip-cloud.com/',
      // href: 'http://www.eda.ac.cn/',
      blankTarget: true
    }
  ],
  logoPath: '/logo.svg',
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/login/, /password_find/, /register/, /remoteConn/, /agreement/, /onlinePay/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'pt-br',
        title: 'Português',
        flag: '/brazil.svg',
      },
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'en',
  },

  defaultHeadImg: '/group1/M00/00/00/rBIAq2D_vJOATX4NAAFiDeVeymA442.png',
}
