import React, { useCallback, useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  View,
} from 'react-native';

import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FormContainerProps = {
  children: React.ReactNode;
};

const KEYBOARD_EXTRA_OFFSET = 140;

export function FormContainer({ children }: FormContainerProps) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const contentRef = useRef<View>(null);

  const scrollToFocusedInput = useCallback(() => {
    const focused = TextInput.State.currentlyFocusedInput?.();
    if (!focused || !contentRef.current) return;

    (focused as any).measureLayout(
      contentRef.current,
      (_x: number, y: number) => {
        scrollRef.current?.scrollTo({
          y: Math.max(0, y - KEYBOARD_EXTRA_OFFSET),
          animated: true,
        });
      },
      () => {},
    );
  }, []);

  useEffect(() => {
    const event = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const sub = Keyboard.addListener(event, () => {
      setTimeout(scrollToFocusedInput, 100);
    });
    return () => sub.remove();
  }, [scrollToFocusedInput]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <View ref={contentRef} collapsable={false}>
            {children}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
