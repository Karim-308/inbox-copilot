export const DEFAULT_PRODUCTS = [
  {
    id: 'trend',
    name: 'Trend Audio Guide',
    description: 'Versatile handheld audio guide for permanent and temporary exhibitions. Designed for high-volume deployments with low operational costs.',
    features: 'Point-and-click playback, manual keypad input, multimedia interaction with external screens and kiosks, tropicalization option for humidity protection',
    specs: 'Battery: 100 hours continuous (2 months typical use, no daily charging needed). Storage: 1000 hours of audio content. Languages: up to 32. Triggering: IR (infrared), RF (radio frequency), RFID tags. Weight: lightweight handheld. Warranty: 2 years.'
  },
  {
    id: 'style',
    name: 'Style Audio Guide',
    description: 'Award-winning premium audio guide with multimedia capabilities. Ideal for flagship institutions and large-scale deployments requiring advanced features.',
    features: 'Automatic proximity triggering (IR and RF), multilingual support up to 32 languages, multimedia interaction, video synchronization support, auto-play on approach, analytics collection, modular charging system',
    specs: 'Battery: 100+ hours. Storage: 16GB. Languages: up to 32 including Arabic, English, French, Spanish, Chinese. Triggering: IR and RF automatic. Fleet size: ideal for 100+ devices. Temperature: -10°C to 50°C. Warranty: 2 years.'
  },
  {
    id: 'look3',
    name: 'Look3 Tablet',
    description: 'Android multimedia tablet engineered for interactive, hands-free visitor experiences. Best for institutions requiring video, AR, and rich multimedia content alongside audio.',
    features: 'IR automatic triggering with 10cm precision, video synchronization with external screens and show controllers, GPS-triggered content, AR support, touchscreen interaction, multilingual audio and video',
    specs: 'Screen: 5.5 inch HD touchscreen. Battery: 7000 mAh, 2-day autonomy. Processor: six-core. Triggering: IR automatic (no WiFi needed). Charging: magnetic pogo-pin modular system. Storage: 16GB. WiFi: optional. Best for: video sync, AR, interactive tours.'
  },
  {
    id: 'twister',
    name: 'Twister Headset Guide',
    description: 'All-in-one headset audio guide that maximizes visitor freedom. The guide and headset are combined in one unit — no separate device to carry.',
    features: 'Built-in headset and guide in one unit, hands-free design, multiple triggering options, suitable for high-traffic venues, easy self-service by visitors',
    specs: 'Type: all-in-one headset. Battery: long life. Triggering: IR, RF, manual. Languages: up to 32. Best for: venues prioritizing visitor freedom and minimal device handling. Storage: standard audio content capacity.'
  },
  {
    id: 'syncbox',
    name: 'SyncBox',
    description: 'Synchronization controller that connects audio guide devices to external video screens, lighting rigs, and show controllers. Not a standalone guide — used in combination with Style or Look3.',
    features: 'Synchronizes audio guide playback with external AV systems, video sync, lighting sync, show controller integration, real-time timestamp coordination',
    specs: 'Use case: video synchronization deployments only. Compatible with: Style Audio Guide, Look3 Tablet. Not suitable for: standalone audio-only installations. Requires: existing AV infrastructure.'
  }
]

