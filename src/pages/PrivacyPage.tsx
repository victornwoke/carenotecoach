import { Link } from 'react-router';

import { ROUTES } from '@/app/routes';
import { Seo } from '@/components/layout/Seo';
import { LegalLayout, LegalSection } from '@/components/legal/LegalLayout';
import { Fact, PendingNotice } from '@/components/legal/PendingNotice';
import { siteConfig } from '@/config/site';

const SUBPROCESSORS = [
  {
    provider: 'Supabase',
    does: 'Account authentication and database hosting for account, profile and learning data',
    receives: 'Account identity, profile, learning-progress data',
  },
  {
    provider: 'RevenueCat',
    does: 'Subscription and entitlement management',
    receives: 'Your app account ID. Never care content, never a service-user identifier',
  },
  {
    provider: 'Apple / Google',
    does: 'Optional sign-in and app store billing',
    receives: 'Identity token, or payment handled entirely by the platform',
  },
  {
    provider: 'Crash reporting',
    does: 'Crash diagnostics, when active for your build',
    receives: 'Scrubbed crash data, excluding free-text field contents',
  },
] as const;

const RETENTION = [
  ['Account credentials', 'For as long as your account exists'],
  ['Optional display name', 'For as long as your account exists, or until you remove it'],
  ['Lesson and scenario progress', 'For as long as your account exists'],
  ['Write and Check drafts', 'In memory for the current app session only. Not persisted'],
  ['Subscription and entitlement data', 'For as long as your account exists'],
  ['Privacy-acknowledgement record', 'Timestamp and policy version only'],
  ['Analytics events', "Per the provider's retention, once one is connected. None is today"],
] as const;

