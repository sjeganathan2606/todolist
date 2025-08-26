import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  AppBar,
  Toolbar,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon
} from '@mui/icons-material';

// Create a modern theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 = Active Tasks, 1 = Completed Tasks

  // Load todos from localStorage on component mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      console.log('Loading todos from localStorage:', savedTodos);
      if (savedTodos && savedTodos !== 'undefined' && savedTodos !== 'null') {
        const parsedTodos = JSON.parse(savedTodos);
        console.log('Parsed todos:', parsedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
          showSnackbar(`Loaded ${parsedTodos.length} saved tasks!`, 'success');
        }
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      localStorage.removeItem('todos'); // Clear corrupted data
      showSnackbar('Error loading saved tasks. Starting fresh.', 'warning');
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever todos change (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        console.log('Saving todos to localStorage:', todos);
        localStorage.setItem('todos', JSON.stringify(todos));
        // Also save a backup with timestamp
        localStorage.setItem('todos_backup', JSON.stringify({
          data: todos,
          timestamp: new Date().toISOString(),
          version: '1.0'
        }));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
        showSnackbar('Error saving tasks!', 'error');
      }
    }
  }, [todos, isLoaded]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Export todos as JSON file
  const exportTodos = () => {
    const dataStr = JSON.stringify({
      todos: todos,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `my-todos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showSnackbar('Tasks exported successfully!', 'success');
  };

  // Import todos from JSON file
  const importTodos = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (imported.todos && Array.isArray(imported.todos)) {
            setTodos(imported.todos);
            showSnackbar(`Imported ${imported.todos.length} tasks!`, 'success');
          } else {
            showSnackbar('Invalid file format!', 'error');
          }
        } catch (err) {
          console.error('Import error:', err);
          showSnackbar('Error importing file!', 'error');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = ''; // Reset file input
  };

  // Generate shareable link with todos data
  const generateShareLink = () => {
    try {
      const data = {
        todos: todos,
        timestamp: new Date().toISOString()
      };
      const encodedData = btoa(JSON.stringify(data));
      const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;
      
      navigator.clipboard.writeText(shareUrl).then(() => {
        showSnackbar('Share link copied to clipboard!', 'success');
      }).catch(() => {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showSnackbar('Share link copied to clipboard!', 'success');
      });
    } catch (error) {
      console.error('Error generating share link:', error);
      showSnackbar('Error generating share link!', 'error');
    }
  };

  // Load data from URL parameter (for shared links)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('data');
    if (sharedData && !isLoaded) {
      try {
        const decodedData = JSON.parse(atob(sharedData));
        if (decodedData.todos && Array.isArray(decodedData.todos)) {
          setTodos(decodedData.todos);
          showSnackbar(`Loaded ${decodedData.todos.length} shared tasks!`, 'success');
          // Clear the URL parameter to avoid confusion
          window.history.replaceState({}, '', window.location.pathname);
        }
      } catch (error) {
        console.error('Error loading shared data:', error);
        showSnackbar('Error loading shared tasks!', 'error');
      }
    }
  }, [isLoaded]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toLocaleDateString()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
      showSnackbar('Task added successfully!');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    showSnackbar('Task deleted!', 'info');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updatedTodo = { 
          ...todo, 
          completed: !todo.completed 
        };
        
        // Add completion timestamp
        if (!todo.completed) {
          updatedTodo.completedAt = new Date().toLocaleDateString();
        } else {
          delete updatedTodo.completedAt;
        }
        
        return updatedTodo;
      }
      return todo;
    }));
    
    const todo = todos.find(t => t.id === id);
    showSnackbar(
      todo.completed ? 'Task marked as incomplete!' : 'Task completed! 🎉',
      todo.completed ? 'info' : 'success'
    );
  };

  const startEdit = (todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
    setOpenDialog(true);
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      setTodos(todos.map(todo => 
        todo.id === editingTodo.id ? { ...todo, text: editText.trim() } : todo
      ));
      setOpenDialog(false);
      setEditingTodo(null);
      setEditText('');
      showSnackbar('Task updated successfully!');
    }
  };

  const cancelEdit = () => {
    setOpenDialog(false);
    setEditingTodo(null);
    setEditText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filter todos based on active tab
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const displayedTodos = activeTab === 0 ? activeTodos : completedTodos;

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <CheckCircleIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Todo List
          </Typography>
          <Chip 
            label={`${completedCount}/${totalCount} completed • Data saved automatically`}
            color="secondary"
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom align="center" color="primary">
              What needs to be done?
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={addTodo}
                disabled={!newTodo.trim()}
                sx={{ 
                  borderRadius: 2,
                  minWidth: 120,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
                startIcon={<AddIcon />}
              >
                Add Task
              </Button>
            </Box>
          </Box>

          {/* Tabs for Active and Completed Tasks */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="task tabs">
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>Active Tasks</span>
                    {activeTodos.length > 0 && (
                      <Chip 
                        label={activeTodos.length} 
                        size="small" 
                        color="primary" 
                        sx={{ height: 20, fontSize: '0.75rem' }}
                      />
                    )}
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>Completed Tasks</span>
                    {completedTodos.length > 0 && (
                      <Chip 
                        label={completedTodos.length} 
                        size="small" 
                        color="success" 
                        sx={{ height: 20, fontSize: '0.75rem' }}
                      />
                    )}
                  </Box>
                } 
              />
            </Tabs>
          </Box>

          {/* Tasks List */}
          {displayedTodos.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {activeTab === 0 ? "No active tasks!" : "No completed tasks yet!"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activeTab === 0 
                  ? "Add your first task above to get started." 
                  : "Complete some tasks to see them here."
                }
              </Typography>
            </Box>
          ) : (
            <List sx={{ mt: 2 }}>
              {displayedTodos.map((todo) => (
                <ListItem
                  key={todo.id}
                  sx={{
                    mb: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    backgroundColor: todo.completed ? 'action.hover' : 'background.paper',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Checkbox
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    color="primary"
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'text.secondary' : 'text.primary',
                          fontWeight: todo.completed ? 400 : 500,
                        }}
                      >
                        {todo.text}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        Created: {todo.createdAt}
                        {todo.completed && todo.completedAt && ` • Completed: ${todo.completedAt}`}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => startEdit(todo)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteTodo(todo.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        {/* Statistics */}
        {todos.length > 0 && (
          <Paper elevation={2} sx={{ p: 2, mt: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" color="primary">
                  {totalCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Tasks
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="success.main">
                  {completedCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Completed
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="warning.main">
                  {totalCount - completedCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Remaining
                </Typography>
              </Box>
            </Box>
            
            {/* Backup & Export Options */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={exportTodos}
                sx={{ textTransform: 'none' }}
              >
                📥 Export Backup
              </Button>
              <Button
                variant="outlined"
                size="small"
                component="label"
                sx={{ textTransform: 'none' }}
              >
                📤 Import Backup
                <input
                  type="file"
                  accept=".json"
                  onChange={importTodos}
                  style={{ display: 'none' }}
                />
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={generateShareLink}
                sx={{ textTransform: 'none' }}
              >
                🔗 Share Link
              </Button>
            </Box>
          </Paper>
        )}
      </Container>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={cancelEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="outlined"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelEdit}>Cancel</Button>
          <Button onClick={saveEdit} variant="contained" disabled={!editText.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default TodoApp;
