import { useForm } from 'react-hook-form';
import { RegisterUserBodyDto } from '../api/user/dtos';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/user/userAPI';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ErrorMessage } from '@hookform/error-message';
import { plainToInstanceWithValidate } from '../utils/plainToInstanceWithValidate';

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterUserBodyDto>({
    resolver: classValidatorResolver(RegisterUserBodyDto),
  });

  const registerUserMutation = useMutation({
    mutationFn(body: RegisterUserBodyDto) {
      return registerUser(body);
    },
    onSuccess(response) {
      console.log(response);
      alert(response?.fullName);
    },
    onError(error) {
      console.log(error);
    },
  });

  const onSubmit = handleSubmit(body => {
    const instance = plainToInstanceWithValidate(RegisterUserBodyDto, body);

    if (!instance.isEqualFullname()) {
      setError('fullName', {
        message: 'firstName과 lastName의 합과 같은 값이어야 합니다.',
      });
      return;
    }

    return registerUserMutation.mutate(instance);
  });

  return (
    <>
      <main>
        <form onSubmit={onSubmit}>
          <input
            defaultValue=''
            placeholder='firstName'
            {...register('firstName')}
          />
          <ErrorMessage errors={errors} name='firstName' />
          <br />
          <input
            defaultValue=''
            placeholder='lastName'
            {...register('lastName')}
            type={'lastName'}
          />
          <ErrorMessage errors={errors} name='lastName' />
          <br />

          <input
            defaultValue=''
            placeholder='full name'
            {...register('fullName')}
            type={'fullName'}
          />
          <ErrorMessage errors={errors} name='fullName' />
          <br />

          <input
            defaultValue=''
            placeholder='age'
            {...register('age', {
              valueAsNumber: true,
              required: true,
            })}
            type={'number'}
            min={14}
            max={100}
          />
          <ErrorMessage errors={errors} name='age' />
          <br />
          <button>저장</button>
        </form>
      </main>
    </>
  );
}
