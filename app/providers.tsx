'use client';

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';

i18n.loadAndActivate({ locale: 'en', messages: {} });

export function Providers({ children }: { children: React.ReactNode }) {
    return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
