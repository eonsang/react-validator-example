import axios from 'axios';
import { plainToInstanceWithValidate } from '../../utils/plainToInstanceWithValidate';
import request from '../request';
import { RegisterUserBodyDto, RegisterUserResponseDto } from './dtos';

export const registerUser = async (body: RegisterUserBodyDto) => {
  try {
    const { data } = await request.post<RegisterUserResponseDto>(
      '/users/add',
      body,
    );

    const response = plainToInstanceWithValidate(RegisterUserResponseDto, data);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(typeof error);
      throw error;
    }
  }
};
