import Table from 'react-bootstrap/Table';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}


const generateRandomUsers = (count: number): User[] => {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
        const user: User = {
            id: i + 1,
            firstName: `User${i + 1}`,
            lastName: `LastName${i + 1}`,
            email: `user${i + 1}@example.com`,
        };
        users.push(user);
    }
    return users;
};

function Content() {
    const users = generateRandomUsers(20);

    return (<main><h1>Блок контента</h1>
        <section>123</section><Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}

            </tbody>
        </Table></main>);
}

export default Content;