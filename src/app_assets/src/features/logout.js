import { useAuthClient } from 'app/shared/auth';
import { setState } from 'app/core/state';
import { AuthStatus } from 'app/shared/constants';

export default async function logout() {
    const authClient = await useAuthClient();

    await authClient.logout();

    setState({
        authStatus: AuthStatus.requiredLogin,
        principalId: null,
    });
}