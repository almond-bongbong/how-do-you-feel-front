import React, { ReactElement } from 'react';
import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
  keyword?: string;
  canonical?: string;
}

const SITE_TITLE = '지금, 가장 괜찮은 장소';
const SITE_DESCRIPTION = '뭐할지 모르겠어요. 지금, 가장 괜찮은 장소를 찾아보세요.';
const SITE_KEYWORD = '장소, 지역, 인기, 추천, 장소추천, 장소추천사이트, 장소추천서비스';

function SEO({
  title,
  description = SITE_DESCRIPTION,
  keyword = SITE_KEYWORD,
  canonical,
}: Props): ReactElement {
  return (
    <Head>
      <title>
        {title && `${title} - `}
        {SITE_TITLE}
      </title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />

      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  );
}

export default SEO;