export const DEFAULT_CLIENTS = [
  {
    id: 'c_bm',
    name: 'Dr. Sarah Whitfield',
    company: 'The British Museum',
    email: 's.whitfield@britishmuseum.org',
    country: 'UK',
    status: 'closed_won',
    lastSubject: 'Re: Style Audio Guide fleet — maintenance & support query',
    lastContact: 'Today',
    avatar: 'SW',
    avatarColor: '#6366f1',
    interactions: [
      {
        id: 'ibm1',
        date: 'Feb 3, 2023',
        type: 'inbound',
        subject: 'Initial inquiry — 180-device audio guide fleet',
        summary: 'Referred by V&A. Needs auto-triggering, 5 languages (EN/FR/DE/JA/ZH), 180 exhibit points across 4 floors.',
        classification: 'product_inquiry',
        confidence: 94,
        recommendation: 'Style Audio Guide',
        status: 'sent'
      },
      {
        id: 'ibm2',
        date: 'Mar 15, 2023',
        type: 'inbound',
        subject: 'Purchase approved — 180 units',
        summary: 'Board approved procurement. Client confirmed order for 180 Style Audio Guides. Proposal and deployment timeline requested.',
        classification: 'follow_up',
        confidence: 99,
        recommendation: null,
        status: 'sent'
      },
      {
        id: 'ibm3',
        date: 'Jun 12, 2023',
        type: 'outbound',
        subject: 'Deployment complete — all 180 units live',
        summary: 'All 180 units deployed and calibrated across 4 floors. IR emitters signed off. All languages confirmed. Deal closed.',
        classification: null,
        confidence: null,
        recommendation: null,
        status: 'sent'
      },
      {
        id: 'ibm4',
        date: 'Today',
        type: 'inbound',
        subject: 'Maintenance request — IR failures + battery drain',
        summary: 'IR triggering failures in Roman Gallery (Floor 2). 4 devices with severe battery drain (~3h). Requesting maintenance SLA discussion.',
        classification: 'support',
        confidence: 96,
        recommendation: 'Maintenance SLA & On-Site Service',
        status: 'draft_ready'
      }
    ]
  },
  {
    id: 'c1',
    name: 'Ahmed Hassan',
    company: 'Luxor Museum of Ancient Egyptian Art',
    email: 'ahmed.hassan@luxormuseum.eg',
    country: 'Egypt',
    status: 'new_inquiry',
    lastSubject: 'Audio Guide System Inquiry — 200 devices',
    lastContact: '2 hours ago',
    avatar: 'AH',
    avatarColor: '#f9ab00',
    interactions: [
      {
        id: 'i1',
        date: 'Today, 9:14 AM',
        type: 'inbound',
        subject: 'Audio Guide System Inquiry — Luxor Museum',
        summary: 'Client requesting audio guide for 3-floor museum, 120 exhibits, 200 devices. Requires Arabic/English/French, auto-triggering, 8h+ battery. No video sync needed.',
        classification: 'product_inquiry',
        confidence: 88,
        recommendation: 'Style Audio Guide',
        status: 'draft_ready'
      }
    ]
  },
  {
    id: 'c2',
    name: 'Maria Chen',
    company: 'Museum of Modern Art (MoMA)',
    email: 'm.chen@moma.org',
    country: 'USA',
    status: 'demo_scheduled',
    lastSubject: 'Re: Fleet proposal for permanent collection',
    lastContact: 'Yesterday',
    avatar: 'MC',
    avatarColor: '#4285f4',
    interactions: [
      {
        id: 'i2',
        date: 'Yesterday, 2:30 PM',
        type: 'inbound',
        subject: 'Fleet proposal for permanent collection — 350 devices',
        summary: 'Large fleet inquiry for permanent collection. Needs English only, IR triggering, video sync for select exhibits. Budget is flexible.',
        classification: 'product_inquiry',
        confidence: 92,
        recommendation: 'Style Audio Guide + SyncBox for video areas',
        status: 'sent'
      },
      {
        id: 'i3',
        date: 'Yesterday, 4:45 PM',
        type: 'outbound',
        subject: 'Re: Fleet proposal — Style + SyncBox recommendation',
        summary: 'Sent recommendation for Style fleet with SyncBox integration for 12 video exhibit areas. Included pricing estimate.',
        classification: null,
        confidence: null,
        recommendation: null,
        status: 'sent'
      },
      {
        id: 'i4',
        date: 'Today, 8:00 AM',
        type: 'inbound',
        subject: 'Demo request — can we schedule a call?',
        summary: 'Client happy with recommendation, wants to schedule a live demo before committing to 350 units.',
        classification: 'demo_request',
        confidence: 97,
        recommendation: null,
        status: 'forwarded'
      }
    ]
  },
  {
    id: 'c3',
    name: 'Lukas Müller',
    company: 'Deutsches Museum',
    email: 'l.mueller@deutsches-museum.de',
    country: 'Germany',
    status: 'sent',
    lastSubject: 'Technical specs — Twister vs Trend comparison',
    lastContact: '2 days ago',
    avatar: 'LM',
    avatarColor: '#ab47bc',
    interactions: [
      {
        id: 'i5',
        date: '2 days ago, 11:00 AM',
        type: 'inbound',
        subject: 'Comparing Twister and Trend for new science wing',
        summary: 'AV Director asking for comparison between Twister and Trend for 80-exhibit science wing. German and English only. Prefers hands-free experience.',
        classification: 'product_inquiry',
        confidence: 85,
        recommendation: 'Twister Headset Guide',
        status: 'sent'
      }
    ]
  },
  {
    id: 'c4',
    name: 'Fatima Al-Rashid',
    company: 'National Museum of Qatar',
    email: 'f.alrashid@nmoq.org.qa',
    country: 'Qatar',
    status: 'new_inquiry',
    lastSubject: 'Rental inquiry — 3-month temporary exhibition',
    lastContact: '3 days ago',
    avatar: 'FA',
    avatarColor: '#26a69a',
    interactions: [
      {
        id: 'i6',
        date: '3 days ago, 10:20 AM',
        type: 'inbound',
        subject: 'Rental inquiry — 3-month temporary exhibition',
        summary: 'Procurement officer inquiring about rental options for a 3-month international touring exhibition. 60 devices needed, Arabic and English, RF triggering.',
        classification: 'product_inquiry',
        confidence: 79,
        recommendation: 'Trend Audio Guide (rental)',
        status: 'draft_ready'
      }
    ]
  },
  {
    id: 'c5',
    name: 'James Roberts',
    company: 'Smartify',
    email: 'james.roberts@smartify.org',
    country: 'UK',
    status: 'closed_won',
    lastSubject: 'Re: Istanbul deployment — final handoff',
    lastContact: '1 week ago',
    avatar: 'JR',
    avatarColor: '#e57373',
    interactions: [
      {
        id: 'i7',
        date: '2 weeks ago',
        type: 'inbound',
        subject: 'Istanbul deployment — triggering issue on floor 2',
        summary: 'Support request: IR triggering boxes on floor 2 not firing consistently. Device model: Look3 Tablet.',
        classification: 'support',
        confidence: 94,
        recommendation: null,
        status: 'forwarded'
      },
      {
        id: 'i8',
        date: '1 week ago',
        type: 'inbound',
        subject: 'Re: Istanbul — all resolved, final handoff',
        summary: 'Issue resolved after IR box repositioning. Client confirmed everything working. Deployment complete.',
        classification: 'follow_up',
        confidence: 88,
        recommendation: null,
        status: 'sent'
      }
    ]
  }
]

