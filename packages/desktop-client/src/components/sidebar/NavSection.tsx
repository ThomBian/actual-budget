import React from 'react';
import type { ReactNode } from 'react';

import { Block } from '@actual-app/components/block';
import { Button } from '@actual-app/components/button';
import { SvgCheveronDown } from '@actual-app/components/icons/v1';
import { styles } from '@actual-app/components/styles';
import type { CSSProperties } from '@actual-app/components/styles';
import { View } from '@actual-app/components/view';

import { rowStyle } from './Item';

type NavSectionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  style?: CSSProperties;
};

/**
 * A collapsible group of sidebar rows. The header is a disclosure, not a
 * destination: it never takes the selected state, because the row the user is
 * actually on is one of its children.
 */
export function NavSection({
  title,
  isOpen,
  onToggle,
  children,
  style,
}: NavSectionProps) {
  return (
    <View style={{ flexShrink: 0, ...style }}>
      <Button
        variant="bare"
        aria-expanded={isOpen}
        onPress={onToggle}
        style={{
          ...rowStyle,
          ...styles.mediumText,
          justifyContent: 'flex-start',
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            width: '100%',
          }}
        >
          <Block style={{ flex: 1, textAlign: 'left', color: 'inherit' }}>
            {title}
          </Block>
          <View
            style={{
              flexShrink: 0,
              transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform .15s ease-out',
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
              },
            }}
          >
            <SvgCheveronDown width={12} height={12} />
          </View>
        </View>
      </Button>

      {isOpen && children}
    </View>
  );
}
