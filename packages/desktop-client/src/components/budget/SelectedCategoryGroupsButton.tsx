import React from 'react';
import { useTranslation } from 'react-i18next';

import type {
  CategoryEntity,
  CategoryGroupEntity,
} from '@actual-app/core/types/models';

import { SelectedItemsButton } from '#components/table';
import { useCategories } from '#hooks/useCategories';
import { useFeatureFlag } from '#hooks/useFeatureFlag';
import { useSelectedDispatch } from '#hooks/useSelected';

type TemplateAction = 'apply-templates' | 'overwrite-templates';

type SelectedCategoryGroupsButtonProps = {
  onApplyTemplates: (params: {
    categoryIds: Array<CategoryEntity['id']>;
    force: boolean;
  }) => void;
};

// Bulk actions target the same categories the single-group action does:
// everything visible inside the selected groups.
function getVisibleCategoryIds({
  categoryGroups,
  groupIds,
}: {
  categoryGroups: CategoryGroupEntity[];
  groupIds: Array<CategoryGroupEntity['id']>;
}): Array<CategoryEntity['id']> {
  const selectedGroupIds = new Set(groupIds);

  return categoryGroups
    .filter(group => selectedGroupIds.has(group.id))
    .flatMap(group => group.categories ?? [])
    .filter(category => !category.hidden)
    .map(category => category.id);
}

export function SelectedCategoryGroupsButton({
  onApplyTemplates,
}: SelectedCategoryGroupsButtonProps) {
  const { t } = useTranslation();
  const dispatchSelected = useSelectedDispatch();
  const isGoalTemplatesEnabled = useFeatureFlag('goalTemplatesEnabled');
  const { data: { grouped: categoryGroups } = { grouped: [] } } =
    useCategories();

  if (!isGoalTemplatesEnabled) {
    return null;
  }

  function handleSelect(
    action: TemplateAction,
    groupIds: Array<CategoryGroupEntity['id']>,
  ) {
    const categoryIds = getVisibleCategoryIds({ categoryGroups, groupIds });

    onApplyTemplates({
      categoryIds,
      force: action === 'overwrite-templates',
    });
    dispatchSelected({ type: 'select-none' });
  }

  return (
    <SelectedItemsButton<TemplateAction>
      id="selected-category-groups"
      name={count => t('{{count}} groups', { count })}
      items={[
        { name: 'apply-templates', text: t('Apply templates') },
        { name: 'overwrite-templates', text: t('Overwrite with templates') },
      ]}
      onSelect={handleSelect}
    />
  );
}
