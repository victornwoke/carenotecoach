import { Link } from 'react-router';

import { ROUTES } from '@/app/routes';
import { Seo } from '@/components/layout/Seo';
import { LegalLayout, LegalSection } from '@/components/legal/LegalLayout';
import { Fact, PendingNotice } from '@/components/legal/PendingNotice';
import { siteConfig } from '@/config/site';

export function SupportPage() {
  return (
    <>
      <Seo
        title="Support"
        description="Help with CareNote Coach: signing in, subscriptions, accessibility, privacy questions and content-accuracy reports."
        path={ROUTES.support}
        noIndex
      />

      <LegalLayout
        eyebrow="Help"
        title="Support"
        lastUpdated={siteConfig.lastUpdated.support}
        notice={<PendingNotice page="support" />}
      >
        <LegalSection heading="Handled inside the app, no waiting">
          <ul>
            <li>
              <strong>Delete your account or data.</strong> Account Settings has a working
              &ldquo;Delete account&rdquo; control that removes your account and everything
              linked to it immediately.{' '}
              <Link to={ROUTES.accountDeletion}>How deletion works</Link>.
            </li>
            <li>
              <strong>Manage or cancel Pro.</strong> Account Settings has a &ldquo;Manage
              subscription&rdquo; link that opens your Apple or Google subscription settings
              directly.
            </li>
            <li>
              <strong>Restore a purchase</strong> made on another device or after
              reinstalling. The Upgrade screen has a &ldquo;Restore purchases&rdquo; button.
            </li>
            <li>
              <strong>&ldquo;No obvious identifiers detected&rdquo;.</strong> This is expected
              wording. It means our heuristic check found nothing, not that your text is
              guaranteed anonymous.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="What to contact us about">
          <ul>
            <li>Trouble signing in, verifying your email, or resetting your password.</li>
            <li>
              A billing or subscription problem that &ldquo;Manage subscription&rdquo;
              doesn&rsquo;t resolve.
            </li>
            <li>
              A concern that a lesson, scenario or checker rule is factually wrong, outdated,
              or misattributed to the wrong nation&rsquo;s regulator.
            </li>
            <li>
              An accessibility barrier you hit using the app. See our{' '}
              <Link to={ROUTES.accessibility}>accessibility statement</Link>.
            </li>
            <li>
              A privacy or data question not answered by the{' '}
              <Link to={ROUTES.privacy}>Privacy Policy</Link>.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="How to contact us">
          <p>
            <Fact field="supportEmail">
              {(email) => (
                <a href={`mailto:${email}`} className="font-medium">
                  {email}
                </a>
              )}
            </Fact>
          </p>
        </LegalSection>

        <LegalSection heading="What isn't built yet">
          <p>
            Some things our own planning documents describe as needed before release are not
            in the app today, and we are not going to claim otherwise:
          </p>
          <ul>
            <li>
              <strong>In-app &ldquo;report incorrect output&rdquo; flow.</strong> Our release
              checklist calls for a live reporting path feeding a real content-review
              process. That path does not exist in the current build. Until it does, use the
              general contact route above for content-accuracy concerns.
            </li>
            <li>
              <strong>A public help centre or FAQ.</strong> Doesn&rsquo;t exist yet. These
              pages are the current substitute.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="Response times">
          {siteConfig.supportResponseTime ? (
            <p>{siteConfig.supportResponseTime}</p>
          ) : (
            <p>
              We have not set a response-time commitment, so we are not publishing one. We
              would rather say nothing than quote a number we have not committed to
              operationally.
            </p>
          )}
        </LegalSection>

        <LegalSection heading="Content-accuracy reports">
          <p>
            If you are reporting that a lesson, scenario or checker rule cites something
            incorrectly, a wrong regulation, a stale source, or a nation mismatch, that report
            is checked against our regulatory source register, reviewed by the relevant
            documentation reviewer, and by a legal or regulatory reviewer if it touches a
            legal claim, before any change ships.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
