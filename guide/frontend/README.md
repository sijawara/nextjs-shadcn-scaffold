# Panduan Frontend Shadcn dan Desain Modern

Dokumentasi ini menjelaskan standar pengembangan antarmuka, visual, dan struktur komponen menggunakan Tailwind CSS v4 dan Shadcn UI. Panduan ini wajib dipatuhi untuk menjaga kebersihan kode dan kualitas antarmuka.

## Aturan Utama

### Hal yang Harus Dilakukan
- Gunakan variabel CSS untuk warna. Gunakan warna semantik Tailwind (seperti bg-background, text-foreground, border-border, bg-primary, text-muted-foreground).
- Pecah komponen besar menjadi komponen anak yang lebih kecil agar mudah dikelola dan dapat digunakan kembali.
- Pisahkan logika fungsional dari UI. Tempatkan kalkulasi, pengambilan data, atau pengelolaan state di berkas helper, custom hooks, atau server action terpisah.
- Gunakan "use client" secara selektif. Hanya gunakan jika komponen memerlukan interaktivitas browser, state, atau efek samping.

### Hal yang Dilarang
- Jangan menulis nilai hex warna langsung di dalam kelas utilitas Tailwind.
- Sediakan efek visual saat elemen diakses. Setiap tombol dan tautan wajib memiliki status hover dan transisi yang halus.

## Alur Kerja Pengembangan

1. Pisahkan rancangan antarmuka menjadi komponen penampung logika dan komponen presentasional.
2. Tempatkan logika fungsional atau pengambilan data ke berkas hooks terpisah jika diperlukan.
3. Susun komponen visual menggunakan pustaka Shadcn UI di folder components/ui dan hubungkan ke variabel CSS.
4. Tambahkan transisi, status hover, atau indikator pemuatan untuk aktivitas asinkron.

## Contoh Kode

### Pemisahan Logika dari Antarmuka

**Logika (`hooks/use-counter.ts`):**
```ts
import { useState } from "react";

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));

  return { count, increment, decrement };
}
```

**Antarmuka (`components/counter-view.tsx`):**
```tsx
"use client";

import { useCounter } from "@/hooks/use-counter";
import { Button } from "@/components/ui/button";
import { IconPlus, IconMinus } from "@tabler/icons-react";

export function CounterView() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div className="flex items-center gap-4 p-4 border border-border bg-card text-card-foreground rounded-lg shadow-sm">
      <Button variant="outline" size="icon" onClick={decrement} className="hover:bg-accent">
        <IconMinus size={16} />
      </Button>
      <span className="font-mono text-lg font-bold">{count}</span>
      <Button variant="outline" size="icon" onClick={increment} className="hover:bg-accent">
        <IconPlus size={16} />
      </Button>
    </div>
  );
}
```

### Pembuatan Kartu Premium dengan Transisi

```tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconArrowUpRight, IconRocket } from "@tabler/icons-react";

interface FeatureCardProps {
  title: string;
  description: string;
  onAction?: () => void;
}

export function FeatureCard({ title, description, onAction }: FeatureCardProps) {
  return (
    <Card className="group relative overflow-hidden p-6 bg-card border border-border/80 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:scale-110 transition-transform duration-300">
            <IconRocket size={20} />
          </div>
          <IconArrowUpRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={18} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {description}
          </p>
        </div>

        <Button onClick={onAction} variant="secondary" className="w-full mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          Learn More
        </Button>
      </div>
    </Card>
  );
}
```
