import { useAuthClient } from '../shared/auth';
import { iiUrl } from '../shared/constants';
import { setState } from 'app/core/state'; 
import { AuthStatus } from 'app/shared/constants';
import { query } from 'app/features';

export default async function login() {
    const authClient = await useAuthClient();

    try {
        await new Promise((resolve, reject) => {
            authClient.login({
                identityProvider: iiUrl,
                onSuccess: resolve,
                onError: reject,
            });
        });
    
        setState({
            authStatus: AuthStatus.authenticated,
            principalId: authClient.getIdentity().getPrincipal().toString(),
        });    

        query();
    } catch (e) {
        console.error(e);
    } finally {
        window.location.replace('#');
    }
}