# Localization & Arabic Support Implementation Plan

This document outlines the step-by-step strategy for implementing multi-language support (English/Arabic) for the **Dammam Home care pro (DHCP)** platform using `next-intl`.

## 🏗️ Phase 0: Infrastructure Setup
Before translating content, we must establish the routing and middleware foundation.

1.  **Install Dependencies**: Add `next-intl` to the project.
2.  **Routing Configuration**:
    *   Move existing `src/app` content into a dynamic segment `src/app/[locale]`.
    *   Update `next.config.ts` and create `src/i18n.ts` for message loading.
3.  **Middleware**: Configure `middleware.ts` to handle locale detection and redirection.
4.  **Layout Integration**: 
    *   Wrap `layout.tsx` in `NextIntlClientProvider`.
    *   Dynamically set the `dir` attribute (LTR/RTL) based on the current locale.

## 🌐 Phase 1: Header & Language Switcher
The first visible change for the user.

1.  **Language Toggle**: Add a premium "EN/AR" toggle in the `Header.tsx` next to the user profile.
2.  **Header Translations**:
    *   Navigation links (Home, Services, Check Prices).
    *   Authentication labels (Login, Sign Up).
    *   Responsive menu labels.
3.  **RTL Validation**: Ensure the sticky header correctly flips icons and text orientation when Arabic is selected.

## 🏠 Phase 2: Landing Page - Top Sections
Translating the primary entry point of the application.

1.  **Hero Section**: Translate headings, sub-headings, and Call-to-Action (CTA) buttons.
2.  **Promotion Banner**: Translate the "Why DHCP?" section and promo cards.
3.  **Features Showcase**: Translate the "Dammam Standard" features and value propositions.

## 🛠️ Phase 3: Landing Page - Catalog & Flow
Translating complex data-driven sections.

1.  **Services Grid**:
    *   Translate category names and descriptions.
    *   Ensure price estimated labels are localized.
2.  **How It Works**: Translate the step-by-step process flow animations and text.
3.  **Footer**: Update copyright, addresses, and company descriptions to Arabic.

## 💰 Phase 4: Pricing & Content Pages
Translating informational pages.

1.  **Pricing Page**:
    *   Translate Sidebar categories.
    *   Translate issue labels and descriptions.
    *   Localize "Dammam Certified" badges.
2.  **About & Contact**: Full translation of the company story and contact form fields.
3.  **Legal**: Localization of Terms of Service and Privacy Policy (sourced from `messages/ar.json`).

## ⚡ Phase 5: Dynamic Booking Flow
The final and most sensitive phase.

1.  **Multi-Step Process**:
    *   Category Selection -> Issue Selection -> Location -> Schedule -> Review.
2.  **Dynamic Data**: Ensure real-time Firestore data (Order History) handles localized timestamps and status labels correctly.
3.  **Error Handling**: Translate form validation messages and system toasts.

---

## 📝 Rules for Implementation
1.  **Atomic Edits**: We will work file by file to avoid breaking the build.
2.  **RTL First**: Every layout change must be checked for both LTR and RTL compatibility.
3.  **Key Synchronization**: Ensure `en.json` and `ar.json` always have matching keys to prevent `MISSING_MESSAGE` errors.
