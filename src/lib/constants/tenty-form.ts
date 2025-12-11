// lib/constants/tenty-form.ts

export const PLATFORMS = [
    'TikTok',
    'YouTube',
    'Spotify',
    'SoundCloud',
    'Apple Music',
    'iTunes',
    'Deezer',
    'Amazon Music',
    'Bandcamp',
    'Beatport',
    'Mixcloud',
    'Pandora',
    'Tidal',
    'Google Play Music',
    'Yandex Music',
    'VK Music',
    'Audiomack',
    'ReverbNation',
    'DistroKid',
    'CD Baby',
] as const;

export type Platform = typeof PLATFORMS[number];

export const REPORT_TYPES = [
  'Copyright Infringement',
  'Trademark Violation',
  'Right of Publicity/Likeness',
  'Defamation',
  'Privacy Violation',
  'Counterfeit/Impersonation',
  'Unauthorized Sampling',
  'Plagiarism',
] as const;

export type ReportType = typeof REPORT_TYPES[number];

export const CONTENT_TYPES = [
  'Music Composition',
  'Sound Recording',
  'Music Video',
  'Podcast',
  'Cover Song',
  'Remix',
  'Mashup',
  'Lyrics',
  'Album Artwork',
  'Artist Biography',
  'Playlist',
  'Live Performance',
  'DJ Set',
  'Beat/Instrumental',
  'Sound Effect',
  'Audio Book',
  'Jingle',
  'Film Score',
] as const;

export type ContentType = typeof CONTENT_TYPES[number];

export const OWNERSHIP_TYPES = [
    'I own the composition',
    'I own the sound recording',
    'I own the video content',
    'I own the lyrics/text',
    'I own the artwork/visuals',
    'I represent the rights holder',
    'I am the authorized agent',
    'I have exclusive license',
] as const;

export type OwnershipType = typeof OWNERSHIP_TYPES[number];

export const FORM_CONSTANTS = {
  platforms: PLATFORMS,
  reportTypes: REPORT_TYPES,
  contentTypes: CONTENT_TYPES,
  ownershipTypes: OWNERSHIP_TYPES,
} as const;

export interface ReportData {
  firstName: string;
  lastName: string;
  companyName: string;
  mailingAddress: string;
  phoneNumber: string;
  email: string;
  additionalContacts: string;
  
  reportingPlatform: Platform | string; 
  reportType: ReportType | string;
  contentType: ContentType | string;
  reportingReason: string;
  
  evidenceUrl: string;
  ownershipType: OwnershipType | string;
  ownershipExplanation: string;
  
  agreeTerms: boolean;
  agreeAccuracy: boolean;
  agreePenalties: boolean;
}