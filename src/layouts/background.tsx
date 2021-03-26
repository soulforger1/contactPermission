import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

interface Props {
  height: number | string;
  width: number | string;
  color?: string;
  url?: string;
  opacity?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  overflow?: 'visible' | 'hidden';
  borderRadius?: number;
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
}

export const Background: React.FC<Props> = ({children, ...props}) => {
  const styles = StyleSheet.create({
    main: {
      height: props.height,
      width: props.width,
      backgroundColor: props.color,
      opacity: props.opacity,
      resizeMode: props.resizeMode,
      overflow: props.overflow,
      borderRadius: props.borderRadius,
      justifyContent: props.justify,
      alignItems: props.align,
    },
  });

  return (
    <ImageBackground source={{uri: props.url}} style={styles.main}>
      {children}
    </ImageBackground>
  );
};
