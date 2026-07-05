// Ilustração geométrica chapada por categoria (evita foto stock / cara de IA).
// Paleta cobalto; usada como "hero" das excursões e dos passeios.
const scenes = {
  praia: (
    <>
      <rect width="400" height="240" fill="#2B50FF" />
      <circle cx="312" cy="66" r="30" fill="#C9D4FF" />
      <path d="M0 168 Q100 150 200 168 T400 168 V240 H0 Z" fill="#1E3AD6" />
      <path d="M0 190 Q100 174 200 190 T400 190 V240 H0 Z" fill="#EEF1FF" opacity="0.9" />
      <path d="M60 168 l14 -30 14 30 z" fill="#C9D4FF" opacity="0.6" />
    </>
  ),
  montanha: (
    <>
      <rect width="400" height="240" fill="#1E3AD6" />
      <circle cx="86" cy="60" r="24" fill="#C9D4FF" />
      <path d="M0 240 L120 96 L210 240 Z" fill="#2B50FF" />
      <path d="M150 240 L280 70 L400 240 Z" fill="#3E60FF" />
      <path d="M120 96 l-22 34 44 0 z" fill="#EEF1FF" opacity="0.9" />
    </>
  ),
  ilha: (
    <>
      <rect width="400" height="240" fill="#2B50FF" />
      <circle cx="80" cy="62" r="26" fill="#C9D4FF" />
      <ellipse cx="220" cy="176" rx="120" ry="34" fill="#1E3AD6" />
      <path d="M212 176 q8 -46 12 -58 q6 12 12 58" fill="#C9D4FF" opacity="0.75" />
      <path d="M0 206 Q100 192 200 206 T400 206 V240 H0 Z" fill="#EEF1FF" opacity="0.85" />
    </>
  ),
  onibus: (
    <>
      <rect width="400" height="240" fill="#2B50FF" />
      <path d="M-20 190 h440" stroke="#1E3AD6" strokeWidth="26" strokeDasharray="34 26" />
      <rect x="120" y="96" width="170" height="70" rx="14" fill="#EEF1FF" />
      <rect x="134" y="110" width="34" height="26" rx="5" fill="#2B50FF" />
      <rect x="176" y="110" width="34" height="26" rx="5" fill="#2B50FF" />
      <rect x="218" y="110" width="34" height="26" rx="5" fill="#2B50FF" />
      <circle cx="152" cy="170" r="15" fill="#0E1330" />
      <circle cx="258" cy="170" r="15" fill="#0E1330" />
    </>
  ),
};

export default function Scene({ variant = "praia", className = "", rounded = "" }) {
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${rounded} ${className}`}
      aria-hidden="true"
    >
      {scenes[variant] ?? scenes.praia}
    </svg>
  );
}
