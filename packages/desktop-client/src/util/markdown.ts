// @ts-strict-ignore

import { styles } from '@actual-app/components/styles';
import { theme } from '@actual-app/components/theme';
import { radius } from '@actual-app/components/tokens';
import { css } from '@emotion/css';
import { newlineToBreak } from 'mdast-util-newline-to-break';

export function sequentialNewlinesPlugin() {
  // Adapted from https://codesandbox.io/s/create-react-app-forked-h3rmcy?file=/src/sequentialNewlinePlugin.js:0-774
  const data = this.data();

  function add(
    field: string,
    value: {
      enter: {
        lineEndingBlank: (token: unknown) => void;
      };
      exit: {
        lineEndingBlank: (token: unknown) => void;
      };
    },
  ) {
    const list = data[field] ? data[field] : (data[field] = []);

    list.push(value);
  }

  add('fromMarkdownExtensions', {
    enter: {
      lineEndingBlank: function enterLineEndingBlank(token: unknown) {
        this.enter(
          {
            type: 'break',
            value: '',
            data: {},
            children: [],
          },
          token,
        );
      },
    },
    exit: {
      lineEndingBlank: function exitLineEndingBlank(token: unknown) {
        this.exit(token);
      },
    },
  });
}

export function remarkBreaks() {
  return newlineToBreak;
}

export const markdownBaseStyles = css({
  overflowWrap: 'break-word',
  '& p': {
    margin: 0,
    ':not(:first-child)': {
      marginTop: `${radius.xs}px`,
    },
  },
  '& ul, & ol': {
    listStylePosition: 'inside',
    margin: 0,
    paddingLeft: 0,
  },
  '&>* ul, &>* ol': {
    marginLeft: '1.5rem',
  },
  '& li>p': {
    display: 'contents',
  },
  '& blockquote': {
    paddingLeft: '0.75rem',
    borderLeft: '3px solid ' + theme.markdownDark,
    margin: 0,
  },
  '& hr': {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid ' + theme.markdownNormal,
  },
  '& code': {
    backgroundColor: theme.markdownLight,
    padding: '0.1rem 0.5rem',
    borderRadius: `${radius.xs}px`,
  },
  '& pre': {
    padding: `${radius.md}px`,
    backgroundColor: theme.markdownLight,
    textAlign: 'left',
    borderRadius: `${radius.md}px`,
    margin: 0,
    ':not(:first-child)': {
      marginTop: `${radius.xs}px`,
    },
    '& code': {
      background: 'inherit',
      padding: 0,
      borderRadius: radius.none,
    },
  },
  '& table, & th, & td': {
    border: '1px solid ' + theme.markdownNormal,
  },
  '& table': {
    borderCollapse: 'collapse',
    wordBreak: 'break-word',
  },
  '& td': {
    padding: '0.25rem 0.75rem',
  },
  '& h3': styles.mediumText,
});
