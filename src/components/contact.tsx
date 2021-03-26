import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Background, Padding} from '../layouts';

interface Props {
  name: string;
  header: boolean;
}

export const Contact: React.FC<Props> = ({name, header}) => {
  return (
    <Padding height={60} justify="center" left={header ? 0 : 30} right={30}>
      <Background height={60} width="100%" justify="center">
        <Text style={[styles.contactName, header ? styles.header : {}]}>
          {name}
        </Text>
      </Background>
    </Padding>
  );
};

const styles = StyleSheet.create({
  contactName: {
    fontSize: 20,
    marginLeft: 10,
  },
  header: {
    fontSize: 15,
    color: 'grey',
  },
});
