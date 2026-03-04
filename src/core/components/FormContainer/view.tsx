import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FormContainerProps = {
  children: React.ReactNode;
};

export function FormContainer({ children, ...rest }: FormContainerProps) {
  const insets = useSafeAreaInsets();

  const marginTop = insets.top;
  return (
    <KeyboardAvoidingView
      style={[styles.container, { marginTop }, rest]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
