import { DimensionValue, View, ViewProps } from "react-native";

interface SpacerProps extends ViewProps {
  height?: DimensionValue;
  width?: DimensionValue;
}

const Spacer = ({ height, width, ...rest }: SpacerProps) => (
  <View {...rest} style={{ height, width }} />
);

export default Spacer;
