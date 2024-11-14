import { useState, ChangeEvent, FormEvent } from 'react';

type CallbackFunction = () => void;

export const useForm = <T extends {}>(
  callback: CallbackFunction,
  initialState: T
) => {
  const [values, setValues] = useState<T>(initialState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
