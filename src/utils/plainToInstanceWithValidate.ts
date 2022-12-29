import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export function plainToInstanceWithValidate<T, V>(
  instance: ClassConstructor<T>,
  plain: V,
): T {
  const inst = plainToInstance(instance, plain);

  validateOrReject(inst as ClassConstructor<T>);

  return inst;
}
