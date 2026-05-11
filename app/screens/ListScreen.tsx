import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Book, getAllBooks } from '../database/DB';
import { appStyles } from '../styles/appStyles';

// Tipo de navegación
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'List'>;

const ListScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState('');

  // ✅ Cargar datos al entrar o volver a la pantalla
  useFocusEffect(
    React.useCallback(() => {
      loadBooksFromDB();
    }, [])
  );

  
  const loadBooksFromDB = async () => {
    try {
      const allBooks = await getAllBooks();
      setBooks(allBooks);
      setFilteredBooks(allBooks);
    } catch (error) {
      console.error('❌ Error al cargar libros:', error);
    }
  };

  React.useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredBooks(books);
      return;
    }
    const term = searchText.toLowerCase();
    const result = books.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
    setFilteredBooks(result);
  }, [searchText, books]);

  // ✅ Renderizar cada tarjeta de libro
  const renderBookItem = ({ item }: { item: Book }) => (
    <View style={appStyles.card}>
      <Text style={[appStyles.cardText, { fontWeight: 'bold', fontSize: 18 }]}>
        {item.title}
      </Text>
      <Text style={appStyles.cardText}>✍️ Autor: {item.author}</Text>
      <Text style={appStyles.cardText}>📅 Año: {item.year}</Text>
      <Text style={appStyles.cardText}>🏷️ Género: {item.genre}</Text>
    </View>
  );

  return (
    <SafeAreaView style={appStyles.container}>
      { }
      <TextInput
        style={appStyles.searchInput}
        placeholder="Buscar por título o autor..."
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
      />

      {}
      <Text style={appStyles.counterText}>
        📚 {filteredBooks.length} libro(s) encontrado(s)
      </Text>

      {}
      <FlatList
        data={filteredBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={appStyles.emptyText}>
            {books.length === 0
              ? "📭 No hay libros registrados. Agrega uno nuevo."
              : "🔍 No se encontraron coincidencias"}
          </Text>
        }
      />

      {}
      <TouchableOpacity
        style={appStyles.fab}
        onPress={() => navigation.navigate('AddBook')}
      >
        <Text style={appStyles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ListScreen;