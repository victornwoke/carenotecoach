import { Link } from 'react-router';

import { ROUTES } from '@/app/routes';
import { Seo } from '@/components/layout/Seo';
import { LegalLayout, LegalSection } from '@/components/legal/LegalLayout';
import { PendingNotice } from '@/components/legal/PendingNotice';
import { siteConfig } from '@/config/site';

export function SubscriptionTermsPage() {
  return (
    <>
      <Seo
        title="Subscription terms"
        description="What is free forever in CareNote Coach, what Pro adds, and how billing, cancelling and refunds work."
        path={ROUTES.subscriptionTerms}
        noIndex
      />

      <LegalLayout
        eyebrow="Pro"
        title="Subscription terms"
        lastUpdated={siteConfig.lastUpdated.subscriptionTerms}
        notice={<PendingNotice page="subscriptionTerms" />}
        intro="A plain-English summary. It does not replace Apple's or Google's own subscription terms, which also apply to any purchase you make."
      >
        <LegalSection heading="Free, forever">
          <p>
            You never have to pay to get real value from CareNote Coach. Free includes,
            permanently:
          </p>
          <ul>
            <li>The full core documentation-learning curriculum and its knowledge checks.</li>
            <li>Core fictional practice scenarios.</li>
            <li>Basic progress tracking.</li>
            <li>
              Fair-use access to Write and Check, including every safety control that makes
              them safe to use. The identifier check and the No Invention evidence system are
              never a paid add-on.
            </li>
            <li>
              Jurisdiction, role and work-setting selection across all four UK nations.
            </li>
          </ul>
          <p>
            This list, and the rule that essential safety education is never paywalled, is a
            permanent product commitment.
          </p>
        </LegalSection>

        <LegalSection heading="What Pro adds">
          <p>
            Pro is optional. It adds convenience and advanced assistance on top of the free
            product, never by taking something away from it. Pro can include:
          </p>
          <ul>
            <li>Higher Write and Check usage limits than the free fair-use level.</li>
            <li>AI-assisted restructuring, once that is live.</li>
            <li>Voice input.</li>
            <li>Advanced practice-scenario packs and advanced learning modules.</li>
            <li>Full downloadable learning reports.</li>
            <li>Additional note templates.</li>
          </ul>
          <p>
            The list shown in the app&rsquo;s Upgrade screen is the current, authoritative
            list. This page is a summary, not the source of truth for what is gated.
          </p>
        </LegalSection>

        <LegalSection heading="Price">
          <p>
            We do not quote a price here, because it is set by the App Store or Play Store
            for your region and can change. The exact current price is always shown on the
            Upgrade screen before you buy, taken live from the store listing, never a figure
            hard-coded into the app.
          </p>
        </LegalSection>

        <LegalSection heading="Billing and renewal">
          <ul>
            <li>
              Pro is billed and auto-renews through Apple&rsquo;s App Store or Google&rsquo;s
              Play Store. We do not process your payment and never see your card details.
            </li>
            <li>
              It renews automatically at the end of each billing period unless you cancel
              before the renewal date.
            </li>
            <li>
              Managing your subscription happens through your Apple or Google account
              settings. The app&rsquo;s &ldquo;Manage subscription&rdquo; link takes you
              there directly.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="Cancelling">
          <p>
            Cancel any time through your Apple or Google subscription settings, or via
            &ldquo;Manage subscription&rdquo; in the app. If you cancel you keep Pro access
            until the end of the period you have already paid for, then the account reverts
            to Free.
          </p>
        </LegalSection>

        <LegalSection heading="If your subscription lapses">
          <p>
            Your account reverts to Free. This is never a data-loss event: your learning
            progress, practice history and anything you have already generated stay exactly
            as they were. Only forward access to Pro-only features and higher usage limits
            reverts to the Free level.
          </p>
        </LegalSection>

        <LegalSection heading="Restoring a purchase">
          <p>
            If you reinstall the app or sign in on a new device, use &ldquo;Restore
            purchases&rdquo; on the Upgrade screen to re-link an existing subscription
            without being charged again.
          </p>
        </LegalSection>

        <LegalSection heading="Refunds">
          <p>
            Refunds are handled by Apple or Google under their own policies, not by us
            directly, since they process the payment.
          </p>
        </LegalSection>

        <LegalSection heading="Deleting your account with an active subscription">
          <p>
            Deleting your CareNote Coach account does not automatically cancel a subscription
            billed through Apple or Google. Cancel it separately first if you do not want it
            to keep renewing. See{' '}
            <Link to={ROUTES.accountDeletion}>how account deletion works</Link>.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
