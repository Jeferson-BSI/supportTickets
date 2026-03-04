import * as Native from 'react-native';
import { IColor, theme } from '@theme/theme';

type SpacingKey = keyof typeof theme.spacing;

interface ContainerProps extends Native.ViewProps {
  children?: React.ReactNode;
  bg?: IColor;
  p?: SpacingKey;
  px?: SpacingKey;
  py?: SpacingKey;
  pt?: SpacingKey;
  pr?: SpacingKey;
  pb?: SpacingKey;
  pl?: SpacingKey;
  m?: SpacingKey;
  mx?: SpacingKey;
  my?: SpacingKey;
  mt?: SpacingKey;
  mr?: SpacingKey;
  mb?: SpacingKey;
  ml?: SpacingKey;

  width?: Native.DimensionValue;
  height?: Native.DimensionValue;
  minWidth?: Native.DimensionValue;
  minHeight?: Native.DimensionValue;
  maxWidth?: Native.DimensionValue;
  maxHeight?: Native.DimensionValue;
  flex?: Native.ViewStyle['flex'];
  align?: Native.ViewStyle['alignItems'];
  justify?: Native.ViewStyle['justifyContent'];
  direction?: Native.ViewStyle['flexDirection'];
  wrap?: Native.ViewStyle['flexWrap'];
}

const Container = ({
  children,
  bg,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,

  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  flex,
  align,
  justify,
  direction,
  wrap,
  style,
  ...rest
}: ContainerProps) => (
  <Native.View
    {...rest}
    style={[
      {
        backgroundColor: bg ? theme.colors[bg] : undefined,
        padding: p ? theme.spacing[p] : undefined,
        paddingHorizontal: px ? theme.spacing[px] : undefined,
        paddingVertical: py ? theme.spacing[py] : undefined,
        paddingTop: pt ? theme.spacing[pt] : undefined,
        paddingRight: pr ? theme.spacing[pr] : undefined,
        paddingBottom: pb ? theme.spacing[pb] : undefined,
        paddingLeft: pl ? theme.spacing[pl] : undefined,
        margin: m ? theme.spacing[m] : undefined,
        marginHorizontal: mx ? theme.spacing[mx] : undefined,
        marginVertical: my ? theme.spacing[my] : undefined,
        marginTop: mt ? theme.spacing[mt] : undefined,
        marginRight: mr ? theme.spacing[mr] : undefined,
        marginBottom: mb ? theme.spacing[mb] : undefined,
        marginLeft: ml ? theme.spacing[ml] : undefined,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        flex,
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        flexWrap: wrap,
      },
      style,
    ]}
  >
    {children}
  </Native.View>
);

export default Container;
