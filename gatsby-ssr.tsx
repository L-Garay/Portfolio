import { GatsbySSR } from 'gatsby';
import wrapWithDeviceContext, {
  DeviceProvider,
} from './src/contexts/deviceContext';
import { wrapRootWithProviders } from './src/utils/wrapRootWithProviders';
import React from 'react';

export const wrapRootElement: GatsbySSR['wrapRootElement'] =
  wrapRootWithProviders([wrapWithDeviceContext]);
