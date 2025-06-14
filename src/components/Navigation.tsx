'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/posts', label: 'Posts' },
  { href: '/templates', label: 'Templates' },
  { href: '/new', label: 'New Post' },
  { href: '/settings', label: 'Settings' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/'
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            Dashboard
          </Link>
          <SignedIn>
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </SignedIn>
        </div>
      </div>
    </nav>
  );
} 