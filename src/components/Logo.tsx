import { ComponentProps } from 'react';

// Import all optimized logo variants
import logo40Png from '@/assets/logo-40.png';
import logo40Webp from '@/assets/logo-40.webp';
import logo48Png from '@/assets/logo-48.png';
import logo48Webp from '@/assets/logo-48.webp';
import logo80Png from '@/assets/logo-80.png';
import logo80Webp from '@/assets/logo-80.webp';
import logo120Png from '@/assets/logo-120.png';
import logo120Webp from '@/assets/logo-120.webp';

interface LogoProps extends ComponentProps<'img'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  priority?: boolean;
}

const LOGO_CONFIG = {
  xs: { 
    width: 40, 
    height: 40, 
    png: logo40Png, 
    webp: logo40Webp 
  },
  sm: { 
    width: 48, 
    height: 48, 
    png: logo48Png, 
    webp: logo48Webp 
  },
  md: { 
    width: 80, 
    height: 80, 
    png: logo80Png, 
    webp: logo80Webp 
  },
  lg: { 
    width: 120, 
    height: 120, 
    png: logo120Png, 
    webp: logo120Webp 
  },
} as const;

export const Logo = ({ 
  size = 'sm', 
  className = '',
  priority = false,
  alt = 'SentiensApps Logo',
  ...props 
}: LogoProps) => {
  const config = LOGO_CONFIG[size];
  
  return (
    <picture>
      {/* WebP version for modern browsers */}
      <source 
        srcSet={config.webp}
        type="image/webp"
      />
      {/* PNG fallback for older browsers */}
      <img
        src={config.png}
        width={config.width}
        height={config.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
        {...props}
      />
    </picture>
  );
};
