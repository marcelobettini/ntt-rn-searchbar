import { StyleSheet, FlatList, View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFetch } from '../api/useFetch';
import { useNavigation } from '@react-navigation/native';
import User from '../components/User';

const HomeScreen = () => {
  const navigation = useNavigation()
  const [endpoint, setEndpoint] = useState('?results=20')
  const [data, loading, error] = useFetch(endpoint)
  const [dataQuery, setDataQuery] = useState([])

  const handleQuery = (str) => {
    const query = data.results.filter(e => e.name.first.toLowerCase().includes(str.toLowerCase()) || e.name.last.toLowerCase().includes(str.toLowerCase()))
    setDataQuery(prev => prev = query)
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'start',
      headerTitleStyle: {
        fontSize: 25,
        color: 'tomato'
      },
      headerSearchBarOptions: {
        placeholder: 'Buscar...',
        onChangeText: (e) => handleQuery(e.nativeEvent.text)
      }
    })


    setDataQuery(data.results)
  }, [data])

  if (loading) return <ActivityIndicator />
  if (error) return <Text>Crash, Boom, Bang!</Text>

  return dataQuery && (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={dataQuery}
        keyExtractor={(item, idx) => idx}
        renderItem={({ item }) => <User user={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  list: {
    flex: 1,
    width: '100%',
  }
})

export default HomeScreen