export function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How CareNote Coach handles your data. We do not store the body of a real-world care note, and we never use your content to train an AI model."
        path={ROUTES.privacy}
        noIndex
      />

      <LegalLayout
        eyebrow="Legal"
        title="Privacy Policy"
        lastUpdated={siteConfig.lastUpdated.privacy}
        notice={<PendingNotice page="privacy" />}
        intro="This policy covers CareNote Coach, a UK care-documentation education app. It does not cover any other product."
      >
        <LegalSection heading="Who this policy is about">
          <p>
            <strong>Data controller:</strong> <Fact field="legalEntityName" />
          </p>
          <p>
            <strong>Data protection contact:</strong> <Fact field="contactEmail" />
          </p>
        </LegalSection>

        <LegalSection heading="The short version">
          <ul>
            <li>
              We do not store the body of a real-world care note. Write and Check content
              lives only in your device&rsquo;s memory for the active app session and is
              deleted when you delete it, sign out, or close the app.
            </li>
            <li>
              We check your Write and Check text for likely identifiers before any local
              processing happens, and block processing until you have edited the text. This
              is a safety aid, <strong>not a guarantee that your text is anonymous</strong>.
              You are always responsible for reviewing your own text.
            </li>
            <li>We never use your content to train an AI model.</li>
            <li>
              We collect account data, your professional profile, your learning progress,
              and a short allow-list of non-identifying usage events. We never send note
              content, transcripts, or identifier-detection hits to analytics or crash
              reporting.
            </li>
            <li>We run no advertising and no ad tracking of any kind.</li>
            <li>
              You can <Link to={ROUTES.accountDeletion}>delete your account</Link> and
              everything linked to it at any time.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="What we collect">
          <p>
            <strong>Account and profile.</strong> The identity information needed for your
            sign-in method (Apple, Google, or email and password). Apple private-relay
            addresses are accepted. Your jurisdiction, role and work setting, so the app can
            show jurisdiction-appropriate content. An optional display name for your own
            account, never a service-user&rsquo;s name. A record that you acknowledged this
            policy, and which version.
          </p>
          <p>
            <strong>Learning and practice.</strong> Lesson and knowledge-check completion
            status and timestamps. We do not store your answer text. Fictional
            practice-scenario results as a small set of category ratings. We do not store the
            practice note text you typed.
          </p>
          <p>
            <strong>Write and Check content, the highest-sensitivity data.</strong> While you
            are actively using Write or Check, your rough text, structured answers and any
            generated draft exist only in the app&rsquo;s memory for that session. None of it
            is written to a database, sent to our servers for permanent storage, logged, or
            included in analytics or crash reports.
          </p>
          <p>
            <strong>Subscription.</strong> If you subscribe to Pro we store your entitlement
            tier and renewal date. Card details are handled entirely by Apple or Google. We
            never see or store them.
          </p>
        </LegalSection>

        <LegalSection heading="What we do not collect">
          <ul>
            <li>No photographs of any kind. Photo upload does not exist in this app.</li>
            <li>
              No raw audio. Voice dictation transcribes speech to text entirely on your
              device. No audio is ever sent anywhere or saved to a file.
            </li>
            <li>No permanent record of a real-world care note&rsquo;s content.</li>
            <li>
              No advertising identifiers, and no data shared with any advertising service,
              because none is integrated.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="Special category data">
          <p>
            Anything you type or dictate that describes care you have given or observed is
            health-related information. Under UK GDPR that means it is treated as special
            category data, whether or not it contains an obvious identifier.
          </p>
          <p>
            Passing our identifier check does not change this. It is a heuristic that prompts
            you to review your own text, not a certification that the text is anonymous or
            that special category protections no longer apply.
          </p>
        </LegalSection>

        <LegalSection heading="Why we process your data, and our legal basis">
          <p>
            The exact Article 6 lawful basis and Article 9 special-category condition for
            each type of processing are pending formal DPO and legal review. A working draft
            analysis exists internally, but it is a candidate analysis, not a legal
            determination, and this section is deliberately not published until that review
            closes it out.
          </p>
        </LegalSection>

        <LegalSection heading="Who we share data with">
          <p>
            We use a small number of service providers to run the app. None receives Write or
            Check content, because that content never leaves your device&rsquo;s active
            session.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.9375rem]">
              <thead>
                <tr className="border-b border-rule text-left">
                  <th className="py-2 pr-4 font-semibold text-ink">Provider</th>
                  <th className="py-2 pr-4 font-semibold text-ink">What they do</th>
                  <th className="py-2 font-semibold text-ink">What they receive</th>
                </tr>
              </thead>
              <tbody>
                {SUBPROCESSORS.map((row) => (
                  <tr key={row.provider} className="border-b border-rule/60 align-top">
                    <td className="py-3 pr-4 font-medium text-ink">{row.provider}</td>
                    <td className="py-3 pr-4">{row.does}</td>
                    <td className="py-3">{row.receives}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            No AI inference provider is active in the current build. If one is approved in
            future it will appear here, and in an updated version of this policy, before it
            processes any live traffic.
          </p>
          <p>
            We do not sell your data, and we do not share it for advertising, because we run
            no advertising.
          </p>
        </LegalSection>

        <LegalSection heading="Where your data is hosted">
          <p>
            <Fact field="hostingRegion" />. Our own security requirements call for UK or
            ICO-adequate hosting with documented, verifiable data residency, and this section
            will state the actual confirmed region before publication rather than before.
          </p>
        </LegalSection>

        <LegalSection heading="How long we keep your data">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.9375rem]">
              <thead>
                <tr className="border-b border-rule text-left">
                  <th className="py-2 pr-4 font-semibold text-ink">Data</th>
                  <th className="py-2 font-semibold text-ink">Retention</th>
                </tr>
              </thead>
              <tbody>
                {RETENTION.map(([label, value]) => (
                  <tr key={label} className="border-b border-rule/60 align-top">
                    <td className="py-3 pr-4 font-medium text-ink">{label}</td>
                    <td className="py-3">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LegalSection>

        <LegalSection heading="Your rights">
          <p>
            Under UK data protection law you have rights over your personal data, including
            the right to ask what we hold, to have inaccurate data corrected, to have it
            deleted, to object to or restrict certain processing, and to receive a copy in a
            portable format. You also have the right to complain to the Information
            Commissioner&rsquo;s Office.
          </p>
          <p>
            The exact process, response timeframe and contact route for exercising these
            rights are pending legal review. We are not publishing wording we have not had
            confirmed.
          </p>
        </LegalSection>

        <LegalSection heading="Children">
          <p>
            CareNote Coach is a professional-training tool built for adult care workers and
            is not directed at children.
          </p>
        </LegalSection>

        <LegalSection heading="Changes to this policy">
          <p>
            If we make a material change, we will ask you to acknowledge the new version
            before you continue using Write or Check, the same way we ask on first use.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
