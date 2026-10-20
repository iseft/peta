import type { SubcategoryDTO } from '@peta/shared';
import { useState } from 'react';
import { Alert } from 'react-native';

import { useCategories, useDeleteSubcategory, useUpdateSubcategory } from '@/api/queries';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { QueryState } from '@/components/query-state';
import { Row } from '@/components/row';
import { Screen } from '@/components/screen';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';

// Active Categories: every Category the user has a Subcategory in. New
// Subcategories are made where they are used (e.g. adding a Budget Item).
export default function CategoriesScreen() {
  const categories = useCategories();
  const [editing, setEditing] = useState<SubcategoryDTO | null>(null);

  if (!categories.data) {
    return (
      <Screen>
        <QueryState error={categories.error} onRetry={() => void categories.refetch()} />
      </Screen>
    );
  }
  if (editing) return <EditSubcategory subcategory={editing} onDone={() => setEditing(null)} />;

  const active = categories.data.filter((category) => category.subcategories.length > 0);
  return (
    <Screen scroll>
      <ThemedText type="subtitle">Active Categories</ThemedText>
      {active.length === 0 && (
        <ThemedText themeColor="textSecondary">
          None yet. Add a Budget Item and create Subcategories as you go.
        </ThemedText>
      )}
      {active.map((category) => (
        <Card key={category.id}>
          <ThemedText type="smallBold">{category.name}</ThemedText>
          {category.subcategories.map((subcategory) => (
            <Row
              key={subcategory.id}
              title={subcategory.name}
              detail={subcategory.archivedAt ? 'Archived' : undefined}
              onPress={() => setEditing(subcategory)}
              trailing={<ThemedText>›</ThemedText>}
            />
          ))}
        </Card>
      ))}
    </Screen>
  );
}

function EditSubcategory({ subcategory, onDone }: { subcategory: SubcategoryDTO; onDone: () => void }) {
  const update = useUpdateSubcategory();
  const remove = useDeleteSubcategory();
  const [name, setName] = useState(subcategory.name);
  const archived = !!subcategory.archivedAt;

  const confirmDelete = () =>
    Alert.alert(
      `Delete ${subcategory.name}?`,
      'If anything is planned or recorded in it, it is archived instead: hidden from pickers, kept in history.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            remove.mutate(subcategory.id, {
              onSuccess: ({ outcome }) => {
                if (outcome === 'ARCHIVED') Alert.alert('Archived', 'It has history, so it was archived.');
                onDone();
              },
            }),
        },
      ],
    );

  return (
    <Screen
      scroll
      footer={
        <>
          <Button
            label={update.isPending ? 'Saving…' : 'Save'}
            disabled={!name.trim() || update.isPending}
            onPress={() => update.mutate({ id: subcategory.id, name: name.trim() }, { onSuccess: onDone })}
          />
          <Button
            label={archived ? 'Unarchive' : 'Archive'}
            variant="secondary"
            onPress={() => update.mutate({ id: subcategory.id, archived: !archived }, { onSuccess: onDone })}
          />
          <Button label="Delete" variant="secondary" disabled={remove.isPending} onPress={confirmDelete} />
          <Button label="Cancel" variant="secondary" onPress={onDone} />
        </>
      }>
      <ThemedText type="subtitle">Subcategory</ThemedText>
      <TextField label="Name" value={name} onChangeText={setName} />
      {(update.error ?? remove.error) && <ThemedText>{(update.error ?? remove.error)?.message}</ThemedText>}
    </Screen>
  );
}
