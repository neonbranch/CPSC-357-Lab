# Lab 3 Tutorial: User Input, State Management, and Navigation

This comprehensive tutorial covers essential React Native concepts for building interactive mobile applications:

1. **Props and States** - Understanding component data flow
2. **React Hooks (useState)** - Managing component state with hooks
3. **Handling User Input & Forms** - Working with TextInput and form validation
4. **Handling Touches** - Responding to user touch interactions
5. **Introduction to Navigation** - Overview of Stack, Tab, and Drawer navigators
6. **Navigating Between Screens** - Implementing navigation in your app
7. **Passing Data Using Navigation** - Sharing data between screens

---

## 1. Props and States

Understanding the difference between **props** and **state** is fundamental to React and React Native.

### What are Props?

**Props (Properties)** are data passed from a parent component to a child component. Props are **immutable** (read-only) and cannot be changed by the child component.

### What is State?

**State** is data that belongs to a component and can change over time. When state changes, the component re-renders to reflect the new data.

### Key Differences

| Aspect | Props | State |
|--------|-------|-------|
| **Source** | Passed from parent | Managed within component |
| **Mutability** | Immutable (read-only) | Mutable (can be changed) |
| **Scope** | Component receives props | Component owns state |
| **Updates** | Parent component changes props | Component updates state using useState setter |

### Props Example

```javascript
import { View, Text, StyleSheet } from 'react-native';

// Parent Component
function App() {
  return (
    <View>
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" age={30} />
    </View>
  );
}

// Child Component (receives props)
function Greeting({ name, age }) {
  return (
    <View style={styles.container}>
      <Text>Hello, {name}!</Text>
      <Text>You are {age} years old.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default App;
```

---

## 2. React Hooks (useState)

**Hooks** are functions that let you "hook into" React features like state and lifecycle methods from functional components. `useState` is the most commonly used hook.

### Why Hooks?

- ✅ Simpler syntax than class components
- ✅ Better code reusability
- ✅ Recommended by React team
- ✅ Works with functional components

### useState Hook

`useState` returns an array with two elements:
1. The current state value
2. A function to update the state

### Basic useState Syntax

```javascript
import { useState } from 'react';

const [stateValue, setStateValue] = useState(initialValue);
```

### useState Example - Counter

```javascript
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Decrement" onPress={decrement} />
        <Button title="Reset" onPress={reset} />
        <Button title="Increment" onPress={increment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
```

### Multiple State Variables

You can use multiple `useState` hooks in a single component:

```javascript
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text>Name: {name || 'Not set'}</Text>
      <Text>Age: {age}</Text>
      <Text>Email: {email || 'Not set'}</Text>
    </View>
  );
}
```

### State Updates with Functions

When the new state depends on the previous state, use a function:

```javascript
// ✅ Correct - Uses previous state
setCount((prevCount) => prevCount + 1);

// ✅ Also correct for simple updates
setCount(count + 1);

// ❌ Incorrect - Don't do this for multiple rapid updates
setCount(count + 1);
setCount(count + 1); // This doesn't work as expected
```

### Important Notes about useState

- State updates are **asynchronous**
- Calling `setState` triggers a **re-render**
- State is **component-specific** (each component instance has its own state)
- Use **functional updates** when state depends on previous state

---

## 3. Handling User Input & Forms

React Native provides `TextInput` component for handling user text input. Forms are created by combining multiple input fields with state management.

### TextInput Component

The `TextInput` component is similar to HTML's `<input>` element but adapted for mobile.

### Basic TextInput

```javascript
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

function BasicInput() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={text}
        onChangeText={setText}
      />
      <Text style={styles.displayText}>
        You typed: {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  displayText: {
    fontSize: 16,
    marginTop: 10,
  },
});
```

