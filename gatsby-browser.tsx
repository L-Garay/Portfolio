import { GatsbyBrowser } from 'gatsby';
import wrapWithDeviceContext, {
  DeviceProvider,
} from './src/contexts/deviceContext';
import { wrapRootWithProviders } from './src/utils/wrapRootWithProviders';
import React from 'react';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] =
  wrapRootWithProviders([wrapWithDeviceContext]);
