import {
  Button,
  Host,
  TextField,
  TextFieldRef,
  SecureField,
  Form,
  Section,
  Text,
  HStack,
  Picker,
  useTextFieldState,
} from '@expo/ui/swift-ui';
import {
  listSectionSpacing,
  pickerStyle,
  scrollDismissesKeyboard,
  submitLabel,
  tag,
  buttonStyle,
} from '@expo/ui/swift-ui/modifiers';
import * as React from 'react';

export default function TextInputScreen() {
  const textRef = React.useRef<TextFieldRef>(null);
  const secureRef = React.useRef<TextFieldRef>(null);
  const submitLabelOptions = [
    'continue',
    'done',
    'go',
    'join',
    'next',
    'return',
    'route',
    'search',
    'send',
  ] as const;
  const [selectedSubmitLabel, setSelectedSubmitLabel] =
    React.useState<(typeof submitLabelOptions)[number]>('continue');
  const [selection, setSelection] = React.useState<{ start: number; end: number } | null>(null);

  return (
    <Host style={{ flex: 1 }}>
      <Form modifiers={[listSectionSpacing('compact'), scrollDismissesKeyboard('interactively')]}>
        <Section title="Text Input">
          <TextField
            ref={textRef}
            autocorrection={false}
            defaultValue="hey there"
            onChangeText={(value) => {
              console.log('value', value);
            }}
            onChangeSelection={setSelection}
            onSubmit={(value) => {
              alert('onSubmit: ' + value);
            }}
          />
          <HStack spacing={16}>
            <Button
              modifiers={[buttonStyle('bordered')]}
              onPress={async () => {
                textRef.current?.focus();
              }}
              label="Focus"
            />
            <Button
              modifiers={[buttonStyle('bordered')]}
              onPress={async () => {
                textRef.current?.blur();
                secureRef.current?.blur();
              }}
              label="Blur"
            />
          </HStack>
          <HStack spacing={16}>
            <Button
              modifiers={[buttonStyle('bordered')]}
              onPress={async () => {
                textRef.current?.setText('Hello there!');
                secureRef.current?.setText('123');
              }}
              label="Set text"
            />
            <Button
              modifiers={[buttonStyle('bordered')]}
              onPress={async () => {
                textRef.current?.setSelection(2, 7);
              }}
              label="Set Selection"
            />
          </HStack>
          <Text>Selection: {JSON.stringify(selection)}</Text>
        </Section>
        <Section title="Multiline Text Input">
          <TextField
            multiline
            numberOfLines={5}
            autocorrection={false}
            allowNewlines={false}
            defaultValue="This input wraps text in new lines when text reaches width of the input"
            onChangeText={(value) => {
              console.log('value', value);
            }}
          />
        </Section>
        <Section title="Phone Text Input">
          <TextField
            multiline
            numberOfLines={5}
            keyboardType="phone-pad"
            autocorrection={false}
            defaultValue="324342324"
            onChangeText={(value) => {
              console.log('value', value);
            }}
          />
        </Section>
        <Section title="Multiline, allowNewlines Text Input">
          <TextField
            multiline
            numberOfLines={5}
            allowNewlines
            autocorrection={false}
            defaultValue="hey there"
          />
        </Section>
        <Section title="Submit Label">
          <Picker
            label="Submit label"
            modifiers={[pickerStyle('menu')]}
            onSelectionChange={(selection) =>
              setSelectedSubmitLabel(selection as (typeof submitLabelOptions)[number])
            }>
            {submitLabelOptions.map((option) => (
              <Text key={option} modifiers={[tag(option)]}>
                {option}
              </Text>
            ))}
          </Picker>
          <TextField
            modifiers={[submitLabel(selectedSubmitLabel)]}
            defaultValue="hey there"
            onChangeText={(value) => {
              console.log('value', value);
            }}
          />
        </Section>
        <Section title="Secure Text Input">
          <SecureField ref={secureRef} defaultValue="hey there" keyboardType="numeric" />
        </Section>
        <Section title="Shared State">
          <SharedStateTextField />
        </Section>
      </Form>
    </Host>
  );
}

/**
 * Demonstrates using `useTextFieldState` — direct property access replaces the imperative ref API.
 * `state.text` and `state.isFocused` are readable/writable from JS.
 */
function SharedStateTextField() {
  const state = useTextFieldState('Hello from shared state');
  const [log, setLog] = React.useState('');

  React.useEffect(() => {
    const sub = state.addListener('textChange', ({ text }) => {
      setLog(`Text: ${text}`);
    });
    return () => sub.remove();
  }, [state]);

  return (
    <>
      <TextField state={state} placeholder="Shared state field" autocorrection={false} />
      <Text>{log}</Text>
      <HStack spacing={16}>
        <Button
          modifiers={[buttonStyle('bordered')]}
          onPress={() => {
            state.isFocused = true;
          }}
          label="Focus"
        />
        <Button
          modifiers={[buttonStyle('bordered')]}
          onPress={() => {
            state.isFocused = false;
          }}
          label="Blur"
        />
        <Button
          modifiers={[buttonStyle('bordered')]}
          onPress={() => {
            state.text = 'Set from JS!';
          }}
          label="Set text"
        />
      </HStack>
    </>
  );
}

TextInputScreen.navigationOptions = {
  title: 'TextInput',
};
