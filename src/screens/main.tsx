import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FlatList, PanGestureHandler, State} from 'react-native-gesture-handler';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import {Contact} from '../components/contact';

export const Main = () => {
  const [contacts, setContacts] = useState<any>([{recordID: '', name: ''}]);
  const [headers, setHeaders] = useState<any>([]);
  const [headersLetter, setHeadersLetter] = useState<any>([]);
  const listRef = useRef<any>(null);

  useEffect(() => {
    check(PERMISSIONS.IOS.CONTACTS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.CONTACTS);
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            Contacts.getAll().then((res): any => {
              const local = res.reduce((acc: any, cur: any, index: any) => {
                acc[cur.givenName[0]] = acc[cur.givenName[0]] || [
                  {name: cur.givenName[0], recordID: index, header: true},
                ];
                acc[cur.givenName[0]].push({
                  name: cur.givenName,
                  recordID: cur.recordID,
                  header: false,
                });
                return acc;
              }, {});

              const localContact: any = Object.values(local).reduce(
                (acc: any, cur: any) => {
                  cur.map((i: any) => {
                    acc.push({
                      recordID: cur.recordID,
                      name: i.name,
                      header: i.header,
                    });
                    if (i.header)
                      setHeaders(headers => [...headers, acc.length]);
                  });
                  return acc;
                },
                [],
              );

              setHeadersLetter(Object.keys(local));
              setContacts(localContact);
            });
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });
  }, []);

  const toHeader = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const positionX = event.nativeEvent.y;
      if (positionX < headers.length * 40) {
        const i = (positionX - (positionX % 40)) / 40;

        listRef.current?.scrollToIndex({
          animated: true,
          index: headers[i],
        });
      }
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <FlatList
        ref={listRef}
        style={styles.container}
        ListHeaderComponent={<Text style={styles.header}>Contacts</Text>}
        data={contacts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({index, item}) => (
          <Contact name={item.name} header={item.header} />
        )}
        stickyHeaderIndices={headers}
      />
      <PanGestureHandler onGestureEvent={event => toHeader(event)}>
        <View style={[styles.headeContainer, {height: headers.length * 40}]}>
          {headersLetter.map((cur: any, index: any) => (
            <Text
              onPress={() =>
                listRef.current?.scrollToIndex({
                  animated: true,
                  index: headers[index],
                })
              }
              key={index}>
              {cur}
            </Text>
          ))}
        </View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    fontSize: 50,
    width: '100%',
    marginLeft: 20,
  },
  container: {
    width: '100%',
  },
  headeContainer: {
    marginRight: 10,
    marginTop: 100,
    justifyContent: 'space-between',
  },
});
