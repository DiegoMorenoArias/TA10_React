import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]); // almacena los usuarios
  const [loading, setLoading] = useState(true); // si está cargando
  const [error, setError] = useState(null); // para manejar errores

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        await setUsers(data); // Guardar los usuarios en el estado
        await setLoading(false); // Cambiar estado de loading a false
      } catch (err) {
        await setError(err.message); // Manejar errores
        await setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Cargando...</p>; // Si llegara a estar cargando muestra esto
  }

  if (error) {
    return <p>Error: {error}</p>; // Mostrar un mensaje de error
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Nombre:</strong> {user.name} <br />
            <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
