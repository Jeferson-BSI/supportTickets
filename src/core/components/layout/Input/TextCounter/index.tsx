import * as Native from 'react-native';
import Text from '@core/components/base/Text/view';

interface TextCounterProps {
  counter: number;
  charactersTotal: number;
}

const TextCounter = ({ counter, charactersTotal = 0 }: TextCounterProps) => (
  <Native.View style={styles.container}>
    <Text size={12} color="textMuted">
      {counter}/{charactersTotal}
    </Text>
  </Native.View>
);

const styles = Native.StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    paddingTop: 4,
  },
});

export default TextCounter;
