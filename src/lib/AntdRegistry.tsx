'use client';

import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  const cache = createCache();
  useServerInsertedHTML(() => <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />);
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;
