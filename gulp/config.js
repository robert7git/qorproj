import path from 'path';
export const ROOTDIR = process.cwd();
export const DISTDIR = path.join(ROOTDIR, './public/spa');
export const SPA_SRC = path.join(ROOTDIR, './app/spa/src');
export const SPA_ROOT = path.join(ROOTDIR, './app/spa');

export const SPA_CONF_DEV = path.join(ROOTDIR, './app/spa/webpack/conf.dev');
export const SPA_CONF_PROD = path.join(ROOTDIR, './app/spa/webpack/conf.prod');
