import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@actual-app/components/button';
import { SvgCheckmark } from '@actual-app/components/icons/v1';
import { theme } from '@actual-app/components/theme';
import { radius } from '@actual-app/components/tokens';
import { View } from '@actual-app/components/view';

type CategoryGroupSelectButtonProps = {
  groupName: string;
  selected: boolean;
  onSelect: (params: { isRangeSelect: boolean }) => void;
};

export function CategoryGroupSelectButton({
  groupName,
  selected,
  onSelect,
}: CategoryGroupSelectButtonProps) {
  const { t } = useTranslation();

  return (
    // The group row collapses itself on click, so selection clicks stop here
    <View
      style={{ flexShrink: 0, marginLeft: 5, justifyContent: 'center' }}
      onClick={e => e.stopPropagation()}
    >
      <Button
        variant="bare"
        aria-label={
          selected
            ? t('Deselect category group {{groupName}}', { groupName })
            : t('Select category group {{groupName}}', { groupName })
        }
        aria-pressed={selected}
        onPress={e => onSelect({ isRangeSelect: e.shiftKey })}
        style={{
          width: 12,
          height: 12,
          padding: 0,
          flexShrink: 0,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: radius.xxs,
          border:
            '1px solid ' +
            (selected ? theme.checkboxBorderSelected : theme.formInputBorder),
          color: theme.checkboxText,
          backgroundColor: selected
            ? theme.checkboxBackgroundSelected
            : theme.tableBackground,
        }}
      >
        {selected && <SvgCheckmark width={6} height={6} />}
      </Button>
    </View>
  );
}
