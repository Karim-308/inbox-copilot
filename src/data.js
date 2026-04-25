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
  // Luxor Museum — Style Audio Guide
  {
    classification: 'product_inquiry',
    confidence: 93,
    client_name: 'Ahmed Hassan',
    client_company: 'Luxor Museum of Ancient Egyptian Art',
    requirements: [
      '3 exhibition floors, ~120 exhibit points',
      'Automatic proximity triggering (no manual input)',
      'Arabic, English, and French language support',
      'Minimum 8-hour battery life per day',
      'No video synchronization required',
      'Fleet of approximately 200 devices'
    ],
    recommended_product: 'Style Audio Guide',
    recommendation_reason: 'The Style Audio Guide is the ideal fit for Luxor Museum\'s scale and requirements. It supports automatic IR and RF proximity triggering across all 120 exhibit points with zero visitor interaction needed, and covers Arabic, English, French, and up to 29 additional languages out of the box. With 100+ hours of battery life and a modular charging system optimized for 100+ device fleets, it is purpose-built for exactly this deployment size.',
    exclusions: [
      'Look3 Tablet — overkill for audio-only deployment; video sync features are not required and add unnecessary cost',
      'Trend Audio Guide — supports the same triggering and languages but lacks the fleet management and analytics capabilities that a 200-device permanent exhibition demands',
      'Twister Headset Guide — all-in-one design is well-suited for smaller venues, less appropriate for a 200-device flagship institution',
      'SyncBox — not applicable; video synchronization was explicitly excluded from requirements'
    ],
    draft_reply: `Dear Ahmed,

Thank you for reaching out regarding your visitor experience modernization project at the Luxor Museum of Ancient Egyptian Art. We are delighted to support such a prestigious institution.

Based on your requirements — 200 devices, automatic proximity triggering across 120 exhibit points, Arabic/English/French support, and full-day battery autonomy — we recommend the Style Audio Guide.

Here is why it is the right fit:

• Automatic IR and RF triggering: visitors simply approach each exhibit and audio plays instantly — no buttons, no codes.
• Language support: Arabic, English, and French are all included, with capacity for up to 32 languages total.
• Battery: 100+ hours of continuous playback — no daily charging required during operating hours.
• Fleet scale: the Style is engineered for 100+ device deployments with a modular charging dock system and centralized content management.
• Analytics: built-in visitor engagement tracking at each exhibit point.

For a 200-device permanent exhibition deployment, we would be happy to prepare a detailed commercial proposal including hardware, installation support, and a content loading service.

Could we schedule a brief call this week to discuss timelines and next steps?

Warm regards,
The Sales Team
Look2Innovate`
  },

  // Palais de la Découverte — Look3 + SyncBox
  {
    classification: 'product_inquiry',
    confidence: 91,
    client_name: 'Sophie Laurent',
    client_company: 'Palais de la Découverte',
    requirements: [
      'Synchronization with 24 video screens across exhibition',
      'French and English language support',
      '150 devices for visitor use',
      'Auto-play when visitors approach each station',
      'Integration with existing AV/show controller infrastructure'
    ],
    recommended_product: 'Look3 Tablet',
    recommendation_reason: 'The Look3 Tablet combined with SyncBox is the definitive solution for Palais de la Découverte\'s video-synchronized science hall. The Look3 uses precision IR automatic triggering (10 cm accuracy) with no WiFi dependency, and its video synchronization engine — paired with SyncBox — fires real-time timestamp commands to each of the 24 external video screens the moment a visitor approaches. The 7000 mAh battery provides two-day autonomy on a 150-device fleet, and its 5.5" HD touchscreen supports rich interactive content alongside the video sync.',
    exclusions: [
      'Style Audio Guide — excellent for audio-only deployments but does not natively drive video screen synchronization without SyncBox; Look3 is the stronger primary device for video-first installations',
      'Trend Audio Guide — does not support video synchronization; unsuitable for this deployment',
      'Twister Headset Guide — audio-only, no video sync capability'
    ],
    draft_reply: `Dear Sophie,

Thank you for sharing the details of the Palais de la Découverte redesign — synchronizing visitor audio guides with 24 live video screens is exactly the kind of immersive experience our technology is built for.

We recommend the Look3 Tablet paired with SyncBox for your science hall.

How it works:
• Look3 Tablet (×150): Android-based multimedia guide with precision IR automatic triggering. When a visitor approaches a station, the device detects proximity within 10 cm — no WiFi, no manual input — and triggers both the audio content on the device and a sync signal to the corresponding video screen simultaneously.
• SyncBox: installed at each of your 24 video stations, the SyncBox receives real-time timestamp commands from the Look3 and synchronizes your video screen content frame-accurately with the visitor's audio playback.

Key specs for your deployment:
• Languages: French and English (and up to 30 additional languages if required in the future)
• Battery: 7000 mAh — two-day autonomy, minimizing midday charging interruptions
• Screen: 5.5" HD touchscreen for interactive content alongside the video experience
• Charging: magnetic pogo-pin modular docking

We would love to walk your AV team through a technical demo of the video sync workflow. Shall we arrange a call with our integration engineer?

Best regards,
The Sales Team
Look2Innovate`
  },

  // Cairo Gallery — Trend Audio Guide
  {
    classification: 'product_inquiry',
    confidence: 89,
    client_name: 'Omar Khalil',
    client_company: 'Cairo Private Art Gallery',
    requirements: [
      '40 artworks across two rooms',
      'Manual keypad input (number-press playback)',
      'Arabic and English language support',
      'Full-day battery without recharging',
      'Maximum 30 devices',
      'Simple, low-cost setup'
    ],
    recommended_product: 'Trend Audio Guide',
    recommendation_reason: 'The Trend Audio Guide is a perfect match for a compact private gallery deployment. It is specifically designed for manual keypad number-press playback — visitors type the exhibit number and the corresponding audio plays immediately — which is exactly what Omar described. At 30 devices, its low operational footprint and 100-hour battery mean no charging infrastructure is needed during gallery hours. It supports Arabic and English natively and is the most cost-effective device in our lineup for a gallery of this scale.',
    exclusions: [
      'Style Audio Guide — automatic triggering and fleet analytics are unnecessary features for a 30-device manual setup; adds cost without benefit',
      'Look3 Tablet — video sync and touchscreen features are beyond the scope of a simple audio guide deployment',
      'Twister Headset Guide — all-in-one headset format is better suited for high-traffic venues; over-specified for a small private gallery',
      'SyncBox — not applicable; no video synchronization required'
    ],
    draft_reply: `Dear Omar,

Thank you for reaching out — we work with galleries of all sizes and are happy to recommend the right fit for your space.

For your 40-artwork gallery with 30 devices and a straightforward manual playback experience, we recommend the Trend Audio Guide.

Why it is the right choice:
• Manual keypad playback: visitors press the number of the artwork they are standing in front of — simple, intuitive, no learning curve.
• Arabic and English: both languages are included as standard; you can load content for both and visitors select their preferred language at startup.
• Battery: 100 hours of continuous playback — your devices will run the full gallery day without any midday charging.
• Storage: up to 1000 hours of audio content, more than enough for 40 artworks in two languages with room to grow.
• Low operational cost: no triggering infrastructure to install, no WiFi dependency, minimal maintenance.

For 30 devices at this scale, setup is straightforward — we can have your system ready for visitors within days of delivery.

Would you like us to prepare a quote? We can also arrange for a sample unit to be shipped so your team can evaluate the experience before committing.

Best regards,
The Sales Team
Look2Innovate`
  }
]

