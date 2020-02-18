import React, { Component } from 'react';

import api from '../Services/Api'

import { ActivityIndicator, StyleSheet } from 'react-native'

import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnerAvatar, Info, Title, Author } from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name
  })

  state = {
    stars: [],
    loading: false
  }

  async componentDidMount(){
    const { navigation } = this.props

    const user = navigation.getParam('user')

    this.setState({ loading: true })

    const response = await api.get(`/users/${user.login}/starred`)
    
    this.setState({ stars: response.data, loading: false })

  }
  render() {
    const { navigation } = this.props
    const { stars, loading } = this.state

    const item = navigation.getParam('user')


    return (


      <Container>
        <Header>
          <Avatar source={{uri: item.avatar}}/>
          <Name>{item.name}</Name>
          <Bio>{item.bio}</Bio>
        </Header>

        { loading ? (
          <ActivityIndicator color='#7159c1' size={40} style={style.loading}  />
        ) : (
          <Stars 
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>  
              </Info> 
            </Starred>
          )}
        />
        ) }
      </Container>
    )
  }
}


const style = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  }
})