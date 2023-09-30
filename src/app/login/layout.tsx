import { Container } from '@mui/material';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '25%' }}>
      {children}
    </Container>
  );
}
