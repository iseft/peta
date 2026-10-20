import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { useDeletePaymentDetail, useProfile, useSavePaymentDetail } from '@/api/queries';
import { Button } from '@/components/button';
import { Screen } from '@/components/screen';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';

export default function PaymentDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const profile = useProfile();
  const existing = id ? profile.data?.paymentDetails.find((d) => d.id === id) : undefined;
  const save = useSavePaymentDetail();
  const remove = useDeletePaymentDetail();

  const [label, setLabel] = useState(existing?.label ?? '');
  const [holderName, setHolderName] = useState(existing?.holderName ?? profile.data?.name ?? '');
  const [value, setValue] = useState(existing?.value ?? '');
  const valid = label.trim() !== '' && value.trim() !== '';

  const submit = () =>
    save.mutate(
      { id, label: label.trim(), holderName: holderName.trim() || null, value: value.trim() },
      { onSuccess: () => router.back() },
    );

  const confirmDelete = () =>
    Alert.alert('Delete these Payment Details?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => id && remove.mutate(id, { onSuccess: () => router.back() }),
      },
    ]);

  return (
    <Screen
      scroll
      footer={
        <>
          <Button
            label={save.isPending ? 'Saving…' : 'Save'}
            disabled={!valid || save.isPending}
            onPress={submit}
          />
          {existing && (
            <Button label="Delete" variant="secondary" disabled={remove.isPending} onPress={confirmDelete} />
          )}
        </>
      }>
      <ThemedText type="subtitle">{existing ? 'Edit Payment Details' : 'New Payment Details'}</ThemedText>
      <TextField label="Label" value={label} onChangeText={setLabel} placeholder="e.g. OTP, Revolut, Wise" />
      <TextField label="Account holder (optional)" value={holderName} onChangeText={setHolderName} />
      <TextField
        label="Account number, IBAN or handle"
        value={value}
        onChangeText={setValue}
        autoCapitalize="characters"
        autoCorrect={false}
      />
      {(save.error ?? remove.error) && <ThemedText>{(save.error ?? remove.error)?.message}</ThemedText>}
    </Screen>
  );
}
