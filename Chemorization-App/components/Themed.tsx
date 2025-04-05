import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useCustomTheme } from '@/app/_layout';

export function Text(props) {
  const { style, ...otherProps } = props;
  const { colors } = useTheme();
  const { font } = useCustomTheme();
  return (
    <DefaultText
      style={[
        { color: colors.text, fontFamily: font === 'SpaceMono' ? 'SpaceMono' : undefined },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function View(props) {
  const { style, ...otherProps } = props;
  const { colors } = useTheme();
  return <DefaultView style={[{ backgroundColor: colors.background }, style]} {...otherProps} />;
}