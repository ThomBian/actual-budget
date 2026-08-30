import React from 'react';
import { useTranslation } from 'react-i18next';

import { SvgReports, SvgWallet } from '@actual-app/components/icons/v1';
import { SvgCalendar3 } from '@actual-app/components/icons/v2';
import { View } from '@actual-app/components/view';

import { Item } from './Item';

/**
 * The places people open every day. Everything you set up once - payees, rules,
 * tags, bank sync, settings - lives in the budget name menu at the top.
 */
export function PrimaryButtons() {
  const { t } = useTranslation();

  return (
    <View data-testid="sidebar-primary-buttons" style={{ flexShrink: 0 }}>
      <Item title={t('Budget')} Icon={SvgWallet} to="/budget" />
      <Item title={t('Reports')} Icon={SvgReports} to="/reports" />
      <Item title={t('Schedules')} Icon={SvgCalendar3} to="/schedules" />
    </View>
  );
}
