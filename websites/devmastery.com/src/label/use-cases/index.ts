import { locales } from '../../../locales.config';
import { labelData as labels } from '../data-store';
import { interpolate } from '../helpers/interpolate';
import { makeTranslateLabel } from './translate-label';
import { makeTranslateLayout } from './translate-layout';

export const translateLabel = makeTranslateLabel({
  labels,
  interpolate,
  supportedLocales: locales as Locale[],
});

const keys = {
  common: ["light mode", "dark mode", "logo", "copyright", "github", "youtube"],
  navigation: ["articles", "videos", "podcasts", "books", "courses"],
};

export const translateLayout = makeTranslateLayout({ translateLabel, keys });
