import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationGateway } from '../domain/gateways/notification.gateway';

@Injectable()
export class ToastNotificationGateway extends NotificationGateway {
  readonly #messages = inject(MessageService);

  error(detail: string): void {
    this.#messages.add({ severity: 'error', summary: 'Erreur', detail, life: 5000 });
  }
}
