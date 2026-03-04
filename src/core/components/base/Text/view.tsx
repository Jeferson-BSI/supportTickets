import * as Native from 'react-native';
import { IColor, IFont, theme } from '@theme/theme';

interface ITextProps extends Native.TextProps {
  children: React.ReactNode;
  size?: number;
  font?: IFont;
  color?: IColor;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  maxWidth?: Native.DimensionValue;
}

const Text = ({
  children = '',
  font = 'regular',
  size = 16,
  color = 'textPrimary',
  align = 'auto',
  maxWidth,
  ...rest
}: ITextProps) => (
  <Native.Text
    {...rest}
    style={{
      fontFamily: theme.typography.fonts[font],
      color: theme.colors[color],
      fontSize: 16,
      textAlign: align,
      maxWidth,
    }}
  >
    {children}
  </Native.Text>
);

export default Text;
