export const site = {
  name: {
    fa: process.env.NEXT_PUBLIC_FA_SITE_NAME,
    en: process.env.NEXT_PUBLIC_EN_SITE_NAME,
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  slogan: process.env.NEXT_PUBLIC_SITE_SLOGAN,

  author: {
    name: {
      fa: process.env.NEXT_PUBLIC_FA_AUTHOR_NAME,
      en: process.env.NEXT_PUBLIC_EN_AUTHOR_NAME,
    },
    socials: {
      linkedin: process.env.NEXT_PUBLIC_AUTHOR_LINKEDIN,
    },
  },
  url: {
    main: process.env.NEXT_PUBLIC_SITE_ADDRESS,
    local: process.env.NEXT_PUBLIC_SITE_ADDRESS_LOCAL,
  },
  apiUrl: {
    main: process.env.NEXT_PUBLIC_BASE_API_URL,
    local: process.env.NEXT_PUBLIC_BASE_API_URL_LOCAL,
  },
};
