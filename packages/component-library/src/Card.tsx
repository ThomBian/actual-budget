import { forwardRef } from 'react';
import type { ComponentProps } from 'react';

import { theme } from './theme';
import { radius, shadows } from './tokens';
import { View } from './View';

type CardProps = ComponentProps<typeof View>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, ...props }, ref) => {
    return (
      <View
        {...props}
        ref={ref}
        style={{
          marginTop: 15,
          marginLeft: 5,
          marginRight: 5,
          borderRadius: radius.md,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorder,
          boxShadow: shadows.md,
          ...props.style,
        }}
      >
        <View
          style={{
            borderRadius: radius.md,
            overflow: 'hidden',
          }}
        >
          {children}
        </View>
      </View>
    );
  },
);

Card.displayName = 'Card';
