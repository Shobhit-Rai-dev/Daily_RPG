import React from "react";

export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="page-description">{description}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </header>
  );
}
