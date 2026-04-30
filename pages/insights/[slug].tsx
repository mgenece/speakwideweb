import Wrapper from '@/layout/wrapper/Wrapper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Chip, Container, Divider, Link as MuiLink, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

interface ArticlePageProps {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  contentHtml: string;
}

const categoryColors: Record<string, string> = {
  compliance: '#1976d2',
  legal: '#7b1fa2',
  medical: '#388e3c',
  business: '#f57c00',
  industry: '#5B3FA5',
};

export default function ArticlePage({ title, date, excerpt, category, contentHtml }: ArticlePageProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <Wrapper isFixedHeader>
      <Head>
        <title>{title} | Speakwide Insights</title>
        <meta name='description' content={excerpt} />
      </Head>
      <Container maxWidth='md'>
        <Box py={8}>
          {/* Back link */}
          <MuiLink
            component={NextLink}
            href='/insights'
            underline='hover'
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: '#5B3FA5', mb: 4 }}
          >
            <ArrowBackIcon fontSize='small' />
            Back to Insights
          </MuiLink>

          {/* Category chip */}
          <Chip
            label={category.toUpperCase()}
            size='small'
            sx={{
              display: 'block',
              width: 'fit-content',
              mb: 2,
              bgcolor: categoryColors[category] ?? '#5B3FA5',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.7rem',
            }}
          />

          {/* Title */}
          <Typography variant='h3' component='h1' gutterBottom sx={{ lineHeight: 1.25, fontWeight: 700 }}>
            {title}
          </Typography>

          {/* Date */}
          {formattedDate && (
            <Typography variant='body2' color='text.secondary' mb={1}>
              {formattedDate}
            </Typography>
          )}

          {/* Excerpt */}
          {excerpt && (
            <Typography variant='subtitle1' color='text.secondary' fontStyle='italic' mb={4}>
              {excerpt}
            </Typography>
          )}

          <Divider sx={{ mb: 4 }} />

          {/* Article body */}
          <Box
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            sx={{
              '& h1': { display: 'none' },
              '& h2': { mt: 4, mb: 2, fontSize: '1.4rem', fontWeight: 700 },
              '& h3': { mt: 3, mb: 1.5, fontSize: '1.15rem', fontWeight: 600 },
              '& p': { mb: 2, lineHeight: 1.8 },
              '& ul, & ol': { mb: 2, pl: 3 },
              '& li': { mb: 0.5, lineHeight: 1.7 },
              '& strong': { fontWeight: 700 },
              '& a': { color: '#5B3FA5' },
              '& blockquote': {
                borderLeft: '4px solid #5B3FA5',
                pl: 2,
                ml: 0,
                color: 'text.secondary',
                fontStyle: 'italic',
              },
              '& table': { width: '100%', borderCollapse: 'collapse', mb: 3 },
              '& th, & td': { border: '1px solid', borderColor: 'divider', p: 1.5, textAlign: 'left' },
              '& th': { bgcolor: 'grey.100', fontWeight: 700 },
            }}
          />

          <Divider sx={{ mt: 6, mb: 3 }} />

          {/* Bottom back link */}
          <MuiLink
            component={NextLink}
            href='/insights'
            underline='hover'
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: '#5B3FA5' }}
          >
            <ArrowBackIcon fontSize='small' />
            Back to Insights
          </MuiLink>
        </Box>
      </Container>
    </Wrapper>
  );
}

// ââ Helpers ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function fileNameToSlug(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatter: Record<string, string> = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      frontmatter[line.slice(0, colonIdx).trim()] = line.slice(colonIdx + 1).trim();
    }
  });

  return { frontmatter, body: match[2] };
}

// ââ Data fetching âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    // 1. Get list of article files from GitHub
    const listRes = await fetch(
      'https://api.github.com/repos/mgenece/speakwideweb/contents/articles',
      { headers: { Accept: 'application/vnd.github.v3+json' } },
    );
    if (!listRes.ok) return { notFound: true };

    const files: Array<{ name: string; download_url: string }> = await listRes.json();

    // 2. Find file whose slug matches the URL param
    const file = files.find(f => f.name.endsWith('.md') && fileNameToSlug(f.name) === slug);
    if (!file) return { notFound: true };

    // 3. Fetch raw markdown
    const rawRes = await fetch(file.download_url);
    const raw = await rawRes.text();
    const { frontmatter, body } = parseFrontmatter(raw);

    // 4. Render markdown to HTML via GitHub API (no extra npm packages needed)
    const renderRes = await fetch('https://api.github.com/markdown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({ text: body, mode: 'gfm' }),
    });
    const contentHtml = renderRes.ok ? await renderRes.text() : `<pre>${body}</pre>`;

    return {
      props: {
        title: frontmatter.title ?? '',
        date: frontmatter.date ?? '',
        excerpt: frontmatter.excerpt ?? '',
        category: frontmatter.category ?? '',
        contentHtml,
      },
    };
  } catch {
    return { notFound: true };
  }
};
