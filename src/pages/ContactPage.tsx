import { ROUTES } from '@/app/routes';
import { Seo } from '@/components/layout/Seo';
import { LegalLayout, LegalSection } from '@/components/legal/LegalLayout';
import { Fact } from '@/components/legal/PendingNotice';
import { siteConfig } from '@/config/site';

const CONTACTS = [
  { label: 'General support', field: 'supportEmail' },
  { label: 'Privacy and data rights', field: 'privacyEmail' },
  { label: 'Accessibility', field: 'accessibilityEmail' },
  { label: 'Account deletion, if you cannot sign in', field: 'assistedDeletionEmail' },
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
        <LegalSection heading="Contact routes">
          <dl className="space-y-4">
            {CONTACTS.map((row) => (
              <div key={row.label}>
                <dt className="font-semibold text-ink">{row.label}</dt>
                <dd className="mt-1">
                  <Fact field={row.field}>
                    {(email) => (
                      <a href={`mailto:${email}`} className="font-medium">
                        {email}
                      </a>
                    )}
                  </Fact>
                </dd>
              </div>
            ))}
          </dl>
        </LegalSection>

        <LegalSection heading="Registered details">
          <p>
            <strong>Legal entity:</strong> <Fact field="legalEntityName" />
          </p>
          <p>
            <strong>Registered address:</strong> <Fact field="registeredAddress" />
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