export const MOCK_RESPONSES = [
  // British Museum — Maintenance support request
  {
    classification: 'support',
    confidence: 96,
    client_name: 'Dr. Sarah Whitfield',
    client_company: 'The British Museum',
    crm_context: {
      found: true,
      client_id: 'c_bm',
      prior_interactions: 4,
      last_contact: '8 months ago',
      last_subject: 'Re: Deployment complete — 180 units live',
      note: 'Closed deal Apr 2023 · 180 Style units · Deployment signed off June 2023 · No contact since. Flag for renewal + SLA upsell.'
    },
    requirements: [
      '180 Style Audio Guides deployed since June 2023',
      'IR triggering failures on Floor 2 — Roman Gallery (3 IR boxes unresponsive)',
      '4 devices showing abnormal battery drain (full charge lasting ~3h instead of 8h+)',
      'Requesting maintenance SLA / support contract',
      'Needs on-site diagnostic visit within 2 weeks'
    ],
    recommended_product: 'Maintenance SLA & On-Site Service',
    recommendation_reason: 'This is a post-deployment support case for an existing 180-unit Style fleet. The IR triggering failure on Floor 2 is consistent with IR emitter misalignment or firmware drift after extended use — both are resolved by an on-site calibration visit. The battery drain on 4 devices points to cell degradation on the older units, which are eligible for battery replacement under the extended service plan. Recommending a Priority Support SLA to cover this visit and provide ongoing coverage for the fleet.',
    exclusions: [
      'Hardware replacement — premature before diagnostics; IR misalignment and battery issues are typically resolved without replacing units',
      'Remote firmware update only — IR emitter issues require physical realignment on-site; remote update alone will not resolve triggering failures'
    ],
    draft_reply: `Dear Sarah,

Thank you for getting in touch — and for the kind words about the system over these past two years. It is always great to hear the guides have been performing well for your visitors.

Based on what you have described, I want to address both issues directly:

IR triggering failures on Floor 2 (Roman Gallery):
The pattern you are seeing — 3 IR boxes unresponsive — is almost certainly an emitter alignment issue rather than a hardware fault. After 18+ months of use, vibration from visitor traffic and seasonal temperature changes can shift the emitter angle enough to break the detection arc. This is fully correctable with an on-site calibration visit, typically resolved within a half-day.

Battery drain on 4 devices:
A drop from 8+ hours to ~3 hours is consistent with Li-ion cell degradation in the oldest units of the fleet. These are eligible for battery replacement under our extended service plan — not a full device swap.

My recommendation:
I would like to arrange an on-site visit from our technical team within the next two weeks to run a full diagnostic on the Roman Gallery IR setup and the 4 affected devices. I will also put together a Priority Support SLA proposal for you — this covers two on-site visits per year, remote firmware management, and a 48-hour replacement unit guarantee for any device failures.

Could you share your availability for a brief call this week so we can confirm the visit date?

Warm regards,
The Sales Team
Look2Innovate`
  },

  // Vienna Konzerthaus — Twister Headset Guide
  {
    classification: 'product_inquiry',
    confidence: 91,
    client_name: 'Elena Vasquez',
    client_company: 'Vienna Konzerthaus',
    crm_context: {
      found: false,
      client_id: null,
      prior_interactions: 0,
      last_contact: null,
      last_subject: null,
      note: 'New contact. No prior record in CRM.'
    },
    requirements: [
      '400 attendees per concert night — backstage & venue tour',
      'Hands-free audio guide — no device to hold separately from headset',
      'Self-service at entrance: visitors pick up and go independently',
      'High audio quality for music context',
      'Multiple triggering modes (RF or manual — no fixed IR infrastructure)',
      'English, German, and Japanese language support',
      'Easy sanitization and turnover between shows'
    ],
    recommended_product: 'Twister Headset Guide',
    recommendation_reason: 'The Twister Headset Guide is the natural fit for a high-volume concert venue tour. Its all-in-one design — headset and guide combined in a single unit — means visitors pick it up at the entrance and are immediately ready with no separate device to manage, which is critical for a 400-person throughput. The hands-free form factor is ideal for a concert hall context where visitors want to move freely and focus on the experience. RF and manual triggering modes work without requiring IR emitter infrastructure, keeping the deployment clean and non-invasive to the venue.',
    exclusions: [
      'Style Audio Guide — requires visitors to carry a separate handheld device alongside headphones; poor fit for a concert experience focused on immersion',
      'Trend Audio Guide — handheld device with manual keypad; not suitable for a high-throughput self-service concert tour',
      'Look3 Tablet — touchscreen tablet form factor is intrusive in a concert environment; video sync features are irrelevant here',
      'SyncBox — not applicable; no video synchronization requirement'
    ],
    draft_reply: `Dear Elena,

Thank you for reaching out — a backstage tour of the Vienna Konzerthaus is exactly the kind of premium visitor experience our Twister Headset Guide was designed for.

We recommend the Twister Headset Guide for your concert night tours.

Why it is the right fit:

All-in-one, no separate device: the Twister combines the audio guide and headset into a single unit. Visitors pick it up at the entrance and are ready instantly — no pairing, no second device, no fumbling. For 400 attendees per night moving through a high-energy concert environment, this is essential.

Hands-free by design: visitors keep both hands free throughout the tour. The guide stays on their head, out of the way, while they move through backstage corridors, stage wings, and the main hall.

Self-service deployment: the Twister is designed specifically for high-traffic, self-service venues. Your front-of-house team can set up a collection point at the entrance — visitors take a unit, the tour begins. No staff-assisted pairing or configuration required.

Language support: English, German, and Japanese can all be loaded simultaneously. Visitors select their language at the start.

Triggering: RF triggering works without installing IR emitter boxes throughout the venue — the RF signal is broadcast per zone, keeping your backstage spaces completely unobtrusive.

Turnover between shows: the Twister is designed for rapid cycling. The units can be collected, sanitized, and recharged in the interval between performances.

I would love to arrange a demonstration unit so your team can evaluate the experience before committing. Would a visit to your venue work, or would you prefer we ship a trial set?

Best regards,
The Sales Team
Look2Innovate`
  }
]