export const SAMPLE_EMAILS = [
  {
    label: 'Luxor Museum — Product Inquiry',
    from: 'Ahmed Hassan <ahmed.hassan@luxormuseum.eg>',
    subject: 'Audio Guide System Inquiry — Luxor Museum',
    body: `Dear Team,

I am the Facilities Director at the Luxor Museum of Ancient Egyptian Art. We are planning to modernize our visitor experience and are considering a professional audio guide system for our permanent collection.

Our requirements are as follows:
- We have 3 exhibition floors with approximately 120 exhibit points
- We require automatic triggering at each exhibit — visitors should not need to press anything
- Multilingual support is essential: Arabic, English, and French at minimum
- Battery life should cover a full visitor day (8 hours minimum)
- We do not need video synchronization
- We are looking at a fleet of approximately 200 devices

Could you recommend the most appropriate system from your lineup and provide a rough pricing estimate for this scale of deployment?

Best regards,
Ahmed Hassan
Facilities Director, Luxor Museum of Ancient Egyptian Art`
  },
  {
    label: 'Science Museum — Video Sync Inquiry',
    from: 'Sophie Laurent <s.laurent@palaisdecouverte.fr>',
    subject: 'Audio guide with video sync — Palais de la Découverte',
    body: `Hello,

I am the Digital Experience Manager at Palais de la Découverte in Paris. We are redesigning our main science hall and want to integrate audio guides that synchronize with our new video screens at each exhibit station.

We need:
- Synchronization between the audio guide and 24 video screens across the exhibition
- French and English language support
- Around 150 devices for visitor use
- Content auto-play when visitors approach each station

Could you advise on the best solution?

Best regards,
Sophie Laurent`
  },
  {
    label: 'Small Gallery — Simple Setup',
    from: 'Omar Khalil <ok@cairo-gallery.com>',
    subject: 'Small gallery audio guide — 30 devices',
    body: `Hi,

We run a small private art gallery in Cairo and are interested in adding an audio guide to improve our visitor experience. We have around 40 artworks across two rooms.

We need something simple — visitors can press a number to hear about each artwork. No fancy triggering needed. Arabic and English. Around 30 devices maximum, and we need them to last the full day without charging.

What would you recommend for our size?

Omar Khalil
Gallery Director`
  }
]
