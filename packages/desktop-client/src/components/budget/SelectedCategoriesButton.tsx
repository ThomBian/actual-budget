import React from 'react';
import { useTranslation } from 'react-i18next';

import type { CategoryEntity } from '@actual-app/core/types/models';

import { SelectedItemsButton } from '#components/table';
import { useFeatureFlag } from '#hooks/useFeatureFlag';
import { useSelectedDispatch } from '#hooks/useSelected';

type TemplateAction = 'apply-templates' | 'overwrite-templates';

type SelectedCategoriesButtonProps = {
  onApplyTemplates: (params: {
    categoryIds: Array<CategoryEntity['id']>;
    force: boolean;
  }) => void;
};

export function SelectedCategoriesButton({
  onApplyTemplates,
}: SelectedCategoriesButtonProps) {
  const { t } = useTranslation();
  const dispatchSelected = useSelectedDispatch();
  const isGoalTemplatesEnabled = useFeatureFlag('goalTemplatesEnabled');

  if (!isGoalTemplatesEnabled) {
    return null;
  }

  function handleSelect(
    action: TemplateAction,
    categoryIds: Array<CategoryEntity['id']>,
  ) {
    onApplyTemplates({
      categoryIds,
      force: action === 'overwrite-templates',
    });
    dispatchSelected({ type: 'select-none' });
  }

  return (
    <SelectedItemsButton<TemplateAction>
      id="selected-categories"
      name={count => t('{{count}} categories', { count })}
      items={[
        { name: 'apply-templates', text: t('Apply templates') },
        { name: 'overwrite-templates', text: t('Overwrite with templates') },
      ]}
      onSelect={handleSelect}
    />
  );
}
