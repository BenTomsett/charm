import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <a href="/" className={cn('text-xl font-semibold', className)}>
      ch
      <span className="text-orange-500">ARM</span>
    </a>
  );
};

export default Logo;
