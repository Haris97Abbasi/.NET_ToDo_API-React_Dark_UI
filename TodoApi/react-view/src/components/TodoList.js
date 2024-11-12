import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, TextField, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TodoList({ items, fetchTodos }) {
    const [editItemId, setEditItemId] = useState(null);
    const [editText, setEditText] = useState('');
    const [editComplete, setEditComplete] = useState(false);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7276/api/TodoItems/${id}`);
            fetchTodos();
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    const handleEdit = (item) => {
        setEditItemId(item.id);
        setEditText(item.name);
        setEditComplete(item.isComplete);
    };

    const handleUpdate = async (id) => {
        try {
            await axios.put(`https://localhost:7276/api/TodoItems/${id}`, {
                id: id,
                name: editText,
                isComplete: editComplete
            });
            setEditItemId(null);
            fetchTodos();
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    };

    return (
        <Card style={{ maxWidth: 600, margin: '30px auto', padding: '20px' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Completed</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                    {item.id === editItemId ? (
                                        <TextField
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {item.id === editItemId ? (
                                        <Checkbox
                                            checked={editComplete}
                                            onChange={(e) => setEditComplete(e.target.checked)}
                                        />
                                    ) : (
                                        item.isComplete ? "Yes" : "No"
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {item.id === editItemId ? (
                                        <Button onClick={() => handleUpdate(item.id)} color="primary">Save</Button>
                                    ) : (
                                        <>
                                            <Button onClick={() => handleEdit(item)} color="primary">Edit</Button>
                                            <Button onClick={() => handleDelete(item.id)} color="secondary">Delete</Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}

export default TodoList;
