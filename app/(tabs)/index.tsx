import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Page = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}><Text>Login</Text></Link>
      <Link href={"/(modals)/booking"}><Text>Booking</Text></Link>
      <Link href={"/listing/123"}><Text>listing</Text></Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})