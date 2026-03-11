import React from 'react';
import './Tabs.css';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  const classes = ['gallui-tabs', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="gallui-tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`gallui-tabs__tab ${activeTab === tab.id ? 'gallui-tabs__tab--active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="gallui-tabs__panel" role="tabpanel">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
