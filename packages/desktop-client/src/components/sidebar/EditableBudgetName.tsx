import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@actual-app/components/button';
import { SvgExpandArrow } from '@actual-app/components/icons/v0';
import { InitialFocus } from '@actual-app/components/initial-focus';
import { Input } from '@actual-app/components/input';
import { Menu } from '@actual-app/components/menu';
import { Text } from '@actual-app/components/text';
import { theme } from '@actual-app/components/theme';
import { isElectron } from '@actual-app/core/shared/environment';

import { closeBudget } from '#budgetfiles/budgetfilesSlice';
import { useContextMenu } from '#hooks/useContextMenu';
import { useIsTestEnv } from '#hooks/useIsTestEnv';
import { useMetadataPref } from '#hooks/useMetadataPref';
import { useNavigate } from '#hooks/useNavigate';
import { useSyncServerStatus } from '#hooks/useSyncServerStatus';
import { pushModal } from '#modals/modalsSlice';
import { useDispatch } from '#redux';

/**
 * The budget name doubles as the menu for everything you configure rather than
 * visit daily: the places you set up a budget, then the budget file itself.
 * Keeping them here leaves the sidebar's nav list to the three destinations
 * people actually open every day.
 */
export function EditableBudgetName() {
  const { t } = useTranslation();
  const [budgetName, setBudgetNamePref] = useMetadataPref('budgetName');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const syncServerStatus = useSyncServerStatus();
  const isTestEnv = useIsTestEnv();
  const isUsingServer = syncServerStatus !== 'no-server' || isTestEnv;

  const { handleContextMenu } = useContextMenu({
    triggerRef,
    items: [
      {
        name: 'payees',
        text: t('Payees'),
        onClick: () => void navigate('/payees'),
      },
      {
        name: 'rules',
        text: t('Rules'),
        onClick: () => void navigate('/rules'),
      },
      isUsingServer && {
        name: 'bank-sync',
        text: t('Bank Sync'),
        onClick: () => void navigate('/bank-sync'),
      },
      {
        name: 'tags',
        text: t('Tags'),
        onClick: () => void navigate('/tags'),
      },
      {
        name: 'settings',
        text: t('Settings'),
        onClick: () => void navigate('/settings'),
      },
      Menu.line,
      {
        name: 'rename',
        text: t('Rename budget'),
        onClick: () => setEditing(true),
      },
      isElectron() && {
        name: 'loadBackup',
        text: t('Load Backup…'),
        onClick: () =>
          dispatch(pushModal({ modal: { name: 'load-backup', options: {} } })),
      },
      {
        name: 'close',
        text: t('Switch file'),
        onClick: () => void dispatch(closeBudget()),
      },
    ],
  });

  if (editing) {
    return (
      <InitialFocus>
        <Input
          style={{
            maxWidth: 'calc(100% - 23px)',
            fontSize: 16,
            fontWeight: 500,
          }}
          defaultValue={budgetName}
          onEnter={newBudgetName => {
            if (newBudgetName.trim() !== '') {
              setBudgetNamePref(newBudgetName);
              setEditing(false);
            }
          }}
          onBlur={() => setEditing(false)}
        />
      </InitialFocus>
    );
  }

  return (
    <Button
      ref={triggerRef}
      data-testid="budget-name"
      variant="bare"
      style={{
        color: theme.sidebarBudgetName,
        fontSize: 16,
        fontWeight: 500,
        marginLeft: -5,
        flex: '0 auto',
      }}
      onClick={handleContextMenu}
    >
      <Text style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {budgetName || t('Unnamed')}
      </Text>
      <SvgExpandArrow
        width={7}
        height={7}
        style={{ flexShrink: 0, marginLeft: 5 }}
      />
    </Button>
  );
}
