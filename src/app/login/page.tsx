'use client';

import { FormTextField } from '@/components/form/FormTextField';
import { login } from '@/firebase/auth/login';
import { Button, Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginFormValue = {
  email: string;
  password: string;
};

export default function Login() {
  const { control, handleSubmit, setError } = useForm<LoginFormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValue> = async (data) => {
    const result = await login(data.email, data.password);

    if (result.isOk()) {
      alert('success');
    } else {
      setError('password', {
        type: 'server',
        message: result.error.message,
      });
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormTextField
              name="email"
              label="Email"
              type="email"
              control={control}
              rules={{
                required: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              name="password"
              label="Password"
              type="password"
              control={control}
              rules={{
                required: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" size="large" type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </main>
  );
}