### Common TextInput Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | string | The value of the text input (controlled component) |
| `onChangeText` | function | Callback when text changes |
| `placeholder` | string | Placeholder text shown when input is empty |
| `placeholderTextColor` | string | Color of placeholder text |
| `secureTextEntry` | boolean | Hide text (for passwords) |
| `keyboardType` | string | Type of keyboard (default, email-address, numeric, etc.) |
| `autoCapitalize` | string | Capitalization behavior (none, sentences, words, characters) |
| `autoCorrect` | boolean | Enable/disable autocorrect |
| `multiline` | boolean | Allow multiple lines of text |
| `editable` | boolean | Whether the input is editable |
| `maxLength` | number | Maximum number of characters |

### TextInput with Different Keyboard Types

```javascript
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

function InputExample() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
});
```

### Complete Form Example

```javascript
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    Alert.alert('Success', `Welcome, ${formData.email}!`);
    // Reset form
    setFormData({ email: '', password: '' });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />

      <Button title="Login" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});
```

### Form Validation

```javascript
function validateForm(email, password) {
  const errors = {};

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Email is invalid';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

// Usage in component
const handleSubmit = () => {
  const errors = validateForm(formData.email, formData.password);
  
  if (Object.keys(errors).length > 0) {
    // Display errors
    setFormErrors(errors);
    return;
  }
  
  // Proceed with form submission
};
```

---

## 4. Handling Touches

React Native provides several components for handling touch interactions: `TouchableOpacity`, `TouchableHighlight`, `TouchableWithoutFeedback`, and `Pressable`.

### TouchableOpacity

Most commonly used touch component. Provides visual feedback by reducing opacity when pressed.

```javascript
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function TouchableButton() {
  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>Press Me</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### TouchableHighlight

Similar to TouchableOpacity but changes background color instead of opacity.

```javascript
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

function HighlightButton() {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => console.log('Pressed')}
      underlayColor="#0056CC"
    >
      <Text style={styles.buttonText}>Highlight Button</Text>
    </TouchableHighlight>
  );
}
```

### Pressable (Recommended)

`Pressable` is the most flexible and modern approach. It provides more control over press behavior.

```javascript
import { Pressable, Text, StyleSheet } from 'react-native';

