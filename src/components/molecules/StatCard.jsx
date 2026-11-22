import React from "react";

export default function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="xp-stat-box">
      <div className="xp-stat-label">{title}</div>
      <div className="xp-stat-value">{value}</div>
      {subtitle && <div className="xp-stat-sub">{subtitle}</div>}
    </div>
  );
}
