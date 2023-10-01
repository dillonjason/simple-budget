import { TextField, TextFieldProps } from '@mui/material';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

interface FormTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'variant'> {
  name: Path<T>;
  control: Control<T, unknown>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
}

export function FormTextField<T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: FormTextFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={(renderProps) => (
        <TextField
          {...props}
          helperText={
            renderProps.fieldState.error
              ? renderProps.fieldState.error.message
              : null
          }
          error={!!renderProps.fieldState.error}
          {...renderProps.field}
        />
      )}
    />
  );
}
