import { type User } from '../types'

interface Props {
    users: User[]
}

export function UsersList ({ users }: Props) {
    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => {
                        return (
                            <tr key={user.id.value}> 
                                <td>
                                    <img src={user.picture.thumbnail}/> 
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button>Borrar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

// table, thead, tbody
// tr -> row
// td -> cell