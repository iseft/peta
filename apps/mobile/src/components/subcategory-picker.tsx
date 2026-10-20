import type { CategoryDTO } from '@peta/shared';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useCreateSubcategory } from '@/api/queries';
import { Button } from '@/components/button';
import { ChoiceChips } from '@/components/choice-chips';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';

type SubcategoryPickerProps = {
  categories: CategoryDTO[];
  categoryId: string | null;
  subcategoryId: string | null;
  onChange: (categoryId: string, subcategoryId: string | null) => void;
};

// Category first, then one of its Subcategories, or a new one made on the spot.
export function SubcategoryPicker({
  categories,
  categoryId,
  subcategoryId,
  onChange,
}: SubcategoryPickerProps) {
  const createSubcategory = useCreateSubcategory();
  const [newName, setNewName] = useState('');
  const category = categories.find((c) => c.id === categoryId);
  const subcategories =
    category?.subcategories.filter((s) => !s.archivedAt || s.id === subcategoryId) ?? [];

  const add = () => {
    if (!category || !newName.trim()) return;
    createSubcategory.mutate(
      { categoryId: category.id, name: newName.trim() },
      {
        onSuccess: (created) => {
          setNewName('');
          onChange(category.id, created.id);
        },
      },
    );
  };

  return (
    <View style={styles.picker}>
      <ChoiceChips
        label="Category"
        choices={categories.map((c) => ({ value: c.id, label: c.name }))}
        value={categoryId}
        onChange={(id) => onChange(id, null)}
      />
      {category && (
        <>
          {subcategories.length > 0 ? (
            <ChoiceChips
              label="Subcategory"
              choices={subcategories.map((s) => ({ value: s.id, label: s.name }))}
              value={subcategoryId}
              onChange={(id) => onChange(category.id, id)}
            />
          ) : (
            <ThemedText type="small" themeColor="textSecondary">
              No Subcategories in {category.name} yet. Name one, e.g. &ldquo;Rent&rdquo;.
            </ThemedText>
          )}
          <View style={styles.newRow}>
            <View style={styles.fill}>
              <TextField
                label="New Subcategory"
                value={newName}
                onChangeText={setNewName}
                placeholder={`In ${category.name}`}
                error={createSubcategory.error?.message ?? null}
              />
            </View>
            <Button
              label="Add"
              variant="secondary"
              disabled={!newName.trim() || createSubcategory.isPending}
              onPress={add}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  picker: { gap: 16 },
  newRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  fill: { flex: 1 },
});
