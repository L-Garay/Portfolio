import { GatsbyBrowser } from 'gatsby';
import wrapWithDeviceContext from './src/contexts/deviceContext';
import wrapWithIntroContext from './src/contexts/introContext';
import { wrapRootWithProviders } from './src/utils/wrapRootWithProviders';
import React, { ReactNode } from 'react';
// import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import '@contentful/live-preview/style.css';

// const ContentfulLivePreview = ({ element }: { element: ReactNode }) => {
//   return (
//     <ContentfulLivePreviewProvider
//       locale="en-US"
//       enableInspectorMode={true}
//       enableLiveUpdates={true}
//       debugMode={true}
//     >
//       {element}
//     </ContentfulLivePreviewProvider>
//   );
// };

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] =
  wrapRootWithProviders([wrapWithDeviceContext, wrapWithIntroContext]);
