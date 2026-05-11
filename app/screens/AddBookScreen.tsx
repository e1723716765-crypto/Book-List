import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, addBook, NewBook } from '../database/DB';
import { appStyles } from '../styles/appStyles';

// Tipo de navegación
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'AddBook'>;

const AddBookScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  // 📝 Estados del formulario
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Validaciones (obligatorias)
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = '* El título es obligatorio';
    if (!author.trim()) newErrors.author = '* El autor es obligatorio';
    if (!year.trim()) newErrors.year = '* El año es obligatorio';
    else if (isNaN(Number(year)) || Number(year) < 1000 || Number(year) > 2030) {
      newErrors.year = '* Año inválido (ej: 2000)';
    }
    if (!genre.trim()) newErrors.genre = '* El género es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Guardar en Base de Datos
  const handleSave = async () => {
    if (!validateForm()) return;

    const newBookData: NewBook = {
      title: title.trim(),
      author: author.trim(),
      year: Number(year),
      genre: genre.trim(),
    };

    try {
      await addBook(newBookData);
      Alert.alert(
        '✅ Éxito',
        'Libro guardado correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo guardar el libro');
      console.error('Error al guardar:', error);
    }
  };

  return (
    <SafeAreaView style={appStyles.container}>
      <Text style={appStyles.title}>Agregar Nuevo Libro</Text>
      <Text style={{ marginBottom: 20, color: '#636e72' }}>
        Llena todos los campos marcados con *
      </Text>

      {/* 📌 Campo: Título */}
      <TextInput
        style={appStyles.input}
        placeholder="Título *"
        value={title}
        onChangeText={setTitle}
      />
      {errors.title && <Text style={appStyles.errorText}>{errors.title}</Text>}

      {/* 📌 Campo: Autor */}
      <TextInput
        style={appStyles.input}
        placeholder="Autor *"
        value={author}
        onChangeText={setAuthor}
      />
      {errors.author && <Text style={appStyles.errorText}>{errors.author}</Text>}

      {/* 📌 Campo: Año */}
      <TextInput
        style={appStyles.input}
        placeholder="Año *"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />
      {errors.year && <Text style={appStyles.errorText}>{errors.year}</Text>}

      {/* 📌 Campo: Género */}
      <TextInput
        style={appStyles.input}
        placeholder="Género * (ej: Novela, Programación...)"
        value={genre}
        onChangeText={setGenre}
      />
      {errors.genre && <Text style={appStyles.errorText}>{errors.genre}</Text>}

      {/* ✅ Botón Guardar */}
      <TouchableOpacity style={appStyles.button} onPress={handleSave}>
        <Text style={appStyles.buttonText}>Guardar Libro</Text>
      </TouchableOpacity>

      {/* ❌ Botón Cancelar */}
      <TouchableOpacity style={appStyles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={appStyles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddBookScreen;