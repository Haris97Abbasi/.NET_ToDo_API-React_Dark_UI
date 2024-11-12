import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, FormControlLabel, Checkbox, Card } from '@mui/material';

function AddTodo({ fetchTodos }) {
    const [name, setName] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name) return;
        try {
            const response = await axios.post('https://localhost:7276/api/TodoItems', {
                name: name,
                isComplete: isComplete
            });
            console.log(response.data);
            setName('');
            setIsComplete(false);
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <Card style={{ maxWidth: 600, margin: '30px auto', padding: '20px' }}>
            <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
                <TextField
                    label="Add new todo"
                    variant="outlined"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={<Checkbox checked={isComplete} onChange={e => setIsComplete(e.target.checked)} />}
                    label="Completed"
                />
                <Button type="submit" variant="contained" color="primary">
                    Add
                </Button>
            </form>
        </Card>
    );
}

export default AddTodo;
