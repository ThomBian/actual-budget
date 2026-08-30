import React from 'react';
import type { ComponentProps, ComponentType, SVGProps } from 'react';

import { Block } from '@actual-app/components/block';
import { Button } from '@actual-app/components/button';
import { styles } from '@actual-app/components/styles';
import type { CSSProperties } from '@actual-app/components/styles';
import { theme } from '@actual-app/components/theme';
import { View } from '@actual-app/components/view';

import { Link } from '#components/common/Link';

// Every row reserves this gutter and keeps it transparent until selected, so
// highlighting a row recolors it instead of reflowing the row's contents.
const SELECTION_BAR_WIDTH = 4;

// Content sits 20px from the sidebar edge, lining every row - nav items,
// accounts, section headers - up with the budget name above them.
const CONTENT_INSET = 20;

/** Left step for rows nested inside a {@link NavSection}. */
export const INDENT = 16;

/**
 * The one row shape in the sidebar. Nav items, account rows and section headers
 * all build on it so the menu has a single hover, selection and inset model.
 */
export const rowStyle: CSSProperties = {
  borderLeft: `${SELECTION_BAR_WIDTH}px solid transparent`,
  paddingLeft: CONTENT_INSET - SELECTION_BAR_WIDTH,
  paddingRight: 10,
  textDecoration: 'none',
  color: theme.sidebarItemText,
  ':hover': { backgroundColor: theme.sidebarItemBackgroundHover },
};

/** Selected state for any row built on {@link rowStyle}. */
export const activeRowStyle: CSSProperties = {
  borderLeftColor: theme.sidebarItemAccentSelected,
  color: theme.sidebarItemTextSelected,
};

// Two tiers, and the icon tracks its row's text size rather than picking an
// arbitrary one.
const LEVELS = {
  primary: { text: styles.mediumText, iconSize: 15, paddingY: 10 },
  secondary: { text: styles.smallText, iconSize: 13, paddingY: 5 },
} as const;

export type ItemLevel = keyof typeof LEVELS;

type ItemProps = {
  title: string;
  Icon?:
    | ComponentType<SVGProps<SVGElement>>
    | ComponentType<SVGProps<SVGSVGElement>>;
  to?: string;
  onClick?: ComponentProps<typeof Button>['onPress'];
  level?: ItemLevel;
  indent?: number;
  style?: CSSProperties;
  dataTestId?: string;
};

export function Item({
  title,
  Icon,
  to,
  onClick,
  level = 'primary',
  indent = 0,
  style,
  dataTestId,
}: ItemProps) {
  const { text, iconSize, paddingY } = LEVELS[level];

  const rowStyles: CSSProperties = {
    ...rowStyle,
    ...text,
    paddingTop: paddingY,
    paddingBottom: paddingY,
    paddingLeft: CONTENT_INSET - SELECTION_BAR_WIDTH + indent,
    ...style,
  };

  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {Icon && (
        <Icon width={iconSize} height={iconSize} style={{ flexShrink: 0 }} />
      )}
      <Block style={{ color: 'inherit' }}>{title}</Block>
    </View>
  );

  return (
    <View data-testid={dataTestId} style={{ flexShrink: 0 }}>
      {onClick ? (
        <Button
          variant="bare"
          style={{ justifyContent: 'flex-start', ...rowStyles }}
          onPress={onClick}
        >
          {content}
        </Button>
      ) : (
        <Link
          variant="internal"
          to={to}
          style={rowStyles}
          activeStyle={activeRowStyle}
        >
          {content}
        </Link>
      )}
    </View>
  );
}
