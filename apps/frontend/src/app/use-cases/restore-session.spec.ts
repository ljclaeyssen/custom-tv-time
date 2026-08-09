import { TestBed } from '@angular/core/testing';

import { TokenStorageGateway } from '../domain/gateways/token-storage.gateway';
import { AuthStore } from '../store/auth.store';
import { InMemoryTokenStorageGateway } from '../testing/in-memory.gateways';
import { provideFrontendTesting } from '../testing/provide-frontend-testing';
import { RestoreSession } from './restore-session';

describe('RestoreSession', () => {
  let useCase: RestoreSession;
  let tokenStorage: InMemoryTokenStorageGateway;
  let store: AuthStore;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideFrontendTesting()] });
    useCase = TestBed.inject(RestoreSession);
    tokenStorage = TestBed.inject(TokenStorageGateway) as InMemoryTokenStorageGateway;
    store = TestBed.inject(AuthStore);
  });

  it('réhydrate le token persisté', () => {
    tokenStorage.save('jeton-persisté');

    useCase.execute();

    expect(store.token()).toBe('jeton-persisté');
    expect(store.isAuthenticated()).toBe(true);
  });

  it('ne fait rien sans token persisté', () => {
    useCase.execute();

    expect(store.token()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
  });
});
