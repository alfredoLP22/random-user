"use client";

import { User } from "@/app/lib/types";
import { SectionTitle } from "../SectionTitle";
import { InfoItem } from "../InfoItem";

export function UserDetails({ user }: { user: User }) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200 text-base leading-relaxed">
      <div className="space-y-3">
        <div>
          <SectionTitle>Teléfonos</SectionTitle>
          <InfoItem label="📞 Teléfono" value={user.phone} />
          <InfoItem label="📱 Celular" value={user.cell} />
        </div>

        <div>
          <SectionTitle>Nacionalidad & Edad</SectionTitle>
          <InfoItem label="🌍 Nacionalidad" value={user.nat} />
          <InfoItem label="🎂 Edad" value={`${user.dob.age} años`} />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <SectionTitle>Dirección</SectionTitle>
          <p>
            {user.location.street.number} {user.location.street.name},<br />
            {user.location.city}, {user.location.state},<br />
            {user.location.country} ({user.location.postcode})
          </p>
        </div>

        <div>
          <SectionTitle>Empresa</SectionTitle>
          <InfoItem
            label="🏢"
            value={user.company?.name || "No especificada"}
          />
          <p className="italic text-sm text-gray-500 dark:text-gray-400">
            “{user.company?.catchPhrase || "Sin eslogan"}”
          </p>
        </div>
      </div>
    </div>
  );
}
