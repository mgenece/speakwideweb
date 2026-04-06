import FooterFacebookIcon from '@/ui/Icons/FooterFacebookIcon';
import FooterInstagramIcon from '@/ui/Icons/FooterInstagramIcon';
import FooterLinkdinIcon from '@/ui/Icons/FooterLinkdinIcon';
import FooterXhandleIocn from '@/ui/Icons/FooterXhandleIocn';
import styled from '@emotion/styled';
import { Box, List, ListItem, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FooterWrap = styled(Box)`
  padding: 45px 0;
`;

const Footer = () => {
  const navItems = [
    {
      name: 'home',
      route: '/',
    },
    {
      name: 'About',
      route: '/about',
    },
    {
      name: 'Products',
      route: '/products',
    },
    {
      name: 'Package',
      route: '/package',
    },
    {
      name: 'Contact',
      route: '/contact',
    },
  ];
  const router = useRouter();

  return (
    <>
      <FooterWrap>
        <Container fixed>
          <Box className='ftr-wrapper'>
            <List className='quick-links'>
              {navItems.map((item, index) => (
                <ListItem disablePadding key={index}>
                  <Link
                    href={item?.route}
                    key={item.name}
                    className={router.pathname === item.route ? 'active' : ''}
                  >
                    {item?.name}
                  </Link>
                </ListItem>
              ))}
            </List>
            <Box className='ft-terms'>
              <List disablePadding>
                <ListItem disablePadding>
                  <Link href='/'>Terms & conditions</Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href='/'>Privacy policy </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href='/'>Trust center</Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href='/'>Cookie preferences</Link>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant='body1'>
                    Copyright © 2025 <Link href='/'>CycleSmart Tech.</Link> All rights reserved.
                  </Typography>
                </ListItem>
              </List>
            </Box>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              className='social-media-links'
            >
              <Link href='/'>
                <FooterFacebookIcon />
              </Link>
              <Link href='/'>
                <FooterInstagramIcon />
              </Link>
              <Link href='/'>
                <FooterXhandleIocn />
              </Link>
              <Link href='/'>
                <FooterLinkdinIcon />
              </Link>
            </Stack>
          </Box>
        </Container>
      </FooterWrap>
    </>
  );
};

export default Footer;