function CustomButton() {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={() => console.log('Pressed')}
    >
      <Text style={styles.buttonText}>Pressable Button</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#0056CC',
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### Long Press Example

```javascript
import { Pressable, Text, StyleSheet, Alert } from 'react-native';

function LongPressButton() {
  return (
    <Pressable
      style={styles.button}
      onPress={() => Alert.alert('Single Press')}
      onLongPress={() => Alert.alert('Long Press')}
    >
      <Text style={styles.buttonText}>
        Press or Long Press Me
      </Text>
    </Pressable>
  );
}
```

### Touch Events Comparison

| Component | Visual Feedback | Use Case |
|-----------|----------------|----------|
| `TouchableOpacity` | Opacity change | Buttons, links |
| `TouchableHighlight` | Background color change | List items, cards |
| `TouchableWithoutFeedback` | None | Custom feedback needed |
| `Pressable` | Customizable | Most flexible option |

---

## 5. Introduction to Navigation

Navigation allows users to move between different screens in your app. React Navigation is the most popular navigation library for React Native.

### Types of Navigators

#### 1. Stack Navigator

Navigates between screens like a stack (last-in-first-out). Common for hierarchical navigation.

**Characteristics:**
- Push new screens on top
- Pop screens to go back
- Shows header with back button
- Good for: Detail screens, forms, authentication flows

#### 2. Tab Navigator

Shows multiple screens with tabs at the bottom or top of the screen.

**Characteristics:**
- All tabs visible at once
- Easy switching between tabs
- Icons and labels for each tab
- Good for: Main app sections, categories

#### 3. Drawer Navigator

Side menu that slides in from the edge of the screen.

**Characteristics:**
- Hidden by default
- Opens from side gesture or button
- Good for: Settings, main menu, navigation options

### Installing React Navigation

```bash
# Install core packages
npx expo install @react-navigation/native

# Install navigators (choose based on your needs)
npx expo install @react-navigation/native-stack
npx expo install @react-navigation/bottom-tabs
npx expo install @react-navigation/drawer

# Install dependencies
npx expo install react-native-screens react-native-safe-area-context
```

For drawer navigator, also install:
```bash
npx expo install react-native-gesture-handler react-native-reanimated
```

### Configuring Babel (Required for Drawer Navigator)

If you're using the drawer navigator (which requires `react-native-reanimated`), you need to configure Babel by creating a `babel.config.js` file in your project root.

**Create `babel.config.js` in the root of your project:**

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

**Important Notes:**
- The `react-native-reanimated/plugin` must be listed **last** in the plugins array
- If you don't have a `babel.config.js` file, create one with the above configuration
- After creating or modifying `babel.config.js`, you must restart your development server with cache cleared:
  ```bash
  npx expo start --clear
  ```

**Why is this needed?**
- `react-native-reanimated` requires Babel transformations to work properly
- The plugin processes code that enables smooth animations and gestures
- Without proper Babel configuration, you'll encounter build/transformation errors

**Troubleshooting: "Cannot find module 'react-native-worklets/plugin'" Error**

If you encounter this error when bundling (especially on web), try these solutions in order:

1. **Clear cache and restart:**
   ```bash
   npx expo start --clear
   ```

2. **Reinstall dependencies:**
   ```bash
   # Delete node_modules (on Windows: rmdir /s /q node_modules)
   rm -rf node_modules
   
   # Reinstall dependencies
   npm install
   # Or: yarn install
   
   # Clear cache and restart
   npx expo start --clear
   ```

3. **Reinstall react-native-reanimated with fix:**
   ```bash
   npx expo install react-native-reanimated --fix
   npx expo start --clear
   ```

4. **If the error persists, ensure your babel.config.js is correct:**
   - Use `'react-native-reanimated/plugin'` (not `'react-native-worklets/plugin'`)
   - Make sure it's the **last** item in the plugins array
   - Verify the file is in the project root directory

**Note:** For Expo projects, you should only use `react-native-reanimated/plugin` in your babel.config.js. The worklets are handled internally by react-native-reanimated.

### Navigation Container

All navigators must be wrapped in a `NavigationContainer`:

```javascript
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      {/* Your navigator here */}
    </NavigationContainer>
  );
}
```

---

## 6. Navigating Between Screens

### Stack Navigator

#### Basic Stack Navigation Setup

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

#### Navigation Methods

```javascript
// Navigate to a screen
navigation.navigate('ScreenName');

// Go back to previous screen
navigation.goBack();

// Go back to specific screen in stack
navigation.navigate('ScreenName');

// Reset navigation stack
navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }],
});

// Replace current screen
navigation.replace('ScreenName');
```

### Tab Navigator

#### Basic Tab Navigation Setup

```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Tab</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings Tab</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

#### Tab Navigator with Icons

```javascript
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

### Drawer Navigator

#### Basic Drawer Navigation Setup

```javascript
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Open Drawer"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

### Combining Navigators (Nested Navigation)

You can nest navigators to create complex navigation structures:

```javascript
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab navigator as a screen in stack
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## 7. Passing Data Using Navigation

You can pass data between screens using navigation parameters (route params).

### Passing Data to a Screen

```javascript
// HomeScreen - Passing data
function HomeScreen({ navigation }) {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  };

  return (
    <View style={styles.container}>
      <Button
        title="View Profile"
        onPress={() => navigation.navigate('Profile', { user })}
      />
    </View>
  );
}

// ProfileScreen - Receiving data
function ProfileScreen({ route, navigation }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
}
```

### Handling Missing Parameters

Always check if parameters exist:

```javascript
function DetailsScreen({ route }) {
  const { itemId, otherParam } = route.params || {};

  return (
    <View style={styles.container}>
      <Text>Item ID: {itemId || 'No ID provided'}</Text>
      <Text>Other Param: {otherParam || 'No other param'}</Text>
    </View>
  );
}
```

### Updating Screen Options Based on Params

```javascript
function ProfileScreen({ route, navigation }) {
  const { userName } = route.params || {};

  React.useEffect(() => {
    if (userName) {
      navigation.setOptions({
        title: `${userName}'s Profile`,
      });
    }
  }, [userName, navigation]);

  return (
    <View style={styles.container}>
      <Text>Profile for {userName}</Text>
    </View>
  );
}
```

### Passing Data Back to Previous Screen

#### Using Callbacks

```javascript
// HomeScreen - Set up callback
function HomeScreen({ navigation }) {
  const handleSelectItem = (itemId) => {
    // Navigate with callback
    navigation.navigate('ItemSelection', {
      onSelect: (selectedItem) => {
        console.log('Selected item:', selectedItem);
        // Use the selected item
      },
    });
  };

  return (
    <Button
      title="Select Item"
      onPress={() => handleSelectItem(123)}
    />
  );
}

