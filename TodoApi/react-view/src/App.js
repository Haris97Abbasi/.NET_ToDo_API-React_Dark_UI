import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

function App() {
    const [items, setItems] = useState([]);

    const fetchTodos = () => {
        axios.get('https://localhost:7276/api/TodoItems')
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{ justifyContent: 'center' }}>
                    <Typography variant="h6" component="div">
                        My Todo App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '20px' }}>
                <AddTodo fetchTodos={fetchTodos} />
                <TodoList items={items} fetchTodos={fetchTodos} />
            </Container>
        </div>
    );
}

export default App;
