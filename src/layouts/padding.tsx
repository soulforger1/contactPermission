import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  topBottom?: number;
  leftRight?: number;
  every?: number;
  width?: number | string;
  height?: number | string;
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
}

export const Padding: React.FC<Props> = ({children, ...props}) => {
  const styles = StyleSheet.create({
    paddings: {
      padding: props.every,
      paddingHorizontal: props.leftRight,
      paddingVertical: props.topBottom,
      paddingRight: props.right,
      paddingLeft: props.left,
      paddingBottom: props.bottom,
      paddingTop: props.top,
      height: props.height,
      width: props.width,
      justifyContent: props.justify,
      alignItems: props.align,
    },
  });
  return <View style={[styles.paddings]}>{children}</View>;
};
