import { ReactNode } from 'react';

declare const ClientProviders: {
  (props: { children: ReactNode }): JSX.Element;
};

export default ClientProviders;
