import React from 'react';
import { useTranslation } from 'react-i18next';

import { radius } from '@actual-app/components/tokens';

import { Page } from '#components/Page';

import { UserAccess } from './UserAccess';

export function UserAccessPage() {
  const { t } = useTranslation();

  return (
    <Page
      header={t('User Access')}
      style={{
        borderRadius: `${radius.xs}px`,
        marginBottom: '25px',
      }}
    >
      <UserAccess isModal={false} />
    </Page>
  );
}
