'use client';

import React from 'react';
import { type Locale } from '@/lib/i18n/config';

export interface FooterProps {
  locale: Locale;
}

// Footer hidden — will be replaced with a custom footer later.
export const Footer: React.FC<FooterProps> = () => {
  return null;
};

export default Footer;
