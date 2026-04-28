import { useEffect } from 'react';

/**
 * Sostituisce il <link rel="manifest"> in <head> in base alla route corrente.
 * Permette di avere PWA distinte per il sito pubblico e per la dashboard admin
 * (start_url, scope e nome diversi).
 */
export function useDynamicManifest(href: string) {
  useEffect(() => {
    const link =
      document.querySelector<HTMLLinkElement>('link[rel="manifest"]') ??
      document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'manifest' }));
    link.href = href;
  }, [href]);
}
