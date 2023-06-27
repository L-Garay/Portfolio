import { GatsbyBrowser } from 'gatsby';
import wrapWithDeviceContext from './src/contexts/deviceContext';
import wrapWithIntroContext from './src/contexts/introContext';
import { wrapRootWithProviders } from './src/utils/wrapRootWithProviders';
import React, { ReactNode } from 'react';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

const ContentfulLivePreview = ({ element }: { element: ReactNode }) => {
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={false}
      enableLiveUpdates
      debugMode={false}
    >
      {element}
    </ContentfulLivePreviewProvider>
  );
};

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] =
  wrapRootWithProviders([
    wrapWithDeviceContext,
    wrapWithIntroContext,
    ContentfulLivePreview
  ]);
