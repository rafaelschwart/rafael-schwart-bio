import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5f5c9e94055b40339db7b4115ff3cc0d',
  appName: 'rafael-schwart-folio',
  webDir: 'dist',
  server: {
    url: 'https://5f5c9e94-055b-4033-9db7-b4115ff3cc0d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;