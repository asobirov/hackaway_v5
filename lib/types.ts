import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  navbarTitle?: string;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};