export const SAMPLE_EMAILS = [
  {
    label: 'British Museum — Maintenance Request',
    from: 'Dr. Sarah Whitfield <s.whitfield@britishmuseum.org>',
    subject: 'Re: Style Audio Guide fleet — maintenance & support query',
    thread: [
      {
        from: 'Dr. Sarah Whitfield <s.whitfield@britishmuseum.org>',
        date: 'Feb 3, 2023 · 10:18 AM',
        body: `Dear Mina,\n\nWe are currently tendering for an audio guide system for our permanent collection and have been referred to Look2Innovate by colleagues at the V&A. We have approximately 180 exhibit points across 4 floors and require automatic triggering, multilingual support (EN, FR, DE, JA, ZH), and a robust fleet management solution.\n\nCould we arrange a call to discuss further?\n\nDr. Sarah Whitfield\nHead of Visitor Experience, The British Museum`
      },
      {
        from: 'Mina Nagy <mina.nagy@look2innovate.com>',
        date: 'Feb 3, 2023 · 2:05 PM',
        body: `Dear Sarah,\n\nThank you for reaching out — a referral from the V&A is high praise and we are delighted to be considered.\n\nBased on your brief, the Style Audio Guide would be our recommendation: automatic IR and RF triggering, all five languages natively supported, and a fleet management dashboard purpose-built for 100+ device deployments. I have attached the full technical datasheet.\n\nI am available Monday or Wednesday this week for a call — please let me know what suits.\n\nBest regards,\nMina Nagy\nSales Engineer, Look2Innovate`
      },
      {
        from: 'Dr. Sarah Whitfield <s.whitfield@britishmuseum.org>',
        date: 'Mar 15, 2023 · 9:44 AM',
        body: `Mina,\n\nFollowing our calls and the on-site demo last week — the board has approved the procurement. We would like to proceed with 180 units of the Style Audio Guide. Please send over the formal proposal and timeline for deployment.\n\nSarah`
      },
      {
        from: 'Mina Nagy <mina.nagy@look2innovate.com>',
        date: 'Jun 12, 2023 · 4:30 PM',
        body: `Dear Sarah,\n\nDelighted to confirm that all 180 units are now live across all four floors. The IR emitter calibration on floors 1–4 has been signed off by our technical team and your content team has confirmed audio playback across all languages.\n\nIt has been a pleasure working with you on this. Do not hesitate to reach out if anything comes up — we are always here.\n\nWarm regards,\nMina Nagy`
      }
    ],
    body: `Dear Mina,

I hope you are well. It has been a while — the guides have been running beautifully and our visitors love them.

I am writing because we have started experiencing a couple of issues over the past few weeks that I wanted to flag before they become a bigger problem:

1. IR triggering failures on Floor 2 (Roman Gallery): three of the IR boxes in that wing have become intermittently unresponsive. Visitors are having to press the manual override, which defeats the purpose. The issue seems to have appeared after the heating system maintenance in that corridor.

2. Battery drain on 4 devices: four of our units are now only lasting around 3 hours on a full charge. Given we open at 9am and close at 6pm, this is causing us to pull them from circulation mid-day.

We have been very happy with the system overall, but I think we need to discuss a maintenance agreement going forward. We are approaching two years of daily use and I suspect some level of wear is expected.

Could you advise on next steps and what a support contract might look like?

Best regards,
Dr. Sarah Whitfield
Head of Visitor Experience, The British Museum`
  },
  {
    label: 'Vienna Konzerthaus — Concert Tour Headsets',
    from: 'Elena Vasquez <e.vasquez@konzerthaus.at>',
    subject: 'Audio headset guide for concert venue tours — 400 visitors/night',
    thread: [],
    body: `Hello,

My name is Elena Vasquez, Events & Operations Manager at the Vienna Konzerthaus. We are launching a new experience this season: a guided backstage and venue tour that runs on concert nights for up to 400 attendees per show.

We are looking for an audio guide solution that fits this specific context:

- The tour is entirely on foot — visitors need both hands free. A separate handheld device alongside headphones is not workable.
- Visitors collect the guide themselves at the entrance. We cannot have staff pairing or configuring devices individually for 400 people.
- The environment is a working concert hall — no fixed triggering infrastructure can be installed backstage or in the wings. We need something that works with RF or manual triggering.
- Audio quality matters more than usual — our audience is music lovers and they will notice.
- Languages: English, German, and Japanese (our Japanese touring groups are a significant segment).
- Turnover needs to be fast — we may have two tour groups on the same evening.

We have looked at several options on the market but nothing has felt purpose-built for this kind of high-throughput, hands-free, concert context.

Could you advise on whether you have a product that fits?

Best regards,
Elena Vasquez
Events & Operations Manager
Vienna Konzerthaus`
  }
]
