import { useAuthClient, useActor } from 'app/shared/auth';
import { setState } from 'app/core/state';
import { AuthStatus } from 'app/shared/constants';
import { query } from 'app/features';
import { alerts } from 'app/shared/constants';

export default async function() {
    if (window.location.hash) {
        window.location.replace('/#');
    }
    
    const authClient = await useAuthClient();
    const isAuthenticated = await authClient.isAuthenticated();

    if (isAuthenticated) {
        const principalId = authClient.getIdentity().getPrincipal().toString();

        setState({
            authStatus: AuthStatus.authenticated,
            principalId,
        });

        query();
    } else {
        setState({
            authStatus: AuthStatus.requiredLogin
        })
    }
}