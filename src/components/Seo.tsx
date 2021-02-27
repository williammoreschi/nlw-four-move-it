import Head from 'next/head'

interface SeoProps {
  title: string
}

export function Seo({ title }: SeoProps) {
  return (
    <Head>
      <title>{title}</title>

      <link rel="shortcut icon" href="/favicon.png" />
      <meta name="keywords" content="move, exercise" />
      <meta name="description" content="Um aplicativo para fazer você se mover" />

      <meta property="og:site_name" content="Move It" />
      <meta property="og:title" content="Move It" />
      <meta property="og:description" content="Um aplicativo para fazer você se mover." />
      <meta property="og:image" content="/thumb.svg" />
      <meta name="twiiter:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/svg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:image" content="/thumb.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Move It" />
      <meta name="twitter:description" content="Um aplicativo para fazer você se mover." />
      <meta name="twiiter:create" content="williamoreschi" />
    </Head>
  )
}