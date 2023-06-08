import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
    ? users.filter(user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    })
    : users
  }, [users, filterCountry]) 

  const sortedUsers =  useMemo(() => {
    return sortByCountry 
    ? filteredUsers.toSorted((a, b) => 
       a.location.country.localeCompare(b.location.country)
) : filteredUsers
  }, [filteredUsers, sortByCountry]) 

  const handleReset = () => {
    setUsers(originalUsers.current)
  }  

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
    .then(res => res.json()
    .then(res => {
      setUsers(res.results)
      originalUsers.current = res.results
    }).catch(err => {
      console.log(err)
    }))
  }, [])


  return (
    <div className='App'>
      <h1>Usuarios</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por país' : 'Ordenar por país' }
        </button>
        <button onClick={handleReset}>
          Restaurar usuarios
        </button>
        <input placeholder='Filtra por país' onChange={(e) => {
          setFilterCountry(e.target.value)
        }}></input>
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>
      </main>
        
    </div>
  )
}

export default App
