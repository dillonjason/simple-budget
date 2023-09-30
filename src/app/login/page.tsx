import { Button, TextField } from '@mui/material';

export default function Login() {
  return (
    <main>
      <form>
        <TextField label="Email" type="email" />
        <TextField label="Password" type="password" />
        <Button>Login</Button>
      </form>
    </main>
  );
}
