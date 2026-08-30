import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import {
  SvgCog,
  SvgCreditCard,
  SvgReports,
  SvgStoreFront,
  SvgTag,
  SvgTuning,
  SvgWallet,
} from '@actual-app/components/icons/v1';
import { SvgCalendar3 } from '@actual-app/components/icons/v2';
import { View } from '@actual-app/components/view';

import { useIsTestEnv } from '#hooks/useIsTestEnv';
import { useSyncServerStatus } from '#hooks/useSyncServerStatus';

import { INDENT, Item } from './Item';
import { NavSection } from './NavSection';

// Destinations behind "More". Kept in one place so the section can open itself
// when the user is already on one of them.
const MORE_ROUTES = ['/payees', '/rules', '/bank-sync', '/tags', '/settings'];

export function PrimaryButtons() {
  const { t } = useTranslation();
  const location = useLocation();

  const syncServerStatus = useSyncServerStatus();
  const isTestEnv = useIsTestEnv();
  const isUsingServer = syncServerStatus !== 'no-server' || isTestEnv;

  const isMoreActive = MORE_ROUTES.some(route =>
    location.pathname.startsWith(route),
  );

  const [isMoreOpen, setMoreOpen] = useState(isMoreActive);

  // Landing on one of these routes from elsewhere (command bar, deep link)
  // should reveal where you are.
  useEffect(() => {
    if (isMoreActive) {
      setMoreOpen(true);
    }
  }, [isMoreActive]);

  return (
    <View data-testid="sidebar-primary-buttons" style={{ flexShrink: 0 }}>
      <Item title={t('Budget')} Icon={SvgWallet} to="/budget" />
      <Item title={t('Reports')} Icon={SvgReports} to="/reports" />
      <Item title={t('Schedules')} Icon={SvgCalendar3} to="/schedules" />

      <NavSection
        title={t('More')}
        isOpen={isMoreOpen}
        onToggle={() => setMoreOpen(open => !open)}
      >
        <Item
          title={t('Payees')}
          Icon={SvgStoreFront}
          to="/payees"
          level="secondary"
          indent={INDENT}
        />
        <Item
          title={t('Rules')}
          Icon={SvgTuning}
          to="/rules"
          level="secondary"
          indent={INDENT}
        />
        {isUsingServer && (
          <Item
            title={t('Bank Sync')}
            Icon={SvgCreditCard}
            to="/bank-sync"
            level="secondary"
            indent={INDENT}
          />
        )}
        <Item
          title={t('Tags')}
          Icon={SvgTag}
          to="/tags"
          level="secondary"
          indent={INDENT}
        />
        <Item
          title={t('Settings')}
          Icon={SvgCog}
          to="/settings"
          level="secondary"
          indent={INDENT}
        />
      </NavSection>
    </View>
  );
}
