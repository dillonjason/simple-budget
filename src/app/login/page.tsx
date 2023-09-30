import { Button, Grid, TextField } from '@mui/material';

export default function Login() {
  return (
    <main>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Email" type="email" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type="password" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" size="large">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </main>
  );
}
