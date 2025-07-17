// src/lib/analytics.ts
import { event } from './gtag';

/**
 * Tracks a successful contact form submission.
 * @param formData - The data submitted by the user.
 */
export const trackContactFormSubmission = (formData: { name:string; email: string; message: string }) => {
  console.log('Analytics: Contact form submitted', JSON.stringify(formData, null, 2));
  event({
    action: 'submit_form',
    category: 'Contact',
    label: 'Contact Form Submission',
    value: 1,
  });
};

/**
 * Tracks a request for industry-specific AI insights.
 * @param industry - The industry for which the user requested insights.
 */
export const trackIndustryInsightRequest = (industry: string) => {
  console.log(`Analytics: Industry insight request for "${industry}"`);
  event({
    action: 'request_insight',
    category: 'AI Tool',
    label: industry,
    value: 1,
  });
};

/**
 * Tracks a click on a Call-to-Action (CTA) button.
 * @param ctaName - The name or identifier of the CTA button.
 */
export const trackCTAClick = (ctaName: string) => {
  console.log(`Analytics: CTA clicked - "${ctaName}"`);
  event({
    action: 'click',
    category: 'CTA',
    label: ctaName,
    value: 1,
  });
};


/**
 * Logs a generic server-side event.
 * @param eventName - The name of the event.
 * @param eventData - The data associated with the event.
 */
export const logServerEvent = (eventName: string, eventData: { category: string; label: string; }) => {
    console.log(`Analytics: Server event '${eventName}'`, eventData);
    event({
        action: eventName,
        category: eventData.category,
        label: eventData.label,
        value: 1,
    });
};
