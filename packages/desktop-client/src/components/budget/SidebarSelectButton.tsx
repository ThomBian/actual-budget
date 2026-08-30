import React from 'react';

import { Button } from '@actual-app/components/button';
import { SvgCheckmark, SvgSubtract } from '@actual-app/components/icons/v1';
import { theme } from '@actual-app/components/theme';
import { radius } from '@actual-app/components/tokens';
import { View } from '@actual-app/components/view';

export type SelectionState = 'checked' | 'indeterminate' | 'unchecked';

type SidebarSelectButtonProps = {
  label: string;
  state: SelectionState;
  onSelect: (params: { isRangeSelect: boolean }) => void;
};

export function SidebarSelectButton({
  label,
  state,
  onSelect,
}: SidebarSelectButtonProps) {
  const isEmpty = state === 'unchecked';

  return (
    // Sidebar rows act on their own clicks (a group row collapses itself),
    // so selection clicks stop here
    <View
      style={{
        flexShrink: 0,
        marginLeft: 5,
        marginRight: 3,
        justifyContent: 'center',
      }}
      onClick={e => e.stopPropagation()}
    >
      <Button
        variant="bare"
        aria-label={label}
        aria-pressed={state === 'indeterminate' ? 'mixed' : state === 'checked'}
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
            (isEmpty ? theme.formInputBorder : theme.checkboxBorderSelected),
          color: theme.checkboxText,
          backgroundColor: isEmpty
            ? theme.tableBackground
            : theme.checkboxBackgroundSelected,
        }}
      >
        {state === 'checked' && <SvgCheckmark width={6} height={6} />}
        {state === 'indeterminate' && <SvgSubtract width={6} height={6} />}
      </Button>
    </View>
  );
}
