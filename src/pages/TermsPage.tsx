import { Link } from 'react-router';

import { ROUTES } from '@/app/routes';
import { Seo } from '@/components/layout/Seo';
import { LegalLayout, LegalSection } from '@/components/legal/LegalLayout';
import { Fact, PendingNotice } from '@/components/legal/PendingNotice';
import { siteConfig } from '@/config/site';

export function TermsPage() {
  return (
    <>
      <Seo
        title="Terms of Use"
        description="The terms that apply to using CareNote Coach, a UK care-documentation education app."
        path={ROUTES.terms}
        noIndex
      />

      <LegalLayout
        eyebrow="Legal"
        title="Terms of Use"
        lastUpdated={siteConfig.lastUpdated.terms}
        notice={<PendingNotice page="terms" />}
      >
        <LegalSection heading="1. Who these terms are between">
          <p>
            These terms are between you and <Fact field="legalEntityName" />, the operator of
            CareNote Coach. By creating an account or using the app, you agree to them.
          </p>
        </LegalSection>

        <LegalSection heading="2. What CareNote Coach is">
          <p>
            A UK care-documentation education app. It teaches documentation principles
            through lessons and fictional practice scenarios, and helps you turn your own
            already-known facts into a structured draft note, or check a note you have
            written against documentation-quality principles.
          </p>
        </LegalSection>

        <LegalSection heading="3. What CareNote Coach is not">
          <p>CareNote Coach is not, and must never be used as:</p>
          <ul>
            <li>
              A care-planning system, electronic care record, or medication administration
              record.
            </li>
            <li>A clinical-decision-support or diagnostic tool.</li>
            <li>A safeguarding-decision tool, a risk-assessment tool, or a triage tool.</li>
            <li>
              A substitute for your employer&rsquo;s own record-keeping system. Anything you
              draft here is a personal reference: you are responsible for transferring facts
              into your employer&rsquo;s real system yourself.
            </li>
            <li>
              A substitute for your statutory or sector training, professional regulation,
              your employer&rsquo;s policies, your supervision, or professional or legal
              advice.
            </li>
            <li>A system for storing identifiable service-user records.</li>
          </ul>
        </LegalSection>

        <LegalSection heading="4. Who can use CareNote Coach">
          <p>
            CareNote Coach is built for adult care workers in the United Kingdom: Healthcare
            Assistants, Healthcare Support Workers, Care Assistants, Support Workers, Senior
            Carers and Senior Support Workers, Registered Nurses, and Nursing Associates,
            across England, Scotland, Wales and Northern Ireland. It is not directed at
            children.
          </p>
          <p>
            A specific minimum-age requirement, if one is legally required for this service,
            is pending legal review and is deliberately not stated here rather than inventing
            a figure.
          </p>
        </LegalSection>

        <LegalSection heading="5. Your account">
          <ul>
            <li>
              You are responsible for keeping your sign-in credentials secure and for all
              activity under your account.
            </li>
            <li>
              Keep your professional profile accurate, since it determines what content you
              see.
            </li>
            <li>
              You can <Link to={ROUTES.accountDeletion}>delete your account</Link> at any
              time.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="6. Acceptable use">
          <p>You agree not to:</p>
          <ul>
            <li>
              Enter information that identifies a real service user unless your employer has
              formally approved CareNote Coach for that purpose. The app warns you before
              every Write or Check entry point and blocks processing when it detects a likely
              identifier, but that detection is a heuristic aid, not a guarantee. You remain
              responsible for what you type.
            </li>
            <li>
              Use CareNote Coach to make an actual clinical, safeguarding or escalation
              decision. Always follow your employer&rsquo;s own procedures.
            </li>
            <li>
              Attempt to bypass, disable or interfere with the identifier-detection
              safeguard, the evidence and source-labelling system, or any other safety
              control.
            </li>
            <li>
              Represent app output as an official employer record without transcribing and
              reviewing it yourself first.
            </li>
            <li>
              Reverse-engineer, scrape, or interfere with the service, or use it in a way
              that could disrupt it for other users.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="7. Free and Pro tiers">
          <p>
            Core learning, core fictional practice, basic progress tracking, and fair-use
            access to Write and Check, including the safety controls that make them safe to
            use, are free forever. This is a permanent product commitment, not a promotional
            offer that can quietly change. Pro is an optional paid tier that adds convenience
            and advanced assistance on top of the free product, never by removing something
            from it. See the <Link to={ROUTES.subscriptionTerms}>subscription terms</Link>.
          </p>
        </LegalSection>

        <LegalSection heading="8. AI assistance">
          <p>
            Any AI-generated content in CareNote Coach may only reorganise, label or rewrite
            facts you already supplied. It is built never to invent a fact you did not
            provide, and any sentence it cannot verify against your own input is blocked, not
            shown. No AI provider is connected to Write or Check in the current build.
          </p>
        </LegalSection>

        <LegalSection heading="9. No professional, legal or clinical advice">
          <p>
            Nothing in CareNote Coach constitutes legal advice, clinical advice, or a
            guarantee that any note you produce is compliant with any law, regulation or
            professional code. We never claim CQC, NMC, NHS, Care Inspectorate, SSSC, Care
            Inspectorate Wales, Social Care Wales, RQIA, NISCC or any government endorsement,
            and we never claim that using CareNote Coach protects you from disciplinary action
            or legal proceedings.
          </p>
        </LegalSection>

        <LegalSection heading="10. Intellectual property">
          <p>
            The app, its lesson content, the CARE framework and its design are owned by{' '}
            <Fact field="legalEntityName" /> or its licensors. You may use the app for your
            own professional development. Facts you type into Write or Check, and any draft
            built from them, remain yours.
          </p>
        </LegalSection>

        <LegalSection heading="11. Disclaimers and limitation of liability">
          <p>
            The specific disclaimer and liability-limitation wording, including any liability
            cap, is a legal-drafting decision for a solicitor. It is not invented here, and
            this section is not published until that wording is supplied and reviewed.
          </p>
          <p>
            What we can state without legal drafting: CareNote Coach is provided as a
            training and drafting-support tool, and you remain solely responsible for the
            accuracy, completeness and appropriateness of anything you submit to your
            employer&rsquo;s real record system, for your professional judgement, and for your
            compliance with your employer&rsquo;s policies and your regulator&rsquo;s
            requirements.
          </p>
        </LegalSection>

        <LegalSection heading="12. Suspension and termination">
          <p>
            We may suspend or terminate your account if you materially breach these terms, in
            particular the acceptable-use rules in section 6. You can stop using CareNote
            Coach and delete your account at any time.
          </p>
        </LegalSection>

        <LegalSection heading="13. Changes to these terms">
          <p>
            If we make a material change we will tell you before it takes effect. Continuing
            to use the app after a change takes effect means you accept the updated terms.
          </p>
        </LegalSection>

        <LegalSection heading="14. Governing law and jurisdiction">
          <p>
            <Fact field="governingLaw" />. Because CareNote Coach is deliberately built to
            serve England, Scotland, Wales and Northern Ireland as equal jurisdictions, the
            choice of governing law and courts is a real legal decision. It is not defaulted
            casually to England and Wales without legal input.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
