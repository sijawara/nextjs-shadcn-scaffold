# Frontend Guide (Shadcn + Modern Design)

Desain sistem berbasis **Tailwind CSS** dengan **Shadcn UI**.

## Prinsip Desain
1. **Clean & Minimalist**: Hindari border yang terlalu tebal, gunakan shadow halus.
2. **Space & Rhythm**: Berikan whitespace yang cukup (`p-6`, `p-8`, `gap-4`).
3. **Consistent Typography**: Gunakan variable font dan skala teks yang jelas.

## CSS Variables (Theming)
Kustomisasi warna dilakukan di `app/globals.css`. Jangan pernah menggunakan hardcoded hex colors di komponen.

```css
/* Contoh di globals.css */
:root {
  --background: 0 0% 100%;
  --primary: 222.2 47.4% 11.2%;
  --radius: 0.5rem;
}
```

Gunakan di Tailwind:
```tsx
<div className="bg-background text-primary rounded-[var(--radius)]">
  Content
</div>
```

## Penggunaan Komponen Shadcn
Selalu gunakan komponen dari folder `components/ui/`. Jika butuh animasi, gunakan `framer-motion` (opsional) atau CSS transition.

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PremiumCard() {
  return (
    <Card className="p-6 transition-all hover:shadow-lg">
      <h2 className="text-xl font-bold">Premium Layout</h2>
      <Button variant="default" className="mt-4">
        Get Started
      </Button>
    </Card>
  );
}
```

## Icons
Kita menggunakan **Tabler Icons React** untuk semua kebutuhan icon. Tabler Icons memberikan tampilan yang konsisten dan modern.

```tsx
import { IconUser, IconSettings, IconLogout } from "@tabler/icons-react";

export function UserMenu() {
  return (
    <div className="flex gap-2">
      <IconUser size={20} className="text-muted-foreground" />
      <span>Profile</span>
    </div>
  );
}
```

## Tips Animasi
Gunakan micro-interactions pada hover/click untuk membuat UI terasa "hidup".
- Hover lift: `hover:-translate-y-1 transition-transform`
- Hover scale: `hover:scale-105 transition-transform`
- Icon spin on hover: `group-hover:rotate-12 transition-transform` (gunakan `group` pada parent)
