'use client';

import { useTranslations } from 'next-intl';
import { FileText, Copyright, AlertTriangle, Scale, Ban, Gift, Globe } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { type Locale } from '@/lib/i18n/config';

interface TermsPageClientProps {
  locale: Locale;
}

export default function TermsPageClient({ locale }: TermsPageClientProps) {
  const t = useTranslations();

  const termsHighlights = [
    {
      icon: FileText,
      title: 'Free to Use',
      description: 'All PDF tools are provided free of charge. No registration or payment required.',
    },
    {
      icon: Copyright,
      title: 'Your Content',
      description: 'You retain all rights to your files. We never claim ownership of your documents.',
    },
    {
      icon: Ban,
      title: 'No Illegal Use',
      description: 'You agree not to use our tools for illegal purposes or to process unlawful content.',
    },
    {
      icon: AlertTriangle,
      title: 'No Warranties',
      description: 'Our tools are provided "as is" without warranties of any kind. Use at your own risk.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[hsl(var(--color-primary)/0.1)] via-[hsl(var(--color-background))] to-[hsl(var(--color-secondary)/0.1)] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                <Scale className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--color-foreground))] mb-6">
                Terms of Service
              </h1>
              <p className="text-lg text-[hsl(var(--color-muted-foreground))]">
                Please read these terms carefully before using {t('common.brand')}.
              </p>
            </div>
          </div>
        </section>

        {/* Terms Highlights */}
        <section className="py-12 bg-[hsl(var(--color-muted))/0.3]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {termsHighlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="p-6 text-center" hover>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-[hsl(var(--color-foreground))] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                      {item.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-8">
                Last updated: December 2024
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                By accessing or using {t('common.brand')} (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use the Service.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                2. Description of Service
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                {t('common.brand')} provides free online PDF tools that run entirely in your web browser.
                All file processing happens locally on your device. We do not store, access, or transmit your files.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                3. Use of the Service
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                You agree to use the Service only for lawful purposes and in accordance with these Terms.
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--color-muted-foreground))] mb-4">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Process files that contain illegal content</li>
                <li>Attempt to reverse engineer or disrupt the Service</li>
                <li>Use the Service to infringe on others' intellectual property rights</li>
              </ul>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                You retain all rights to any content you process using our Service. We do not claim ownership
                of your files or their contents. The Service itself, including its code and design, is owned by us
                and protected by intellectual property laws.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                5. Disclaimer of Warranties
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied.
                We do not warrant that the Service will be uninterrupted, error-free, or completely secure.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                In no event shall {t('common.brand')} or its owners be liable for any indirect, incidental, special,
                consequential, or punitive damages arising out of your use of the Service.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                7. Changes to Terms
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of any changes by
                updating the &quot;Last updated&quot; date on this page. Your continued use of the Service after changes
                constitutes acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                8. Contact Us
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                If you have any questions about these Terms, please contact us through our contact page.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
