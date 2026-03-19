import type { PromptObject } from 'prompts';

export const ALL_FEATURES = [
  'Constant',
  'Function',
  'AsyncFunction',
  'Event',
  'View',
  'ViewEvent',
  'SharedObject',
] as const;

export type Feature = (typeof ALL_FEATURES)[number];

export type CommandOptions = {
  target: string;
  source?: string;
  withReadme: boolean;
  withChangelog: boolean;
  example: boolean;
  local: boolean;
  name?: string;
  description?: string;
  package?: string;
  authorName?: string;
  authorEmail?: string;
  authorUrl?: string;
  repo?: string;
  platform?: string[];
  features?: string[];
  fullExample?: boolean;
};

export type SubstitutionData = {
  project: {
    slug: string;
    name: string;
    version: string;
    description: string;
    package: string;
    moduleName: string;
    viewName: string;
    sharedObjectName: string;
    platforms: string[];
    features: string[];
  };
  author: string;
  license: string;
  repo: string;
  type: 'remote';
};

export type LocalSubstitutionData = {
  project: {
    slug: string;
    name: string;
    package: string;
    moduleName: string;
    viewName: string;
    sharedObjectName: string;
    platforms: string[];
    features: string[];
  };
  type: 'local';
};

export type CustomPromptObject = PromptObject & {
  name: string;
  resolvedValue?: string | null;
};

export type Answers = Record<string, string>;
