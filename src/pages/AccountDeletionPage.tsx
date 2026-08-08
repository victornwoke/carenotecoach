import { Link } from 'react-router';

import { ROUTES } from '@/app/routes';
import { Seo } from '@/components/layout/Seo';
import { LegalLayout, LegalSection } from '@/components/legal/LegalLayout';
import { Fact, PendingNotice } from '@/components/legal/PendingNotice';
import { siteConfig } from '@/config/site';

export function AccountDeletionPage() {
  return (
    <>
      <Seo
        title="Delete your account"
        description="How to permanently delete your CareNote Coach account and everything linked to it, from inside the app."
        path={ROUTES.accountDeletion}
        noIndex
      />

      <LegalLayout
        eyebrow="Your data"
        title="Delete your account"
        lastUpdated={siteConfig.lastUpdated.accountDeletion}
        notice={<PendingNotice page="accountDeletion" />}
        intro="Unlike most of these pages, the feature described here is already built and working in the app. What is pending is the public wording, not the mechanism."
      >
        <LegalSection heading="How to delete your account">
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Open the app and go to <strong>Account Settings</strong>.
            </li>
            <li>
              Select <strong>Delete account</strong>.
            </li>
            <li>
              Confirm. The app shows exactly what this removes before you confirm, and asks
              you to confirm a second time.
            </li>
          </ol>
          <p>
            That is it. There is no separate web form and no waiting period: deletion happens
            immediately when you confirm.
          </p>
        </LegalSection>

        <LegalSection heading="What gets deleted">
          <p>Your sign-in identity and every row in our database linked to your account:</p>
          <ul>
            <li>Your account credentials and sign-in identity.</li>
            <li>Your optional display name.</li>
            <li>Your professional profile: jurisdiction, role and work setting.</li>
            <li>Your lesson and knowledge-check completion history.</li>
            <li>Your fictional practice-scenario results.</li>
            <li>Your notification and learning-reminder preferences.</li>
            <li>Your subscription and entitlement record.</li>
            <li>The record that you acknowledged our Privacy Policy.</li>
          </ul>
          <p>
            This is a hard delete, not a soft-delete flag. It cannot be undone, and we cannot
            recover it for you afterwards.
          </p>
        </LegalSection>

        <LegalSection heading="What this does not delete">
          <ul>
            <li>
              <strong>An active Pro subscription with Apple or Google.</strong> Deleting your
              CareNote Coach account does not cancel a subscription billed through the App
              Store or Play Store. Cancel it separately if you do not want it to keep
              renewing. See the <Link to={ROUTES.subscriptionTerms}>subscription terms</Link>.
            </li>
            <li>
              <strong>Records Apple, Google or our billing provider keep</strong> for their
              own transaction and tax purposes. Those are governed by their policies, not
              ours.
            </li>
            <li>
              <strong>Aggregate analytics events already sent</strong>, if any. These never
              contain your name or anything you typed, only non-identifying categories, so
              there is nothing identifying left to remove from them.
            </li>
          </ul>
          <p>
            There was never a permanent copy of your Write or Check content to delete in the
            first place. That content only ever existed in your device&rsquo;s memory for the
            active session, and is already gone once you close the app or delete the draft
            yourself.
          </p>
        </LegalSection>

        <LegalSection heading="If you can't sign in">
          <p>
            If you want your account deleted but cannot get into the app to do it yourself:{' '}
            <Fact field="contactEmail">
              {(email) => (
                <a href={`mailto:${email}`} className="font-medium">
                  {email}
                </a>
              )}
            </Fact>
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
