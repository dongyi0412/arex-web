import { ColorPrimary, getLocalStorage, Theme } from 'arex-core';
import { RequestMethodEnum } from 'arex-core/src';

export enum PanesType {
  DEMO = 'Demo',
  ENVIRONMENT = 'Environment',
}

export enum MenusType {
  DEMO = 'Demo',
  ENVIRONMENT = 'Environment',
}

export const methodMap: Record<RequestMethodEnum, { color: string }> = {
  GET: {
    color: '#0cbb52',
  },
  PUT: {
    color: '#097bed',
  },
  POST: {
    color: '#ffb400',
  },
  DELETE: {
    color: '#eb2013',
  },
  PATCH: {
    color: '#212121',
  },
};

export enum NodeType {
  interface = 1,
  case = 2,
  folder = 3,
}

// localStorage key
export const I18_KEY = 'i18nextLng';
export const THEME_KEY = 'theme';

// Default value
export const DEFAULT_ACTIVE_MENU = MenusType.ENVIRONMENT;
export const DEFAULT_THEME =
  getLocalStorage<Theme>(THEME_KEY) ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light);
export const DEFAULT_COLOR_PRIMARY = ColorPrimary.green;

export const MAX_PANES_COUNT = 8;
