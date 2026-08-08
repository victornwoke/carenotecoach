import { ROUTES } from '@/app/routes';
import { Seo } from '@/components/layout/Seo';
import { LegalLayout, LegalSection } from '@/components/legal/LegalLayout';
import { Fact } from '@/components/legal/PendingNotice';
import { siteConfig } from '@/config/site';

/**
 * One inbox handles all four routes. That was a deliberate choice: four aliases
 * nobody monitors is worse for a user than one address that gets answered.
 * Listing them separately here would imply a routing that does not exist.
 */
const HANDLED = [
  'General support and account problems',
  'Privacy, data protection and your data rights',
  'Accessibility barriers',
  'Account deletion, if you cannot sign in to do it yourself',
] as const;

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="How to reach CareNote Coach about support, privacy, accessibility or account deletion."
        path={ROUTES.contact}
        noIndex
      />

      <LegalLayout
        eyebrow="Contact"
        title="Contact us"
        lastUpdated={siteConfig.lastUpdated.support}
      >
        <LegalSection heading="How to reach us">
          <p>
            One inbox covers everything below, and it is monitored by a person rather than
            routed into a queue:
          </p>
          <p className="text-lg">
            <Fact field="contactEmail">
              {(email) => (
                <a href={`mailto:${email}`} className="font-semibold">
                  {email}
                </a>
              )}
            </Fact>
          </p>
          <ul>
            {HANDLED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection heading="Who you are contacting">
          <p>
            <strong>Trading as:</strong> <Fact field="legalEntityName" />
          </p>
          <p>
            <strong>Business type:</strong> {siteConfig.legalEntityType}
          </p>
          <p>
            <strong>Business address:</strong> <Fact field="businessAddress" />
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
