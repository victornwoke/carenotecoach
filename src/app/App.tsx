import { BrowserRouter, Route, Routes } from 'react-router';

import { RootLayout } from '@/components/layout/RootLayout';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { AccessibilityPage } from '@/pages/AccessibilityPage';
import { AccountDeletionPage } from '@/pages/AccountDeletionPage';
import { ContactPage } from '@/pages/ContactPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { SubscriptionTermsPage } from '@/pages/SubscriptionTermsPage';
import { SupportPage } from '@/pages/SupportPage';
import { TermsPage } from '@/pages/TermsPage';

import { ROUTES } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.privacy} element={<PrivacyPage />} />
          <Route path={ROUTES.terms} element={<TermsPage />} />
          <Route path={ROUTES.support} element={<SupportPage />} />
          <Route path={ROUTES.accountDeletion} element={<AccountDeletionPage />} />
          <Route path={ROUTES.accessibility} element={<AccessibilityPage />} />
          <Route path={ROUTES.subscriptionTerms} element={<SubscriptionTermsPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
