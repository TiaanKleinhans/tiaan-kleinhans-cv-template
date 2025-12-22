'use client';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--primary)]">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[var(--secondary)]/30 border-t-[var(--secondary)] rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-white text-lg font-medium animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  );
}

