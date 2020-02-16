import React, { Component } from 'react';

import { Container, Form, Input, SubmitButton } from './styles';

import { MaterialIcons } from '@expo/vector-icons'

export default class Main extends Component {
    state = {
        newUser: '',
        users: [],
    }

    handleAddUser = () => {
        console.log(this.state.newUser);
    }

    render(){
        const { users, newUser } = this.state

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
                    <SubmitButton onPress={this.handleAddUser}>
                        <MaterialIcons name='add' size={20} color='#fff' />
                    </SubmitButton>
                </Form>
            </Container>
        );
    }
}

Main.navigationOptions = {
    title: 'Usuários',
}