import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';

export default ({data}) => {
  return (
    <View>
      <TodayWeather data={data} />
      {data.next5Days &&
        data.next5Days.map((w) => {
          const date = new moment(w.dt, 'X');
          return (
            <View style={[styles.card, styles.nextDaysCard]}>
              <View>
                <Text>{date.format('dddd')}</Text>
              </View>
              <View>
                <Text>{new Date(w.dt * 1000).getDate()}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

const TodayWeather = ({data}) => {
  return (
    <View style={[styles.card, styles.todayCard]}>
      <Text style={styles.cityName}>{data.today && data.today.temp.day}</Text>
      <Text style={styles.cityName}>{data.city && data.city.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cityName: {
    fontSize: 20,
    lineHeight: 30,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderRadius: 3,
    backgroundColor: 'white',
    marginBottom: 20,
    marginHorizontal: 10,
    padding: 20,
  },
  todayCard: {
    height: 100,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  nextDaysCard: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
