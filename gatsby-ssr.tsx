import { GatsbySSR } from 'gatsby';
import wrapWithDeviceContext from './src/contexts/deviceContext';
import wrapWithIntroContext from './src/contexts/introContext';
import { wrapRootWithProviders } from './src/utils/wrapRootWithProviders';
import React from 'react';

export const wrapRootElement: GatsbySSR['wrapRootElement'] =
  wrapRootWithProviders([wrapWithDeviceContext, wrapWithIntroContext]);