// ItemSelectionScreen - Use callback
function ItemSelectionScreen({ route, navigation }) {
  const { onSelect } = route.params;

  const handleSelect = () => {
    const selectedItem = { id: 1, name: 'Item 1' };
    onSelect(selectedItem);
    navigation.goBack();
  };

  return (
    <Button title="Select This Item" onPress={handleSelect} />
  );
}
```

#### Using navigation.setParams()

```javascript
function EditScreen({ route, navigation }) {
  const [editedData, setEditedData] = useState(route.params?.data || {});

  const saveData = () => {
    // Update params in previous screen
    navigation.setParams({ data: editedData });
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        value={editedData.name}
        onChangeText={(text) => setEditedData({ ...editedData, name: text })}
      />
      <Button title="Save" onPress={saveData} />
    </View>
  );
}
```

### Complete Example: User List with Details

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

// Sample data
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

// List Screen
function UserListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('UserDetails', { user: item })}
    >
      <Text style={styles.listItemText}>{item.name}</Text>
      <Text style={styles.listItemSubtext}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// Details Screen
function UserDetailsScreen({ route }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="UserList" 
          component={UserListScreen}
          options={{ title: 'Users' }}
        />
        <Stack.Screen 
          name="UserDetails" 
          component={UserDetailsScreen}
          options={{ title: 'User Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItemText: {
    fontSize: 18,
    fontWeight: '600',
  },
  listItemSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});
```

### Best Practices for Navigation

1. **Type Safety**: Use TypeScript or PropTypes for navigation params
2. **Default Values**: Always provide default values for optional params
3. **Deep Linking**: Consider deep linking when designing navigation structure
4. **Performance**: Use React.memo for screens that re-render frequently
5. **Navigation State**: Don't store large amounts of data in navigation params; use state management instead

---

## Summary

This tutorial covered essential concepts for building interactive React Native applications:

- **Props and States**: Understanding data flow in React components
- **React Hooks (useState)**: Modern way to manage component state
- **User Input & Forms**: Handling text input and form validation
- **Touch Handling**: Responding to user interactions
- **Navigation**: Implementing Stack, Tab, and Drawer navigators
- **Screen Navigation**: Moving between different screens
- **Data Passing**: Sharing data between screens using navigation params

## Next Steps

- Practice building forms with validation
- Create a multi-screen app with navigation
- Explore advanced navigation patterns (nested navigators)
- Learn about React Context for global state management
- Study React Navigation documentation: https://reactnavigation.org

## Additional Resources

- [React Navigation Documentation](https://reactnavigation.org)
- [React Hooks Documentation](https://react.dev/reference/react)
- [React Native TextInput](https://reactnative.dev/docs/textinput)
- [React Native Touchable Components](https://reactnative.dev/docs/handling-touches)
