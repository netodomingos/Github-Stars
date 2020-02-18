import React, { Component } from 'react';

import { Keyboard, ActivityIndicator, AsyncStorage } from 'react-native'

import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from './styles';

import { MaterialIcons } from '@expo/vector-icons'

import api from '../Services/Api'

export default class Main extends Component {
    state = {
        newUser: '',
        users: [],
        loadgin: false
    }  

    async componentDidMount(){
        const users = await AsyncStorage.getItem('users')

        if(users){
            this.setState({ users: JSON.parse(users) })
        }
    }

    componentDidUpdate(_, prevState){
        const { users } = this.state

        if(prevState.users !== users){
            AsyncStorage.setItem('users', JSON.stringify(users))
        }
    }

    handleAddUser = async () => {
        const { users, newUser } = this.state

        this.setState({ loading: true })

        const response = await api.get(`/users/${newUser}`) 

        const data = {
            name: response.data.name,
            bio: response.data.bio,
            login: response.data.login,
            avatar: response.data.avatar_url  
        }

        this.setState({
            users: [ ...users, data ],
            newUser: '',
            loading: false
        })

        Keyboard.dismiss()
        
    }

    handleNavigate = (user) => {
        const { navigation } = this.props

        navigation.navigate('User', { user })
    }

    render(){
        const { users, newUser, loading } = this.state

        return (
            <Container>
                <Form>
                    <Input 
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Adicionar Usuário'
                        value={newUser}
                        onChangeText={text => this.setState({ newUser: text })}
                        returnKeyType='send'
                        onSubmitEditing={this.handleAddUser}
                    />
                    <SubmitButton loading={loading} onPress={this.handleAddUser}>
                        {loading ? (
                            <ActivityIndicator color='#fff' />
                        ) : ( 
                            <MaterialIcons name='add' size={20} color='#fff' />
                        )}
                    </SubmitButton>
                </Form>

                <List
                    data={users}
                    keyExtractor={user => user.login}
                    renderItem={({ item }) => (
                        <User>
                            <Avatar source={{uri: item.avatar}}/>
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton onPress={() => this.handleNavigate(item)}>
                                <ProfileButtonText>Ver Perfil</ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )}
                
                />
            </Container>
        );
    }
}

Main.navigationOptions = {
    title: 'Usuários',
}