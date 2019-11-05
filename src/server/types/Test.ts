import { gql } from 'apollo-server-express';

export interface Test {
  message: string;
}

export const TestDefType = gql`
  type Test {
    message: String
  }
`;

export const TestQueries = {
  test: (): {} => {
    return {
      message: 'Esto es una prueba',
    };
  },
};
