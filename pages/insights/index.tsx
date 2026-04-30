import Wrapper from '@/layout/wrapper/Wrapper';
import { Box, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
}

interface InsightsProps {
  articles: Article[];
}

const categoryColors: Record<string, string> = {
  compliance: '#1976d2',
  legal: '#7b1fa2',
  medical: '#388e3c',
  business: '#f57c00',
  industry: '#5B3FA5',
};

export default function InsightsPage({ articles }: InsightsProps) {
  return (
    <Wrapper isFixedHeader>
      <Head>
        <title>Insights | Speakwide</title>
        <meta
          name='description'
          content='Expert guidance on language access, compliance, and interpretation for healthcare, legal, and business professionals.'
        />
      </Head>
      <Container maxWidth='lg'>
        <Box py={8}>
          {/* Header */}
          <Box textAlign='center' mb={6}>
            <Typography variant='h3' component='h1' gutterBottom fontWeight={700}>
              Speakwide Insights
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' maxWidth={600} mx='auto'>
              Expert guidance on language access, compliance, and interpretation for healthcare,
              legal, and business professionals.
            </Typography>
          </Box>

          {/* Article grid */}
          {articles.length === 0 ? (
            <Typography color='text.secondary' textAlign='center'>
              No articles available yet. Check back soon.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {articles.map(article => (
                <Grid key={article.slug} item xs={12} sm={6} md={4}>
                  <Card
                    component={NextLink}
                    href={`/insights/${article.slug}`}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                      '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Chip
                        label={article.category.toUpperCase()}
                        size='small'
                        sx={{
                          alignSelf: 'flex-start',
                          bgcolor: categoryColors[article.category] ?? '#5B3FA5',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.65rem',
                        }}
                      />
                      <Typography variant='h6' sx={{ lineHeight: 1.35, fontWeight: 700 }}>
                        {article.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary' sx={{ flexGrow: 1 }}>
                        {article.excerpt}
                      </Typography>
                      <Typography variant='caption' color='text.secondary' mt={1}>
                        {article.date
                          ? new Date(article.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : ''}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
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

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      result[line.slice(0, colonIdx).trim()] = line.slice(colonIdx + 1).trim();
    }
  });
  return result;
}

// ââ Data fetching âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(
      'https://api.github.com/repos/mgenece/speakwideweb/contents/articles',
      { headers: { Accept: 'application/vnd.github.v3+json' } },
    );
    if (!res.ok) return { props: { articles: [] } };

    const files: Array<{ name: string; download_url: string }> = await res.json();
    const mdFiles = files.filter(f => f.name.endsWith('.md'));

    const articles = await Promise.all(
      mdFiles.map(async file => {
        const contentRes = await fetch(file.download_url);
        const raw = await contentRes.text();
        const fm = parseFrontmatter(raw);
        return {
          slug: fileNameToSlug(file.name),
          title: fm.title ?? '',
          date: fm.date ?? '',
          excerpt: fm.excerpt ?? '',
          category: fm.category ?? '',
        };
      }),
    );

    // Sort newest first
    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { props: { articles } };
  } catch {
    return { props: { articles: [] } };
  }
};
